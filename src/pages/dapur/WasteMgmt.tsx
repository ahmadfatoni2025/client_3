import React, { Component } from 'react';
import { Trash2 } from 'lucide-react';

interface State {
    waste: { organic: number, inorganic: number };
}

export class WasteMgmt extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            waste: { organic: 12.5, inorganic: 3.2 }
        };
    }

    handleWasteUpdate = (type: 'organic' | 'inorganic', val: number) => {
        this.setState(prev => ({
            waste: { ...prev.waste, [type]: Math.max(0, prev.waste[type] + val) }
        }));
    };

    render() {
        const { waste } = this.state;
        return (
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Food Waste Tracking (Limbah)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    <div className="p-6 md:p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform"><Trash2 size={80} /></div>
                        <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em]">Limbah Organik</p>
                        <h4 className="text-3xl md:text-4xl font-black text-emerald-900 mt-2">{waste.organic} <span className="text-lg md:text-xl font-bold">kg</span></h4>
                        <div className="flex gap-2 mt-6 relative z-10">
                            <button onClick={() => this.handleWasteUpdate('organic', 0.5)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-black shadow-sm active:scale-95">+</button>
                            <button onClick={() => this.handleWasteUpdate('organic', -0.5)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-black shadow-sm active:scale-95">-</button>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform"><Trash2 size={80} /></div>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Limbah Anorganik</p>
                        <h4 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">{waste.inorganic} <span className="text-lg md:text-xl font-bold">kg</span></h4>
                        <div className="flex gap-2 mt-6 relative z-10">
                            <button onClick={() => this.handleWasteUpdate('inorganic', 0.1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-black shadow-sm active:scale-95">+</button>
                            <button onClick={() => this.handleWasteUpdate('inorganic', -0.1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-black shadow-sm active:scale-95">-</button>
                        </div>
                    </div>
                </div>
                <button className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95">
                    Kirim Laporan Waste Harian
                </button>
            </div>
        );
    }
}

export default WasteMgmt;
