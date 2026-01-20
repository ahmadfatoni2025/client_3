import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Store,
    FileText,
    AlertTriangle,
    Plus,
    Truck,
    Loader2
} from 'lucide-react';
import TabelInventory from '../../ui/tabelInventory';

interface IntelligenceData {
    lowStock: any[];
    fifoAlerts: any[];
    summary: {
        totalItems: number;
        criticalCount: number;
    }
}

const InventoryDashboard: React.FC = () => {
    const [searchQuery] = useState('');
    const [intelligence, setIntelligence] = useState<IntelligenceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [vendors, setVendors] = useState<any[]>([]);

    useEffect(() => {
        fetchIntelligence();
        fetchVendors();
    }, []);

    const fetchIntelligence = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/inventory/intelligence');
            const result = await response.json();
            if (result.success) {
                setIntelligence(result.data);
            }
        } catch (error) {
            console.error('Fetch intelligence error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVendors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/vendors');
            const result = await response.json();
            if (result.success) {
                setVendors(result.data.slice(0, 3));
            }
        } catch (error) {
            console.error('Fetch vendors error:', error);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column (Main Dashboard Content) */}
                <div className="lg:col-span-9 space-y-12">

                    {/* Analytics Summary */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-emerald-100 transition-all group">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Inventory Health</p>
                            <div className="flex items-end justify-between">
                                {loading ? (
                                    <Loader2 className="animate-spin text-slate-200" size={24} />
                                ) : (
                                    <>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900">94.2%</h3>
                                            <p className="text-[11px] font-bold text-emerald-600 mt-1 cursor-default">↑ 2.4% vs last month</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                            <BarChart3 size={24} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-emerald-100 transition-all group">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Critical Items</p>
                            <div className="flex items-end justify-between">
                                {loading ? (
                                    <Loader2 className="animate-spin text-slate-200" size={24} />
                                ) : (
                                    <>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900">{intelligence?.criticalCount || 0}</h3>
                                            <p className="text-[11px] font-bold text-rose-500 mt-1 uppercase tracking-widest">Requires Action</p>
                                        </div>
                                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                                            <AlertTriangle size={24} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:border-rose-100 transition-all group">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">FIFO Queue</p>
                            <div className="flex items-end justify-between">
                                {loading ? (
                                    <Loader2 className="animate-spin text-slate-200" size={24} />
                                ) : (
                                    <>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900">{intelligence?.fifoAlerts?.length || 0}</h3>
                                            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Oldest Batches</p>
                                        </div>
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                                            <FileText size={24} />
                                        </div>
                                    </>
                                )}
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
                                <button className="text-[10px] font-black text-emerald-600 hover:underline uppercase tracking-widest" onClick={() => fetchIntelligence()}>Sync Updates</button>
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
                    <section className="bg-white rounded-[40px] p-8 text-slate-950 relative overflow-hidden shadow-2xl border border-rose-100">
                        <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 transition-transform"><AlertTriangle size={80} /></div>
                        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-8 flex items-center gap-2 text-rose-500">
                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
                            Restock Prioritas
                        </h3>

                        <div className="space-y-4 relative z-10">
                            {intelligence?.lowStock.length === 0 ? (
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest py-4 text-center">Stok Aman</p>
                            ) : (
                                intelligence?.lowStock.slice(0, 3).map((item: any) => (
                                    <div key={item.id} className="p-5 bg-rose-50/30 rounded-3xl border border-rose-100 hover:bg-rose-50 transition-colors cursor-pointer group">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-rose-400 mb-1">Safety Level Breach</p>
                                        <h4 className="text-sm font-bold truncate">{item.name}</h4>
                                        <div className="flex items-center justify-between mt-5">
                                            <span className="text-rose-600 font-black text-[10px] px-2 py-1 bg-white rounded-lg">Stock: {item.stock_quantity} {item.unit}</span>
                                            <Plus size={14} className="text-rose-400 group-hover:scale-125 transition-transform" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Recent Distribution */}
                    <section className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
                        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-8 text-slate-400">Network Partners</h3>
                        <div className="space-y-6">
                            {vendors.length === 0 ? (
                                <p className="text-xs text-slate-300 py-4 text-center uppercase font-black tracking-widest">No Vendors</p>
                            ) : (
                                vendors.map((v) => (
                                    <div key={v.id} className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors border border-slate-100">
                                            <Truck size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-black text-slate-800 leading-tight line-clamp-1">{v.name}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{v.type || 'Mitra'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-emerald-600">{v.performance || 0}%</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default InventoryDashboard;
