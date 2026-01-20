import { Component } from 'react';
import {
    Send,
    Search,
    User,
    Paperclip,
    MoreVertical,
    School,
    Truck,
    Users,
    CheckCheck,
    PhoneCall,
    Video,
    Smile,
    Plus,
    X,
    MessageSquare
} from 'lucide-react';


interface Message {
    id: string;
    sender: string;
    text: string;
    time: string;
    isMe: boolean;
}

interface ChatGroup {
    id: string;
    name: string;
    lastMsg: string;
    time: string;
    type: 'Sekolah' | 'Pemasok' | 'Internal';
    unread: number;
    online: boolean;
}

interface State {
    activeChatId: string;
    groups: ChatGroup[];
    allMessages: Record<string, Message[]>;
    newMessage: string;
    searchQuery: string;
    filterType: 'Semua' | 'Sekolah' | 'Pemasok' | 'Internal';
    isNewChatModalOpen: boolean;
    isMobileListView: boolean;
}

import { MESSAGE_GROUPS, ALL_MESSAGES } from '../data/mockData';

export class Messages extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeChatId: "1",
            newMessage: "",
            searchQuery: "",
            filterType: 'Semua',
            isNewChatModalOpen: false,
            isMobileListView: true,
            groups: MESSAGE_GROUPS.map(g => ({ ...g, type: g.type as 'Sekolah' | 'Pemasok' | 'Internal' })),
            allMessages: ALL_MESSAGES
        };
    }

    getTypeIcon = (type: string) => {
        switch (type) {
            case 'Sekolah': return <School size={16} className="text-emerald-500" />;
            case 'Pemasok': return <Truck size={16} className="text-blue-500" />;
            case 'Internal': return <Users size={16} className="text-orange-500" />;
            default: return <User size={16} />;
        }
    }

    handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const { newMessage, activeChatId, allMessages } = this.state;
        if (!newMessage.trim()) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            sender: "Me",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        const currentMsgs = allMessages[activeChatId] || [];

        this.setState(prev => ({
            allMessages: {
                ...prev.allMessages,
                [activeChatId]: [...currentMsgs, newMsg]
            },
            newMessage: "",
            // Update last message in group
            groups: prev.groups.map(g => g.id === activeChatId ? { ...g, lastMsg: newMessage, time: "Sekarang" } : g)
        }));
    }

    toggleNewChatModal = () => this.setState({ isNewChatModalOpen: !this.state.isNewChatModalOpen });

    handleCall = () => {
        const activeChat = this.state.groups.find(g => g.id === this.state.activeChatId);
        alert(`Sedang melakukan panggilan suara ke: ${activeChat?.name}...`);
    };

    handleVideoCall = () => {
        const activeChat = this.state.groups.find(g => g.id === this.state.activeChatId);
        alert(`Sedang melakukan panggilan video ke: ${activeChat?.name}...`);
    };

    handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchQuery: e.target.value });
    };

    handleFilter = (type: any) => {
        this.setState({ filterType: type });
    };

    render() {
        const { activeChatId, groups, allMessages, newMessage, searchQuery, filterType, isNewChatModalOpen, isMobileListView } = this.state;
        const activeChat = groups.find(g => g.id === activeChatId);
        const currentMessages = allMessages[activeChatId] || [];

        const filteredGroups = groups.filter(g => {
            const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterType === 'Semua' || g.type === filterType;
            return matchesSearch && matchesFilter;
        });

        return (
            <div className="flex h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 overflow-hidden shadow-sm relative">
                {/* Left Sidebar: Chat List */}
                <div className={`
                    w-full md:w-80 lg:w-96 border-r border-slate-50 flex flex-col bg-slate-50/30 transition-all duration-300
                    ${!isMobileListView ? 'hidden md:flex' : 'flex'}
                `}>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pesan</h2>
                            <button
                                onClick={this.toggleNewChatModal}
                                className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-lg shadow-slate-200"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari percakapan..."
                                className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-slate-100 outline-none transition-all shadow-sm"
                                value={searchQuery}
                                onChange={this.handleSearch}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
                            {['Semua', 'Sekolah', 'Pemasok', 'Internal'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => this.handleFilter(cat)}
                                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${filterType === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
                        {filteredGroups.length > 0 ? filteredGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => this.setState({ activeChatId: group.id, isMobileListView: false })}
                                className={`w-full p-4 rounded-3xl flex items-start gap-4 transition-all text-left group ${activeChatId === group.id ? 'bg-white shadow-xl border border-slate-100' : 'hover:bg-white/60'}`}
                            >
                                <div className="relative">
                                    <div className={`w-12 h-12 ${activeChatId === group.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'} rounded-2xl flex items-center justify-center overflow-hidden transition-colors`}>
                                        <User size={24} />
                                    </div>
                                    {group.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            {this.getTypeIcon(group.type)}
                                            <h4 className="font-black text-slate-800 text-sm truncate">{group.name}</h4>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{group.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${group.unread > 0 ? 'text-slate-900 font-black' : 'text-slate-400 font-medium'}`}>
                                        {group.lastMsg}
                                    </p>
                                </div>
                                {group.unread > 0 && (
                                    <div className="bg-emerald-500 text-white text-[10px] font-black min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center">
                                        {group.unread}
                                    </div>
                                )}
                            </button>
                        )) : (
                            <div className="py-10 text-center space-y-3">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                    <Search size={24} className="text-slate-200" />
                                </div>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Tidak ada hasil</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className={`
                    flex-1 flex-col bg-white transition-all duration-300
                    ${isMobileListView ? 'hidden md:flex' : 'flex'}
                `}>
                    {activeChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="px-4 md:px-8 py-4 md:py-5 border-b border-slate-50 flex items-center justify-between shadow-sm z-10">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <button
                                        onClick={() => this.setState({ isMobileListView: true })}
                                        className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-900"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="w-10 h-10 md:w-11 md:h-11 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 shrink-0">
                                        <User size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-slate-900 tracking-tight leading-none mb-1 truncate text-sm md:text-base">{activeChat.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${activeChat.online ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeChat.online ? 'Online' : 'Offline'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 md:gap-2">
                                    <button onClick={this.handleCall} className="p-2 md:p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-colors active:scale-90">
                                        <PhoneCall size={18} />
                                    </button>
                                    <button onClick={this.handleVideoCall} className="p-2 md:p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-colors active:scale-90">
                                        <Video size={18} />
                                    </button>
                                    <div className="hidden sm:block w-px h-6 bg-slate-100 mx-2" />
                                    <button onClick={() => alert("Membuka Pengaturan Obrolan...")} className="hidden sm:block p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/20 custom-scrollbar">
                                <div className="flex justify-center">
                                    <span className="bg-white border border-slate-100 px-4 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">Percakapan Terenkripsi</span>
                                </div>
                                {currentMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        {!msg.isMe && (
                                            <div className="w-8 h-8 rounded-xl bg-slate-200 mr-3 mt-1 shrink-0 flex items-center justify-center text-[10px] font-black text-slate-500">
                                                {msg.sender[0]}
                                            </div>
                                        )}
                                        <div className={`max-w-[70%] space-y-1`}>
                                            <div className={`p-4 rounded-[24px] text-sm font-medium leading-relaxed ${msg.isMe ? 'bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-200' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'}`}>
                                                {msg.text}
                                            </div>
                                            <div className={`flex items-center gap-2 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{msg.time}</span>
                                                {msg.isMe && <CheckCheck size={12} className="text-blue-500" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 md:p-8 border-t border-slate-50 bg-white">
                                <form onSubmit={this.handleSendMessage} className="flex items-center gap-2 md:gap-3 bg-slate-50 border border-slate-100 rounded-[20px] md:rounded-[24px] p-1.5 md:p-2 focus-within:ring-4 focus-within:ring-slate-50 focus-within:border-slate-200 transition-all">
                                    <button type="button" onClick={() => alert("Emoji panel...")} className="hidden sm:block p-3 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Smile size={20} />
                                    </button>
                                    <button type="button" onClick={() => alert("File attachment...")} className="p-2.5 md:p-3 text-slate-400 hover:text-slate-600 transition-colors">
                                        <Paperclip size={18} />
                                    </button>
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => this.setState({ newMessage: e.target.value })}
                                        placeholder="Ketik pesan..."
                                        className="flex-1 bg-transparent py-2.5 md:py-3 text-[13px] md:text-sm font-bold text-slate-800 outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="bg-slate-900 text-white p-3 md:p-3.5 rounded-[16px] md:rounded-[20px] hover:bg-slate-800 hover:scale-105 transition-all shadow-lg shadow-slate-300 active:scale-95 disabled:opacity-50 disabled:scale-100"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mb-6 border border-slate-100">
                                <MessageSquare size={40} className="text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Pilih Kontak</h3>
                            <p className="text-sm font-medium text-slate-400 max-w-xs leading-relaxed">Pilih salah satu kontak di samping untuk memulai koordinasi program MBG.</p>
                        </div>
                    )}
                </div>

                {/* New Chat Modal */}
                {isNewChatModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-slate-100">
                            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-black">Mulai Obrolan Baru</h2>
                                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-0.5">Cari kontak atau grup</p>
                                </div>
                                <button onClick={this.toggleNewChatModal} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cari Kontak</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input type="text" placeholder="Nama sekolah, pemasok, atau rekan..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-slate-50 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Filter</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Sekolah', 'Pemasok', 'Internal'].map(t => (
                                            <button key={t} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                                                {this.getTypeIcon(t)}
                                                <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-slate-900">{t}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => alert("Fitur pembuatan grup segera hadir!")} className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest border border-dashed border-slate-200 hover:border-slate-900 hover:text-slate-900 transition-all">
                                    + Buat Grup Kerja Baru
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Messages;
