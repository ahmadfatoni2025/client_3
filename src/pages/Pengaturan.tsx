import { Component } from 'react';
import {
    Settings,
    User,
    Bell,
    Shield,
    Database,
    ChevronRight,
    Camera,
    Lock,
    Globe,
    Moon,
    Laptop,
    Trash2,
    Save,
    LogOut,
    Check
} from 'lucide-react';

interface State {
    activeTab: 'profil' | 'keamanan' | 'notifikasi' | 'sistem';
    isSaving: boolean;
    darkMode: boolean;
    language: string;
}

export class Pengaturan extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 'profil',
            isSaving: false,
            darkMode: false,
            language: 'Bahasa Indonesia'
        };
    }

    handleSave = () => {
        this.setState({ isSaving: true });
        setTimeout(() => {
            this.setState({ isSaving: false });
            alert("Pengaturan Berhasil Disimpan!");
        }, 1500);
    };

    render() {
        const { activeTab, isSaving, darkMode, language } = this.state;

        return (
            <div className="space-y-8 pb-20 animate-in fade-in duration-700">
                {/* Settings Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40 shrink-0" />
                    <div className="flex items-center gap-4 md:gap-6 relative z-10 min-w-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shrink-0">
                            <Settings size={28} />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight truncate">Konfigurasi</h1>
                            <p className="text-slate-500 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] mt-1 truncate">Preferences & Account</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
                        <button onClick={this.handleSave} className="w-full flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                            {isSaving ? <span className="animate-spin mr-2">◌</span> : <Save size={16} />}
                            Simpan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-2 md:p-4 rounded-[28px] md:rounded-[40px] border border-slate-100 shadow-sm flex lg:flex-col overflow-x-auto no-scrollbar gap-1 md:gap-2">
                            {[
                                { id: 'profil', label: 'Profil', icon: <User size={18} /> },
                                { id: 'keamanan', label: 'Keamanan', icon: <Shield size={18} /> },
                                { id: 'notifikasi', label: 'Notifikasi', icon: <Bell size={18} /> },
                                { id: 'sistem', label: 'Preferensi', icon: <Database size={18} /> },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => this.setState({ activeTab: tab.id as any })}
                                    className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl text-[11px] md:text-sm font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    {tab.icon} <span className="hidden sm:inline lg:inline">{tab.label}</span>
                                </button>
                            ))}
                            <div className="hidden lg:block pt-8 mt-4 border-t border-slate-50 px-4">
                                <button className="flex items-center gap-4 text-rose-500 text-sm font-black uppercase tracking-widest hover:opacity-70 transition-opacity">
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white min-h-[400px] md:min-h-[600px] rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-sm p-6 md:p-12 transition-all">
                            {activeTab === 'profil' && (
                                <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Profil Personal</h3>
                                        <p className="text-slate-400 font-medium text-xs md:text-sm mt-1">Informasi dasar Anda yang tampil di sistem MBG.</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                        <div className="relative group shrink-0">
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[40px] overflow-hidden border-4 border-slate-50 shadow-xl">
                                                <img src="https://i.pravatar.cc/300?u=tony" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <button className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-white">
                                                <Camera size={14} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1 w-full">
                                            <div className="space-y-1.5 md:space-y-2">
                                                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama</label>
                                                <input type="text" defaultValue="Tony Ahmad Fatoni" className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold focus:ring-4 focus:ring-slate-100 outline-none" />
                                            </div>
                                            <div className="space-y-1.5 md:space-y-2">
                                                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                                <input type="email" defaultValue="ahmadfatoni2025@example.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold focus:ring-4 focus:ring-slate-100 outline-none" />
                                            </div>
                                            <div className="space-y-1.5 md:space-y-2">
                                                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Jabatan</label>
                                                <input type="text" readOnly defaultValue="Admin" className="w-full bg-slate-100 border border-slate-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold text-slate-400" />
                                            </div>
                                            <div className="space-y-1.5 md:space-y-2">
                                                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                                                <input type="text" defaultValue="+62 812..." className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold focus:ring-4 focus:ring-slate-100 outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-50">
                                        <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-4">Zona Berbahaya</h4>
                                        <button className="flex items-center gap-2 px-6 py-3 border-2 border-rose-100 text-rose-500 rounded-2xl text-[10px] font-black uppercase hover:bg-rose-50 transition-all">
                                            <Trash2 size={14} /> Hapus Seluruh Data Personalku
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'keamanan' && (
                                <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">Privasi & Keamanan</h3>
                                        <p className="text-slate-400 font-medium text-xs md:text-sm mt-1">Lindungi akses akun Anda dengan enkripsi standar.</p>
                                    </div>
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="p-6 md:p-8 bg-slate-50 rounded-[32px] md:rounded-[40px] flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-slate-100">
                                            <div className="flex gap-4 md:gap-6">
                                                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 shrink-0"><Lock size={24} /></div>
                                                <div className="min-w-0">
                                                    <h4 className="font-black text-slate-800 text-sm md:text-base">Kata Sandi</h4>
                                                    <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase mt-1">Ganti sandi berkala</p>
                                                </div>
                                            </div>
                                            <button onClick={() => alert("Ubah Password...")} className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Ubah Sandi</button>
                                        </div>
                                        <div className="p-6 md:p-8 bg-slate-50 rounded-[32px] md:rounded-[40px] flex items-center justify-between border border-slate-100">
                                            <div className="flex gap-4 md:gap-6">
                                                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 shrink-0"><Shield size={24} /></div>
                                                <div className="min-w-0">
                                                    <h4 className="font-black text-slate-800 text-sm md:text-base">2FA</h4>
                                                    <p className="text-[9px] md:text-xs text-emerald-500 font-black uppercase mt-1">Aktif</p>
                                                </div>
                                            </div>
                                            <div className="w-12 md:w-14 h-7 md:h-8 bg-slate-900 rounded-full relative p-1 cursor-pointer shrink-0">
                                                <div className="w-5 md:w-6 h-5 md:h-6 bg-white rounded-full absolute right-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifikasi' && (
                                <div className="space-y-12 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pusat Pemberitahuan</h3>
                                        <p className="text-slate-400 font-medium text-sm">Pilih saluran informasi yang ingin Anda pantau.</p>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Alert Stok Opname', desc: 'Kirim via Push & WhatsApp', active: true },
                                            { label: 'Laporan Keuangan Bulanan', desc: 'Kirim via Email PDF', active: true },
                                            { label: 'Update Kepegawaian', desc: 'Push Notif Browser', active: false },
                                            { label: 'Log Aktivitas Keamanan', desc: 'Kirim via System Log Only', active: true },
                                        ].map((n, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer">
                                                <div>
                                                    <h4 className="font-black text-slate-800 text-sm">{n.label}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{n.desc}</p>
                                                </div>
                                                <div className={`w-12 h-7 rounded-full relative transition-all ${n.active ? 'bg-slate-900' : 'bg-slate-100'}`}>
                                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${n.active ? 'right-1' : 'left-1'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'sistem' && (
                                <div className="space-y-12 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Preferensi UI & Lokalisasi</h3>
                                        <p className="text-slate-400 font-medium text-sm">Sesuaikan tampilan dashboard dengan gaya kerja Anda.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tema Visual</label>
                                            <div className="flex gap-4">
                                                <button onClick={() => this.setState({ darkMode: false })} className={`flex-1 p-6 border-2 rounded-[32px] flex flex-col items-center gap-3 transition-all ${!darkMode ? 'border-slate-900 bg-slate-200' : 'border-slate-100 opacity-50'}`}>
                                                    <Laptop size={24} />
                                                    <span className="text-[10px] font-black uppercase">Terang</span>
                                                </button>
                                                <button onClick={() => this.setState({ darkMode: true })} className={`flex-1 p-6 border-2 rounded-[32px] flex flex-col items-center gap-3 transition-all ${darkMode ? 'border-slate-900 bg-slate-900 text-white shadow-2xl' : 'border-slate-100 opacity-50'}`}>
                                                    <Moon size={24} />
                                                    <span className="text-[10px] font-black uppercase">Gelap</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bahasa Sistem</label>
                                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px]">
                                                <div className="flex items-center gap-4 text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
                                                    <Globe size={18} /> {language}
                                                </div>
                                                <div className="space-y-2">
                                                    {['Bahasa Indonesia', 'English (Global)'].map(lang => (
                                                        <button
                                                            key={lang}
                                                            onClick={() => this.setState({ language: lang })}
                                                            className={`w-full text-left px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center justify-between ${language === lang ? 'bg-slate-900 text-white' : 'hover:bg-white'}`}
                                                        >
                                                            {lang} {language === lang && <Check size={12} />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 rounded-[32px] md:rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 bg-white/50">
                    <div>
                        <h4 className="text-sm md:text-base font-black text-slate-900 tracking-tight">SmartMBG Enterprise Suite</h4>
                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Version 4.2.0-stable</p>
                    </div>
                    <button onClick={() => alert("Versi terbaru.")} className="w-full md:w-auto px-8 py-3 bg-white border border-slate-100 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
                        Cek Update
                    </button>
                </div>
            </div>
        );
    }
}

export default Pengaturan;
