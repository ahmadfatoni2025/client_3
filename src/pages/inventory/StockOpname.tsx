import { Component } from 'react';
import { QrCode, Camera, ShieldCheck, AlertTriangle, RefreshCw, Activity, History } from 'lucide-react';

export class StockOpname extends Component {
    render() {
        return (
            <div className="space-y-12 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Stock Opname Real-time</h1>
                        <p className="text-sm font-medium text-slate-400">Audit stok fisik menggunakan integrasi QR/Barcode scanning.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all flex items-center gap-2">
                            <History size={16} /> Riwayat Audit
                        </button>
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center gap-2">
                            <QrCode size={16} /> Mulai Sesi Audit
                        </button>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 p-12 min-h-[400px]">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[60px] blur-2xl group-hover:bg-emerald-500/30 transition-all duration-700 animate-pulse" />
                            <div className="relative w-72 h-72 bg-slate-900 rounded-[56px] border-8 border-white shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-emerald-500/10 to-transparent" />
                                <QrCode size={100} className="text-white/20 mb-4" />
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] animate-bounce" />

                                <div className="flex flex-col items-center gap-4 mt-8">
                                    <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2">
                                        <Camera size={16} /> Auto Scan
                                    </button>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Ready for scanning</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-96 space-y-6">
                        <div className="p-6 bg-white rounded-[32px] border border-slate-100 flex items-center gap-4 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Akurasi Audit</p>
                                <p className="text-lg font-black text-slate-800">99.9%</p>
                            </div>
                        </div>
                        <div className="p-6 bg-white rounded-[32px] border border-slate-100 flex items-center gap-4 shadow-sm">
                            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                                <RefreshCw size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sinkronisasi</p>
                                <p className="text-lg font-black text-slate-800">Real-time</p>
                            </div>
                        </div>
                        <div className="p-6 bg-white rounded-[32px] border border-slate-100 flex items-center gap-4 shadow-sm">
                            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anomali Stok</p>
                                <p className="text-lg font-black text-slate-800">0 Detected</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Activity size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Live Integration</span>
                            </div>
                            <h4 className="font-bold text-sm">MBG Backend Connected</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">System is ready to push stock deltas to production database.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StockOpname;
