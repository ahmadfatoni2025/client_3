import { Component } from 'react'
import { Plus, MoreHorizontal, Check, Trash2, Edit3, Tag, Search, Filter, Download, Loader2, AlertCircle } from 'lucide-react';

interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    stock_quantity: number;
    unit: string;
    price: string;
    sales: string;
    revenue: string;
    status: string;
    selected: boolean;
    img?: string;
}

interface Props {
    searchQuery: string;
    onEdit?: (item: any) => void;
}

interface State {
    items: InventoryItem[];
    loading: boolean;
    error: string | null;
}

export class TabelInventory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchInventory();
    }

    fetchInventory = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:5000/api/inventory');
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }
            const result = await response.json();

            if (result.success) {
                const formattedData = result.data.map((item: any) => ({
                    ...item,
                    sku: item.sku || `MBG-${2000 + item.id}`,
                    stock_quantity: item.stock_quantity || 0,
                    unit: item.unit || 'unit',
                    price: item.price ? `Rp ${item.price.toLocaleString()}` : 'Rp 0',
                    sales: item.sales_count || '0',
                    revenue: item.total_revenue ? `Rp ${item.total_revenue.toLocaleString()}` : 'Rp 0',
                    status: this.calculateStatus(item.stock_quantity),
                    selected: false
                }));

                this.setState({ items: formattedData, loading: false });
            } else {
                this.setState({ error: result.message || 'Terjadi kesalahan sistem', loading: false });
            }
        } catch (error) {
            this.setState({
                error: error instanceof Error ? error.message : 'Gagal terhubung ke backend',
                loading: false
            });
        }
    }

    calculateStatus = (stock: number) => {
        if (stock <= 0) return 'Habis';
        if (stock < 20) return 'Hampir Habis';
        return 'Tersedia';
    }

    toggleSelect = (id: string) => {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        }));
    }

    toggleSelectAll = () => {
        const allSelected = this.state.items.length > 0 && this.state.items.every(item => item.selected);
        this.setState(prevState => ({
            items: prevState.items.map(item => ({ ...item, selected: !allSelected }))
        }));
    }

    deleteSelected = async () => {
        const selectedItems = this.state.items.filter(i => i.selected);
        if (selectedItems.length === 0) return;

        if (confirm(`Hapus ${selectedItems.length} item yang dipilih?`)) {
            this.setState({ loading: true });
            try {
                for (const item of selectedItems) {
                    await fetch(`http://localhost:5000/api/inventory/${item.id}`, {
                        method: 'DELETE'
                    });
                }
                await this.fetchInventory();
            } catch (error) {
                console.error('Error deleting items:', error);
                alert('Gagal menghapus beberapa item');
                this.setState({ loading: false });
            }
        }
    }


    handleEdit = () => {
        const selected = this.state.items.filter(i => i.selected);
        if (selected.length === 1 && this.props.onEdit) {
            this.props.onEdit(selected[0]);
        } else if (selected.length > 1) {
            alert(`Batch edit belum didukung. Pilih 1 item untuk mengedit.`);
        }
    }



    handleTag = () => {
        const selected = this.state.items.filter(i => i.selected);
        alert(`Menambah label untuk ${selected.length} produk`);
    }

    render() {
        const { searchQuery } = this.props;
        const { items, loading, error } = this.state;

        const filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const selectedCount = items.filter(item => item.selected).length;
        const isAllSelected = items.length > 0 && items.every(item => item.selected);

        return (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden relative transition-all duration-300 min-h-[400px]">
                {/* Table Header Controls */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={this.toggleSelectAll}
                            disabled={loading || items.length === 0}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isAllSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-500'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAllSelected ? <Check size={14} /> : <div className="w-3.5 h-3.5 border-2 border-slate-300 rounded" />}
                            {isAllSelected ? 'Selected All' : 'Select All'}
                        </button>
                        {selectedCount > 0 && (
                            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest animate-in fade-in slide-in-from-left-2">
                                {selectedCount} items marked
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => this.fetchInventory()}
                            className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                            title="Refresh Data"
                        >
                            <Loader2 size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Download size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-32 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={40} className="animate-spin mb-4 text-emerald-500" strokeWidth={1.5} />
                            <p className="text-sm font-bold animate-pulse uppercase tracking-[0.2em] ml-2">Synchronizing Telemetry...</p>
                        </div>
                    ) : error ? (
                        <div className="py-24 text-center">
                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle size={32} className="text-rose-500" />
                            </div>
                            <p className="text-sm font-bold text-slate-800">Connection Failed</p>
                            <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-widest px-10">{error}</p>
                            <button
                                onClick={() => this.fetchInventory()}
                                className="mt-6 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-6 py-4 w-12 text-center"></th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Visual</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Item & SKU</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Calories</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Price</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Quantity</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Condition</th>
                                    <th className="px-6 py-4 w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredItems.map((item: any) => (
                                    <tr
                                        key={item.id}
                                        className={`group transition-all duration-200 ${item.selected ? 'bg-emerald-50/30' : 'hover:bg-slate-50/50'}`}
                                    >
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => this.toggleSelect(item.id)}
                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${item.selected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200 group-hover:border-emerald-300'
                                                    }`}
                                            >
                                                {item.selected && <Check size={12} className="text-white" strokeWidth={3} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center mx-auto">
                                                {item.img ? (
                                                    <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                                                ) : (
                                                    <Tag size={16} className="text-slate-300" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 tracking-tight">{item.name}</span>
                                                <span className="text-[10px] font-medium text-slate-400">{item.sku}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600 uppercase">
                                                {item.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-xs font-bold text-slate-600">
                                            {item.calories || '-'} <span className="text-[9px] text-slate-400 font-medium ml-0.5">kcal</span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-600 text-right">
                                            {item.price}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className={`text-xs font-black ${item.stock_quantity < 20 ? 'text-rose-500' : 'text-slate-700'}`}>
                                                    {item.stock_quantity} <span className="text-[10px] text-slate-400 font-bold uppercase">{item.unit}</span>
                                                </span>
                                                <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.stock_quantity < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(item.stock_quantity, 100)}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${item.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                item.status === 'Habis' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                                    'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {!loading && !error && filteredItems.length === 0 && (
                    <div className="py-24 text-center bg-slate-50/20">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-400">No telemetry data found</p>
                        <p className="text-[11px] text-slate-300 mt-1 uppercase tracking-widest">Try adjusting your filters</p>
                    </div>
                )}

                {/* Minimalist Action Bar */}
                {selectedCount > 0 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900 shadow-2xl px-2 py-2 rounded-2xl z-20 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="px-4 py-2 border-r border-slate-800 mr-1">
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">
                                {selectedCount} Selected
                            </span>
                        </div>

                        <button
                            onClick={this.handleTag}
                            className="p-2.5 hover:bg-white/10 rounded-xl text-slate-300 transition-all active:scale-95 group relative"
                            title="Add Labels"
                        >
                            <Tag size={18} />
                        </button>

                        <button
                            onClick={this.handleEdit}
                            className="p-2.5 hover:bg-white/10 rounded-xl text-slate-300 transition-all active:scale-95 group relative"
                            title="Quick Edit"
                        >
                            <Edit3 size={18} />
                        </button>

                        <button
                            onClick={this.deleteSelected}
                            className="p-2.5 hover:bg-rose-500/20 rounded-xl text-rose-400 transition-all active:scale-95 group relative"
                            title="Purge Items"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="w-px h-6 bg-slate-800 mx-2" />

                        <button
                            onClick={() => this.setState(prevState => ({ items: prevState.items.map(i => ({ ...i, selected: false })) }))}
                            className="p-2 hover:bg-white/10 rounded-xl text-slate-500 transition-colors"
                        >
                            <Plus size={18} className="rotate-45" />
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default TabelInventory;
