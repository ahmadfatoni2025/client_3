import { Component } from 'react';
import {
    Search,
    Book,
    MessageCircle,
    PlayCircle,
    Shield,
    ExternalLink,
    ChevronRight,
    ArrowRight,
    Mail,
    Phone
} from 'lucide-react';

export class Help extends Component {
    render() {
        return (
            <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
                {/* Help Search Section */}
                <div className="relative min-h-[320px] md:h-96 rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-8 bg-slate-900 shadow-2xl">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-[80px] md:blur-[120px] -ml-32 -mt-32 md:-ml-48 md:-mt-48" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-indigo-500 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mb-32 md:-mr-48 md:-mb-48" />
                    </div>
                    <div className="relative z-10 space-y-4 md:space-y-6 max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Apa yang bisa kami bantu?</h1>
                        <p className="text-slate-400 font-medium text-xs md:text-base px-4">Cari panduan, FAQ, atau hubungi tim bantuan teknis MBG.</p>
                        <div className="relative w-full mt-4 md:mt-8 group px-4 md:px-0">
                            <Search className="absolute left-10 md:left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Cari masalah..."
                                className="w-full bg-white/10 border border-white/10 rounded-[24px] md:rounded-[32px] py-4 md:py-6 pl-14 md:pl-16 pr-8 text-white text-sm md:text-lg font-bold focus:bg-white/20 focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>
                </div>

                {/*                {/* Quick Help Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        { title: 'Dokumentasi Sistem', desc: 'Panduan lengkap penggunaan setiap modul MBG.', icon: <Book />, color: 'emerald' },
                        { title: 'Video Tutorial', desc: 'Pelajari visual pengoperasian dashboard & IoT.', icon: <PlayCircle />, color: 'indigo' },
                        { title: 'Keamanan & Kebijakan', desc: 'Standar privasi data dan regulasi pemerintah.', icon: <Shield />, color: 'amber' },
                    ].map((card, i) => (
                        <div key={i} className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col">
                            <div className={`w-12 h-12 md:w-16 md:h-16 bg-${card.color}-50 text-${card.color}-600 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8`}>
                                {card.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">{card.title}</h3>
                            <p className="text-[13px] md:text-base text-slate-500 font-medium leading-relaxed mb-6 md:mb-10">{card.desc}</p>
                            <button className="mt-auto flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-900 hover:gap-4 transition-all">
                                Buka Modul <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/*                {/* FAQ Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-6 md:space-y-8">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900">Pertanyaan Populer</h2>
                        <div className="space-y-3 md:space-y-4">
                            {[
                                'Bagaimana cara mendaftarkan sekolah baru?',
                                'Lupa password akun operator dapur?',
                                'Integrasi data dengan Dapodik mengalami kendala?',
                                'Cara reset API Key yang sudah expired?',
                            ].map((q, i) => (
                                <button key={i} className="w-full text-left p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100 hover:border-slate-900 transition-all flex items-center justify-between group">
                                    <span className="font-bold text-slate-700 text-sm md:text-base pr-4">{q}</span>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Support Contact */}
                    <div className="bg-slate-50 rounded-[40px] md:rounded-[60px] p-8 md:p-12 space-y-8 md:space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block"><MessageCircle size={120} /></div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Butuh Bantuan?</h2>
                            <p className="text-slate-500 font-medium text-sm md:text-base mt-2">Tim support kami tersedia Senin - Jumat</p>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100">
                                <div className="p-3 md:p-4 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl shrink-0"><Mail size={24} /></div>
                                <div className="min-w-0">
                                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                                    <p className="font-black text-slate-900 text-sm md:text-base truncate">support@mbg.go.id</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100">
                                <div className="p-3 md:p-4 bg-indigo-50 text-indigo-600 rounded-xl md:rounded-2xl shrink-0"><Phone size={24} /></div>
                                <div className="min-w-0">
                                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Center</p>
                                    <p className="font-black text-slate-900 text-sm md:text-base truncate">0800-123-4567</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => alert("Menghubungkan ke Tim Support...")} className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-2xl md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-2xl active:scale-95 transition-all">
                            Hubungi Tim Sekarang
                        </button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Versi Aplikasi: v4.2.0-stable</span>
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">SLA Status: 99.9% Online</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-[11px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest flex items-center gap-1">Term of Service <ExternalLink size={12} /></button>
                        <button className="text-[11px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest flex items-center gap-1">Privacy Policy <ExternalLink size={12} /></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;
