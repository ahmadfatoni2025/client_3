import { Component } from 'react';
import {
    Puzzle,
    Cloud,
    Database,
    Lock,
    Settings,
    CheckCircle2,
    XCircle,
    Copy,
    Webhook,
    MessageSquare,
    Truck,
    CreditCard,
    ChevronRight,
    Search,
    Zap
} from 'lucide-react';


interface IntegrationApp {
    id: string;
    name: string;
    description: string;
    status: 'Connected' | 'Disconnected' | 'Error';
    category: 'Database' | 'Banking' | 'Logistics' | 'Communication';
}

interface State {
    integrations: IntegrationApp[];
    searchQuery: string;
    isApiKeyVisible: boolean;
}

export class Integration extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            isApiKeyVisible: false,
            integrations: [
                { id: '1', name: 'Supabase Cloud', description: 'Database sinkronisasi pusat MBG.', status: 'Connected', category: 'Database' },
                { id: '2', name: 'OpenStreetMap API', description: 'Pelacakan kurir logistik real-time.', status: 'Connected', category: 'Logistics' },
                { id: '3', name: 'Bank Mandiri VA', description: 'Gateway pembayaran otomatis.', status: 'Error', category: 'Banking' },
                { id: '4', name: 'WhatsApp Business', description: 'Notifikasi otomatis ke ortu & sekolah.', status: 'Disconnected', category: 'Communication' },
            ]
        };
    }

    render() {
        const { integrations, searchQuery, isApiKeyVisible } = this.state;
        const filteredApps = integrations.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

        return (
            <div className="space-y-8 pb-20 animate-in fade-in duration-700">
                {/* Integration Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40" />
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-indigo-100">
                            <Puzzle size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Integration Hub</h1>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">Ekosistem Konektivitas MBG System</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <button onClick={() => alert("Mengaktifkan mode pengembang (Developer Mode)...")} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                            <Zap size={16} /> API Dokumentasi
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Integrations List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm gap-4">
                            <div className="relative w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Cari aplikasi atau layanan..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900 transition-all"><Settings size={20} /></button>
                                <button onClick={() => alert("Menjelajahi Marketplace Aplikasi...")} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">+ Marketplace</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredApps.map(app => (
                                <div key={app.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 rounded-2xl bg-indigo-50 text-indigo-600`}>
                                            {app.category === 'Database' ? <Database /> : app.category === 'Banking' ? <CreditCard /> : app.category === 'Logistics' ? <Truck /> : <MessageSquare />}
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${app.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : app.status === 'Error' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                                            {app.status === 'Connected' ? <CheckCircle2 size={12} /> : app.status === 'Error' ? <XCircle size={12} /> : null}
                                            {app.status}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 mb-1">{app.name}</h4>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-8">{app.description}</p>

                                    <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                                        <button
                                            onClick={() => alert(`Mengonfigurasi Integrasi ${app.name}...`)}
                                            className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] hover:opacity-70 transition-opacity"
                                        >
                                            Konfigurasi
                                        </button>
                                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><ChevronRight size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* API Keys & Webhooks Management */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-[44px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            <h3 className="text-lg font-black tracking-tight flex items-center gap-3 mb-8">
                                <Lock size={20} className="text-indigo-400" /> API Access Key
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl relative group">
                                    <p className="text-[10px] font-black text-white/40 uppercase mb-2">Primary API Key</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono text-indigo-300 truncate pr-4">
                                            {isApiKeyVisible ? 'mbg_live_ag72x910zzp429' : '••••••••••••••••••••••••'}
                                        </span>
                                        <div className="flex gap-2">
                                            <button onClick={() => this.setState({ isApiKeyVisible: !isApiKeyVisible })} className="p-2 text-white/40 hover:text-white"><Zap size={14} /></button>
                                            <button onClick={() => alert("API Key berhasil disalin ke clipboard.")} className="p-2 text-white/40 hover:text-white"><Copy size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => alert("Meregenerate API Key baru (Ini akan mematikan koneksi lama)...")} className="w-full py-3 bg-red-600/20 hover:bg-red-600/40 text-red-500 border border-red-600/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                                    Regenerate Key
                                </button>
                            </div>
                        </div>

                        {/* Webhook Endpoints */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">Webhook Endpoints <Webhook size={16} className="text-slate-300" /></h4>
                            <div className="space-y-5">
                                {[
                                    { url: 'https://api.mbg.go.id/hooks/inventory', label: 'Inventory Hook' },
                                    { url: 'https://callback.bankmandiri.com/mbg', label: 'Payment Hook' },
                                ].map((hook, i) => (
                                    <div key={i} className="pb-5 border-b border-slate-50 last:border-0 last:pb-0">
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter mb-1">{hook.label}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-slate-400 truncate pr-4">{hook.url}</span>
                                            <button className="text-indigo-600 hover:scale-110 active:scale-95 transition-all"><Settings size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => alert("Menambah Webhook Endpoint baru...")} className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-900 bg-slate-50 py-3 rounded-xl hover:bg-slate-100 uppercase tracking-widest transition-all">
                                    + New Webhook
                                </button>
                            </div>
                        </div>

                        {/* Cloud Status */}
                        <div className="p-8 bg-indigo-50 rounded-[44px] border border-indigo-100 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><Cloud size={80} /></div>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Server Status</p>
                            <h4 className="text-2xl font-black text-indigo-900 tracking-tight">Cloud Synchronized</h4>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active & Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Integration;
