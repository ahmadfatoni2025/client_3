import { Component } from 'react';
import { Store, Plus, MapPin, Phone } from 'lucide-react';

export class PemasokUMKM extends Component {
    vendors = [
        { id: 'V001', name: 'Koperasi Tani Makmur', type: 'Koperasi', performance: 95, category: 'Sayuran', location: 'Cianjur', phone: '0812-3456-7890' },
        { id: 'V002', name: 'UMKM Beras Cianjur', type: 'UMKM', performance: 88, category: 'Beras', location: 'Surabaya', phone: '0812-8888-9999' },
        { id: 'V003', name: 'PT Telur Jaya', type: 'PT', performance: 92, category: 'Protein', location: 'Bandung', phone: '0855-4444-3333' },
    ];

    render() {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Pemasok UMKM</h1>
                        <p className="text-sm font-medium text-slate-400">Direktori mitra pemasok UMKM dan Koperasi binaan.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2">
                        <Plus size={16} /> Tambah Pemasok
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {this.vendors.map((v) => (
                        <div key={v.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10">
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[8px] font-black uppercase tracking-widest">
                                    {v.type}
                                </span>
                                <h3 className="text-xl font-black text-slate-800 mt-4 mb-2">{v.name}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <Store size={14} /> {v.category}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <MapPin size={14} /> {v.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <Phone size={14} /> {v.phone}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performa</p>
                                        <span className="text-xs font-black text-emerald-600">{v.performance}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${v.performance}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default PemasokUMKM;
