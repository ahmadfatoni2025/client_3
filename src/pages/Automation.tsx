import { Component } from 'react';
import {
    Zap,
    Play,
    Settings,
    MoreVertical,
    CheckCircle2,
    Clock,
    Plus,
    Cpu,
    GitBranch,
    Bell,
    Mail,
    Smartphone,
    Database,
    ChevronRight,
    Search,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';



interface AutomationRule {
    id: string;
    name: string;
    description: string;
    active: boolean;
    lastRun: string;
    type: 'Trigger' | 'Scheduled' | 'Logic';
}

interface State {
    rules: AutomationRule[];
    isAddingRule: boolean;
    searchQuery: string;
}

export class Automation extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            isAddingRule: false,
            rules: [
                { id: '1', name: 'Alert Stok Rendah', description: 'Kirim notifikasi ke tim pengadaan jika stok di bawah 10%', active: true, lastRun: '15 menit lalu', type: 'Trigger' },
                { id: '2', name: 'Laporan Keuangan Mingguan', description: 'Generate PDF laba rugi setiap Minggu jam 23:00', active: true, lastRun: 'Kemarin', type: 'Scheduled' },
                { id: '3', name: 'Validasi Nutrisi Otomatis', description: 'Cek kesesuaian menu terhadap standar AKG sebelum rilis', active: false, lastRun: '2 hari lalu', type: 'Logic' },
                { id: '4', name: 'Sync Database Sekolah', description: 'Update data siswa penerima MBG dari pusat setiap malam', active: true, lastRun: '1 jam lalu', type: 'Trigger' },
            ]
        };
    }

    toggleRule = (id: string) => {
        this.setState(prev => ({
            rules: prev.rules.map(r => r.id === id ? { ...r, active: !r.active } : r)
        }));
    };

    render() {
        const { rules, searchQuery, isAddingRule } = this.state;
        const filteredRules = rules.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

        return (
            <div className="space-y-8 pb-20">
                {/* Header Automation */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40 shrink-0" />
                    <div className="flex items-center gap-4 md:gap-6 relative z-10 min-w-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-purple-100 shrink-0">
                            <Zap size={28} />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight truncate">Automation</h1>
                            <p className="text-slate-500 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] mt-1 truncate">Otomatisasi Alur Kerja</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                        <button onClick={() => this.setState({ isAddingRule: true })} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                            <Plus size={16} /> Baru
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Workflow List */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 md:p-4 rounded-[24px] md:rounded-[28px] border border-slate-100 shadow-sm gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 md:py-2.5 pl-10 md:pl-11 pr-4 text-xs md:text-sm font-bold focus:ring-4 focus:ring-purple-50 outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none px-5 py-2 md:py-2.5 bg-slate-900 text-white rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg">Aktif</button>
                                <button className="flex-1 sm:flex-none px-5 py-2 md:py-2.5 bg-slate-50 text-slate-400 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest">Arsip</button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredRules.map(rule => (
                                <div key={rule.id} className="p-5 md:p-6 bg-white rounded-[28px] md:rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                        <div className="flex gap-4 md:gap-6 min-w-0">
                                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${rule.active ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-300'}`}>
                                                {rule.type === 'Trigger' ? <Cpu size={24} /> : rule.type === 'Scheduled' ? <Clock size={24} /> : <GitBranch size={24} />}
                                            </div>
                                            <div className="space-y-1 min-w-0">
                                                <h4 className={`text-base md:text-lg font-black tracking-tight truncate ${rule.active ? 'text-slate-900' : 'text-slate-400'}`}>{rule.name}</h4>
                                                <p className="text-[11px] md:text-xs text-slate-500 font-medium line-clamp-2 md:line-clamp-none">{rule.description}</p>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 md:mt-4">
                                                    <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tipe: <span className="text-slate-900">{rule.type}</span></span>
                                                    <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Last: <span className="text-slate-900">{rule.lastRun}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                                            <button
                                                onClick={() => this.toggleRule(rule.id)}
                                                className={`transition-colors shrink-0 ${rule.active ? 'text-purple-600' : 'text-slate-300'}`}
                                            >
                                                {rule.active ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => alert("Test...")} className="p-2.5 md:p-3 bg-slate-50 text-slate-400 rounded-lg md:rounded-xl hover:text-purple-600 hover:bg-purple-50 transition-all sm:opacity-0 group-hover:opacity-100"><Play size={18} /></button>
                                                <button className="p-2.5 md:p-3 bg-slate-50 text-slate-400 rounded-lg md:rounded-xl hover:bg-slate-100 transition-all"><MoreVertical size={18} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Nodes & Insights */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 shrink-0" />
                            <h3 className="text-base md:text-lg font-black tracking-tight flex items-center gap-2 mb-6"><CheckCircle2 size={20} className="text-purple-400 shrink-0" /> Insights</h3>
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Run</span>
                                    <span className="text-lg md:text-xl font-black">1.2k+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                                    <span className="text-lg md:text-xl font-black text-purple-400">+22%</span>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-[8px] md:text-[10px] text-white/40 font-black uppercase tracking-widest mb-4">Active Nodes</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[Mail, Bell, Smartphone, Database].map((Icon, i) => (
                                            <div key={i} className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-help border border-white/10" title="Webhooks Active">
                                                <Icon size={18} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Execution Logs */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">Real-time Logs <Settings size={16} className="text-slate-300" /></h4>
                            <div className="space-y-6">
                                {[
                                    { time: '11:20', text: 'Low Stock Alert Sent via WhatsApp', status: 'Success' },
                                    { time: '10:45', text: 'Daily Backup Completed (Cloud)', status: 'Success' },
                                    { time: '09:00', text: 'Financial Report Generated', status: 'Processing' }
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i !== 2 && <div className="absolute left-1 top-4 bottom-0 w-px bg-slate-100" />}
                                        <div className={`w-2 h-2 rounded-full mt-1.5 ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-purple-500 animate-pulse'}`} />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-800">{log.text}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-tighter uppercase">{log.time} • {log.status}</p>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => alert("Membuka Log Konsol Lengkap...")} className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest pt-4 border-t border-slate-50">
                                    Lihat Seluruh Log <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Rule Modal */}
                {isAddingRule && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden border border-slate-100">
                            <div className="bg-purple-600 p-8 text-white">
                                <h2 className="text-2xl font-black">Bangun Alur Kerja</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">If (Trigger) Then (Action) System</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); this.setState({ isAddingRule: false }); alert("Alur kerja baru otomatis aktif."); }} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Alur Kerja</label>
                                    <input required type="text" placeholder="Misal: Auto-Request Order Daging" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-purple-100 outline-none transition-all" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih Node Trigger</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Inventory', 'Schedule', 'Payment'].map(t => (
                                            <button key={t} type="button" className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 hover:border-purple-500 hover:bg-purple-50 transition-all group">
                                                <Cpu size={20} className="text-slate-400 group-hover:text-purple-600" />
                                                <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-purple-600">{t}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => this.setState({ isAddingRule: false })} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
                                    <button type="submit" className="flex-2 py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Simpan & Aktifkan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Automation;
