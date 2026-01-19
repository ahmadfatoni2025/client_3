import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    MessageSquare,
    Trophy,
    Search,
    FileEdit,
    BookOpen,
    FileText,
    LifeBuoy,
    ArrowRight,
    Sparkles
} from 'lucide-react';

// --- Types ---
interface MenuItem {
    title: string;
    desc: string;
    icon: React.ElementType;
    active?: boolean;
}

// --- Data ---
const WHY_ACME: MenuItem[] = [
    { title: 'Testimonials', desc: 'See why 700,000+ users trust Acme to grow their business.', icon: MessageSquare },
    { title: "President's Club", desc: 'Apply for your 6 or 7-figure award today!', icon: Trophy },
    { title: 'Case Studies', desc: 'See how companies use Acme to maximize revenue.', icon: Search, active: true },
    { title: 'Submit Your Story', desc: 'Tell us about how Acme has helped you achieve your goals.', icon: FileEdit },
];

const RESOURCES: MenuItem[] = [
    { title: 'Knowledge Base', desc: 'Resources for getting started, training, & more.', icon: BookOpen },
    { title: 'Blog', desc: 'Full of tips, tricks, & guides to success!', icon: FileText },
    { title: 'Get Support', desc: "We're here to support you on your journey.", icon: LifeBuoy },
];

// --- Sub-components ---

const MegaMenuContent = () => {
    return (
        <div className="w-[1000px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 pointer-events-auto">
            <div className="flex p-10">
                {/* Why Acme Column */}
                <div className="w-[35%] pr-10 border-r border-slate-100">
                    <h3 className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-8">WHY ACME</h3>
                    <div className="space-y-2">
                        {WHY_ACME.map((item, idx) => (
                            <div
                                key={idx}
                                className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${item.active ? 'bg-slate-50' : 'hover:bg-slate-50/80'}`}
                            >
                                <div className={`mt-0.5 p-2 rounded-xl border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300 ${item.active ? 'bg-white shadow-md' : 'bg-slate-50/50'}`}>
                                    <item.icon size={18} className={`${item.active ? 'text-blue-600' : 'text-slate-500'} group-hover:text-blue-600 transition-colors`} />
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-slate-800 tracking-tight">{item.title}</h4>
                                    <p className="text-[13px] text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resources Column */}
                <div className="w-[25%] px-10 border-r border-slate-100">
                    <h3 className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-8">RESOURCES</h3>
                    <div className="space-y-8">
                        {RESOURCES.map((item, idx) => (
                            <div key={idx} className="group flex items-start gap-4 cursor-pointer">
                                <div className="mt-1">
                                    <item.icon size={22} className="text-slate-400 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-110" />
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">{item.title}</h4>
                                    <p className="text-[13px] text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore Column */}
                <div className="w-[40%] pl-10">
                    <div className="bg-[#f8faff] rounded-[24px] p-8 h-full flex flex-col border border-blue-50/50">
                        <h3 className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-8">EXPLORE</h3>

                        <div className="flex-1 space-y-8">
                            {/* Visual Card 1 */}
                            <div className="flex gap-5 group cursor-pointer">
                                <div className="w-24 h-24 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-all">
                                    {/* Dotted lines and circles background */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <div className="w-16 h-[2px] border-t-2 border-dotted border-slate-400" />
                                    </div>
                                    <div className="flex gap-2 relative z-10 items-center">
                                        <span className="text-[10px] font-bold text-slate-400">01</span>
                                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-200">02</div>
                                        <span className="text-[10px] font-bold text-slate-400">03</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">Getting Started with Acme</h4>
                                    <p className="text-[13px] text-slate-500 leading-relaxed mt-1.5">New to Acme and not sure where to start? We put together all the basics here to help you start crushing your quota.</p>
                                </div>
                            </div>

                            {/* Visual Card 2 */}
                            <div className="flex gap-5 group cursor-pointer">
                                <div className="w-24 h-24 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-all">
                                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-[2px] p-3 opacity-[0.03]">
                                        {Array.from({ length: 16 }).map((_, i) => <div key={i} className="bg-slate-900 rounded-sm" />)}
                                    </div>
                                    <div className="w-12 h-6 bg-slate-50 rounded-lg border border-slate-100 relative z-10 flex items-center px-1.5 shadow-sm">
                                        <div className="w-3 h-3 rounded-full bg-blue-400/80 mr-1.5 shrink-0" />
                                        <div className="h-1 w-full bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">Building Your Pipeline</h4>
                                    <p className="text-[13px] text-slate-500 leading-relaxed mt-1.5">Using our firmographic filters (location, industry, etc.) to identify your ideal customer profile and consistently generate leads.</p>
                                </div>
                            </div>
                        </div>

                        <a href="#" className="mt-8 flex items-center gap-2 text-blue-600 text-[14px] font-bold group w-fit">
                            See All Product News <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bar */}
            <div className="bg-white border-t border-slate-100 px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e40af] flex items-center justify-center text-white shadow-xl shadow-blue-200">
                        <Sparkles size={20} fill="currentColor" />
                    </div>
                    <p className="text-[15px] font-bold text-slate-800">
                        Want Free Leads? <span className="font-medium text-slate-400 ml-1">Take Acme for a Test Drive</span>
                    </p>
                </div>
                <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 text-[14px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 shadow-sm">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>('Customers');

    const navItems = [
        { name: 'Products', hasMega: false },
        { name: 'Customers', hasMega: true },
        { name: 'Company', hasMega: false },
        { name: 'Talk to Sales', hasMega: false },
    ];

    return (
        <div
            className="fixed top-10 left-0 right-0 z-50 flex flex-col items-center"
            onMouseLeave={() => setActiveMenu(null)}
        >
            {/* Navbar Pill */}
            <div className="bg-white/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-2 py-2 flex items-center gap-1 border border-white/20">
                <div className="flex items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onMouseEnter={() => item.hasMega && setActiveMenu(item.name)}
                            className={`relative flex items-center gap-1.5 px-6 py-3 rounded-full text-[14px] font-bold transition-all duration-300 ${activeMenu === item.name
                                ? 'bg-slate-100 text-slate-900'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {item.name}
                            {item.name !== 'Talk to Sales' && (
                                <div className={`transition-transform duration-300 ${activeMenu === item.name ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={14} className={activeMenu === item.name ? 'text-slate-900' : 'opacity-40'} strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="w-px h-6 bg-slate-100 mx-2" />

                <div className="flex items-center gap-2">
                    <button className="px-6 py-3 text-[14px] font-bold text-slate-500 hover:text-slate-900 transition-colors">
                        Login
                    </button>
                    <button className="px-8 py-3 bg-[#2563eb] text-white text-[14px] font-bold rounded-full shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
                        Get started
                    </button>
                </div>
            </div>

            {/* Mega Menu Wrapper */}
            <div className="relative w-full flex justify-center">
                <AnimatePresence>
                    {activeMenu === 'Customers' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 15, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute"
                        >
                            <MegaMenuContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Navbar;