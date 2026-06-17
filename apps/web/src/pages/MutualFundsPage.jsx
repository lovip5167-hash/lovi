import React, { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart, ShieldCheck, Sparkles, Zap, ArrowUpRight } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend, AreaChart, Area 
} from "recharts";
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CommunityCTA from '@/components/CommunityCTA.jsx';

const BLUE = "#1A6FFF";
const BLUE_LIGHT = "#4D9EFF";
const BLUE_DARK = "#0A3E99";
const BLUE_PALE = "#E8F1FF";
const NAVY = "#0A1628";
const GLASS = "rgba(26,111,255,0.08)";
const GLASS_BORDER = "rgba(26,111,255,0.18)";

// --- Data ---
const growthData = [
  { year: "2015", mf: 100, fd: 100, savings: 100 },
  { year: "2016", mf: 118, fd: 107, savings: 104 },
  { year: "2017", mf: 142, fd: 114, savings: 108 },
  { year: "2018", mf: 131, fd: 122, savings: 112 },
  { year: "2019", mf: 168, fd: 130, savings: 117 },
  { year: "2020", mf: 185, fd: 139, savings: 121 },
  { year: "2021", mf: 248, fd: 148, savings: 126 },
  { year: "2022", mf: 227, fd: 158, savings: 131 },
  { year: "2023", mf: 291, fd: 168, savings: 136 },
  { year: "2024", mf: 354, fd: 179, savings: 141 },
];

const portfolioData = [
  { name: "Equity", value: 60, color: BLUE },
  { name: "Debt", value: 25, color: "#4D9EFF" },
  { name: "Hybrid", value: 10, color: "#7FBAFF" },
  { name: "Liquid", value: 5, color: "#B8D9FF" },
];

const sipData = [
  { month: "Jan", invested: 5000, returns: 5200 },
  { month: "Feb", invested: 10000, returns: 10600 },
  { month: "Mar", invested: 15000, returns: 16200 },
  { month: "Apr", invested: 20000, returns: 21600 },
  { month: "May", invested: 25000, returns: 27800 },
  { month: "Jun", invested: 30000, returns: 33900 },
  { month: "Jul", invested: 35000, returns: 40100 },
  { month: "Aug", invested: 40000, returns: 46600 },
  { month: "Sep", invested: 45000, returns: 53400 },
  { month: "Oct", invested: 50000, returns: 61200 },
  { month: "Nov", invested: 55000, returns: 70100 },
  { month: "Dec", invested: 60000, returns: 79800 },
];

const fundTypes = [
  {
    icon: "📈",
    name: "Equity Funds",
    risk: "High",
    returns: "12–18%",
    horizon: "5+ years",
    desc: "Invests in stocks. High growth potential with higher volatility. Ideal for long-term wealth creation.",
    color: "#1A6FFF",
  },
  {
    icon: "🏛️",
    name: "Debt Funds",
    risk: "Low",
    returns: "6–9%",
    horizon: "1–3 years",
    desc: "Invests in bonds & securities. Stable, predictable returns with capital preservation.",
    color: "#4D9EFF",
  },
  {
    icon: "⚖️",
    name: "Hybrid Funds",
    risk: "Medium",
    returns: "9–13%",
    horizon: "3–5 years",
    desc: "Mix of equity and debt. Balances growth and stability for moderate risk appetite.",
    color: "#7FBAFF",
  },
  {
    icon: "💧",
    name: "Liquid Funds",
    risk: "Very Low",
    returns: "4–6%",
    horizon: "<1 year",
    desc: "Ultra short-term investments. Park surplus cash with better returns than savings accounts.",
    color: "#B8D9FF",
  },
];

const howItWorksSteps = [
  {
    num: "01",
    title: "You Invest",
    desc: "You contribute money — via lump sum or monthly SIP — into a mutual fund scheme.",
    icon: "💰",
  },
  {
    num: "02",
    title: "Fund Manager Acts",
    desc: "A professional fund manager pools your money with other investors and invests wisely.",
    icon: "👨‍💼",
  },
  {
    num: "03",
    title: "Diversified Portfolio",
    desc: "The pooled money buys a diversified basket of stocks, bonds, or other assets.",
    icon: "📊",
  },
  {
    num: "04",
    title: "NAV & Units",
    desc: "You receive units based on the Net Asset Value (NAV). As the portfolio grows, your NAV rises.",
    icon: "📈",
  },
  {
    num: "05",
    title: "Returns Earned",
    desc: "Returns come via dividends, capital appreciation, or both. Redeem anytime (for open-ended funds).",
    icon: "🏆",
  },
];

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff",
        border: `1px solid ${GLASS_BORDER}`,
        borderRadius: 12,
        padding: "10px 16px",
        boxShadow: "0 4px 20px rgba(26,111,255,0.12)",
        fontSize: 13,
      }}>
        <p style={{ margin: 0, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ margin: "2px 0", color: p.color, fontWeight: 500 }}>
            {p.name}: <span style={{ color: NAVY }}>{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- SIP Calculator ---
function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const months = years * 12;
  const r = rate / 100 / 12;
  const futureValue = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const invested = monthly * months;
  const gains = futureValue - invested;

  const calcData = Array.from({ length: years }, (_, i) => {
    const m = (i + 1) * 12;
    const fv = monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
    return { year: `Yr ${i + 1}`, invested: monthly * m, value: Math.round(fv) };
  });

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "28px 28px 20px", border: `1.5px solid ${GLASS_BORDER}`, boxShadow: "0 8px 40px rgba(26,111,255,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", color: NAVY, fontSize: 18, fontWeight: 700 }}>📱 SIP Growth Calculator</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Monthly SIP (₹)", value: monthly, min: 500, max: 50000, step: 500, set: setMonthly, fmt: v => `₹${v.toLocaleString()}` },
          { label: "Duration (years)", value: years, min: 1, max: 30, step: 1, set: setYears, fmt: v => `${v} yrs` },
          { label: "Expected Return (%)", value: rate, min: 4, max: 30, step: 1, set: setRate, fmt: v => `${v}%` },
        ].map((s, i) => (
          <div key={i} style={{ background: BLUE_PALE, borderRadius: 14, padding: "14px 16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#4D6B99", fontWeight: 600 }}>{s.label}</p>
            <p style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: BLUE }}>{s.fmt(s.value)}</p>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
              onChange={e => s.set(Number(e.target.value))}
              style={{ width: "100%", accentColor: BLUE }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Invested", val: `₹${invested.toLocaleString()}`, sub: "Your contribution", c: "#4D6B99" },
          { label: "Estimated Gains", val: `₹${Math.round(gains).toLocaleString()}`, sub: "Market returns", c: BLUE },
          { label: "Future Value", val: `₹${Math.round(futureValue).toLocaleString()}`, sub: "Corpus built", c: "#0A3E99" },
        ].map((m, i) => (
          <div key={i} style={{ background: i === 2 ? `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` : BLUE_PALE, borderRadius: 14, padding: "14px 16px", textAlign: "center" }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, color: i === 2 ? "rgba(255,255,255,0.75)" : "#4D6B99" }}>{m.label}</p>
            <p style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 800, color: i === 2 ? "#fff" : m.c }}>{m.val}</p>
            <p style={{ margin: 0, fontSize: 11, color: i === 2 ? "rgba(255,255,255,0.6)" : "#8CA7CC" }}>{m.sub}</p>
          </div>
        ))}
      </div>
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={calcData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8D9FF" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#B8D9FF" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BLUE} stopOpacity={0.6} />
                <stop offset="95%" stopColor={BLUE} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,111,255,0.08)" />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#8CA7CC" }} />
            <YAxis tick={{ fontSize: 10, fill: "#8CA7CC" }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="invested" stroke="#B8D9FF" strokeWidth={2} fill="url(#gInv)" name="Invested" />
            <Area type="monotone" dataKey="value" stroke={BLUE} strokeWidth={2} fill="url(#gVal)" name="Value" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// --- Animated Counter ---
function Counter({ end, prefix = "", suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.floor(p * end));
          if (p < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// --- Fade-in wrapper ---
function FadeIn({ children, delay = 0, y = 30 }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ===== MAIN PAGE COMPONENT =====
const MutualFundsPage = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", minHeight: "100vh", color: NAVY }}>
      <Helmet>
        <title>Mutual Funds | Wealth Creation | TSP Wealth</title>
        <meta name="description" content="Master the art of wealth creation with Mutual Funds. Expert-guided investment strategies for consistent long-term growth." />
      </Helmet>

      <Header />

      <main>
        {/* ── BEGINNER-FRIENDLY MUTUAL FUND HERO ── */}
        <section className="relative pt-24 pb-16 bg-white overflow-hidden">
           {/* Soft Background Accents */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-60" />
           
           <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               
               {/* Left Side: Approachable Copy */}
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 className="lg:col-span-7 lg:-mt-12"
               >
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-6 shadow-sm border border-blue-200"
                 >
                   <Sparkles size={14} className="animate-pulse" />
                   <span className="text-[11px] font-bold uppercase tracking-wider">Investing Made Simple</span>
                 </motion.div>

                 <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                   Start Small, <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Dream Big.</span>
                 </h1>

                 <p className="text-xl text-slate-600 max-w-lg leading-relaxed mb-8">
                   Mutual funds are like a <strong>financial team</strong>. We pool money from many people to buy the best stocks and bonds, so you don't have to be an expert to grow your wealth.
                 </p>

                 <div className="flex flex-wrap gap-4 mb-10">
                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                     Get Started for ₹500 <ArrowUpRight size={20} />
                   </button>
                   <button className="bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                     How it works
                   </button>
                 </div>

                 {/* Trust Badges for Beginners */}
                 <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <ShieldCheck size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-500">Safe & Regulated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                        <Zap size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-500">Quick Withdrawals</span>
                    </div>
                 </div>
               </motion.div>

               {/* Right Side: Friendly Visual Component */}
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="lg:col-span-5 relative lg:-mt-24 lg:-ml-8"
               >
                 {/* Premium Glow & Aura */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/5 blur-[120px] -z-10 rounded-full" />
                 
                 {/* The Card Container - More Compact */}
                 <div className="bg-white rounded-[3rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)] relative z-20 overflow-hidden transform scale-95 origin-center group/card">
                    {/* Subtle Inner Mesh Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] -z-10" />
                    
                    {/* Top Section: Title & Icon - Reduced spacing */}
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '32px' }}
                            transition={{ duration: 1, delay: 1 }}
                            className="h-1 bg-blue-600 rounded-full mb-3" 
                          />
                          <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] mb-1">Growth Engine</p>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight italic leading-none">Portfolio Mix</h4>
                       </div>
                       <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50 group-hover/card:rotate-12 transition-transform duration-500">
                          <PieChart size={24} strokeWidth={1.5} />
                       </div>
                    </div>

                    {/* Middle Section: Progress Bars - More compact spacing */}
                    <div className="space-y-5">
                       {[
                         { label: "Growth Stocks", sub: "Equity & Tech", pct: 45, color: "bg-blue-600", icon: "🚀", glow: "shadow-[0_0_12px_rgba(37,99,235,0.2)]" },
                         { label: "Safe Havens", sub: "Govt. Bonds", pct: 30, color: "bg-emerald-500", icon: "🏛️", glow: "shadow-[0_0_12px_rgba(16,185,129,0.2)]" },
                         { label: "Emergency Pool", sub: "Liquid Cash", pct: 25, color: "bg-orange-500", icon: "💧", glow: "shadow-[0_0_12px_rgba(249,115,22,0.2)]" },
                       ].map((item, i) => (
                         <div key={i} className="relative">
                            <div className="flex justify-between items-center mb-2">
                               <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg group-hover:bg-white transition-colors">
                                     {item.icon}
                                  </div>
                                  <div>
                                     <p className="font-bold text-slate-900 text-sm leading-none mb-1">{item.label}</p>
                                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.sub}</p>
                                  </div>
                               </div>
                               <span className="font-black text-slate-900 text-lg italic tabular-nums leading-none">{item.pct}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-50">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${item.pct}%` }}
                                 transition={{ duration: 1.5, delay: 0.8 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                 className={`h-full ${item.color} rounded-full ${item.glow}`}
                               />
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* Bottom Section: Returns Badge - Reduced padding/margins */}
                    <div className="mt-8 p-5 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 rounded-full blur-[35px] -mr-8 -mt-8" />
                       <div className="relative z-10 flex justify-between items-center">
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1 opacity-80">Proven Results</p>
                             <p className="text-2xl font-black italic tracking-tighter leading-none flex items-baseline gap-1.5">
                               12-15% <span className="text-[10px] font-bold not-italic opacity-40 uppercase tracking-widest">CAGR</span>
                             </p>
                          </div>
                          <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner">
                             <TrendingUp className="text-blue-400" size={22} />
                          </div>
                       </div>
                    </div>
                 </div>
               </motion.div>

             </div>
           </div>
        </section>

        {/* ── WHAT IS A MUTUAL FUND ── */}
        <section className="lg:h-[700px] flex items-center bg-slate-50/50 relative overflow-hidden py-16 lg:py-0">
          {/* Subtle Background Art */}
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    The Fundamentals
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">
                    Investing, <br/>
                    <span className="text-blue-600">Together.</span>
                  </h2>
                  <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                    A mutual fund is a simple way for everyone to access the stock market. By pooling resources, we unlock professional strategies usually reserved for the elite.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { icon: <ShieldCheck size={20}/>, title: "Regulated Safety", desc: "Governed by strict SEBI norms." },
                      { icon: <PieChart size={20}/>, title: "Total Diversity", desc: "Spread across 50+ companies." },
                      { icon: <Zap size={20}/>, title: "Pro Management", desc: "Led by industry veterans." },
                      { icon: <TrendingUp size={20}/>, title: "Easy Access", desc: "Withdraw anytime you need." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Pooling Visual - Refined */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-emerald-500/5 blur-3xl rounded-full" />
                  <div className="bg-white/80 backdrop-blur-md rounded-[4rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-white relative z-10">
                    <div className="text-center mb-12">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">The Pooling Mechanism</p>
                    </div>
                    
                    <div className="flex justify-center gap-6 mb-16 relative">
                      {[
                        { n: "You", c: "bg-blue-600 shadow-blue-200" },
                        { n: "Alex", c: "bg-emerald-500 shadow-emerald-200" },
                        { n: "Sara", c: "bg-indigo-500 shadow-indigo-200" },
                        { n: "Noah", c: "bg-slate-800 shadow-slate-200" }
                      ].map((item, i) => (
                        <div key={i} className="text-center group">
                          <motion.div 
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                            className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white text-xl font-bold shadow-2xl transition-transform group-hover:scale-110 ${item.c}`}
                          >
                            {item.n[0]}
                          </motion.div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase mt-3 block tracking-widest">{item.n}</span>
                        </div>
                      ))}
                      
                      {/* Refined Flow Indicators */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                         <div className="flex flex-col items-center gap-1">
                            {[0, 1, 2].map(dot => (
                               <motion.div 
                                 key={dot}
                                 animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
                                 transition={{ duration: 2, repeat: Infinity, delay: dot * 0.4 }}
                                 className="w-1 h-1 bg-blue-300 rounded-full"
                               />
                            ))}
                         </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent opacity-50" />
                      <div className="relative z-10">
                        <p className="text-xl font-black italic tracking-tight mb-1">The Collective Fund</p>
                        <p className="text-[9px] font-bold opacity-40 uppercase tracking-[0.3em]">Professional Management</p>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                      {["Blue Chips", "Govt Bonds", "Tech Growth", "Global Giants"].map((a, i) => (
                        <span key={i} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-wider hover:bg-white hover:border-blue-200 transition-all cursor-default">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── STATS SECTION ── */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-slate-50 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden">
               {/* Background Accent */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] -mr-32 -mt-32" />
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                 {[
                   { label: "Equity Growth", val: 14, suffix: "%", sub: "Annual Avg", icon: <TrendingUp size={24}/> },
                   { label: "Entry Barrier", val: 500, prefix: "₹", sub: "Monthly SIP", icon: <Zap size={24}/> },
                   { label: "Expert Teams", val: 1200, suffix: "+", sub: "SEBI Registered", icon: <ShieldCheck size={24}/> },
                   { label: "History", val: 30, suffix: " Yrs", sub: "Wealth Creation", icon: <BarChart3 size={24}/> },
                 ].map((s, i) => (
                   <FadeIn key={i} delay={i * 100}>
                     <div className="flex flex-col items-center lg:items-start">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6">
                           {s.icon}
                        </div>
                        <p className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                           <Counter end={s.val} prefix={s.prefix || ""} suffix={s.suffix} />
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                        <p className="text-xs font-bold text-slate-600 italic opacity-60">{s.sub}</p>
                     </div>
                   </FadeIn>
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* ── INVESTMENT CATEGORIES ── */}
        <section className="lg:h-[850px] flex items-center bg-white py-24 lg:py-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
               <FadeIn className="max-w-xl">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    Diversification
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                    Tailored for <span className="text-blue-600">Your Goals.</span>
                  </h2>
               </FadeIn>
               <FadeIn delay={200}>
                  <p className="text-slate-500 max-w-sm text-sm lg:text-right leading-relaxed font-medium">
                    Whether you're looking for aggressive growth or capital preservation, there's a fund for every stage of your life.
                  </p>
               </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { ...fundTypes[0], tag: "Growth", icon: <TrendingUp size={22}/>, bg: "bg-blue-50/50", b: "border-blue-100", t: "text-blue-600", h: "group-hover:bg-blue-600", s: "hover:shadow-blue-500/10" },
                { ...fundTypes[1], tag: "Safety", icon: <ShieldCheck size={22}/>, bg: "bg-emerald-50/50", b: "border-emerald-100", t: "text-emerald-600", h: "group-hover:bg-emerald-600", s: "hover:shadow-emerald-500/10" },
                { ...fundTypes[2], tag: "Balanced", icon: <BarChart3 size={22}/>, bg: "bg-indigo-50/50", b: "border-indigo-100", t: "text-indigo-600", h: "group-hover:bg-indigo-600", s: "hover:shadow-indigo-500/10" },
                { ...fundTypes[3], tag: "Liquid", icon: <Zap size={22}/>, bg: "bg-orange-50/50", b: "border-orange-100", t: "text-orange-600", h: "group-hover:bg-orange-600", s: "hover:shadow-orange-500/10" }
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className={`${f.bg} rounded-[3rem] p-10 border-2 ${f.b} hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] ${f.s} hover:-translate-y-3 transition-all duration-500 group h-full flex flex-col relative overflow-hidden`}>
                    {/* Soft Glow Background */}
                    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-30 ${f.bg.split(' ')[0]}`} />
                    
                    <div className="flex justify-between items-start mb-10">
                       <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center ${f.t} ${f.h} group-hover:text-white transition-all duration-500`}>
                          {f.icon}
                       </div>
                       <span className={`px-4 py-1.5 bg-white shadow-sm ${f.t} rounded-full text-[9px] font-black uppercase tracking-wider border ${f.b}`}>
                          {f.tag}
                       </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{f.name}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed mb-10 flex-grow font-medium opacity-80">
                      {f.desc}
                    </p>

                    <div className={`pt-8 border-t ${f.b} flex justify-between items-end`}>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Return Potential</p>
                        <p className={`text-2xl font-black ${f.t} italic leading-none`}>{f.returns}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-slate-900 leading-none mb-1.5">{f.horizon}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Min Horizon</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SIP CALCULATOR ── */}
        <section className="lg:h-[800px] flex items-center bg-white relative overflow-hidden py-24 lg:py-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-400 to-emerald-500" />
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full relative z-10">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="py-10">
                  <div className="inline-block px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                    Wealth Projection
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]">
                    Watch your <br/>
                    <span className="text-blue-600">Savings Grow.</span>
                  </h2>
                  <p className="text-slate-500 mb-14 leading-relaxed text-lg max-w-md font-medium">
                    Small monthly steps lead to massive destinations. Use our interactive tool to visualize your financial future and build lasting wealth.
                  </p>
                  
                  <div className="space-y-8">
                     {[
                       { t: "Consistency is Key", d: "Regular SIPs benefit from rupee cost averaging and market discipline." },
                       { t: "Power of Compounding", d: "The longer you stay invested, the harder your money works for you." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-5 items-start">
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                          <div>
                             <p className="font-extrabold text-slate-900 text-lg mb-1.5">{item.t}</p>
                             <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="relative">
                   {/* Refined Glow */}
                   <div className="absolute inset-0 bg-blue-400/5 blur-[100px] rounded-full" />
                   <SIPCalculator />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── GLOSSARY REDESIGN ── */}
        <section className="lg:h-[700px] flex items-center bg-slate-900 relative py-16 lg:py-0 overflow-hidden">
          {/* Geometric Accents */}
          <div className="absolute -left-24 -bottom-24 w-96 h-96 border border-white/5 rounded-full" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Invest-o-pedia</p>
                <h2 className="text-4xl font-black text-white tracking-tight">The Beginner's Dictionary</h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { term: "NAV", full: "Net Asset Value", def: "The current unit price of the fund, updated every market evening." },
                { term: "SIP", full: "Systematic Plan", def: "Investing a fixed amount every month automatically to build wealth." },
                { term: "AUM", full: "Total Assets", def: "The total market value of investments managed by the fund team." },
                { term: "Exp Ratio", full: "Management Fee", def: "The small annual percentage fee charged to manage your investment." },
                { term: "Exit Load", full: "Redemption Fee", def: "A minor fee charged if you withdraw within a specific short period." },
                { term: "ELSS", full: "Tax Saver", def: "Special equity funds that offer tax benefits under Section 80C." },
              ].map((t, i) => (
                <FadeIn key={i} delay={i * 50}>
                  <div className="p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-blue-500/30 transition-all duration-500 group">
                    <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-[10px] font-black mb-4 tracking-wider group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {t.term}
                    </div>
                    <h4 className="text-white font-bold mb-2 text-lg">{t.full}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">{t.def}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── RISKS REDESIGN ── */}
        <section className="lg:h-[700px] flex items-center bg-white py-16 lg:py-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-px bg-slate-100" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  Smart Investor's Guide
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Navigating Safely</h2>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <TrendingUp size={32}/>, risk: "Market Volatility", tip: "Fluctuations are natural. Long-term trends consistently move upward.", color: "border-blue-100 bg-blue-50/20 text-blue-600" },
                { icon: <ShieldCheck size={32}/>, risk: "SEBI Oversight", tip: "Strict regulatory protection ensures your capital is always accounted for.", color: "border-emerald-100 bg-emerald-50/20 text-emerald-600" },
                { icon: <PieChart size={32}/>, risk: "Strategic Diversification", tip: "Spreading assets across sectors minimizes the impact of any single event.", color: "border-indigo-100 bg-indigo-50/20 text-indigo-600" },
              ].map((r, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className={`p-10 rounded-[3.5rem] border ${r.color} hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 h-full flex flex-col items-center text-center group`}>
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {r.icon}
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4">{r.risk}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      <span className="font-black text-slate-900">Key Insight:</span> {r.tip}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA REDESIGN ── */}
        <CommunityCTA />
      </main>

      <Footer />
    </div>
  );
}

export default MutualFundsPage;
