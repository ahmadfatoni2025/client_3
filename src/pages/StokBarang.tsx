import { Component } from 'react';
import { Search, Filter, Download, Plus, LayoutGrid, List, X, Loader2, Save, } from 'lucide-react';
import TabelInventory from '../ui/tabelInventory';

interface State {
    searchQuery: string;
    viewMode: 'grid' | 'table';
    isModalOpen: boolean;
    isEditing: boolean;
    isLoading: boolean;
    currentItemId: string | null;
    formData: {
        name: string;
        sku: string;
        category: string;
        calories: string;
        price: string;
        stock_quantity: string;
        unit: string;
        img: string;
    };
    imageFile: File | null;
    imagePreview: string | null;
}

export class StokBarang extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            viewMode: 'table',
            isModalOpen: false,
            isEditing: false,
            isLoading: false,
            currentItemId: null,
            formData: {
                name: '',
                sku: '',
                category: '',
                calories: '',
                price: '',
                stock_quantity: '',
                unit: 'kg',
                img: ''
            },
            imageFile: null,
            imagePreview: null
        };
    }

    resetForm = () => {
        this.setState({
            formData: {
                name: '',
                sku: '',
                category: '',
                calories: '',
                price: '',
                stock_quantity: '',
                unit: 'kg',
                img: ''
            },
            isEditing: false,
            currentItemId: null,
            imageFile: null,
            imagePreview: null
        });
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('Ukuran file maksimal 2MB');
                    return;
                }
                this.setState({
                    imageFile: file,
                    imagePreview: URL.createObjectURL(file)
                });
            }
            return;
        }

        this.setState(prevState => ({
            formData: { ...prevState.formData, [name]: value }
        }));
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ isLoading: true });

        const { isEditing, currentItemId, formData } = this.state;
        const url = isEditing
            ? `http://localhost:5000/api/inventory/${currentItemId}`
            : 'http://localhost:5000/api/inventory';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            let currentImg = formData.img;

            // 1. Upload Gambar jika ada file baru
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

            const body = {
                ...formData,
                img: currentImg,
                price: formData.price === '' ? 0 : parseFloat(formData.price),
                calories: formData.calories === '' ? 0 : parseFloat(formData.calories),
                stock_quantity: formData.stock_quantity === '' ? 0 : parseFloat(formData.stock_quantity)
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await response.json().catch(() => ({ success: false, message: 'Server returning invalid JSON' }));

            if (response.ok && result.success) {
                this.setState({ isModalOpen: false, isLoading: false });
                this.resetForm();
                window.location.reload();
            } else {
                alert(`Gagal menyimpan data: ${result.message || result.error || 'Unknown Error'}`);
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error('Error saving:', error);
            alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Koneksi ke server terputus'}`);
            this.setState({ isLoading: false });
        }
    }

    handleEdit = (item: any) => {
        this.setState({
            isModalOpen: true,
            isEditing: true,
            currentItemId: item.id,
            formData: {
                name: item.name || '',
                sku: item.sku || '',
                category: item.category || '',
                calories: item.calories?.toString() || '',
                price: item.price?.toString() || '',
                stock_quantity: item.stock_quantity?.toString() || '',
                unit: item.unit || 'kg',
                img: item.img || ''
            },
            imagePreview: item.img || null,
            imageFile: null
        });
    }

    render() {
        const { searchQuery, viewMode, isModalOpen, isEditing, formData, isLoading } = this.state;

        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Stok Barang</h1>
                        <p className="text-sm font-medium text-slate-400">Manajemen inventaris dan pelacakan stok produk real-time.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { this.resetForm(); this.setState({ isModalOpen: true, isEditing: false }); }}
                            className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <Plus size={16} /> Tambah Barang
                        </button>
                    </div>
                </header>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama produk atau SKU..."
                                className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                                <Filter size={18} />
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                                <Download size={18} />
                            </button>
                            <div className="w-px h-8 bg-slate-100 mx-2" />
                            <div className="bg-slate-50 p-1 rounded-xl flex items-center gap-1">
                                <button
                                    onClick={() => this.setState({ viewMode: 'grid' })}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => this.setState({ viewMode: 'table' })}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <TabelInventory searchQuery={searchQuery} onEdit={this.handleEdit} />
                </div>


                {/* CRUD Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-slate-200">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                    {isEditing ? 'Edit Data Barang' : 'Tambah Barang Baru'}
                                </h2>
                                <button
                                    onClick={() => { this.setState({ isModalOpen: false }); this.resetForm(); }}
                                    className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Produk</label>
                                        <input required name="name" value={formData.name} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="Contoh: Beras Mentik Wangi" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">SKU Code</label>
                                        <input required name="sku" value={formData.sku} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="MBG-200X" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kategori</label>
                                        <input required name="category" value={formData.category} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="Sembako" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Harga Satuan</label>
                                        <input required name="price" type="number" value={formData.price} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Kalori (kcal)</label>
                                        <input required name="calories" type="number" value={formData.calories} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Stok Awal</label>
                                        <input required name="stock_quantity" type="number" value={formData.stock_quantity} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="0" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Foto Produk (Max 2MB)</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative group">
                                                {this.state.imagePreview ? (
                                                    <img src={this.state.imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                                ) : (
                                                    <Plus size={24} className="text-slate-300" />
                                                )}
                                                <input type="file" name="image" onChange={this.handleInputChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                            </div>
                                            <p className="text-[11px] text-slate-400 font-medium">Klik kotak untuk {this.state.imagePreview ? 'ganti' : 'pilih'} foto produk.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit</label>
                                        <select name="unit" value={formData.unit} onChange={this.handleInputChange} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                                            <option value="kg">kilogram (kg)</option>
                                            <option value="L">Liter (L)</option>
                                            <option value="butir">Butir</option>
                                            <option value="pcs">Pcs</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 bg-emerald-600 py-4 rounded-[20px] text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        {isEditing ? 'Simpan Perubahan' : 'Tambahkan Barang'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default StokBarang;

