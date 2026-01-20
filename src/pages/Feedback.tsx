import { Component } from 'react';
import {
    MessageSquare,
    Star,
    Send,
    Tag,
    CheckCircle2,
    ThumbsUp,
    Heart,
    Rocket,
    Quote,
    User
} from 'lucide-react';

interface UserFeedback {
    id: string;
    user: string;
    date: string;
    rating: number;
    text: string;
    category: string;
    likes: number;
}

interface State {
    rating: number;
    hoverRating: number;
    comment: string;
    category: string;
    isSubmitted: boolean;
    recentFeedbacks: UserFeedback[];
}

export class Feedback extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            rating: 0,
            hoverRating: 0,
            comment: '',
            category: 'Kualitas Makanan',
            isSubmitted: false,
            recentFeedbacks: [
                { id: '1', user: 'Kepsek SDN 01', date: '1 jam lalu', rating: 5, text: 'Variasi menu minggu ini sangat bagus, anak-anak suka!', category: 'Kualitas Makanan', likes: 12 },
                { id: '2', user: 'Orang Tua Siswa', date: '5 jam lalu', rating: 4, text: 'Porsinya pas, tapi mohon sayurnya lebih banyak.', category: 'Kualitas Makanan', likes: 8 },
                { id: '3', user: 'Tim Logistik', date: 'Kemarin', rating: 5, text: 'Aplikasi versi baru jauh lebih cepat saat upload bukti.', category: 'Sistem App', likes: 5 },
            ]
        };
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        setTimeout(() => this.setState({ isSubmitted: false, rating: 0, comment: '' }), 3000);
    };

    render() {
        const { rating, hoverRating, comment, category, isSubmitted, recentFeedbacks } = this.state;

        return (
            <div className="space-y-12 pb-20 animate-in fade-in duration-700">
                {/* Feedback Hero */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40 shrink-0" />
                    <div className="flex items-center gap-4 md:gap-6 relative z-10 min-w-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-rose-500 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-rose-100 shrink-0">
                            <MessageSquare size={28} />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight truncate">Feedback</h1>
                            <p className="text-slate-500 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] mt-1 truncate">Feedback & Mutu MBG</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 relative z-10 w-full md:w-auto">
                        <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mr-2 shrink-0">Avg Rating:</span>
                        <div className="flex items-center gap-1.5 md:gap-2 bg-rose-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl">
                            <Star className="text-rose-500 fill-rose-500" size={16} />
                            <span className="text-base md:text-lg font-black text-rose-600">4.9</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
                    {/* Feedback Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 md:p-10 rounded-[40px] md:rounded-[48px] border border-slate-100 shadow-xl relative overflow-hidden">
                            {isSubmitted ? (
                                <div className="py-16 md:py-20 text-center space-y-4 animate-in zoom-in duration-500">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100 mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900">Terima Kasih!</h3>
                                    <p className="text-xs md:text-sm text-slate-500 font-medium">Feedback Anda sangat berharga bagi peningkatan mutu layanan MBG.</p>
                                </div>
                            ) : (
                                <form onSubmit={this.handleSubmit} className="space-y-6 md:space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest text-center">Berikan Rating Anda</p>
                                        <div className="flex justify-center gap-2 md:gap-3">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onMouseEnter={() => this.setState({ hoverRating: star })}
                                                    onMouseLeave={() => this.setState({ hoverRating: 0 })}
                                                    onClick={() => this.setState({ rating: star })}
                                                    className="transition-all duration-300 transform active:scale-95"
                                                >
                                                    <Star
                                                        size={40}
                                                        className={`${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400 drop-shadow-md' : 'text-slate-100'} transition-all`}
                                                        strokeWidth={2}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Tag size={12} /> Kategori</label>
                                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                                            {['Kualitas', 'Ketepatan', 'Sistem', 'Lainnya'].map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => this.setState({ category: cat })}
                                                    className={`py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border ${category.includes(cat) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Komentar / Saran</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={comment}
                                            onChange={(e) => this.setState({ comment: e.target.value })}
                                            placeholder="Tuliskan pengalaman Anda..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-6 text-xs md:text-sm font-bold focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={rating === 0}
                                        className="w-full py-4 md:py-5 bg-rose-500 text-white rounded-[20px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-xl md:shadow-2xl shadow-rose-100 hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                                    >
                                        <Send size={16} /> Kirim Feedback
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6 md:space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3">
                                <ThumbsUp size={24} className="text-rose-500" /> Testimoni
                            </h2>
                            <button className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Lihat Semua</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {recentFeedbacks.map(fb => (
                                <div key={fb.id} className="p-6 md:p-8 bg-white border border-slate-100 rounded-[32px] md:rounded-[40px] shadow-sm relative group hover:shadow-lg transition-all">
                                    <div className="absolute top-6 left-6 opacity-5"><Quote size={40} /></div>
                                    <div className="flex justify-between items-start mb-4 md:mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-50 rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                                <User size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-black text-slate-900 truncate">{fb.user}</p>
                                                <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase">{fb.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-amber-500 text-[10px] md:text-xs font-black shrink-0">
                                            <Star size={12} className="fill-current" /> {fb.rating}.0
                                        </div>
                                    </div>
                                    <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed mb-4 md:mb-6 italic line-clamp-3 md:line-clamp-none">"{fb.text}"</p>
                                    <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-slate-50">
                                        <span className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{fb.category}</span>
                                        <button className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black text-rose-500 hover:scale-110 transition-all">
                                            <Heart size={14} className="fill-current" /> {fb.likes}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Impact Stats */}
                        <div className="bg-slate-900 rounded-[32px] md:rounded-[48px] p-6 md:p-10 flex flex-col sm:flex-row items-center justify-around gap-8 text-center">
                            <div className="space-y-1 md:space-y-2">
                                <p className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-widest">Feedbacks</p>
                                <h4 className="text-2xl md:text-4xl font-black text-white">12.4k</h4>
                                <p className="text-[9px] md:text-[10px] font-black text-emerald-400 flex items-center justify-center gap-1"><Rocket size={12} /> +12%</p>
                            </div>
                            <div className="w-px h-12 bg-white/10 hidden sm:block" />
                            <div className="space-y-1 md:space-y-2">
                                <p className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-widest">Implemented</p>
                                <h4 className="text-2xl md:text-4xl font-black text-white">1,023</h4>
                                <p className="text-[9px] md:text-[10px] font-black text-blue-400 flex items-center justify-center gap-1"><ThumbsUp size={12} /> Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feedback;
