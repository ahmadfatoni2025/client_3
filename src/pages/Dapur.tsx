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
    menuName: string;
    targetPortions: number;
    currentProgress: number;
    status: 'Persiapan' | 'Memasak' | 'Selesai' | 'Distribusi';
    startTime: string;
    chef: string;
    items: string[];
    temp: number;
}

interface DapurLog {
    time: string;
    temp: number;
    portions: number;
    activity: string;
}

interface State {
    batches: ProductionBatch[];
    activeKitchens: number;
    totalMealsPrepared: number;
    isModalOpen: boolean;
    newBatch: Partial<ProductionBatch>;

    // Advanced Features State
    currentTemp: number;
    sopChecked: Record<string, boolean>;
    apdCompliance: Record<string, boolean>;
    waste: { organic: number, inorganic: number };
    sampling: { id: string, name: string, time: string, status: string }[];
    logs: DapurLog[];
    activeTab: 'produksi' | 'sop' | 'qc' | 'waste';
}

export class Dapur extends Component<{}, State> {
    private tempInterval: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            activeKitchens: 4,
            totalMealsPrepared: 1250,
            isModalOpen: false,
            activeTab: 'produksi',
            currentTemp: 24.5,
            newBatch: { menuName: '', targetPortions: 100, chef: '' },
            sopChecked: {
                'cuci-tangan': true,
                'steril-alat': true,
                'cek-bahan': true,
                'suhu-air': false,
                'kebersihan-lantai': true
            },
            apdCompliance: {
                'masker': true,
                'sarung-tangan': true,
                'celemek': true,
                'penutup-kepala': false
            },
            waste: { organic: 12.5, inorganic: 3.2 },
            sampling: [
                { id: "SMP-001", name: "Ayam Serundeng", time: "06:30", status: "Aman" },
                { id: "SMP-002", name: "Buncis Tumis", time: "06:45", status: "Proses Lab" }
            ],
            logs: [
                { time: "06:00", temp: 22.1, portions: 0, activity: "Persiapan Batch B101" },
                { time: "07:30", temp: 28.4, portions: 250, activity: "Memasak Tengah Batch B101" }
            ],
            batches: [
                { id: "BATCH-101", menuName: "Nasi Putih, Ayam Serundeng, Tumis Buncis", targetPortions: 500, currentProgress: 85, status: 'Memasak', startTime: "06:00", chef: "Chef Junaidi", items: ["Beras", "Ayam", "Buncis"], temp: 82 },
                { id: "BATCH-102", menuName: "Nasi Kuning, Telur Balado, Orek Tempe", targetPortions: 350, currentProgress: 100, status: 'Selesai', startTime: "05:30", chef: "Chef Renatta", items: ["Beras Kuning", "Telur", "Tempe"], temp: 75 },
            ]
        };
    }

    componentDidMount() {
        // IoT Temperature Simulation
        this.tempInterval = setInterval(() => {
            this.setState(prev => ({
                currentTemp: Number((prev.currentTemp + (Math.random() * 0.4 - 0.2)).toFixed(1))
            }));
        }, 3000);
    }

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

    handleNewBatch = (e: React.FormEvent) => {
        e.preventDefault();
        const { newBatch, batches } = this.state;
        const batch: ProductionBatch = {
            id: `BATCH-${100 + batches.length + 1}`,
            menuName: newBatch.menuName || 'Menu Kustom',
            targetPortions: Number(newBatch.targetPortions) || 100,
            currentProgress: 0,
            status: 'Persiapan',
            startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            chef: newBatch.chef || 'Chef On-Duty',
            items: ['Baku Utama'],
            temp: 24
        };
        this.setState({
            batches: [batch, ...batches],
            isModalOpen: false,
            newBatch: { menuName: '', targetPortions: 100, chef: '' }
        });
    };

    updateBatchProgress = (id: string, progress: number) => {
        this.setState(prev => ({
            batches: prev.batches.map(b => {
                if (b.id === id) {
                    const newProgress = Math.min(100, Math.max(0, b.currentProgress + progress));
                    let newStatus = b.status;
                    if (newProgress === 100) newStatus = 'Selesai';
                    else if (newProgress > 0) newStatus = 'Memasak';
                    return { ...b, currentProgress: newProgress, status: newStatus };
                }
                return b;
            })
        }));
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
                                    <button onClick={this.toggleModal} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-xs font-black rounded-xl hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                                        <Plus size={14} /> Batch Baru
                                    </button>
                                </div>
                                {batches.map(batch => (
                                    <div key={batch.id} className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">ID: {batch.id}</span>
                                                    <h4 className="font-black text-slate-800 leading-tight">{batch.menuName}</h4>
                                                </div>
                                                <p className="text-xs text-slate-400 font-bold">Chef: {batch.chef} • Target: {batch.targetPortions} Porsi</p>
                                            </div>
                                            <button onClick={() => this.updateBatchProgress(batch.id, 10)} className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all">
                                                <Play size={18} />
                                            </button>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                            <div className="h-full bg-orange-500 transition-all duration-700" style={{ width: `${batch.currentProgress}%` }} />
                                        </div>
                                        <div className="flex justify-between items-center mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <span>Progress: {batch.currentProgress}%</span>
                                            <span className="flex items-center gap-2">Suhu Masak: <span className="text-slate-900">{batch.temp}°C</span> <Thermometer size={10} /></span>
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
                                    <History size={20} className="text-orange-400" /> Log Produksi Harian
                                </h3>
                                <div className="space-y-6">
                                    {logs.map((log, i) => (
                                        <div key={i} className="flex gap-4 relative group">
                                            {i !== logs.length - 1 && <div className="absolute left-1 top-6 bottom-0 w-0.5 bg-slate-800" />}
                                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 border-4 border-slate-900 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                            <div>
                                                <p className="text-[11px] font-black text-slate-200">{log.activity}</p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-widest">{log.time} • Porsi: {log.portions} • Suhu: {log.temp}°C</p>
                                            </div>
                                        </div>
                                    ))}
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
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Menu Produksi</label>
                                    <input required type="text" placeholder="Misal: Nasi Tim Ayam + Sop Jamur" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-orange-100 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Porsi</label>
                                        <input required type="number" placeholder="500" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chef On-Duty</label>
                                        <input required type="text" placeholder="Nama Chef" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold" />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={this.toggleModal} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
                                    <button type="submit" className="flex-2 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all">Validasi & Mulai Masak</button>
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
