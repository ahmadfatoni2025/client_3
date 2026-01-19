import { Component } from 'react';
import { FileText, Download, Plus } from 'lucide-react';

export class PengadaanDigital extends Component {
    pos = [
        { id: 'PO-2026-001', vendor: 'Koperasi Tani Makmur', date: '2026-01-18', total: 4500000, status: 'Selesai' },
        { id: 'PO-2026-002', vendor: 'UMKM Beras Cianjur', date: '2026-01-19', total: 12000000, status: 'Pending' },
        { id: 'PO-2026-003', vendor: 'PT Telur Jaya', date: '2026-01-20', total: 7800000, status: 'Draft' },
    ];

    render() {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Pengadaan Digital</h1>
                        <p className="text-sm font-medium text-slate-400">Pusat kontrol Purchase Order (PO) dan pengadaan barang otomatis.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center gap-2">
                        <Plus size={16} /> Buat PO Baru
                    </button>
                </header>

                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Daftar Purchase Order</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Selesai: 12</span>
                            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Pending: 3</span>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {this.pos.map((po) => (
                            <div key={po.id} className="p-8 hover:bg-slate-50/50 transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-white group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-lg">{po.id}</h4>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{po.vendor} • {po.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="text-right">
                                        <p className="text-[11px] font-black text-slate-400 uppercase mb-0.5">Total Nilai</p>
                                        <p className="text-xl font-black text-emerald-600 tracking-tight text-right">Rp {po.total.toLocaleString()}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${po.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        po.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse' :
                                            'bg-slate-100 text-slate-400 border-slate-200'
                                        }`}>
                                        {po.status}
                                    </span>
                                    <button className="p-3 text-slate-300 hover:text-emerald-500 transition-colors">
                                        <Download size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default PengadaanDigital;
