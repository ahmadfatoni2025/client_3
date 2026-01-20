import React, { Component } from 'react';
import { X } from 'lucide-react';
import type { NutritionItem } from '../../ui/tabelNutrisi';

interface State {
    selectedIngredients: NutritionItem[];
    targetAKG: { calories: number, protein: number };
}

export class AKGCalculator extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedIngredients: [],
            targetAKG: { calories: 2100, protein: 60 }
        };
    }

    render() {
        const { selectedIngredients, targetAKG } = this.state;
        const currentCalories = selectedIngredients.reduce((acc, curr) => acc + (curr.calories || 0), 0);
        const currentProtein = selectedIngredients.reduce((acc, curr) => acc + (curr.protein || 0), 0);

        return (
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Kalkulator Gizi Harian (AKG)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Target Nutrisi Harian</p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2"><span className="text-xs font-black uppercase">Calories</span><span className="text-xs font-black">{currentCalories} / {targetAKG.calories} kkal</span></div>
                                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                    <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${Math.min((currentCalories / targetAKG.calories) * 100, 100)}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2"><span className="text-xs font-black uppercase">Protein</span><span className="text-xs font-black">{currentProtein} / {targetAKG.protein} g</span></div>
                                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                    <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${Math.min((currentProtein / targetAKG.protein) * 100, 100)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Analaisis Komposisi</p>
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                            {selectedIngredients.length > 0 ? selectedIngredients.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-700">{item.name}</span>
                                    <button onClick={() => this.setState({ selectedIngredients: selectedIngredients.filter((_, idx) => idx !== i) })} className="text-slate-300 hover:text-red-500"><X size={14} /></button>
                                </div>
                            )) : <p className="text-xs text-slate-400 italic text-center py-8">Silakan pilih bahan makanan dari database untuk memulai kalkulasi.</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AKGCalculator;
