import { Component } from 'react';
import { QrCode, Camera, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';

export class ScanOpname extends Component {
    render() {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 space-y-12">
                <div className="text-center space-y-4 max-w-lg">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Stock Opname Digital</h1>
                    <p className="text-slate-400 font-medium">Lakukan audit stok produk secara instan dengan teknologi pemindaian QR/Barcode terenkripsi.</p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-4 bg-emerald-500/20 rounded-[60px] blur-2xl group-hover:bg-emerald-500/30 transition-all duration-700 animate-pulse" />
                    <div className="relative w-80 h-80 bg-slate-900 rounded-[56px] border-[8px] border-white shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-emerald-500/10 to-transparent" />
                        <QrCode size={120} className="text-white/20 mb-4" />
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] animate-bounce" />

                        <div className="flex flex-col items-center gap-4 mt-8">
                            <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2">
                                <Camera size={16} /> Buka Kamera
                            </button>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Ready for scanning</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-12 border-t border-slate-100">
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
                </div>
            </div>
        );
    }
}

export default ScanOpname;
