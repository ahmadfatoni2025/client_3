import React, { Component, type ChangeEvent, type FormEvent } from 'react';
import {
    Plus,
    Search,
    LayoutGrid,
    Layout,
    Tag,
    Upload,
    RefreshCcw,
    ChefHat,
    AlertTriangle,
    Download
} from 'lucide-react';
import TabelNutrisi from '../../ui/tabelNutrisi';
import type { NutritionItem } from '../../ui/tabelNutrisi';

interface State {
    searchQuery: string;
    isModalOpen: boolean;
    isEditing: boolean;
    currentItemId: string | null;
    viewMode: 'table' | 'bento';
    items: NutritionItem[];
    newItem: Partial<NutritionItem>;
    isLoading: boolean;
    error: string | null;
    imageFile: File | null;
}

export class NutrisiDashboard extends Component<{}, State> {
    categorySuggestions = ['Buah-buahan', 'Sayuran Hijau', 'Umbi-umbian', 'Kacang-kacangan', 'Biji-bijian'];

    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            isModalOpen: false,
            isEditing: false,
            currentItemId: null,
            viewMode: 'table',
            items: [],
            newItem: { category: 'Buah-buahan', status: 'Tersedia', img: '', protein: 0, carbs: 0, fats: 0, calories: 0 },
            isLoading: false,
            error: null,
            imageFile: null,
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = async () => {
        this.setState({ isLoading: true, error: null });
        try {
            const response = await fetch('http://localhost:5000/api/nutrition');
            const result = await response.json();

            if (result.success) {
                const formatted = result.data.map((item: any) => ({
                    ...item,
                    protein: item.protein || 0,
                    carbs: item.carbs || 0,
                    fats: item.fats || 0,
                    calories: item.calories || 0,
                    status: item.stock_quantity > 10 ? 'Tersedia' : item.stock_quantity > 0 ? 'Terbatas' : 'Habis',
                    selected: false
                }));
                this.setState({ items: formatted });
            }
            this.setState({ isLoading: false });
        } catch (err) {
            this.setState({ error: 'Gagal mengambil data', isLoading: false });
        }
    };

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({ searchQuery: e.target.value });

    toggleModal = () => {
        if (this.state.isModalOpen) {
            this.setState({
                isModalOpen: false,
                isEditing: false,
                currentItemId: null,
                newItem: { category: 'Buah-buahan', status: 'Tersedia', img: '', protein: 0, carbs: 0, fats: 0, calories: 0 },
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

    handleAddItem = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        const { newItem, isEditing, currentItemId } = this.state;

        const url = isEditing
            ? `http://localhost:5000/api/nutrition/ingredients/${currentItemId}`
            : 'http://localhost:5000/api/nutrition/ingredients';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            let currentImg = newItem.img;

            if (this.state.imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', this.state.imageFile);

                const uploadRes = await fetch('http://localhost:5000/api/inventory/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                const uploadResult = await uploadRes.json();
                if (uploadResult.success) {
                    currentImg = uploadResult.url;
                } else {
                    throw new Error('Gagal mengupload gambar');
                }
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newItem, img: currentImg })
            });
            const result = await response.json();
            if (result.success) {
                this.toggleModal();
                this.fetchItems();
            } else {
                alert('Gagal menyimpan: ' + result.message);
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
            newItem: { ...item }
        });
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

    render() {
        const { items, searchQuery, viewMode, isModalOpen, isEditing, newItem, isLoading } = this.state;
        const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-700">
                <div className="lg:col-span-3 space-y-6">
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
                            {isLoading && (
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
                                onEdit={this.handleEdit}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {filteredItems.map(item => (
                                <div key={item.id} className="bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
                                    <div className="aspect-square rounded-xl md:rounded-2xl mb-4 overflow-hidden bg-slate-50 relative border border-slate-50">
                                        <img src={item.img || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop'} alt={item.name} className="w-full h-full object-cover" />
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

                <div className="space-y-6">
                    <div className="bg-emerald-600 text-white rounded-[40px] p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><ChefHat size={80} /></div>
                        <h3 className="text-lg font-black tracking-tight flex items-center gap-2 mb-4"><AlertTriangle size={20} className="text-emerald-300" /> Cek Stok Kritis</h3>
                        <p className="text-xs text-emerald-100 leading-relaxed font-medium mb-6">Produk hampir habis di gudang, Segera lakukan pengadaan.</p>
                        <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Beli Stok Sekarang</button>
                    </div>

                    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Nutri Overview</h4>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Total Database Lokal</p>
                                <h5 className="text-lg font-black text-slate-900">{items.length} Komoditas</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-3xl overflow-hidden border border-slate-100 my-8">
                            <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">{isEditing ? 'Edit Bahan Makanan' : 'Input Bahan Makanan Baru'}</h2>
                                    <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mt-1">Database Gizi Lokal MBG</p>
                                </div>
                                <button onClick={this.toggleModal} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={this.handleAddItem} className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-4 space-y-6">
                                    <label className="block aspect-square rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer overflow-hidden relative group">
                                        {newItem.img ? (
                                            <img src={newItem.img} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                                <Upload size={32} />
                                                <span className="text-xs font-bold">Upload Foto</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={this.handleImageUpload} className="hidden" />
                                    </label>
                                    <div className="space-y-4">
                                        <select name="category" value={newItem.category} onChange={this.handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold">
                                            {this.categorySuggestions.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="lg:col-span-8 flex flex-col gap-6">
                                    <input required name="name" value={newItem.name || ''} onChange={this.handleInputChange} type="text" placeholder="Nama Makanan" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="calories" value={newItem.calories || ''} onChange={this.handleInputChange} type="number" placeholder="Kalori" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold" />
                                        <input name="protein" value={newItem.protein || ''} onChange={this.handleInputChange} type="number" placeholder="Protein" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold" />
                                    </div>
                                    <div className="flex gap-4 mt-auto">
                                        <button type="button" onClick={this.toggleModal} className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase">Batal</button>
                                        <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase">Simpan Data</button>
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

export default NutrisiDashboard;
const X = ({ size, className }: { size: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
