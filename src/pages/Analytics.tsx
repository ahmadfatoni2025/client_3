import { Component } from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    PieChart,
    Download,
    Calendar,
    Target,
    Activity,
    School,
    ChefHat,
    Utensils,
    Filter,
    ChevronDown,
    Map
} from 'lucide-react';

export class Analytics extends Component {
    render() {
        return (
            <div className="space-y-8 pb-20 animate-in fade-in duration-1000">
                {/* Analytics Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40 shrink-0" />
                    <div className="flex items-center gap-4 md:gap-6 relative z-10 min-w-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-600 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-emerald-100 shrink-0">
                            <BarChart3 size={28} />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight truncate">Intelligence</h1>
                            <p className="text-slate-500 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] mt-1 truncate">Data Performa & Analisis</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 relative z-10 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-2 shrink-0">
                            <Calendar size={14} className="text-slate-400 ml-1" />
                            <select className="bg-transparent text-[9px] font-black uppercase tracking-widest outline-none pr-2">
                                <option>Januari 2026</option>
                                <option>Desember 2025</option>
                            </select>
                        </div>
                        <button onClick={() => alert("Exporting report...")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl whitespace-nowrap">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { label: 'Total Porsi', value: '45k', trend: '+12%', icon: <Utensils />, color: 'emerald' },
                        { label: 'Kepuasan', value: '4.8', trend: '+2%', icon: <Users />, color: 'blue' },
                        { label: 'Nutrisi', value: '98%', trend: '-0.4%', icon: <Target />, color: 'amber' },
                        { label: 'Efisiensi', value: '14k', trend: '+5%', icon: <Activity />, color: 'purple' },
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600 w-fit mb-4 md:mb-6 transition-all group-hover:scale-110 shadow-sm`}>
                                {kpi.icon}
                            </div>
                            <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none">{kpi.label}</p>
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 mt-2 md:mt-3">{kpi.value}</h3>
                            <div className={`mt-3 md:mt-4 flex items-center gap-1 text-[10px] md:text-[11px] font-black ${kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {kpi.trend}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analytics Visuals */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Distribution Map / Chart Placeholder */}
                    <div className="lg:col-span-2 bg-white rounded-[32px] md:rounded-[44px] border border-slate-100 p-6 md:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <TrendingUp size={24} className="text-emerald-500 shrink-0" /> <span className="truncate">Tren Penyaluran</span>
                            </h3>
                            <div className="flex gap-1.5 md:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Harian</button>
                                <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Mingguan</button>
                            </div>
                        </div>
                        {/* CSS-based Chart Mockup */}
                        <div className="h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-4 pb-4">
                            {[65, 45, 85, 30, 95, 70, 80, 55, 90, 40, 75, 60].map((h, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        className="w-full bg-slate-50 rounded-t-lg md:rounded-t-xl group-hover:bg-emerald-500 transition-all cursor-help relative"
                                        style={{ height: `${h}%` }}
                                    >
                                    </div>
                                    <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-400 uppercase">W{i + 1}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-slate-50 grid grid-cols-3 gap-4 md:gap-8 text-center">
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase mb-1 md:mb-2 leading-none">Puncak</p>
                                <h4 className="text-sm md:text-2xl font-black text-slate-800">Mei 26</h4>
                            </div>
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase mb-1 md:mb-2 leading-none">Rata-rata</p>
                                <h4 className="text-sm md:text-2xl font-black text-slate-800">1.5k</h4>
                            </div>
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase mb-1 md:mb-2 leading-none">Growth</p>
                                <h4 className="text-sm md:text-2xl font-black text-emerald-500">+18%</h4>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Stats */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-[32px] md:rounded-[44px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 shrink-0" />
                            <h3 className="text-base md:text-lg font-black tracking-tight flex items-center gap-2 mb-6 md:mb-8">
                                <PieChart size={20} className="text-emerald-400 shrink-0" /> Breakdown
                            </h3>
                            <div className="space-y-4 md:space-y-6">
                                {[
                                    { label: 'SD Negeri', val: 65, color: 'bg-emerald-500' },
                                    { label: 'SMP Negeri', val: 25, color: 'bg-blue-500' },
                                    { label: 'Bantuan', val: 10, color: 'bg-amber-500' },
                                ].map((cat, i) => (
                                    <div key={i} className="space-y-1.5 md:space-y-2">
                                        <div className="flex justify-between text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                                            <span className="text-white/60 truncate">{cat.label}</span>
                                            <span className="shrink-0">{cat.val}%</span>
                                        </div>
                                        <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.val}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => alert("Details...")} className="w-full mt-8 md:mt-10 py-3.5 md:py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                View Details
                            </button>
                        </div>

                        {/* Ranking Grid */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4 flex items-center gap-2">
                                <School size={16} /> Top Performing Units
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { name: 'Kitchen Station Area A', score: 99.1, icon: <ChefHat /> },
                                    { name: 'Logistik Wilayah Barat', score: 98.5, icon: <Map /> },
                                    { name: 'SDN 04 Tangerang', score: 97.8, icon: <School /> },
                                ].map((unit, i) => (
                                    <div key={unit.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-800">{unit.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Performance Score</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-black text-slate-900">{unit.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Analytics Filters */}
                <div className="flex flex-col md:flex-row bg-white p-3 rounded-[24px] md:rounded-[32px] border border-slate-100 items-center justify-between shadow-sm gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto px-2 md:pl-4">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest shrink-0">
                            <Filter size={14} /> Filter:
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['Protein', 'Biaya', 'Waste'].map(f => (
                                <button key={f} className="px-3 md:px-4 py-2 bg-slate-50 rounded-xl text-[9px] md:text-[10px] font-black uppercase hover:bg-slate-100 transition-colors flex items-center gap-2 whitespace-nowrap">
                                    {f} <ChevronDown size={12} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => alert("Sync data...")} className="w-full md:w-auto px-6 py-2.5 bg-emerald-600/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600/20 transition-all whitespace-nowrap">
                        Sync Data
                    </button>
                </div>
            </div>
        );
    }
}

export default Analytics;
