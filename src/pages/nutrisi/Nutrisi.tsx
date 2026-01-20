import { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react';
import {
    Plus,
    Search,
    LayoutGrid,
    X,
    Layout,
    Calculator,
    Calendar,
    RefreshCcw,
    Database,
    Tag,
    Download,
    AlertTriangle,
    FileText,
    ChefHat,
    Upload,
    Check,
    Trash2,
    Edit3,
    Image as ImageIcon
} from 'lucide-react';

export interface NutritionItem {
    id: string;
    name: string;
    sku?: string;
    category: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    unit?: string;
    stock_quantity?: number;
    status: string;
    selected: boolean;
    img?: string;
    description?: string;
    price?: number;
    min_stock_level?: number;
}

interface TabelNutrisiProps {
    searchQuery: string;
    items: NutritionItem[];
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
    onDeleteSelected: () => void;
    onDelete: (id: string) => void;
    onEdit?: (item: NutritionItem) => void;
}

class TabelNutrisi extends Component<TabelNutrisiProps> {
    render() {
        const { items, onToggleSelect, onToggleSelectAll, onDeleteSelected, onDelete } = this.props;
        const selectedCount = items.filter(item => item.selected).length;
        const isAllSelected = items.length > 0 && items.every(item => item.selected);

        return (
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden relative min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="px-6 py-6 w-10 text-center">
                                <button
                                    onClick={onToggleSelectAll}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isAllSelected ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 bg-white hover:border-emerald-300'}`}
                                >
                                    {isAllSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                                </button>
                            </th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Visual</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Bahan & Nutrisi Utama</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Protein</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Karbo</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Lemak</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Kalori</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status Stok</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right pr-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {items.map((item) => (
                            <tr key={item.id} className={`group hover:bg-slate-50/50 transition-all ${item.selected ? 'bg-emerald-50/30' : ''}`}>
                                <td className="px-6 py-5 relative">
                                    {item.selected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => onToggleSelect(item.id)}
                                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${item.selected ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 bg-white group-hover:border-emerald-300'}`}
                                        >
                                            {item.selected && <Check size={14} className="text-white" strokeWidth={4} />}
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm relative group-hover:scale-105 transition-transform">
                                        {item.img ? (
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ImageIcon size={24} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[15px] font-black text-slate-800 tracking-tight">{item.name}</p>
                                        </div>
                                        <p className="text-[12px] text-slate-400 font-medium line-clamp-1">{item.description || 'Tidak ada keterangan tambahan.'}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.protein} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">gr</span></td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.carbs} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">gr</span></td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.fats} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">gr</span></td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.calories} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">kkal</span></td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${item.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        item.status === 'Habis' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            'bg-amber-50 text-amber-600 border border-amber-100'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right pr-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => this.props.onEdit && this.props.onEdit(item)}
                                            className="p-2 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 transition-all bg-slate-50 rounded-xl"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all bg-slate-50 rounded-xl"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                {items.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <Search size={32} className="text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Belum ada data nutrisi ditemukan</p>
                    </div>
                )}

                {/* Floating Action Bar */}
                {selectedCount > 0 && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 shadow-2xl shadow-slate-900/40 px-6 py-4 rounded-[28px] z-50 border border-white/10 animate-in zoom-in slide-in-from-bottom-8">
                        <span className="text-[14px] font-black text-white border-r border-slate-700 pr-6 mr-2">
                            {selectedCount} Terpilih
                        </span>

                        <button
                            onClick={onDeleteSelected}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-2xl text-[13px] font-black text-white transition-all shadow-lg active:scale-95"
                        >
                            <Trash2 size={18} /> Hapus Terpilih
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

interface MenuPlan {
    id: string;
    day: string;
    meals: { type: 'Pagi' | 'Siang' | 'Sore', menu: string, calories: number }[];
}

interface State {
    activeTab: 'database' | 'planner' | 'calculator' | 'tkpi';
    searchQuery: string;
    isModalOpen: boolean;
    isEditing: boolean;
    currentItemId: string | null;
    viewMode: 'table' | 'bento';
    bentoGridSize: number;
    items: NutritionItem[];
    newItem: Partial<NutritionItem>;
    isCustomCategory: boolean;
    isLoading: boolean;
    error: string | null;

    imageFile: File | null;

    // NutriPlanner State
    menuCycle: MenuPlan[];
    selectedIngredients: NutritionItem[];
    targetAKG: { calories: number, protein: number };
}

interface NutrisiProps {
    navigate: (path: string) => void;
    location: { pathname: string };
}

class Nutrisi extends Component<NutrisiProps, State> {
    categorySuggestions = ['Buah-buahan', 'Sayuran Hijau', 'Umbi-umbian', 'Kacang-kacangan', 'Biji-bijian'];

    handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran file maksimal 2MB');
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            this.setState(prev => ({
                newItem: { ...prev.newItem, img: imageUrl },
                imageFile: file
            }));
        }
    };
    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 'database',
            searchQuery: '',
            isModalOpen: false,
            isEditing: false,
            currentItemId: null,
            viewMode: 'table',
            bentoGridSize: 4,
            items: [],
            newItem: { category: 'Buah-buahan', status: 'Tersedia', img: '', protein: 0, carbs: 0, fats: 0, calories: 0 },
            isCustomCategory: false,
            isLoading: false,
            error: null,
            imageFile: null,
            menuCycle: [
                { id: '1', day: 'Senin', meals: [{ type: 'Siang', menu: 'Nasi Ayam Serundeng + Sayur Asem', calories: 450 }] },
                { id: '2', day: 'Selasa', meals: [{ type: 'Siang', menu: 'Nasi Ikan Goreng + Tumis Kacang', calories: 420 }] },
            ],
            selectedIngredients: [],
            targetAKG: { calories: 2100, protein: 60 }
        };
    }

    componentDidMount() {
        this.syncTabWithUrl();
        this.fetchItems();
        this.fetchStats();
    }

    componentDidUpdate(prevProps: NutrisiProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.syncTabWithUrl();
        }
    }

    syncTabWithUrl = () => {
        const path = this.props.location.pathname;
        let tab: any = 'database';
        if (path.includes('/siklus')) tab = 'planner';
        else if (path.includes('/akg')) tab = 'calculator';
        else if (path.includes('/tkpi')) tab = 'tkpi';

        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    handleTabChange = (tabId: string) => {
        let path = '/nutrisi';
        if (tabId === 'planner') path = '/nutrisi/siklus';
        if (tabId === 'calculator') path = '/nutrisi/akg';
        if (tabId === 'tkpi') path = '/nutrisi/tkpi';
        this.props.navigate(path);
    };

    fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/nutrition/ingredients/stats/summary');
            const result = await response.json();
            if (result.success) {
                // You can add state for stats if you want to display dynamic summary
                // For now we just log it or we could bind it to the summary view
                // this.setState({ stats: result.data }); 
                console.log("Stats loaded:", result.data);
            }
        } catch (err) {
            console.error("Failed to load stats", err);
        }
    }

    fetchItems = async () => {
        this.setState({ isLoading: true, error: null });
        try {
            // Using a high limit to get all items for the table as per current UI design
            // In a real app with thousands of items, you'd want server-side pagination.
            const response = await fetch('http://localhost:5000/api/nutrition/ingredients?limit=100');
            const result = await response.json();

            if (result.success) {
                const formatted = result.data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    sku: item.sku,
                    category: item.category,
                    unit: item.unit,

                    // Nutrition info
                    calories: Number(item.calories) || 0,
                    protein: Number(item.protein) || 0,
                    carbs: Number(item.carbs) || 0,
                    fats: Number(item.fats) || 0,

                    // Specific fields
                    stock_quantity: Number(item.stock_quantity) || 0,
                    min_stock_level: Number(item.min_stock_level) || 0,
                    status: this.getStockStatusLabel(Number(item.stock_quantity), Number(item.min_stock_level)),

                    img: item.img,
                    description: item.description,
                    selected: false
                }));
                this.setState({ items: formatted, isLoading: false });
            } else {
                throw new Error(result.message);
            }
        } catch (err) {
            this.setState({ error: 'Gagal mengambil data', isLoading: false });
            console.error(err);
        }
    };

    getStockStatusLabel = (qty: number, min: number) => {
        if (qty <= 0) return 'Habis';
        if (qty < min) return 'Hampir Habis'; // Or 'Terbatas'
        return 'Tersedia';
    };

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({ searchQuery: e.target.value });

    toggleModal = () => {
        if (this.state.isModalOpen) {
            this.setState({
                isModalOpen: false,
                isEditing: false,
                currentItemId: null,
                newItem: {
                    category: 'Buah-buahan',
                    status: 'Tersedia',
                    img: '',
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    calories: 0,
                    unit: 'kg',
                    stock_quantity: 0,
                    name: '',
                    sku: '',
                    min_stock_level: 5
                },
                imageFile: null
            });
        } else {
            this.setState({ isModalOpen: true });
        }
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prev => ({ newItem: { ...prev.newItem, [name]: value } }));
    };

    handleAddItem = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        const { newItem, isEditing, currentItemId, imageFile } = this.state;

        // Helper to convert file to base64
        const fileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        };

        let finalImg = newItem.img;

        try {
            // If there is an image file selected, convert it to Base64
            if (imageFile) {
                try {
                    finalImg = await fileToBase64(imageFile);
                } catch (err) {
                    console.error("Error converting image to base64", err);
                    alert("Gagal memproses gambar. Gambar mungkin tidak tersimpan.");
                }
            }

            // Ensure numeric values are numbers
            const payload = {
                ...newItem,
                img: finalImg,
                calories: Number(newItem.calories),
                protein: Number(newItem.protein),
                carbs: Number(newItem.carbs),
                fats: Number(newItem.fats),
                stock_quantity: Number(newItem.stock_quantity),
                min_stock_level: Number(newItem.min_stock_level) || 5
            };

            const url = isEditing
                ? `http://localhost:5000/api/nutrition/ingredients/${currentItemId}`
                : 'http://localhost:5000/api/nutrition/ingredients';
            const method = isEditing ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.success) {
                this.toggleModal();
                this.fetchItems();
                this.fetchStats(); // Refresh stats
            } else {
                alert('Gagal menyimpan: ' + result.message);
                if (result.errors) {
                    console.error("Validation errors:", result.errors);
                }
            }
        } catch (err) {
            alert('Terjadi kesalahan: ' + (err instanceof Error ? err.message : 'Koneksi terputus'));
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleEdit = (item: NutritionItem) => {
        this.setState({
            isModalOpen: true,
            isEditing: true,
            currentItemId: item.id,
            // Map item back to form state
            newItem: {
                ...item,
                // Ensure we map specific fields if they differ
            }
        });
    };

    handleDelete = async (id: string) => {
        if (!confirm('Apakah anda yakin ingin menghapus item ini?')) return;

        this.setState({ isLoading: true });
        try {
            await fetch(`http://localhost:5000/api/nutrition/ingredients/${id}`, { method: 'DELETE' });
            this.fetchItems();
            this.fetchStats();
        } catch (err) {
            alert('Gagal menghapus');
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleDeleteSelected = async () => {
        const selectedIds = this.state.items.filter(i => i.selected).map(i => i.id);
        if (selectedIds.length === 0) return;
        if (!confirm(`Hapus ${selectedIds.length} item?`)) return;

        this.setState({ isLoading: true });
        try {
            for (const id of selectedIds) {
                await fetch(`http://localhost:5000/api/nutrition/ingredients/${id}`, { method: 'DELETE' });
            }
            this.fetchItems();
            this.fetchStats(); // Refresh stats
        } catch (err) {
            alert('Gagal menghapus');
        } finally {
            this.setState({ isLoading: false });
        }
    };


    handleToggleSelect = (id: string) => {
        this.setState(prev => ({
            items: prev.items.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
        }));
    };

    addToCalculator = (item: NutritionItem) => {
        this.setState(prev => ({ selectedIngredients: [...prev.selectedIngredients, item] }));
    };

    render() {
        const { activeTab, items, searchQuery, viewMode, selectedIngredients, targetAKG, menuCycle } = this.state;
        const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const currentCalories = selectedIngredients.reduce((acc, curr) => acc + curr.calories, 0);
        const currentProtein = selectedIngredients.reduce((acc, curr) => acc + curr.protein, 0);

        return (
            <div className="space-y-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        {activeTab === 'database' && (
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm gap-4">
                                    <div className="relative w-full md:w-80">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Cari bahan makanan..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                                            value={searchQuery}
                                            onChange={this.handleSearchChange}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={this.toggleModal} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-100">Tambah Bahan</button>
                                        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                                            <button onClick={() => this.setState({ viewMode: 'table' })} className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}><LayoutGrid size={18} /></button>
                                            <button onClick={() => this.setState({ viewMode: 'bento' })} className={`p-2 rounded-lg ${viewMode === 'bento' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}><Layout size={18} /></button>
                                        </div>
                                    </div>
                                </div>

                                {viewMode === 'table' ? (
                                    <div className="overflow-x-auto rounded-[28px] border border-slate-100 shadow-sm relative">
                                        {this.state.isLoading && (
                                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                                <RefreshCcw className="animate-spin text-emerald-500" size={32} />
                                            </div>
                                        )}
                                        <TabelNutrisi
                                            searchQuery={searchQuery}
                                            items={filteredItems}
                                            onToggleSelect={this.handleToggleSelect}
                                            onToggleSelectAll={() => {
                                                const allSelected = filteredItems.length > 0 && filteredItems.every(i => i.selected);
                                                this.setState({ items: this.state.items.map(i => ({ ...i, selected: !allSelected })) });
                                            }}
                                            onDeleteSelected={this.handleDeleteSelected}
                                            onDelete={this.handleDelete}
                                            onEdit={this.handleEdit}
                                        />
                                    </div>

                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {filteredItems.map(item => (
                                            <div key={item.id} className="bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
                                                <div className="aspect-square rounded-xl md:rounded-2xl mb-4 overflow-hidden bg-slate-50 relative border border-slate-50">
                                                    <img src={item.img || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop'} alt={item.name} className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => this.addToCalculator(item)}
                                                        className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all active:scale-90"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <h4 className="font-black text-slate-800 text-sm">{item.name}</h4>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase">{item.calories} kkal</span>
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.stock_quantity && item.stock_quantity < 10 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>Stok: {item.stock_quantity || 0}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'planner' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Penyusunan Siklus Menu</h3>
                                    <div className="flex gap-2">
                                        <button className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600">Mingguan</button>
                                        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Bulanan</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {menuCycle.map(plan => (
                                        <div key={plan.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-lg font-black text-slate-800 underline decoration-emerald-500 decoration-4 underline-offset-4">{plan.day}</h4>
                                                <button className="text-[10px] font-black text-emerald-600 uppercase">Input Menu</button>
                                            </div>
                                            {plan.meals.map((meal: any, idx: number) => (
                                                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{meal.type}</p>
                                                    <p className="text-sm font-black text-slate-800">{meal.menu}</p>
                                                    <div className="flex items-center gap-4 mt-3">
                                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{meal.calories} kkal</span>
                                                        <button onClick={() => alert("Smart Substitution: Mencari pengganti bahan...")} className="flex items-center gap-1 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors"><RefreshCcw size={10} /> Substitusi</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <button className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                                        <Plus size={32} />
                                        <span className="text-xs font-black uppercase tracking-widest">Tambah Hari Cycle</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'calculator' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Kalkulator Gizi Harian (AKG)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Target Nutrisi Harian</p>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2"><span className="text-xs font-black uppercase">Calories</span><span className="text-xs font-black">{currentCalories} / {targetAKG.calories} kkal</span></div>
                                                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                    <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(currentCalories / targetAKG.calories) * 100}%` }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-2"><span className="text-xs font-black uppercase">Protein</span><span className="text-xs font-black">{currentProtein} / {targetAKG.protein} g</span></div>
                                                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                    <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(currentProtein / targetAKG.protein) * 100}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Analaisis Komposisi</p>
                                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                            {selectedIngredients.length > 0 ? selectedIngredients.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center text-xs">
                                                    <span className="font-bold text-slate-700">{item.name}</span>
                                                    <button onClick={() => this.setState({ selectedIngredients: selectedIngredients.filter((_, idx) => idx !== i) })} className="text-slate-300 hover:text-red-500"><X size={14} /></button>
                                                </div>
                                            )) : <p className="text-xs text-slate-400 italic text-center py-8">Pilih bahan makanan di Database untuk mulai kalkulasi</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tkpi' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Database TKPI (Kemenkes)</h3>
                                <div className="space-y-4">
                                    {[
                                        { code: 'A:S001', name: 'Beras Giling Masak (Nasi)', cal: 130, pro: 2.7, fat: 0.3 },
                                        { code: 'A:S002', name: 'Jagung Kuning Pipil Masak', cal: 150, pro: 4.5, fat: 1.2 },
                                        { code: 'B:U001', name: 'Ubi Jalar Merah Kukus', cal: 112, pro: 1.1, fat: 0.1 },
                                    ].map((tkpi, i) => (
                                        <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:bg-slate-900 hover:text-white transition-all">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-black px-2 py-1 bg-white/10 border border-slate-200 rounded-lg group-hover:border-white/20">{tkpi.code}</span>
                                                <h4 className="font-black text-sm">{tkpi.name}</h4>
                                            </div>
                                            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
                                                <span>Cal: {tkpi.cal}</span>
                                                <span>Pro: {tkpi.pro}g</span>
                                                <span>Fat: {tkpi.fat}g</span>
                                                <button onClick={() => alert(`Mengimpor ${tkpi.name} ke Database Lokal...`)} className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Import</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">


                        {/* Summary Stats */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Nutri Overview</h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Cycle Menu Berjalan</p>
                                    <h5 className="text-lg font-black text-slate-900">14 Hari Siklus</h5>
                                </div>
                                <div className="pt-6 border-t border-slate-50">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Total Database Lokal</p>
                                    <h5 className="text-lg font-black text-slate-900">{items.length} Komoditas</h5>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="px-2">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">Aktivitas Terakhir <Download size={14} /></h4>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-[11px] font-bold text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                                    <p>Export label Gizi Menu A-101 (PDF)</p>
                                </div>
                                <div className="flex gap-3 text-[11px] font-bold text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1" />
                                    <p>Update Database TKPI Ver 2.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Data Modal */}
                {this.state.isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-3xl overflow-hidden border border-slate-100 my-8">
                            <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Input Bahan Makanan Baru</h2>
                                    <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mt-1">Database Gizi Lokal MBG</p>
                                </div>
                                <button onClick={this.toggleModal} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={this.handleAddItem} className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column: Image & Basic Info */}
                                <div className="lg:col-span-4 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Foto Produk</label>
                                        <label className="block aspect-square rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer overflow-hidden relative group">
                                            {this.state.newItem.img ? (
                                                <>
                                                    <img src={this.state.newItem.img} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-white text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Ganti Foto</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-500">
                                                        <Upload size={32} />
                                                    </div>
                                                    <span className="text-xs font-bold">Upload Foto Lokal (Max 2MB)</span>
                                                    <span className="text-[10px]">JPG, PNG max 2MB</span>
                                                </div>
                                            )}
                                            <input type="file" accept="image/*" onChange={this.handleImageUpload} className="hidden" />
                                        </label>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</label>
                                            <div className="relative">
                                                <select name="category" value={this.state.newItem.category} onChange={this.handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 outline-none appearance-none focus:ring-4 focus:ring-emerald-50 cursor-pointer">
                                                    {this.categorySuggestions.map(c => <option key={c} value={c}>{c}</option>)}
                                                    <option value="Lauk Pauk">Lauk Pauk</option>
                                                    <option value="Makanan Pokok">Makanan Pokok</option>
                                                    <option value="Bumbu">Bumbu</option>
                                                </select>
                                                <Tag size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Replaced Status with Unit */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satuan (Unit)</label>
                                            <input
                                                name="unit"
                                                value={this.state.newItem.unit || ''}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="Contoh: kg, gr, pcs, ikat"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Link Foto (Opsional)</label>
                                            <input
                                                name="img"
                                                value={this.state.newItem.img || ''}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="https://..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Details */}
                                <div className="lg:col-span-8 flex flex-col gap-6">
                                    {/* Main Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Makanan</label>
                                            <input required name="name" value={this.state.newItem.name || ''} onChange={this.handleInputChange} type="text" placeholder="Contoh: Ayam Goreng Mentega" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU / Kode</label>
                                                <input name="sku" value={this.state.newItem.sku || ''} onChange={this.handleInputChange} type="text" placeholder="MBG-XXX" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stok Awal</label>
                                                <input name="stock_quantity" value={this.state.newItem.stock_quantity || ''} onChange={this.handleInputChange} type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. Stok</label>
                                                <input name="min_stock_level" value={this.state.newItem.min_stock_level || ''} onChange={this.handleInputChange} type="number" placeholder="5" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nutrition Section Table */}
                                    <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                                        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Calculator size={16} /></div>
                                                <h4 className="font-black text-slate-900 text-sm">Informasi Nilai Gizi</h4>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400">Per 100 gram</span>
                                        </div>

                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                                    <th className="px-6 py-3">Jenis Gizi</th>
                                                    <th className="px-6 py-3 w-32">Jumlah</th>
                                                    <th className="px-6 py-3 w-24">Satuan</th>
                                                    <th className="px-4 py-3 w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {[
                                                    { label: 'Energi / Kalori', name: 'calories', unit: 'kkal' },
                                                    { label: 'Protein', name: 'protein', unit: 'g' },
                                                    { label: 'Karbohidrat', name: 'carbs', unit: 'g' },
                                                    { label: 'Lemak Total', name: 'fats', unit: 'g' },
                                                ].map((row) => (
                                                    <tr key={row.name} className="group hover:bg-slate-50 transition-colors">
                                                        <td className="px-6 py-2">
                                                            <input
                                                                type="text"
                                                                value={row.label}
                                                                readOnly
                                                                className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none cursor-default"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-2">
                                                            <input
                                                                name={row.name}
                                                                value={(this.state.newItem as any)[row.name] || ''}
                                                                onChange={this.handleInputChange}
                                                                type="number"
                                                                step="0.1"
                                                                placeholder="0"
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-2">
                                                            <span className="text-xs font-bold text-slate-400">{row.unit}</span>
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {/* Core fields are fixed for now to maintain integrity */}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* Placeholder for dynamic rows if implemented later */}
                                                <tr className="group hover:bg-slate-50 transition-colors border-t-2 border-dashed border-slate-100">
                                                    <td className="px-6 py-3">
                                                        <input type="text" placeholder="Entri Kustom..." className="w-full bg-transparent text-sm font-medium text-slate-400 italic outline-none" disabled />
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <input type="number" disabled className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-3 py-1.5 text-sm font-bold disabled:opacity-50" />
                                                    </td>
                                                    <td className="px-6 py-3 text-slate-300">-</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button type="button" onClick={() => alert("Fitur tambah baris kustom akan hadir di update berikutnya.")} className="p-1.5 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                                                            <Plus size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan / Deskripsi</label>
                                        <textarea name="description" onChange={this.handleInputChange} rows={3} placeholder="Tambahkan catatan nutrisi atau detail pemasok..." className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none resize-none transition-all"></textarea>
                                    </div>

                                    <div className="flex gap-4 mt-auto pt-4 border-t border-slate-50">
                                        <button type="button" onClick={this.toggleModal} className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Batal</button>
                                        <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 hover:shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all">Simpan Data Nutrisi</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function NutrisiWrapper(props: any) {
    const navigate = useNavigate();
    const location = useLocation();
    return <Nutrisi {...props} navigate={navigate} location={location} />;
}

export default NutrisiWrapper;
