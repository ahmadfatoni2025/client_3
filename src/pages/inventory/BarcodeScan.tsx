import React, { useState } from 'react';
import { QrCode, Scan, CheckCircle, AlertCircle } from 'lucide-react';

export const BarcodeScan: React.FC = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);

    const startScan = () => {
        setIsScanning(true);
        setScanResult(null);
        // Simulate scanning after 2 seconds
        setTimeout(() => {
            setScanResult("MBG-PRD-2026-X12");
            setIsScanning(false);
        }, 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Barcode & QR Scanner</h1>
                <p className="text-sm font-medium text-slate-400">Integrasi pemindaian untuk FIFO tracking dan verifikasi barang.</p>
            </header>

            <div className="max-w-xl mx-auto">
                {!isScanning && !scanResult && (
                    <div className="bg-white rounded-[40px] border border-slate-100 p-12 text-center space-y-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 mx-auto">
                            <QrCode size={48} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-black text-xl text-slate-800">Ready to Scan</h3>
                            <p className="text-sm text-slate-400">Point your camera at the MBG standard label to verify authenticity and track FIFO data.</p>
                        </div>
                        <button
                            onClick={startScan}
                            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Scan size={18} /> Start Scanning
                        </button>
                    </div>
                )}

                {isScanning && (
                    <div className="bg-slate-900 rounded-[40px] p-12 text-center space-y-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-emerald-500/20 animate-pulse" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="w-64 h-64 border-2 border-dashed border-emerald-500/50 rounded-3xl mx-auto flex items-center justify-center relative">
                                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] animate-bounce" />
                                <QrCode size={80} className="text-emerald-500/20" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white font-black text-xl">Initializing Camera...</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Scanning for MBG-Encoded Labels</p>
                            </div>
                            <button
                                onClick={() => setIsScanning(false)}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {scanResult && (
                    <div className="bg-white rounded-[40px] border border-emerald-100 p-12 text-center space-y-8 shadow-2xl shadow-emerald-100 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto">
                            <CheckCircle size={48} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-black text-xl text-slate-800">Product Verified</h3>
                            <p className="text-sm text-slate-400 uppercase font-black tracking-widest bg-slate-50 py-2 rounded-lg">{scanResult}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status FIFO</p>
                                <p className="text-xs font-bold text-emerald-600">Fresh (Safe)</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exp Date</p>
                                <p className="text-xs font-bold text-slate-800">2026-02-15</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setScanResult(null)}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                        >
                            Scan Another Item
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="p-8 bg-amber-50 rounded-[32px] border border-amber-100 flex gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 text-sm">Peringatan FIFO</h4>
                        <p className="text-xs text-slate-500 mt-1">3 Produk kategori mudah busuk mendekati batas kesegaran optimal.</p>
                    </div>
                </div>
                <div className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 flex gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 text-sm">System Healthy</h4>
                        <p className="text-xs text-slate-500 mt-1">Seluruh label sinkron dengan database pusat MBG.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarcodeScan;
