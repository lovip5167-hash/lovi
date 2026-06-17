import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  ShieldCheck,
  Users, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Calculator as CalcIcon, 
  PieChart as PieIcon,
  ArrowRight,
  Target,
  Umbrella,
  Briefcase,
  GraduationCap,
  Calendar,
  IndianRupee,
  Activity,
  Sparkles,
  Zap,
  ChevronRight,
  Globe,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer 
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import LogoHero from '@/components/logoHero.jsx';
import AboutSection from '@/components/AboutSection.jsx';
import Footer from '@/components/Footer.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import FAQItem from '@/components/FAQItem.jsx';
import { cn } from '@/lib/utils';
import sipGif1 from '@/media/sip/SIP Path to Growth (1).gif';
import sipGif2 from '@/media/sip/SIP Path to Growth (2).gif';
import sipGif3 from '@/media/sip/SIP Path to Growth (3).gif';
import sipGif4 from '@/media/sip/SIP Path to Growth (4).gif';
import sipGif5 from '@/media/sip/SIP Path to Growth (5).gif';

// --- Components for the Homepage ---

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(20);

  const calculateSIP = useMemo(() => {
    const i = expectedReturn / 12 / 100;
    const n = timePeriod * 12;
    const maturityAmount = monthlyInvestment * (((Math.pow(1 + i, n)) - 1) / i) * (1 + i);
    const investedAmount = monthlyInvestment * n;
    const wealthGained = maturityAmount - investedAmount;

    // Generate chart data
    const data = [];
    for (let year = 1; year <= timePeriod; year++) {
      const months = year * 12;
      const amount = monthlyInvestment * (((Math.pow(1 + i, months)) - 1) / i) * (1 + i);
      const invested = monthlyInvestment * months;
      data.push({
        year: `Year ${year}`,
        Wealth: Math.round(amount),
        Investment: invested
      });
    }

    return { maturityAmount, investedAmount, wealthGained, data };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0,
      notation: val > 10000000 ? 'compact' : 'standard'
    }).format(val);

  return (
    <Card className="border-none shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-white/95 backdrop-blur-xl overflow-hidden rounded-[3rem] h-[520px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-5 p-6 border-r border-slate-100 bg-slate-50/50 flex flex-col">
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-200 rotate-3 transition-transform hover:rotate-0">
              <CalcIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-primary tracking-tighter italic leading-none">Compounding</h3>
              <p className="text-[8px] font-black text-blue-600 uppercase tracking-[0.3em] mt-1">Intelligence Lab</p>
            </div>
          </div>

          <div className="space-y-5 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <Label className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Monthly SIP</Label>
                <span className="text-xl font-black text-primary tracking-tighter italic">{formatCurrency(monthlyInvestment)}</span>
              </div>
              <Slider 
                value={[monthlyInvestment]} 
                min={500} 
                max={100000} 
                step={500}
                onValueChange={(val) => setMonthlyInvestment(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <Label className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Expected Return</Label>
                <span className="text-xl font-black text-primary tracking-tighter italic">{expectedReturn}% <span className="text-[10px] font-bold text-slate-400 not-italic">p.a.</span></span>
              </div>
              <Slider 
                value={[expectedReturn]} 
                min={1} 
                max={30} 
                step={0.5}
                onValueChange={(val) => setExpectedReturn(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <Label className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Time Horizon</Label>
                <span className="text-xl font-black text-primary tracking-tighter italic">{timePeriod} <span className="text-[10px] font-bold text-slate-400 not-italic">Years</span></span>
              </div>
              <Slider 
                value={[timePeriod]} 
                min={1} 
                max={40} 
                onValueChange={(val) => setTimePeriod(val[0])}
              />
            </div>
          </div>

          <div className="mt-4 space-y-2 shrink-0">
             <div className="p-4 rounded-[1.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group transition-all hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-0.5">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em]">Total Invested</p>
                   <ArrowRight className="w-3 h-3 text-slate-200 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-xl font-black text-slate-700 tracking-tighter italic">{formatCurrency(calculateSIP.investedAmount)}</p>
             </div>
             
             <div className="p-4 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-200 transition-all hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-125 transition-transform" />
                <div className="flex justify-between items-center mb-0.5 relative z-10">
                   <p className="text-[8px] font-black text-blue-100 uppercase tracking-[0.25em]">Maturity Value</p>
                   <Sparkles className="w-3 h-3 text-blue-300 animate-pulse" />
                </div>
                <p className="text-xl font-black tracking-tighter italic relative z-10">{formatCurrency(calculateSIP.maturityAmount)}</p>
             </div>
          </div>
        </div>

        {/* Right Panel: Visualization */}
        <div className="lg:col-span-7 p-6 flex flex-col bg-white">
          <div className="flex justify-between items-start mb-4 shrink-0">
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-0.5">Portfolio Simulation</p>
              <h4 className="text-xl font-black text-primary tracking-tighter italic leading-none">Growth Trajectory</h4>
            </div>
            <div className="flex gap-3">
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Wealth</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Principal</span>
               </div>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calculateSIP.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" hide />
                <YAxis hide domain={[0, 'auto']} />
                <ChartTooltip 
                  cursor={{ stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5 5' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white/95 backdrop-blur-2xl p-3 rounded-[1.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-slate-100 border-t-blue-600 border-t-4">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{payload[0].payload.year}</p>
                          <div className="space-y-0.5">
                            <p className="text-base font-black text-primary italic">Wealth: {formatCurrency(payload[0].value)}</p>
                            <p className="text-[9px] font-bold text-slate-400">Invested: {formatCurrency(payload[1].value)}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Wealth" 
                  stroke="#2563eb" 
                  fillOpacity={1} 
                  fill="url(#colorWealth)" 
                  strokeWidth={3} 
                  isAnimationActive={true}
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="Investment" 
                  stroke="#e2e8f0" 
                  fill="transparent" 
                  strokeWidth={2} 
                  strokeDasharray="10 10" 
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-50 grid grid-cols-2 gap-3 shrink-0">
             <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-200/20 rounded-full blur-2xl -mr-8 -mt-8" />
                <p className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-0.5">Total Appreciation</p>
                <p className="text-base font-black text-emerald-700 tracking-tighter italic">+{formatCurrency(calculateSIP.wealthGained)}</p>
             </div>
             <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/20 rounded-full blur-2xl -mr-8 -mt-8" />
                <p className="text-[7px] font-black text-blue-600 uppercase tracking-[0.3em] mb-0.5">Wealth Multiplier</p>
                <p className="text-xl font-black text-blue-700 tracking-tighter italic">{(calculateSIP.maturityAmount / calculateSIP.investedAmount).toFixed(2)}x</p>
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SIPIntelligenceCarousel = () => {
  const slides = [
    { gif: sipGif1 },
    { gif: sipGif2 },
    { gif: sipGif3 },
    { gif: sipGif4 },
    { gif: sipGif5 }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  useEffect(() => {
    let intervalId;
    if (isInView) {
      intervalId = window.setInterval(() => {
        setActiveSlide((current) => (current + 1) % slides.length);
      }, 5000); // Slowed down from 2600ms to 5000ms
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isInView, slides.length]);

  return (
    <div ref={containerRef} className="relative rounded-[3rem] bg-white p-4 shadow-[0_30px_70px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden h-[520px] flex items-center justify-center">
      {slides.map((slide, idx) => (
        <motion.div
          key={slide.gif}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: idx === activeSlide ? 1 : 0, scale: idx === activeSlide ? 1 : 0.98 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute inset-0 p-4"
        >
          <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden border border-slate-100">
            <img
              src={slide.gif}
              alt={`SIP slide ${idx + 1}`}
              className="h-full w-full object-contain bg-white"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ComparisonTable = () => {
  return (
    <div className="overflow-hidden rounded-[3rem] border-2 border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em]">Operational Vector</th>
            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em]">Retail / DIY</th>
            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em] bg-blue-600">TSP Intelligence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-bold text-slate-600">
          {[
            { f: 'Fund Selection', diy: 'Past Returns / Trends', tsp: 'Multi-Factor Alpha research' },
            { f: 'Tax Optimization', diy: 'Often Overlooked', tsp: 'Strategic Harvesting Protocols' },
            { f: 'Rebalancing', diy: 'Emotion-driven / Irregular', tsp: 'Algorithmic Drift Control' },
            { f: 'Risk Shield', diy: 'Basic Diversification', tsp: 'Tail-Risk Mitigation Matrix' },
            { f: 'Goal Sync', diy: 'Ad-hoc Deposits', tsp: 'Precision Target Calibration' }
          ].map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              <td className="p-8 italic text-primary">{row.f}</td>
              <td className="p-8 text-sm opacity-60">{row.diy}</td>
              <td className="p-8 text-sm bg-blue-50/30 text-blue-700 font-black">{row.tsp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SecureFuture = () => {
  const benefits = [
    { title: "Wealth Multiplication", desc: "Harness exponential compounding to grow your legacy capital." },
    { title: "Inflation Hedge", desc: "Equity exposure to stay ahead of rising lifecycle costs." },
    { title: "Economic Freedom", desc: "Passive income streams for total professional sovereignty." },
    { title: "Target Fulfillment", desc: "Precision funding for life's most critical milestones." }
  ];

  const drawbacks = [
    { title: "Wealth Erosion", desc: "Idle bank capital loses value every second due to inflation." },
    { title: "Labor Dependency", desc: "Perpetual dependency on active income with no exit strategy." },
    { title: "Unshielded Future", desc: "No financial buffer for volatile healthcare or emergency costs." },
    { title: "Compromised Dreams", desc: "Sacrificing lifestyle goals due to mathematical insufficiency." }
  ];

  return (
    <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 skew-x-12 translate-x-1/4 blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-6 py-2 mb-8">
             <AlertTriangle className="w-4 h-4 text-blue-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Opportunity Cost Analysis</span>
          </div>
          <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none">Secure Your <span className="text-blue-500">Timeline.</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-12">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] flex items-center gap-4">
              <div className="h-px w-8 bg-blue-400/50" />
              Strategic Benefits
            </h4>
            <div className="grid gap-8">
              {benefits.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex gap-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-black italic text-2xl mb-2 tracking-tight">{item.title}</p>
                      <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[11px] font-black text-rose-400 uppercase tracking-[0.4em] flex items-center gap-4">
              <div className="h-px w-8 bg-rose-400/50" />
              Risk Vectors
            </h4>
            <div className="grid gap-8">
              {drawbacks.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex gap-6">
                    <XCircle className="w-8 h-8 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-black italic text-2xl mb-2 tracking-tight">{item.title}</p>
                      <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Live Stock Bar ---

const LiveBar = () => {
  const stocks = [
    { name: 'NIFTY 50', price: '24,323.85', change: '+124.30', isUp: true },
    { name: 'SENSEX', price: '80,010.50', change: '+410.45', isUp: true },
    { name: 'RELIANCE', price: '2,987.40', change: '+15.20', isUp: true },
    { name: 'TCS', price: '4,120.15', change: '-45.30', isUp: false },
    { name: 'HDFC BANK', price: '1,450.60', change: '+8.75', isUp: true },
    { name: 'INFY', price: '1,620.30', change: '-12.10', isUp: false },
    { name: 'ICICI BANK', price: '1,085.45', change: '+5.60', isUp: true },
    { name: 'SBI', price: '760.20', change: '-3.45', isUp: false },
    { name: 'BAJAJ FIN', price: '7,120.45', change: '+85.60', isUp: true },
    { name: 'AIRTEL', price: '1,340.20', change: '-8.45', isUp: false },
    { name: 'WIPRO', price: '520.10', change: '+4.20', isUp: true },
    { name: 'AXIS BANK', price: '1,150.30', change: '+12.40', isUp: true },
  ];

  const duplicatedStocks = [...stocks, ...stocks, ...stocks];

  return (
    <div className="w-full h-[50px] bg-white/5 backdrop-blur-md border-b border-white/10 z-[50] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        {duplicatedStocks.map((stock, i) => (
          <div key={i} className="flex items-center gap-6 px-10 border-r border-white/5">
            <span className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em]">{stock.name}</span>
            <span className="text-white font-black italic tracking-tighter text-sm">{stock.price}</span>
            <span className={cn(
              "font-black italic text-xs flex items-center gap-1",
              stock.isUp ? "text-emerald-400" : "text-rose-500"
            )}>
              {stock.isUp ? '▲' : '▼'} {stock.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

const HomePage = () => {
  const pillars = [
    { title: "Investments", icon: TrendingUp, desc: "Alpha-focused fund selection methodology." },
    { title: "Insurance", icon: ShieldCheck, desc: "Hedge against life's unpredictable volatility." },
    { title: "Tax Planning", icon: Shield, desc: "Maximizing post-tax capital efficiency legally." },
    { title: "Retirement", icon: Calendar, desc: "Building inflation-protected income engines." },
    { title: "Education", icon: GraduationCap, desc: "Precision funding for generational success." },
    { title: "Risk Shield", icon: Activity, desc: "Algorithmic asset allocation protocols." }
  ];

  const testimonials = [
    {
      quote: "The Success Point Wealth Seed transformed my investment approach. Their personalized guidance helped me build a diversified portfolio that aligns perfectly with my retirement goals.",
      name: "Priya Sharma",
      role: "Senior Manager, Tech Industry"
    },
    {
      quote: "I was overwhelmed by mutual fund options until I found TSP Wealth Seed. Their team explained everything clearly and helped me make informed decisions. My portfolio has grown significantly.",
      name: "Rajesh Kumar",
      role: "Business Owner"
    }
  ];

  return (
    <div className="min-h-screen bg-[#03060f] text-white">
      <Helmet>
        <title>Institutional Wealth Strategy | The Success Point Wealth Seed LLP</title>
        <meta name="description" content="Expert mutual fund advisory, tax planning, and retirement strategies. Align your financial life into a single, cohesive wealth plan." />
      </Helmet>

      <Header />
      <LiveBar />

      <main>
        <HeroSection />
        <LogoHero />
        <AboutSection />

        {/* Combined SIP Introduction & Calculator Section */}
        <section className="py-24 bg-white text-slate-900 relative overflow-hidden z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.05),_transparent_50%)] -z-10" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center text-center mb-16"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="h-[2px] w-12 origin-center rounded-full bg-blue-600"
              />
              <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500">SIP</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text & Slides */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <SIPIntelligenceCarousel />
                </motion.div>
              </div>
              
              {/* Right Column: Calculator */}
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <SIPCalculator />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Holistic Ecosystem - 6 Pillars */}
        <section className="py-20 relative bg-[#03060f] border-y border-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#2563eb08_0%,_transparent_40%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">The Unified Framework</h2>
              <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-6">Synchronizing <br />6 Strategic <span className="text-blue-500">Pillars.</span></h3>
              <p className="text-lg text-slate-400 font-medium">
                We solve the puzzle of your financial life by orchestrating every moving part into a single, cohesive engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-[1.2rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-500">
                    <p.icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-black italic tracking-tight mb-3">{p.title}</h4>
                  <p className="text-base text-slate-500 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section (Machined Terminal Look) */}
        <section className="py-32 bg-slate-50 text-slate-900 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-5">
                 <div className="inline-flex items-center gap-2 bg-blue-600/5 border border-blue-600/10 rounded-full px-4 py-1.5 mb-8">
                    <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Delta Assessment</span>
                 </div>
                <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-10 leading-[0.9]">Why <br /> Professional <span className="text-blue-600">Intel?</span></h2>
                <div className="space-y-8">
                  {[
                    "Save 40+ high-value hours/year on quantitative research.",
                    "Mitigate emotional drift during extreme market turbulence.",
                    "Optimize post-tax CAGR with institutional harvesting.",
                    "Seamless inter-generational wealth transmission architecture."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-6">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-blue-200">
                         <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="text-lg font-bold text-slate-600 leading-tight italic">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <ComparisonTable />
              </div>
            </div>
          </div>
        </section>

        <SecureFuture />

        {/* Global Network Proof */}
        <section className="py-32 bg-[#03060f] relative overflow-hidden border-y border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-12 text-white">The Client <br /><span className="text-blue-500">Trust Index.</span></h2>
                <div className="grid grid-cols-2 gap-10">
                  {[
                    { v: "87%", l: "Client Loyalty" },
                    { v: "₹500Cr+", l: "Strategic Assets" },
                    { v: "15+ Yrs", l: "Domain Authority" },
                    { v: "100%", l: "Audit Ready" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-1 italic tracking-tighter">{stat.v}</p>
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">{stat.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl" />
                    <p className="text-xl italic font-bold text-slate-300 mb-10 leading-relaxed relative z-10">"{t.quote}"</p>
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl italic shadow-2xl shadow-blue-600/20">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-lg font-black text-white italic tracking-tight">{t.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Final Engagement */}
        <section className="py-32 bg-white text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-blue-600 rounded-[4.5rem] p-16 md:p-32 text-white shadow-[0_60px_120px_-30px_rgba(37,99,235,0.45)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent pointer-events-none" />
              
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-12 relative z-10">Unify Your <br /><span className="text-blue-200">Advisory Logic.</span></h2>
              
              <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium text-blue-100/80 leading-relaxed relative z-10">
                Transition from fragmented deposits to institutional-grade wealth architecture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
                <Link to="/contact">
                  <button className="h-20 px-16 rounded-[2rem] bg-white text-blue-600 font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-[1.03] active:scale-95 transition-all">
                    Initiate Alpha
                  </button>
                </Link>
                <a href="tel:+918968812137">
                  <button className="h-20 px-16 rounded-[2rem] border-2 border-white/20 bg-white/5 backdrop-blur-md text-white font-black uppercase text-sm tracking-[0.3em] hover:bg-white/10 transition-all">
                    Access Expert
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
