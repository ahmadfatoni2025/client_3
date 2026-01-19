import { Component } from 'react';
import {
    Mail,
    Inbox,
    Send,
    Star,
    Trash2,
    Search,
    Plus,
    Archive,
    AlertCircle,
    RotateCcw,
    Paperclip,
    Maximize2,
    X,
    User,
    LayoutDashboard
} from 'lucide-react';



interface EmailItem {
    id: string;
    sender: string;
    subject: string;
    time: string;
    preview: string;
    isRead: boolean;
    isStarred: boolean;
    category: 'Inbox' | 'Sent' | 'Spam' | 'Trash';
}

interface State {
    activeTab: 'Inbox' | 'Sent' | 'Starred' | 'Trash';
    searchQuery: string;
    emails: EmailItem[];
    selectedEmail: EmailItem | null;
    isComposing: boolean;
}

import { EMAIL_DATA } from '../data/mockData';

export class Email extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 'Inbox',
            searchQuery: '',
            selectedEmail: null,
            isComposing: false,
            emails: EMAIL_DATA.map(e => ({ ...e, category: e.category as 'Inbox' | 'Sent' | 'Spam' | 'Trash' }))
        };
    }

    render() {
        const { activeTab, emails, searchQuery, selectedEmail, isComposing } = this.state;
        const filteredEmails = emails.filter(e =>
            e.category === activeTab &&
            (e.sender.toLowerCase().includes(searchQuery.toLowerCase()) || e.subject.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        return (
            <div className="h-[calc(100vh-160px)] flex flex-col gap-6 animate-in fade-in duration-700">
                {/* Email Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-[18px] md:rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0">
                            <Mail size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Enterprise Mail</h1>
                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">MBG Communications</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 md:pl-11 pr-4 text-xs font-bold focus:ring-4 focus:ring-slate-100 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                            />
                        </div>
                        <button onClick={() => this.setState({ isComposing: true })} className="flex items-center justify-center gap-1.5 px-4 md:px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                            <Plus size={14} /> <span className="hidden xs:inline">Tulis</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                    {/* Sidebar Nav */}
                    <div className={`
                        w-64 bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 p-4 md:p-6 flex-col gap-2 shrink-0 shadow-sm transition-all duration-300
                        ${selectedEmail ? 'hidden lg:flex' : 'hidden md:flex'}
                    `}>
                        {[
                            { id: 'Inbox', icon: <Inbox size={18} />, count: 12 },
                            { id: 'Sent', icon: <Send size={18} />, count: 0 },
                            { id: 'Starred', icon: <Star size={18} />, count: 5 },
                            { id: 'Trash', icon: <Trash2 size={18} />, count: 0 },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => this.setState({ activeTab: tab.id as any, selectedEmail: null })}
                                className={`w-full flex items-center justify-between px-5 py-3.5 md:py-4 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    {tab.icon} {tab.id}
                                </div>
                                {tab.count > 0 && <span className={`text-[9px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{tab.count}</span>}
                            </button>
                        ))}
                        <div className="mt-auto p-4 md:p-6 bg-slate-50 rounded-[28px] md:rounded-[32px] border border-slate-100 text-center hidden md:block">
                            <AlertCircle size={20} className="text-slate-300 mx-auto mb-3" />
                            <p className="text-[9px] font-black text-slate-400 uppercase leading-relaxed">Storage: 20%</p>
                            <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-slate-900 w-1/5" />
                            </div>
                        </div>
                    </div>

                    {/* Email List or Detail */}
                    <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                        {/* List Column */}
                        <div className={`
                            bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300
                            ${selectedEmail ? 'hidden md:flex md:w-2/5' : 'flex w-full'}
                        `}>
                            <div className="p-4 md:p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
                                <h3 className="text-[10px] md:text-sm font-black text-slate-900 uppercase tracking-widest">{activeTab}</h3>
                                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><RotateCcw size={16} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {filteredEmails.map(email => (
                                    <div
                                        key={email.id}
                                        onClick={() => this.setState({ selectedEmail: email })}
                                        className={`p-4 md:p-6 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50 group relative ${selectedEmail?.id === email.id ? 'bg-slate-50 md:border-r-4 md:border-r-slate-900' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-1.5 md:mb-2 text-wrap break-all min-w-0">
                                            <div className="flex items-center gap-2 min-w-0">
                                                {!email.isRead && <div className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />}
                                                <span className={`text-[13px] md:text-sm truncate ${!email.isRead ? 'font-black text-slate-900' : 'font-bold text-slate-500'}`}>{email.sender}</span>
                                            </div>
                                            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 shrink-0">{email.time}</span>
                                        </div>
                                        <p className={`text-[12px] md:text-xs truncate ${!email.isRead ? 'font-black text-slate-800' : 'font-bold text-slate-600'} mb-1`}>{email.subject}</p>
                                        <p className="text-[10px] md:text-[11px] text-slate-400 font-medium line-clamp-1">{email.preview}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detail Column */}
                        {selectedEmail && (
                            <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-in slide-in-from-right-4 duration-500">
                                <div className="px-4 md:px-8 py-4 md:py-5 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <button onClick={() => this.setState({ selectedEmail: null })} className="p-2 text-slate-400 hover:text-slate-900"><X size={20} /></button>
                                        <div className="flex gap-1 md:gap-2">
                                            <button className="p-2 md:p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900"><Archive size={18} /></button>
                                            <button className="p-2 md:p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedEmail.time}</span>
                                        <button className="hidden sm:block p-2 text-slate-400 hover:text-slate-900"><Maximize2 size={18} /></button>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-6 md:space-y-8 no-scrollbar bg-white">
                                    <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{selectedEmail.subject}</h2>
                                    <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-slate-50 rounded-[24px] md:rounded-3xl border border-slate-100">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 shrink-0"><User size={24} /></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs md:text-sm font-black text-slate-900 truncate">{selectedEmail.sender}</p>
                                            <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Kepada: saya</p>
                                        </div>
                                    </div>
                                    <div className="text-slate-600 font-medium leading-[1.6] md:leading-[1.8] text-[13px] md:text-base space-y-4">
                                        <p>Yth. Pengelola MBG,</p>
                                        <p>{selectedEmail.preview}...</p>
                                        <p className="text-xs italic text-slate-400 mt-8 border-t border-slate-50 pt-4">Konten email lengkap dimuat dalam tampilan desktop.</p>
                                    </div>
                                </div>
                                <div className="p-4 md:p-8 border-t border-slate-50 bg-slate-50/50 flex flex-col sm:flex-row gap-2 md:gap-4 shrink-0">
                                    <button className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">Balas</button>
                                    <button className="flex-1 py-3.5 bg-white border border-slate-100 text-slate-900 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm active:scale-95 transition-all">Teruskan</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Compose Modal */}
                {isComposing && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-3xl overflow-hidden border border-slate-100 animate-in zoom-in duration-300">
                            <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black">Pesan Baru</h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">Draft Email Government Center</p>
                                </div>
                                <button onClick={() => this.setState({ isComposing: false })} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={24} /></button>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-12">Kepada</span>
                                    <input type="text" placeholder="alamat@email.com" className="flex-1 bg-transparent border-none text-sm font-bold focus:outline-none" />
                                </div>
                                <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-12">Subjek</span>
                                    <input type="text" placeholder="Judul pesan Anda" className="flex-1 bg-transparent border-none text-sm font-bold focus:outline-none" />
                                </div>
                                <textarea rows={10} placeholder="Tulis pesan Anda di sini..." className="w-full bg-slate-50 border border-slate-50 rounded-3xl p-6 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-slate-50 outline-none transition-all resize-none" />
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex gap-2">
                                        <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"><Paperclip size={20} /></button>
                                        <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"><LayoutDashboard size={20} /></button>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => this.setState({ isComposing: false })} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Simpan Draft</button>
                                        <button onClick={() => { this.setState({ isComposing: false }); alert("Email Berhasil Dikirim ke Tujuan."); }} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center gap-3">
                                            <Send size={16} /> Kirim Sekarang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Email;
