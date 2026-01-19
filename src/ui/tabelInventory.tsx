import { Component } from 'react'
import { Plus, MoreHorizontal, Star, Check, Trash2, Edit3, Tag } from 'lucide-react';
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
            items: INVENTORY_DATA
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
        if (confirm('Apakah Anda yakin ingin menghapus item yang dipilih?')) {
            this.setState(prevState => ({
                items: prevState.items.filter(item => !item.selected)
            }));
        }
    }

    handleAction = (action: string) => {
        const selectedCount = this.state.items.filter(i => i.selected).length;
        alert(`Menjalankan aksi "${action}" pada ${selectedCount} item.`);
    }

    render() {
        const { searchQuery } = this.props;
        const filteredItems = this.state.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const selectedCount = this.state.items.filter(item => item.selected).length;
        const isAllSelected = this.state.items.length > 0 && this.state.items.every(item => item.selected);

        return (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative min-h-[400px]">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="px-6 py-5 w-10">
                                <button
                                    onClick={this.toggleSelectAll}
                                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${isAllSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-200 bg-white hover:border-orange-300'}`}
                                >
                                    {isAllSelected && <Check size={12} className="text-white" strokeWidth={4} />}
                                </button>
                            </th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Produk</th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Harga</th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Terjual</th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Pendapatan</th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Stok</th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Status</th>
                            <th className="px-6 py-5 text-[12px] font-bold text-slate-400 uppercase tracking-tight">Rating</th>
                            <th className="px-6 py-5 w-8 text-slate-300">
                                <Plus size={16} />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredItems.map((item) => (
                            <tr key={item.id} className={`group hover:bg-slate-50/50 transition-all ${item.selected ? 'bg-orange-50/30' : ''}`}>
                                <td className="px-6 py-4 relative">
                                    {item.selected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />}
                                    <button
                                        onClick={() => this.toggleSelect(item.id)}
                                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${item.selected ? 'bg-orange-500 border-orange-500' : 'border-slate-200 bg-white group-hover:border-orange-300'}`}
                                    >
                                        {item.selected && <Check size={12} className="text-white" strokeWidth={4} />}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-[14px] font-bold text-slate-800 tracking-tight">{item.name}</p>
                                </td>
                                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{item.price}</td>
                                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{item.sales}</td>
                                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{item.revenue}</td>
                                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{item.stock}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${item.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-600' :
                                        item.status === 'Habis' ? 'bg-red-50 text-red-600' :
                                            'bg-amber-50 text-amber-600'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 font-bold text-[13px] text-slate-800">
                                        <Star size={14} className="fill-orange-400 text-orange-400" />
                                        {item.rating.toFixed(1)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredItems.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-medium">Tidak ada produk yang ditemukan.</p>
                    </div>
                )}

                {/* Floating Action Bar */}
                {selectedCount > 0 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 shadow-2xl shadow-slate-900/20 px-4 py-2 rounded-2xl z-20 border border-slate-800 animate-in zoom-in slide-in-from-bottom-4">
                        <span className="text-[13px] font-bold text-white border-r border-slate-700 pr-4 mr-2">
                            {selectedCount} Terpilih
                        </span>

                        <button
                            onClick={() => this.handleAction('Terapkan Kode')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-xl text-[13px] font-bold text-slate-300 transition-colors"
                        >
                            <Tag size={16} /> Terapkan Kode
                        </button>

                        <button
                            onClick={() => this.handleAction('Edit Info')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-xl text-[13px] font-bold text-slate-300 transition-colors"
                        >
                            <Edit3 size={16} /> Edit Info
                        </button>

                        <button
                            onClick={this.deleteSelected}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 rounded-xl text-[13px] font-bold text-red-400 transition-colors"
                        >
                            <Trash2 size={16} /> Hapus
                        </button>

                        <div className="w-px h-4 bg-slate-700 mx-2" />

                        <button
                            onClick={() => this.setState(prevState => ({ items: prevState.items.map(i => ({ ...i, selected: false })) }))}
                            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                        >
                            <Plus size={16} className="rotate-45" />
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default TabelInventory;