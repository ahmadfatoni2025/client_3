import { Component } from 'react';

import {
    Search,
    AlertTriangle,
    BarChart3,
    Store,
    FileText,
    Truck,
    QrCode,
    Plus,
    Bell,
    Mail
} from 'lucide-react';

import TabelInventory from '../ui/tabelInventory';

interface Vendor {
    id: string;
    name: string;
    type: 'UMKM' | 'Koperasi' | 'PT';
    performance: number;
    category: string;
    lastOrder: string;
}

interface State {
    searchQuery: string;
    vendors: Vendor[];
    isScanning: boolean;
}

export class Inventory extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            isScanning: false,
            vendors: [
                { id: 'V001', name: 'Koperasi Tani Makmur', type: 'Koperasi', performance: 95, category: 'Sayuran', lastOrder: '2026-01-18' },
                { id: 'V002', name: 'UMKM Beras Cianjur', type: 'UMKM', performance: 88, category: 'Beras', lastOrder: '2026-01-15' },
                { id: 'V003', name: 'PT Telur Jaya', type: 'PT', performance: 92, category: 'Protein', lastOrder: '2026-01-19' },
            ]
        };
    }

    render() {
        const { searchQuery, vendors, isScanning } = this.state;

        return (
            <div className="flex min-h-screen bg-[#f8fafc] animate-in fade-in duration-700">
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-10">
                        <div className="relative w-full max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search inventory intelligence..."
                                className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={() => this.setState({ isScanning: true })} className="p-3 rounded-xl bg-slate-950 text-white hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 px-5 active:scale-95">
                                <QrCode size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Scan Audit</span>
                            </button>
                            <div className="flex items-center gap-2">
                                <button className="p-3 rounded-xl bg-white text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 shadow-sm relative">
                                    <Mail size={18} />
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                                </button>
                                <button className="p-3 rounded-xl bg-white text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 shadow-sm relative">
                                    <Bell size={18} />
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Column (Main Dashboard Content) */}
                        <div className="lg:col-span-9 space-y-12">

                            {/* Analytics Summary */}
                            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-emerald-100 transition-all group">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Inventory Health</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900">94.2%</h3>
                                            <p className="text-[11px] font-bold text-emerald-600 mt-1 cursor-default">↑ 2.4% vs last month</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                            <BarChart3 size={24} />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-emerald-100 transition-all group">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Stock Value</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900">Rp 1.2B</h3>
                                            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Active Assets</p>
                                        </div>
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                                            <Store size={24} />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-rose-100 transition-all group">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Pending POs</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900">14</h3>
                                            <p className="text-[11px] font-bold text-rose-500 mt-1 cursor-default">4 Requires Attention</p>
                                        </div>
                                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                                            <FileText size={24} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Popular Products (Refined UI) */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Active Inventory</h2>
                                        <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-widest">Real-time Telemetry Data</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="text-[10px] font-black text-emerald-600 hover:underline uppercase tracking-widest">Global Export</button>
                                        <div className="w-px h-4 bg-slate-200" />
                                        <button className="text-[10px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">System Logs</button>
                                    </div>
                                </div>

                                <TabelInventory searchQuery={searchQuery} />
                            </section>
                        </div>

                        {/* Right Column (Fixed Sidebar Content) */}
                        <div className="lg:col-span-3 space-y-10 sticky top-8 h-fit">
                            {/* Critical Alerts */}
                            <section className="bg-slate-100 rounded-[40px] p-8 text-slate-950 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 transition-transform"><AlertTriangle size={80} /></div>
                                <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-8 flex items-center gap-2 text-rose-500">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
                                    Critical Inventory
                                </h3>

                                <div className="space-y-4 relative z-10">
                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover:text-emerald-400 transition-colors">Safety Level Breach</p>
                                        <h4 className="text-sm font-bold truncate">Beras Mentik Wangi</h4>
                                        <div className="flex items-center justify-between mt-5">
                                            <span className="text-rose-400 font-black text-[10px] px-2 py-1 bg-rose-500/10 rounded-lg">Stock: 12kg</span>
                                            <Plus size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover:text-emerald-400 transition-colors">Low Inventory</p>
                                        <h4 className="text-sm font-bold truncate">Minyak Goreng Sawit</h4>
                                        <div className="flex items-center justify-between mt-5">
                                            <span className="text-amber-400 font-black text-[10px] px-2 py-1 bg-amber-500/10 rounded-lg">Stock: 5L</span>
                                            <Plus size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Recent Distribution */}
                            <section className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
                                <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-8 text-slate-400">Network Partners</h3>
                                <div className="space-y-6">
                                    {vendors.slice(0, 3).map((v) => (
                                        <div key={v.id} className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors border border-slate-100">
                                                <Truck size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-black text-slate-800 leading-tight line-clamp-1">{v.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{v.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-emerald-600">{v.performance}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => window.location.href = '/pemasok-umkm'} className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all active:scale-95">Directory Access</button>
                            </section>
                        </div>
                    </div>
                </main>

                {/* Scanning Modal (Minimalist) */}
                {isScanning && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
                        <div className="max-w-md w-full text-center space-y-12">
                            <div className="relative w-72 h-72 mx-auto border border-white/10 rounded-[60px] flex items-center justify-center bg-black/40 shadow-2xl">
                                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] animate-bounce" />
                                <QrCode size={100} className="text-white/10" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Audit Mode Active</h2>
                                <p className="text-slate-500 text-sm mt-4 font-medium uppercase tracking-widest">Scanning MBG Protected Label</p>
                            </div>
                            <button onClick={() => this.setState({ isScanning: false })} className="px-12 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl hover:bg-slate-100">Terminate Scan</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Inventory;
