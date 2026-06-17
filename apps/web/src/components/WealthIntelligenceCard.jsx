import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Shield, PieChart, ArrowUpRight } from 'lucide-react';

const WealthIntelligenceCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-lg group"
    >
      {/* Main Glass Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0f1d]/40 backdrop-blur-3xl p-8 shadow-2xl">
        
        {/* Animated Background Gradients */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-colors duration-1000" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] group-hover:bg-indigo-600/20 transition-colors duration-1000" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-white font-bold text-xl tracking-tight">Intelligence Terminal</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-blue-400/80 text-[10px] font-black uppercase tracking-[0.2em]">Live Analysis Active</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-inner">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Risk Score</span>
              </div>
              <div className="text-white font-black text-lg">Low-Med</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Alpha Gen</span>
              </div>
              <div className="text-white font-black text-lg">+8.4% <span className="text-blue-400 text-xs font-medium">vs Nifty</span></div>
            </div>
          </div>

          {/* ── ANIMATED GLASS BARS ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth Projection</span>
              <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">Optimized</span>
            </div>
            <div className="flex items-end gap-3 h-40">
              {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full group/bar cursor-help">
                   <motion.div
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ duration: 1.5, delay: i * 0.1 + 0.5, ease: [0.23, 1, 0.32, 1] }}
                     className="w-full bg-gradient-to-t from-blue-600/40 via-blue-400/20 to-transparent backdrop-blur-md rounded-t-lg border-t border-x border-white/10 relative overflow-hidden"
                   >
                      <motion.div 
                        animate={{ y: ['100%', '-100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                        className="absolute inset-x-0 h-12 bg-gradient-to-t from-transparent via-white/10 to-transparent"
                      />
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-400/60 blur-[1px]" />
                   </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((v) => (
                  <div key={v} className="w-9 h-9 rounded-full border-2 border-[#0a0f1d] bg-slate-800 flex items-center justify-center text-[10px] text-white font-black">
                    {v === 1 ? 'M' : v === 2 ? 'S' : 'K'}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-xs">Expert Committee</p>
                <p className="text-slate-500 text-[10px]">Strategic Review</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn">
              <span className="text-[10px] font-black uppercase tracking-wider">Reports</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Ambient decorative elements */}
        <div className="absolute top-1/2 left-0 w-1 h-20 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-1 h-20 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
      </div>
    </motion.div>
  );
};

export default WealthIntelligenceCard;
