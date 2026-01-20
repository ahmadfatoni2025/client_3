import { Component } from 'react';
import {
    Flame,
    AlertCircle,
    Thermometer,
    History,
    Plus,
    Play,
    Check,
    UtensilsCrossed,
    ShieldCheck,
    Trash2,
    FlaskConical,
    Activity,
    ClipboardCheck
} from 'lucide-react';


interface ProductionBatch {
    id: string;
    meal_time: string;
    target_portions: number;
    status: string;
    recipes: {
        name: string;
    };
    chef?: string;
}

interface KitchenLog {
    id: string;
    created_at: string;
    status: string;
    chef_id?: string;
    menu_plan_id: string;
    menu_plans?: {
        recipes?: {
            name: string;
        }
    };
    profiles?: {
        full_name: string;
    };
}

interface State {
    batches: ProductionBatch[];
    activeKitchens: number;
    totalMealsPrepared: number;
    isModalOpen: boolean;
    newBatch: {
        recipeId: string;
        targetPortions: number;
        chefId: string;
        mealTime: string;
        date: string;
    };
    isLoading: boolean;
    errorMessage: string | null;

    // Advanced Features State
    currentTemp: number;
    sopChecked: Record<string, boolean>;
    apdCompliance: Record<string, boolean>;
    waste: { organic: number, inorganic: number };
    sampling: { id: string, name: string, time: string, status: string }[];
    logs: KitchenLog[];
    activeTab: 'produksi' | 'sop' | 'qc' | 'waste';
    recipes: { id: string, name: string }[];
    chefs: { id: string, full_name: string }[];
}

export class Dapur extends Component<{}, State> {
    private tempInterval: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            activeKitchens: 4,
            totalMealsPrepared: 1250,
            isModalOpen: false,
            isLoading: false,
            errorMessage: null,
            activeTab: 'produksi',
            currentTemp: 24.5,
            newBatch: {
                recipeId: '',
                targetPortions: 100,
                chefId: '',
                mealTime: 'Siang',
                date: new Date().toISOString().split('T')[0]
            },
            sopChecked: {
                'hygiene-pribadi': true,
                'sterilisasi-area': true,
                'cek-sampel-bahan': true,
                'suhu-chiller': false,
                'kebersihan-drainase': true
            },
            apdCompliance: {
                'masker-medis': true,
                'sarung-tangan-latex': true,
                'celemek-anti-air': true,
                'hairnet': false
            },
            waste: { organic: 12.5, inorganic: 3.2 },
            sampling: [
                { id: "SMP-001", name: "Ayam Serundeng", time: "06:30", status: "Aman" },
                { id: "SMP-002", name: "Buncis Tumis", time: "06:45", status: "Proses Lab" }
            ],
            logs: [],
            batches: [],
            recipes: [],
            chefs: []
        };
    }

    componentDidMount() {
        this.fetchData();
        // IoT Temperature Simulation
        this.tempInterval = setInterval(() => {
            this.setState(prev => ({
                currentTemp: Number((prev.currentTemp + (Math.random() * 0.4 - 0.2)).toFixed(1))
            }));
        }, 3000);
    }

    fetchData = async () => {
        this.setState({ isLoading: true });
        try {
            const [tasksRes, recipesRes, chefsRes, logsRes] = await Promise.all([
                fetch('http://localhost:5000/api/kitchen/tasks'),
                fetch('http://localhost:5000/api/nutrition/recipes'),
                fetch('http://localhost:5000/api/profiles'),
                fetch('http://localhost:5000/api/kitchen/logs')
            ]);

            const tasksData = await tasksRes.json();
            const recipesData = await recipesRes.json();
            const chefsData = await chefsRes.json();
            const logsData = await logsRes.json();

            this.setState({
                batches: tasksData.success ? tasksData.data : [],
                recipes: recipesData.success ? recipesData.data : [],
                chefs: chefsData.success ? chefsData.data : [],
                logs: logsData.success ? logsData.data : [],
                isLoading: false
            });
        } catch (error) {
            this.setState({ errorMessage: 'Koneksi ke server gagal', isLoading: false });
        }
    };

    handleUpdateStatus = async (menuPlanId: string, nextStatus: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/kitchen/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    menuPlanId,
                    status: nextStatus,
                    chefId: this.state.chefs[0]?.id // Default to first chef for simulation
                })
            });
            const result = await response.json();
            if (result.success) {
                this.fetchData();
            } else {
                alert('Gagal update status: ' + result.message);
            }
        } catch (error) {
            alert('Terjadi kesalahan koneksi');
        }
    };

    handleNewBatch = async (e: React.FormEvent) => {
        e.preventDefault();
        const { newBatch } = this.state;
        try {
            const response = await fetch('http://localhost:5000/api/nutrition/menu-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBatch)
            });
            const result = await response.json();
            if (result.success) {
                this.setState({ isModalOpen: false });
                this.fetchData();
            } else {
                alert('Gagal membuat rencana: ' + result.message);
            }
        } catch (error) {
            alert('Kesalahan koneksi');
        }
    };

    componentWillUnmount() {
        clearInterval(this.tempInterval);
    }

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

    toggleSop = (key: string) => this.setState(prev => ({
        sopChecked: { ...prev.sopChecked, [key]: !prev.sopChecked[key] }
    }));

    toggleApd = (key: string) => this.setState(prev => ({
        apdCompliance: { ...prev.apdCompliance, [key]: !prev.apdCompliance[key] }
    }));

    handleWasteUpdate = (type: 'organic' | 'inorganic', val: number) => {
        this.setState(prev => ({
            waste: { ...prev.waste, [type]: Math.max(0, prev.waste[type] + val) }
        }));
    };

    getStatusProgress = (status: string) => {
        switch (status) {
            case 'PLANNED': return 5;
            case 'PERSIAPAN': return 25;
            case 'MEMASAK': return 60;
            case 'PACKING': return 90;
            case 'DONE': return 100;
            default: return 0;
        }
    };

    getStatusColor = (status: string) => {
        switch (status) {
            case 'PLANNED': return 'bg-slate-100 text-slate-500';
            case 'PERSIAPAN': return 'bg-blue-50 text-blue-600';
            case 'MEMASAK': return 'bg-orange-50 text-orange-600';
            case 'PACKING': return 'bg-purple-50 text-purple-600';
            case 'DONE': return 'bg-emerald-50 text-emerald-600';
            default: return 'bg-slate-50 text-slate-400';
        }
    };

    getNextStatus = (status: string) => {
        switch (status) {
            case 'PLANNED': return 'PERSIAPAN';
            case 'PERSIAPAN': return 'MEMASAK';
            case 'MEMASAK': return 'PACKING';
            case 'PACKING': return 'DONE';
            default: return null;
        }
    };

    render() {
        const { batches, currentTemp, sopChecked, apdCompliance, waste, sampling, logs, activeTab, isModalOpen } = this.state;

        return (
            <div className="space-y-6 pb-20">
                {/* Tab Navigation */}
                <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 w-full md:w-fit shadow-sm overflow-x-auto no-scrollbar gap-1">
                    {[
                        { id: 'produksi', label: 'Produksi', icon: <Flame size={16} /> },
                        { id: 'sop', label: 'SOP', icon: <ClipboardCheck size={16} /> },
                        { id: 'qc', label: 'QC', icon: <FlaskConical size={16} /> },
                        { id: 'waste', label: 'Waste', icon: <Trash2 size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => this.setState({ activeTab: tab.id as any })}
                            className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                    <div className="flex flex-wrap items-center gap-4 relative z-10 md:justify-end">
                        <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                                <Activity size={16} className="text-orange-500 animate-pulse md:w-[18px] md:h-[18px]" />
                                <span className="text-[12px] md:text-sm font-black text-slate-700">Live IoT</span>
                            </div>
                            <p className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-tighter">12 Sensors Active</p>
                        </div>
                        <div className="hidden md:block h-12 w-px bg-slate-100 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className={`text-right ${currentTemp > 26 ? 'text-red-500' : 'text-emerald-500'}`}>
                                <p className="text-[9px] font-black uppercase">Suhu Dapur</p>
                                <h4 className="text-xl md:text-2xl font-black">{currentTemp}°C</h4>
                            </div>
                            <Thermometer size={20} className={`md:w-6 md:h-6 ${currentTemp > 26 ? 'text-red-500' : 'text-emerald-500'}`} />
                        </div>
                    </div>
                </div>

                {/* Tab Contents */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'produksi' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 italic">
                                        <UtensilsCrossed size={20} className="text-orange-500" /> Antrean Batch Aktif
                                    </h2>
                                    <button onClick={this.toggleModal} className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 active:scale-95">
                                        <Plus size={16} /> Register New Batch
                                    </button>
                                </div>

                                {this.state.isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                                        <Activity size={48} className="text-orange-500 animate-spin mb-4" />
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sinkronisasi Database Dapur...</p>
                                    </div>
                                ) : batches.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                                        <UtensilsCrossed size={48} className="text-slate-200 mb-4" />
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tidak ada antrean masak aktif</p>
                                    </div>
                                ) : batches.map(batch => (
                                    <div key={batch.id} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all border-l-[6px] border-l-orange-500">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${this.getStatusColor(batch.status)}`}>
                                                        {batch.status}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-3 mr-3">ID: {batch.id.slice(0, 8)}</span>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                                        <History size={14} /> {batch.meal_time}
                                                    </div>
                                                </div>
                                                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{batch.recipes?.name || 'Menu Unnamed'}</h4>
                                                <div className="flex flex-wrap items-center gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                                            <Activity size={14} className="text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Target</p>
                                                            <p className="text-xs font-black text-slate-700">{batch.target_portions} Porsi</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                                            <Thermometer size={14} className="text-orange-500" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Temp. Masak</p>
                                                            <p className="text-xs font-black text-slate-700">72.4°C</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full md:w-auto">
                                                {this.getNextStatus(batch.status) ? (
                                                    <button
                                                        onClick={() => this.handleUpdateStatus(batch.id, this.getNextStatus(batch.status)!)}
                                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all active:scale-95 group"
                                                    >
                                                        {batch.status === 'PLANNED' ? 'Mulai Persiapan' :
                                                            batch.status === 'PERSIAPAN' ? 'Mulai Memasak' :
                                                                batch.status === 'MEMASAK' ? 'Proses Packing' :
                                                                    'Finalisasi Batch'}
                                                        <Play size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                ) : (
                                                    <div className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-100">
                                                        <Check size={16} /> Batch Selesai
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-2">
                                            <div className="flex justify-between items-end">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    Process Integrity <span className="text-xs font-bold text-slate-600">{this.getStatusProgress(batch.status)}%</span>
                                                </p>
                                                <span className="text-[10px] font-bold text-emerald-500 italic">No violations detected</span>
                                            </div>
                                            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <div
                                                    className="h-full bg-orange-500 transition-all duration-1000 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                                                    style={{ width: `${this.getStatusProgress(batch.status)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'sop' && (
                            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                        <ShieldCheck size={24} className="text-emerald-500" /> Digital Checklist SOP & Hygiene
                                    </h3>
                                    <p className="text-sm text-slate-400 font-medium">Kepatuhan standar kebersihan dapur MBG harian.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Hygienitas Fasilitas</p>
                                        {Object.entries(sopChecked).map(([key, val]) => (
                                            <label key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer group hover:bg-white hover:shadow-md transition-all">
                                                <span className="text-sm font-bold text-slate-700 capitalize">{key.replace(/-/g, ' ')}</span>
                                                <input type="checkbox" checked={val} onChange={() => this.toggleSop(key)} className="hidden" />
                                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${val ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-300'}`}>
                                                    {val && <Check size={14} className="text-white" strokeWidth={4} />}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Kepatuhan APD Tim</p>
                                        {Object.entries(apdCompliance).map(([key, val]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <span className="text-sm font-bold text-slate-700 capitalize">{key.replace(/-/g, ' ')}</span>
                                                <button
                                                    onClick={() => this.toggleApd(key)}
                                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${val ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-red-100 text-red-600 border border-red-200 animate-pulse'}`}
                                                >
                                                    {val ? 'Patuh' : 'Peringatan'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'qc' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                        <FlaskConical size={24} className="text-blue-500" /> Sampling Forensik & QC
                                    </h3>
                                    <div className="space-y-4">
                                        {sampling.map(s => (
                                            <div key={s.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                                                        <FlaskConical size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-800">{s.name}</h4>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sampel ID: {s.id} • Jam: {s.time}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest ${s.status === 'Aman' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                    {s.status}
                                                </span>
                                            </div>
                                        ))}
                                        <button onClick={() => alert("Menambahkan sampel QC baru...")} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 active:scale-95 transition-all mt-4">
                                            Ambil Sampel Baru
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'waste' && (
                            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Food Waste Tracking (Limbah)</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                    <div className="p-6 md:p-8 bg-emerald-50 rounded-[32px] md:rounded-[40px] border border-emerald-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform"><Trash2 size={80} /></div>
                                        <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em]">Limbah Organik</p>
                                        <h4 className="text-3xl md:text-4xl font-black text-emerald-900 mt-2">{waste.organic} <span className="text-lg md:text-xl font-bold">kg</span></h4>
                                        <div className="flex gap-2 mt-6 relative z-10">
                                            <button onClick={() => this.handleWasteUpdate('organic', 0.5)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-black shadow-sm active:scale-95">+</button>
                                            <button onClick={() => this.handleWasteUpdate('organic', -0.5)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-black shadow-sm active:scale-95">-</button>
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-8 bg-slate-50 rounded-[32px] md:rounded-[40px] border border-slate-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform"><Trash2 size={80} /></div>
                                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Limbah Anorganik</p>
                                        <h4 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">{waste.inorganic} <span className="text-lg md:text-xl font-bold">kg</span></h4>
                                        <div className="flex gap-2 mt-6 relative z-10">
                                            <button onClick={() => this.handleWasteUpdate('inorganic', 0.1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-black shadow-sm active:scale-95">+</button>
                                            <button onClick={() => this.handleWasteUpdate('inorganic', -0.1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-black shadow-sm active:scale-95">-</button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => alert("Laporan limbah dikirim ke Dinas Lingkungan Hidup.")} className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95">
                                    Kirim Laporan Waste Harian
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Mini Log & Stats */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                                    <History size={20} className="text-orange-400" /> Log Produksi Terakhir
                                </h3>
                                <div className="space-y-6">
                                    {logs.length === 0 ? (
                                        <p className="text-[10px] text-slate-500 italic">Belum ada aktivitas tercatat</p>
                                    ) : (
                                        logs.map((log: KitchenLog, i: number) => (
                                            <div key={log.id} className="flex gap-4 relative group">
                                                {i !== logs.length - 1 && <div className="absolute left-1 top-6 bottom-0 w-0.5 bg-slate-800" />}
                                                <div className={`w-2 h-2 rounded-full mt-2 border-4 border-slate-900 shadow-[0_0_10px_rgba(249,115,22,0.5)] ${log.status === 'DONE' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                                <div>
                                                    <p className="text-[11px] font-black text-slate-200">{log.menu_plans?.recipes?.name || 'Unknown Menu'}</p>
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-widest">
                                                        {new Date(log.created_at).toLocaleTimeString()} • {log.status} • {log.profiles?.full_name || 'Chef'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <button onClick={() => alert("Downloading Digital Production Log PDF...")} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                                    Download Log Digital
                                </button>
                            </div>
                        </div>

                        {/* Inventory Quick Alert */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                            <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                                <AlertCircle size={18} className="text-red-500" /> Critical Stock
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-2xl border border-red-100">
                                    <span className="text-xs font-black text-red-700">Garam Dapur</span>
                                    <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-md font-black">Re-order</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-2xl border border-orange-100">
                                    <span className="text-xs font-black text-orange-700">Minyak Goreng</span>
                                    <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-md font-black text-center">3L Sisa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Batch Modal (Identical to previous logic but consistent styling) */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden border border-slate-100">
                            <div className="bg-orange-500 p-8 text-white">
                                <h2 className="text-2xl font-black">Register Batch Baru</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">SmartKitchen Production System</p>
                            </div>
                            <form onSubmit={this.handleNewBatch} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih Resep / Menu</label>
                                    <select
                                        required
                                        value={this.state.newBatch.recipeId}
                                        onChange={(e) => this.setState({ newBatch: { ...this.state.newBatch, recipeId: e.target.value } })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-orange-100 outline-none transition-all appearance-none"
                                    >
                                        <option value="">Pilih Menu...</option>
                                        {this.state.recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Porsi</label>
                                        <input
                                            required
                                            type="number"
                                            value={this.state.newBatch.targetPortions}
                                            onChange={(e) => this.setState({ newBatch: { ...this.state.newBatch, targetPortions: parseInt(e.target.value) } })}
                                            placeholder="500"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Waktu Makan</label>
                                        <select
                                            required
                                            value={this.state.newBatch.mealTime}
                                            onChange={(e) => this.setState({ newBatch: { ...this.state.newBatch, mealTime: e.target.value } })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold"
                                        >
                                            <option value="Pagi">Pagi</option>
                                            <option value="Siang">Siang</option>
                                            <option value="Sore">Sore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chef On-Duty</label>
                                    <select
                                        required
                                        value={this.state.newBatch.chefId}
                                        onChange={(e) => this.setState({ newBatch: { ...this.state.newBatch, chefId: e.target.value } })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold"
                                    >
                                        <option value="">Pilih Chef...</option>
                                        {this.state.chefs.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={this.toggleModal} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
                                    <button type="submit" className="flex-2 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-100 active:scale-95 transition-all">Mulai Produksi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Dapur;
