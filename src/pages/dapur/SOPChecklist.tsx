import { Component } from 'react';
import { ShieldCheck, Check } from 'lucide-react';

interface State {
    sopChecked: Record<string, boolean>;
    apdCompliance: Record<string, boolean>;
}

export class SOPChecklist extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            sopChecked: {},
            apdCompliance: {}
        };
    }

    componentDidMount() {
        this.fetchSOP();
    }

    fetchSOP = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/kitchen/sop');
            const result = await res.json();
            if (result.success) {
                this.setState({
                    sopChecked: result.data.sopChecked,
                    apdCompliance: result.data.apdCompliance
                });
            }
        } catch (err) {
            console.error('Gagal ambil data SOP');
        }
    };

    toggleSop = async (key: string) => {
        const newValue = !this.state.sopChecked[key];
        this.setState(prev => ({ sopChecked: { ...prev.sopChecked, [key]: newValue } }));
        try {
            await fetch('http://localhost:5000/api/kitchen/sop/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'sop', key, value: newValue })
            });
        } catch (err) {
            console.error('Gagal update SOP');
        }
    };

    toggleApd = async (key: string) => {
        const newValue = !this.state.apdCompliance[key];
        this.setState(prev => ({ apdCompliance: { ...prev.apdCompliance, [key]: newValue } }));
        try {
            await fetch('http://localhost:5000/api/kitchen/sop/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'apd', key, value: newValue })
            });
        } catch (err) {
            console.error('Gagal update APD');
        }
    };

    render() {
        const { sopChecked, apdCompliance } = this.state;
        return (
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
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
                                <button onClick={() => this.toggleApd(key)} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${val ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-red-100 text-red-600 border border-red-200 animate-pulse'}`}>
                                    {val ? 'Patuh' : 'Peringatan'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SOPChecklist;
