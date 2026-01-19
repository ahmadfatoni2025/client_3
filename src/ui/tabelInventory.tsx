import { Component } from 'react'
import { Plus, MoreHorizontal, Check, Trash2, Edit3, Tag, Search, Filter, Download } from 'lucide-react';
import { INVENTORY_DATA } from '../data/mockData';

interface InventoryItem {
    id: number;
    name: string;
    price: string;
    sales: string;
    revenue: string;
    stock: string;
    status: string;
    rating: number;
    selected: boolean;
}

interface Props {
    searchQuery: string;
}

interface State {
    items: InventoryItem[];
}

export class TabelInventory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: INVENTORY_DATA.map(item => ({ ...item, selected: false }))
        };
    }

    toggleSelect = (id: number) => {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        }));
    }

    toggleSelectAll = () => {
        const allSelected = this.state.items.every(item => item.selected);
        this.setState(prevState => ({
            items: prevState.items.map(item => ({ ...item, selected: !allSelected }))
        }));
    }

    deleteSelected = () => {
        const selectedItems = this.state.items.filter(i => i.selected);
        if (selectedItems.length === 0) return;

        if (confirm(`Hapus ${selectedItems.length} item yang dipilih?`)) {
            this.setState(prevState => ({
                items: prevState.items.filter(item => !item.selected)
            }));
        }
    }

    handleEdit = () => {
        const selected = this.state.items.filter(i => i.selected);
        if (selected.length === 1) {
            alert(`Mengedit produk: ${selected[0].name}`);
        } else if (selected.length > 1) {
            alert(`Batch edit untuk ${selected.length} produk`);
        }
    }

    handleTag = () => {
        const selected = this.state.items.filter(i => i.selected);
        alert(`Menambah label untuk ${selected.length} produk`);
    }

    render() {
        const { searchQuery } = this.props;
        const filteredItems = this.state.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const selectedCount = this.state.items.filter(item => item.selected).length;
        const isAllSelected = this.state.items.length > 0 && this.state.items.every(item => item.selected);

        return (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden relative transition-all duration-300">
                {/* Table Header Controls */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={this.toggleSelectAll}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isAllSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-500'
                                }`}
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
                        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Download size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-6 py-4 w-12 text-center"></th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Product Intelligence</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Price</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Velocity</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Revenue</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Inventory</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredItems.map((item) => (
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
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 tracking-tight">{item.name}</span>
                                            <span className="text-[10px] font-medium text-slate-400">SKU: MBG-{2000 + item.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 text-right">{item.price}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600 text-center">
                                        <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px]">{item.sales} units</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-black text-slate-800 text-right">{item.revenue}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`text-xs font-black ${parseInt(item.stock) < 50 ? 'text-rose-500' : 'text-slate-700'}`}>{item.stock}</span>
                                            <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${parseInt(item.stock) < 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(parseInt(item.stock) / 10, 100)}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${item.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                item.status === 'Habis' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                                    'bg-slate-100 text-slate-500'
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
                </div>

                {filteredItems.length === 0 && (
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