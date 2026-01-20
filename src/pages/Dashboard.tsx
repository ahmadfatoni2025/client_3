import { Component } from 'react';
import { TrendingUp, Users, ShoppingBag, ArrowUpRight, MessageSquare, Mail, Star } from 'lucide-react';
import { INVENTORY_DATA, MESSAGE_GROUPS, EMAIL_DATA } from '../data/mockData';

export class Dashboard extends Component {
    render() {
        // Calculate Inventory Stats
        // const totalProducts = INVENTORY_DATA.length;
        const totalRevenue = INVENTORY_DATA.reduce((acc, curr) => {
            const val = parseInt(curr.revenue.replace(/[^0-9]/g, '')) || 0;
            return acc + val;
        }, 0);
        const lowStockItems = INVENTORY_DATA.filter(i => parseInt(i.stock) < 50).length;

        // Calculate Messages Stats
        const unreadMessages = MESSAGE_GROUPS.reduce((acc, curr) => acc + curr.unread, 0);
        const activeChats = MESSAGE_GROUPS.length;

        // Calculate Email Stats
        const unreadEmails = EMAIL_DATA.filter(e => !e.isRead && e.category === 'Inbox').length;

        const stats = [
            {
                label: 'Total Pendapatan',
                value: `Rp ${totalRevenue}jt`,
                desc: 'Dari Inventaris',
                icon: TrendingUp,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50'
            },
            {
                label: 'Pesan Belum Dibaca',
                value: unreadMessages.toString(),
                desc: `${activeChats} Percakapan Aktif`,
                icon: MessageSquare,
                color: 'text-blue-600',
                bg: 'bg-blue-50'
            },
            {
                label: 'Stok Menipis',
                value: lowStockItems.toString(),
                desc: 'Perlu Restock Segera',
                icon: ShoppingBag,
                color: 'text-amber-600',
                bg: 'bg-amber-50'
            },
            {
                label: 'Email Masuk',
                value: unreadEmails.toString(),
                desc: 'Belum Dibaca',
                icon: Mail,
                color: 'text-purple-600',
                bg: 'bg-purple-50'
            },
        ];

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard Utama</h1>
                        <p className="text-slate-500 mt-1">Ringkasan aktivitas dari seluruh sistem MBG.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
                        Refresh Data <ArrowUpRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className={`text-xs font-black uppercase tracking-wider py-1 px-2 rounded-lg ${stat.bg} ${stat.color}`}>Update</span>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-slate-500 text-sm font-bold mb-1">{stat.label}</p>
                            <p className="text-slate-400 text-xs font-medium">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Inventory */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-900">Inventaris Terkini</h3>
                            <button className="text-blue-600 text-sm font-bold hover:underline"><a href="/inventory">Lihat Semua</a></button>
                        </div>
                        <div className="space-y-4">
                            {INVENTORY_DATA.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-xs text-slate-500 font-medium">Stok: {item.stock} • Terjual: {item.sales}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-emerald-600">{item.revenue}</p>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 font-bold justify-end">
                                            <Star size={10} className="fill-orange-400 text-orange-400" /> {item.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-900">Pesan Terbaru</h3>
                            <button className="text-blue-600 text-sm font-bold hover:underline"><a href="/messages">Ke Pesan</a></button>
                        </div>
                        <div className="space-y-4">
                            {MESSAGE_GROUPS.slice(0, 3).map((group) => (
                                <div key={group.id} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                                            <Users size={18} />
                                        </div>
                                        {group.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <h4 className="font-bold text-slate-900 text-sm truncate">{group.name}</h4>
                                            <span className="text-[10px] text-slate-400 font-bold">{group.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{group.lastMsg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
