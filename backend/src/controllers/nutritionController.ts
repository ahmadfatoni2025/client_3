import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// ========== BAHAN BAKU ENDPOINTS ==========

/**
 * GET /api/nutrition/ingredients
 * Mendapatkan semua bahan baku dengan filter dan pagination
 */
export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      lowStock,
      limit = 50,
      page = 1,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.min(100, Math.max(1, Number(limit)));
    const offset = (pageNumber - 1) * limitNumber;

    console.log(`Fetching ingredients - Page: ${pageNumber}, Limit: ${limitNumber}, Category: ${category}, Search: ${search}`);

    // Mulai query
    let query = supabaseAdmin
      .from('bahan_baku')
      .select('*', {
        count: 'exact'
      });

    // Filter berdasarkan kategori
    if (category && typeof category === 'string' && category !== 'all') {
      query = query.eq('category', category);
    }

    // Filter pencarian
    if (search && typeof search === 'string') {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    // Filter Low Stock Flag
    const isLowStock = lowStock === 'true' || lowStock === '1';

    // Sorting
    const orderBy = sortBy as string;
    const orderDirection = sortOrder === 'asc' ? 'asc' : 'desc';
    query = query.order(orderBy, { ascending: orderDirection === 'asc' });

    // Pagination logic
    // Note: Supabase/PostgREST tidak support comparison antar kolom (.lt(col, col)) secara langsung.
    // Jika filter lowStock aktif, kita fetch semua lalu filter di memory.
    if (!isLowStock) {
      query = query.range(offset, offset + limitNumber - 1);
    }

    // Eksekusi query
    const { data: queryData, error, count } = await query;

    if (error) {
      console.error('Supabase error (getAllIngredients):', error);
      return res.status(500).json({
        success: false,
        message: 'Database error',
        error: error.message
      });
    }

    let processedData = queryData || [];
    let totalItems = count || 0;

    // Apply Low Stock Filter in Memory
    if (isLowStock) {
      processedData = processedData.filter(item => {
        const stock = Number(item.stock_quantity || 0);
        const min = Number(item.min_stock_level || 0);
        return stock < min;
      });

      // Recalculate totals for pagination metadata
      totalItems = processedData.length;

      // Apply Pagination in Memory
      processedData = processedData.slice(offset, offset + limitNumber);
    }

    const totalPages = Math.ceil(totalItems / limitNumber);

    // Format data dengan status stok
    const formattedData = processedData.map(ingredient => {
      const stockQty = parseFloat(ingredient.stock_quantity || 0);
      const minStock = parseFloat(ingredient.min_stock_level || 0);

      return {
        ...ingredient,
        stock_quantity: stockQty,
        min_stock_level: minStock,
        stock_status: getStockStatus(stockQty, minStock),
        needs_restock: stockQty < minStock,
        stock_percentage: minStock > 0 ? Math.round((stockQty / minStock) * 100) : 100,
        // Format tanggal
        created_at_formatted: formatDate(ingredient.created_at),
        last_stock_opname_formatted: formatDate(ingredient.last_stock_opname)
      };
    });

    // Get unique categories for filter
    const { data: categoriesData } = await supabaseAdmin
      .from('bahan_baku')
      .select('category')
      .order('category');

    const uniqueCategories = [...new Set((categoriesData || []).map(item => item.category))];

    return res.status(200).json({
      success: true,
      data: formattedData,
      meta: {
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalItems,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1
        },
        filters: {
          availableCategories: uniqueCategories,
          currentCategory: category || 'all',
          currentSearch: search || '',
          lowStockFilter: lowStock || false
        },
        summary: {
          totalItems,
          lowStockCount: formattedData.filter(item => item.needs_restock).length,
          outOfStockCount: formattedData.filter(item => item.stock_status === 'OUT_OF_STOCK').length
        }
      }
    });
  } catch (error) {
    console.error('Error in getAllIngredients:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data bahan baku',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * GET /api/nutrition/ingredients/:id
 * Mendapatkan bahan baku berdasarkan ID
 */
export const getIngredientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID bahan baku harus disertakan'
      });
    }

    console.log(`Fetching ingredient with ID: ${id}`);

    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Bahan baku tidak ditemukan'
        });
      }
      console.error('Supabase error (getIngredientById):', error);
      throw error;
    }

    // Format data
    const stockQty = parseFloat(data.stock_quantity || 0);
    const minStock = parseFloat(data.min_stock_level || 0);

    const formattedData = {
      ...data,
      stock_quantity: stockQty,
      min_stock_level: minStock,
      stock_status: getStockStatus(stockQty, minStock),
      needs_restock: stockQty < minStock,
      stock_percentage: minStock > 0 ? Math.round((stockQty / minStock) * 100) : 100,
      created_at_formatted: formatDate(data.created_at),
      last_stock_opname_formatted: formatDate(data.last_stock_opname),
      nutrition_per_100g: {
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats
      }
    };

    return res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error in getIngredientById:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data bahan baku',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * POST /api/nutrition/ingredients
 * Menambahkan bahan baku baru
 */
export const createIngredient = async (req: Request, res: Response) => {
  try {
    const {
      sku,
      name,
      category,
      unit,
      stock_quantity = 0,
      min_stock_level = 0,
      calories = 0,
      protein = 0,
      carbs = 0,
      fats = 0,
      img = null
    } = req.body;

    console.log('Creating new ingredient:', { sku, name, category });

    // Validasi input wajib
    const errors: string[] = [];
    if (!sku) errors.push('SKU harus diisi');
    if (!name) errors.push('Nama bahan baku harus diisi');
    if (!category) errors.push('Kategori harus diisi');
    if (!unit) errors.push('Unit harus diisi');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors
      });
    }

    // Validasi numeric fields
    const numericFields = [
      { field: 'stock_quantity', name: 'Stock quantity', min: 0 },
      { field: 'min_stock_level', name: 'Min stock level', min: 0 },
      { field: 'calories', name: 'Kalori', min: 0 },
      { field: 'protein', name: 'Protein', min: 0 },
      { field: 'carbs', name: 'Karbohidrat', min: 0 },
      { field: 'fats', name: 'Lemak', min: 0 }
    ];

    for (const { field, name, min } of numericFields) {
      const value = req.body[field];
      if (value !== undefined && value !== null && value !== '') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < min) {
          errors.push(`${name} harus berupa angka ${min >= 0 ? 'positif' : 'valid'}`);
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validasi numerik gagal',
        errors
      });
    }

    // Generate ID jika tidak ada (UUID format)
    const ingredientId = req.body.id || generateId();

    // Insert data
    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .insert({
        id: ingredientId,
        sku: sku.toUpperCase().trim(),
        name: name.trim(),
        category: category.trim(),
        unit: unit.trim(),
        stock_quantity: Number(stock_quantity),
        min_stock_level: Number(min_stock_level),
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fats: Number(fats),
        img,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error (createIngredient):', error);

      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'SKU sudah terdaftar',
          suggestion: 'Gunakan SKU yang berbeda'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Gagal menambahkan bahan baku',
        error: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Bahan baku berhasil ditambahkan',
      data: {
        ...data,
        stock_status: getStockStatus(Number(data.stock_quantity), Number(data.min_stock_level))
      }
    });
  } catch (error) {
    console.error('Error in createIngredient:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan bahan baku',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * PUT /api/nutrition/ingredients/:id
 * Mengupdate bahan baku
 */
export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID bahan baku harus disertakan'
      });
    }

    console.log(`Updating ingredient ${id}:`, updateData);

    // Hapus field yang tidak boleh diupdate atau field UI only
    const allowedColumns = [
      'sku', 'name', 'category', 'unit',
      'stock_quantity', 'min_stock_level',
      'calories', 'protein', 'carbs', 'fats',
      'img', 'description'
    ];

    const filteredUpdates: Record<string, any> = {};

    for (const key of Object.keys(updateData)) {
      if (allowedColumns.includes(key)) {
        filteredUpdates[key] = updateData[key];
      }
    }

    // Jika tidak ada data untuk diupdate
    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data valid untuk diupdate'
      });
    }

    // Validasi numeric fields jika ada
    const numericFields = ['stock_quantity', 'min_stock_level', 'calories', 'protein', 'carbs', 'fats'];
    for (const field of numericFields) {
      if (filteredUpdates[field] !== undefined && filteredUpdates[field] !== null) {
        const numValue = Number(filteredUpdates[field]);
        if (isNaN(numValue) || numValue < 0) {
          return res.status(400).json({
            success: false,
            message: `${field} harus berupa angka positif`
          });
        }
        filteredUpdates[field] = numValue;
      }
    }

    // Tambahkan timestamp update untuk stock opname jika stock berubah
    if (filteredUpdates.stock_quantity !== undefined) {
      filteredUpdates.last_stock_opname = new Date().toISOString();
    }

    filteredUpdates.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .update(filteredUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error (updateIngredient):', error);

      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Bahan baku tidak ditemukan'
        });
      }

      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'SKU sudah terdaftar untuk bahan baku lain'
        });
      }

      // Handle "column does not exist" specifically just in case
      if (error.code === '42703') {
        return res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan sistem (Column mismatch)',
          error: error.message
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Gagal mengupdate bahan baku',
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Bahan baku berhasil diupdate',
      data: {
        ...data,
        stock_status: getStockStatus(Number(data.stock_quantity), Number(data.min_stock_level))
      }
    });
  } catch (error) {
    console.error('Error in updateIngredient:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengupdate bahan baku',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * PATCH /api/nutrition/ingredients/:id/stock
 * Update stock quantity saja
 */
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock_quantity, operation = 'set', note } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID bahan baku harus disertakan'
      });
    }

    if (stock_quantity === undefined || stock_quantity === null) {
      return res.status(400).json({
        success: false,
        message: 'Stock quantity harus diisi'
      });
    }

    const stockQty = Number(stock_quantity);
    if (isNaN(stockQty) || stockQty < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock quantity harus berupa angka positif'
      });
    }

    console.log(`Updating stock for ingredient ${id}: ${operation} to ${stockQty}`);

    // Get current stock
    const { data: currentData } = await supabaseAdmin
      .from('bahan_baku')
      .select('stock_quantity')
      .eq('id', id)
      .single();

    if (!currentData) {
      return res.status(404).json({
        success: false,
        message: 'Bahan baku tidak ditemukan'
      });
    }

    const currentStock = parseFloat(currentData.stock_quantity || 0);
    let newStock = stockQty;

    // Apply operation
    if (operation === 'add') {
      newStock = currentStock + stockQty;
    } else if (operation === 'subtract') {
      newStock = Math.max(0, currentStock - stockQty);
    } else if (operation === 'set') {
      newStock = stockQty;
    }

    // Update stock
    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .update({
        stock_quantity: newStock,
        last_stock_opname: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error (updateStock):', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal mengupdate stock',
        error: error.message
      });
    }

    // Log stock change (optional - bisa ditambahkan tabel stock_history)
    console.log(`Stock updated: ${currentStock} → ${newStock} (${operation})`);

    return res.status(200).json({
      success: true,
      message: 'Stock berhasil diupdate',
      data: {
        ...data,
        previous_stock: currentStock,
        stock_change: newStock - currentStock,
        operation,
        note,
        stock_status: getStockStatus(newStock, parseFloat(data.min_stock_level || 0)),
        updated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in updateStock:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengupdate stock',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * DELETE /api/nutrition/ingredients/:id
 * Menghapus bahan baku
 */
export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID bahan baku harus disertakan'
      });
    }

    console.log(`Deleting ingredient with ID: ${id}`);

    // Cek apakah bahan baku ada
    const { data: checkData } = await supabaseAdmin
      .from('bahan_baku')
      .select('id, name')
      .eq('id', id)
      .single();

    if (!checkData) {
      return res.status(404).json({
        success: false,
        message: 'Bahan baku tidak ditemukan'
      });
    }

    const { error } = await supabaseAdmin
      .from('bahan_baku')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error (deleteIngredient):', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus bahan baku',
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: `Bahan baku "${checkData.name}" berhasil dihapus`,
      deletedId: id
    });
  } catch (error) {
    console.error('Error in deleteIngredient:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus bahan baku',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * GET /api/nutrition/ingredients/stats/summary
 * Mendapatkan statistik bahan baku
 */
export const getIngredientsStats = async (req: Request, res: Response) => {
  try {
    console.log('Fetching ingredients statistics');

    // Get all ingredients
    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .select('*');

    if (error) {
      console.error('Supabase error (getIngredientsStats):', error);
      return res.status(500).json({
        success: false,
        message: 'Database error',
        error: error.message
      });
    }

    const ingredients = data || [];

    // Hitung statistik
    let totalStockValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    const categoryCounts: Record<string, number> = {};
    const unitCounts: Record<string, number> = {};

    ingredients.forEach(ingredient => {
      const stockQty = parseFloat(ingredient.stock_quantity || 0);
      const minStock = parseFloat(ingredient.min_stock_level || 0);

      // Hitung yang low stock
      if (stockQty < minStock) {
        lowStockCount++;
      }

      // Hitung yang out of stock
      if (stockQty <= 0) {
        outOfStockCount++;
      }

      // Hitung per kategori
      const category = ingredient.category || 'Unknown';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;

      // Hitung per unit
      const unit = ingredient.unit || 'Unknown';
      unitCounts[unit] = (unitCounts[unit] || 0) + 1;
    });

    // Kategori dengan jumlah terbanyak
    const topCategory = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 1)[0] || ['N/A', 0];

    return res.status(200).json({
      success: true,
      data: {
        totalIngredients: ingredients.length,
        totalStockValue,
        stockStatus: {
          lowStock: lowStockCount,
          outOfStock: outOfStockCount,
          adequateStock: ingredients.length - lowStockCount - outOfStockCount
        },
        categories: {
          total: Object.keys(categoryCounts).length,
          breakdown: categoryCounts,
          topCategory: {
            name: topCategory[0],
            count: topCategory[1]
          }
        },
        units: {
          total: Object.keys(unitCounts).length,
          breakdown: unitCounts
        },
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getIngredientsStats:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil statistik',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

/**
 * GET /api/nutrition/ingredients/categories
 * Mendapatkan daftar kategori unik
 */
export const getIngredientCategories = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .select('category')
      .order('category');

    if (error) {
      console.error('Supabase error (getIngredientCategories):', error);
      return res.status(500).json({
        success: false,
        message: 'Database error',
        error: error.message
      });
    }

    const uniqueCategories = [...new Set((data || []).map(item => item.category).filter(Boolean))];

    return res.status(200).json({
      success: true,
      data: uniqueCategories,
      count: uniqueCategories.length
    });
  } catch (error) {
    console.error('Error in getIngredientCategories:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil kategori',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

// ========== HELPER FUNCTIONS ==========

/**
 * Menentukan status stok berdasarkan quantity dan min stock level
 */
const getStockStatus = (stockQty: number, minStock: number): string => {
  if (stockQty <= 0) return 'OUT_OF_STOCK';
  if (stockQty < minStock) return 'LOW_STOCK';
  if (stockQty < minStock * 1.5) return 'MEDIUM_STOCK';
  return 'HIGH_STOCK';
};

/**
 * Format tanggal menjadi string yang readable
 */
const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '-';
  }
};

/**
 * Generate simple ID (untuk development)
 */
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// ========== RESEP ENDPOINTS (Jika ada tabel resep) ==========

/**
 * GET /api/nutrition/recipes
 * Mendapatkan semua resep
 */
export const getRecipes = async (req: Request, res: Response) => {
  try {
    // Jika tabel resep ada, sesuaikan dengan struktur database Anda
    const { data, error } = await supabaseAdmin
      .from('resep') // Ganti dengan nama tabel resep Anda
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error (getRecipes):', error);
      // Jika tabel tidak ada, kembalikan empty array
      if (error.code === '42P01') {
        return res.status(200).json({
          success: true,
          message: 'Tabel resep belum tersedia',
          data: [],
          count: 0
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error in getRecipes:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data resep',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

// ========== HEALTH CHECK ==========

/**
 * GET /api/nutrition/health
 * Health check endpoint
 */
export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Test database connection
    const { data, error } = await supabaseAdmin
      .from('bahan_baku')
      .select('count', { count: 'exact', head: true });

    const dbStatus = error ? 'DISCONNECTED' : 'CONNECTED';

    return res.status(200).json({
      success: true,
      service: 'Nutrition Management API',
      status: 'HEALTHY',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      endpoints: {
        ingredients: '/api/nutrition/ingredients',
        recipes: '/api/nutrition/recipes',
        stats: '/api/nutrition/stats',
        categories: '/api/nutrition/categories'
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      service: 'Nutrition Management API',
      status: 'UNHEALTHY',
      timestamp: new Date().toISOString(),
      database: 'DISCONNECTED',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};