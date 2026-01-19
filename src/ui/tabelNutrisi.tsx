import { Component } from 'react'
import { MoreHorizontal, Star, Check, Trash2, Edit3, Tag, Image as ImageIcon, Search } from 'lucide-react';

interface NutritionItem {
    id: number;
    name: string;
    category: string;
    calories: number;
    protein: number;
    fiber: number;
    vitC: number;
    price: string;
    status: string;
    rating: number;
    selected: boolean;
    image: string;
    description: string;
}

interface Props {
    searchQuery: string;
    items: NutritionItem[];
    onToggleSelect: (id: number) => void;
    onToggleSelectAll: () => void;
    onDeleteSelected: () => void;
}

export class TabelNutrisi extends Component<Props> {
    render() {
        const { items, onToggleSelect, onToggleSelectAll, onDeleteSelected } = this.props;
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
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Serat</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Vit C</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status Gizi</th>
                            <th className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right pr-10">Rating</th>
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
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">{item.calories} kkal</span>
                                        </div>
                                        <p className="text-[12px] text-slate-400 font-medium line-clamp-1">{item.description || 'Tidak ada keterangan tambahan.'}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.protein} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">gr</span></td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.fiber} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">gr</span></td>
                                <td className="px-6 py-5 text-[14px] font-black text-slate-700 text-center">{item.vitC} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">mg</span></td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${item.status === 'Segar' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        item.status === 'Habis' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            'bg-amber-50 text-amber-600 border border-amber-100'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-end gap-1.5 font-black text-[14px] text-slate-800 pr-4">
                                        <Star size={16} className="fill-amber-400 text-amber-400" />
                                        {item.rating.toFixed(1)}
                                        <button className="ml-4 p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                            <MoreHorizontal size={20} />
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
                            onClick={() => alert(`Aksi Update Gizi untuk ${selectedCount} bahan`)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-2xl text-[13px] font-bold text-slate-200 transition-colors"
                        >
                            <Tag size={18} /> Update Gizi
                        </button>

                        <button
                            onClick={() => alert('Fitur Edit Masal akan segera hadir')}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-2xl text-[13px] font-bold text-slate-200 transition-colors"
                        >
                            <Edit3 size={18} /> Edit Info
                        </button>

                        <button
                            onClick={onDeleteSelected}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-2xl text-[13px] font-black text-white transition-all shadow-lg active:scale-95"
                        >
                            <Trash2 size={18} /> Hapus Permanen
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default TabelNutrisi;
