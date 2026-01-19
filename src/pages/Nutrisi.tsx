import { Component } from 'react';

import type { ChangeEvent, FormEvent } from 'react';
import {
    Plus,
    Search,
    LayoutGrid,
    Apple,
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
    Trash2
} from 'lucide-react';




import TabelNutrisi from '../ui/tabelNutrisi';

interface NutritionItem {
    id: number;
    name: string;
    category: string;
    calories: number;
    protein: number;
    fiber: number;
    vitC: number;
    carbs: number;
    fat: number;
    price: string;
    status: string;
    rating: number;
    selected: boolean;
    image: string;
    description: string;
    stock?: number;
    tkpiCode?: string;
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
    viewMode: 'table' | 'bento';
    bentoGridSize: number;
    items: NutritionItem[];
    newItem: Partial<NutritionItem>;
    isCustomCategory: boolean;

    // NutriPlanner State
    menuCycle: MenuPlan[];
    selectedIngredients: NutritionItem[];
    targetAKG: { calories: number, protein: number };
}

export class Nutrisi extends Component<{}, State> {
    // Reference to file input if needed for camera integration


    categorySuggestions = ['Buah-buahan', 'Sayuran Hijau', 'Umbi-umbian', 'Kacang-kacangan', 'Biji-bijian'];

    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 'database',
            searchQuery: '',
            isModalOpen: false,
            viewMode: 'table',
            bentoGridSize: 4,
            items: [
                { id: 1, name: 'Pisang Ambon', category: 'Buah-buahan', calories: 89, protein: 1.1, fiber: 2.6, vitC: 8.7, carbs: 22.8, fat: 0.3, price: 'Rp 5.000', status: 'Segar', rating: 4.8, selected: false, image: 'https://images.unsplash.com/photo-1571771894821-ad99026.jpg?q=80&w=200&auto=format&fit=crop', description: 'Pisang lokal kualitas super', stock: 45, tkpiCode: 'BA001' },
                { id: 2, name: 'Stroberi Segar', category: 'Buah-buahan', calories: 33, protein: 0.7, fiber: 2.0, vitC: 58.8, carbs: 7.7, fat: 0.3, price: 'Rp 15.000', status: 'Segar', rating: 4.5, selected: false, image: 'https://images.unsplash.com/photo-1464961130338-3932245ca94f?q=80&w=200&auto=format&fit=crop', description: 'Stroberi petik langsung dari kebun', stock: 12, tkpiCode: 'BA002' },
                { id: 3, name: 'Brokoli Hijau', category: 'Sayuran Hijau', calories: 34, protein: 2.8, fiber: 2.6, vitC: 89.2, carbs: 6.6, fat: 0.4, price: 'Rp 8.000', status: 'Terbatas', rating: 4.7, selected: false, image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=200&auto=format&fit=crop', description: 'Sayuran organik tanpa pestisida', stock: 8, tkpiCode: 'BA003' },
            ],
            newItem: { category: 'Buah-buahan', status: 'Segar', rating: 5.0, image: '' },
            isCustomCategory: false,
            menuCycle: [
                { id: '1', day: 'Senin', meals: [{ type: 'Siang', menu: 'Nasi Ayam Serundeng + Sayur Asem', calories: 450 }] },
                { id: '2', day: 'Selasa', meals: [{ type: 'Siang', menu: 'Nasi Ikan Goreng + Tumis Kacang', calories: 420 }] },
            ],
            selectedIngredients: [],
            targetAKG: { calories: 2100, protein: 60 }
        };
    }

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({ searchQuery: e.target.value });
    toggleModal = () => this.setState(prev => ({ isModalOpen: !prev.isModalOpen }));

    handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prev => ({ newItem: { ...prev.newItem, [name]: value } }));
    };

    handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            this.setState(prev => ({ newItem: { ...prev.newItem, image: imageUrl } }));
        }
    };

    handleAddItem = (e: FormEvent) => {
        e.preventDefault();
        const { newItem, items } = this.state;
        const item: NutritionItem = {
            id: Date.now(),
            name: newItem.name || '',
            category: newItem.category || 'Lainnya',
            calories: Number(newItem.calories) || 0,
            protein: Number(newItem.protein) || 0,
            fiber: Number(newItem.fiber) || 0,
            vitC: Number(newItem.vitC) || 0,
            carbs: Number(newItem.carbs) || 0,
            fat: Number(newItem.fat) || 0,
            price: newItem.price || 'Rp 0',
            status: newItem.status || 'Segar',
            rating: 5.0,
            selected: false,
            image: newItem.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop',
            description: newItem.description || '',
            stock: Number(newItem.stock) || 0,
        };
        this.setState({
            items: [item, ...items],
            isModalOpen: false,
            newItem: { category: 'Buah-buahan', status: 'Segar', rating: 5.0, image: '' }
        });
    };

    handleToggleSelect = (id: number) => {
        this.setState(prev => ({
            items: prev.items.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
        }));
    };

    addToCalculator = (item: NutritionItem) => {
        this.setState(prev => ({ selectedIngredients: [...prev.selectedIngredients, item] }));
    };

    render() {
        const { activeTab, items, searchQuery, viewMode, bentoGridSize, selectedIngredients, targetAKG, menuCycle } = this.state;
        const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const currentCalories = selectedIngredients.reduce((acc, curr) => acc + curr.calories, 0);
        const currentProtein = selectedIngredients.reduce((acc, curr) => acc + curr.protein, 0);

        return (
            <div className="space-y-6 pb-20">
                {/* Header NutriPlanner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40" />
                    <div className="flex items-center gap-4 md:gap-6 relative z-10">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-600 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shrink-0">
                            <Apple size={24} className="md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">NutriPlanner MBG</h1>
                            <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1">Perencanaan Gizi & Siklus Menu</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <button onClick={() => alert("Mengekspor Label Nilai Gizi...")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                            <Tag size={16} /> <span className="hidden sm:inline">Export Label Gizi</span><span className="sm:hidden">Export</span>
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 w-full md:w-fit shadow-sm overflow-x-auto no-scrollbar gap-1">
                    {[
                        { id: 'database', label: 'Database', icon: <Database size={16} /> },
                        { id: 'planner', label: 'Siklus', icon: <Calendar size={16} /> },
                        { id: 'calculator', label: 'AKG', icon: <Calculator size={16} /> },
                        { id: 'tkpi', label: 'TKPI', icon: <FileText size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => this.setState({ activeTab: tab.id as any })}
                            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

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
                                    <div className="overflow-x-auto rounded-[28px] border border-slate-100 shadow-sm">
                                        <TabelNutrisi searchQuery={searchQuery} items={filteredItems} onToggleSelect={this.handleToggleSelect} onToggleSelectAll={() => { }} onDeleteSelected={() => { }} />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {filteredItems.map(item => (
                                            <div key={item.id} className="bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
                                                <div className="aspect-square rounded-xl md:rounded-2xl mb-4 overflow-hidden bg-slate-50 relative border border-slate-50">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.stock && item.stock < 10 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>Stok: {item.stock || 0}</span>
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
                                            {plan.meals.map((meal, idx) => (
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
                        {/* Nutrition Alert / Tip */}
                        <div className="bg-emerald-600 text-white rounded-[40px] p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><ChefHat size={80} /></div>
                            <h3 className="text-lg font-black tracking-tight flex items-center gap-2 mb-4"><AlertTriangle size={20} className="text-emerald-300" /> Cek Stok Kritis</h3>
                            <p className="text-xs text-emerald-100 leading-relaxed font-medium mb-6">3 Produk dalam rencana menu minggu ini hampir habis di gudang.</p>
                            <button onClick={() => alert("Mengarahkan ke halaman Inventory...")} className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Beli Stok Sekarang</button>
                        </div>

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
                                            {this.state.newItem.image ? (
                                                <>
                                                    <img src={this.state.newItem.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-white text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Ganti Foto</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-500">
                                                        <Upload size={32} />
                                                    </div>
                                                    <span className="text-xs font-bold">Upload Foto Lokal</span>
                                                    <span className="text-[10px]">JPG, PNG max 5MB</span>
                                                </div>
                                            )}
                                            <input type="file" accept="image/*" onChange={this.handleImageUpload} className="hidden" />
                                        </label>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</label>
                                            <div className="relative">
                                                <select name="category" onChange={this.handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 outline-none appearance-none focus:ring-4 focus:ring-emerald-50 cursor-pointer">
                                                    {this.categorySuggestions.map(c => <option key={c} value={c}>{c}</option>)}
                                                    <option value="Lauk Pauk">Lauk Pauk</option>
                                                    <option value="Makanan Pokok">Makanan Pokok</option>
                                                    <option value="Bumbu">Bumbu</option>
                                                </select>
                                                <Tag size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Stok</label>
                                            <select name="status" onChange={this.handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-50">
                                                <option value="Segar">Segar</option>
                                                <option value="Stok Lama">Stok Lama</option>
                                                <option value="Terbatas">Terbatas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Details */}
                                <div className="lg:col-span-8 flex flex-col gap-6">
                                    {/* Main Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Makanan</label>
                                            <input required name="name" onChange={this.handleInputChange} type="text" placeholder="Contoh: Ayam Goreng Mentega" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga / Unit</label>
                                                <input name="price" onChange={this.handleInputChange} type="text" placeholder="Rp 0" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stok Awal</label>
                                                <input name="stock" onChange={this.handleInputChange} type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-emerald-50 outline-none" />
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
                                                    { label: 'Lemak Total', name: 'fat', unit: 'g' },
                                                    { label: 'Serat Pangan', name: 'fiber', unit: 'g' },
                                                    { label: 'Vitamin C', name: 'vitC', unit: 'mg' },
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

export default Nutrisi;
