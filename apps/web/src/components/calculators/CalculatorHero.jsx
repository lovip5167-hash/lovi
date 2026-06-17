import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Zap 
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const CalculatorHero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const xPct = e.clientX / innerWidth - 0.5;
    const yPct = e.clientY / innerHeight - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="perspective-2000"
        >
          {/* ── 3D Floating Badge ── */}
          <motion.div 
            variants={itemVariants}
            style={{ transform: "translateZ(80px)" }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-2xl border-2 border-blue-100 rounded-full px-6 py-2.5 mb-8 shadow-[0_15px_30px_rgba(37,99,235,0.08)] group cursor-default"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.35em]">Intelligence Terminal v2.5</span>
            <Sparkles className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
          </motion.div>
          
          {/* ── High-Impact 3D Title ── */}
          <motion.h1 
            variants={itemVariants}
            style={{ transform: "translateZ(120px)" }}
            className="text-6xl md:text-[9rem] font-black leading-[0.85] mb-8 tracking-tighter italic"
          >
            <span className="text-primary block transform-gpu hover:scale-[1.01] transition-transform duration-700">Wealth</span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform-gpu hover:scale-105 transition-transform duration-500 cursor-default">
              Engines.
              <span className="absolute -bottom-2 left-0 -z-10 text-slate-100 opacity-40 blur-[2px] select-none">Engines.</span>
            </span>
          </motion.h1>
          
          {/* ── Subtitle with Depth ── */}
          <motion.p 
            variants={itemVariants}
            style={{ transform: "translateZ(60px)" }}
            className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-bold opacity-90 mb-12 px-4"
          >
            Deploy 33+ high-velocity <span className="text-blue-600 italic">mathematical frameworks</span> to engineer your financial legacy.
          </motion.p>

          {/* ── Finance-Related 3D Figures ── */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
             {/* Trending Up */}
             <motion.div 
               style={{ transform: "translateZ(180px)" }}
               animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 left-[10%] w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl flex items-center justify-center border-2 border-white/50"
             >
                <TrendingUp className="w-8 h-8 text-white" />
             </motion.div>

             {/* Dollar Sign */}
             <motion.div 
               style={{ transform: "translateZ(140px)" }}
               animate={{ y: [0, 40, 0], rotate: [0, -25, 0] }}
               transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="absolute top-1/4 right-[5%] w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl flex items-center justify-center border-2 border-white/50"
             >
                <DollarSign className="w-10 h-10 text-white" />
             </motion.div>

             {/* Target */}
             <motion.div 
               style={{ transform: "translateZ(100px)" }}
               animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
               className="absolute bottom-1/3 left-[5%] w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center border-2 border-white/50"
             >
                <Target className="w-7 h-7 text-white" />
             </motion.div>

             {/* Pie Chart */}
             <motion.div 
               style={{ transform: "translateZ(160px)" }}
               animate={{ rotate: 360 }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-10 right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-2xl flex items-center justify-center border-2 border-white/50 p-6"
             >
                <PieChart className="w-full h-full text-white" />
             </motion.div>

             {/* Bar Chart */}
             <motion.div 
               style={{ transform: "translateZ(50px)" }}
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-1/4 w-12 h-12 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 shadow-lg flex items-center justify-center border border-white/50"
             >
                <BarChart3 className="w-6 h-6 text-white" />
             </motion.div>

             <motion.div 
               style={{ transform: "translateZ(30px)" }}
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.2, 0.4, 0.2]
               }}
               transition={{ duration: 10, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-blue-400/10 rounded-full blur-[100px]" 
             />
          </div>
        </motion.div>
      </div>
      
      {/* ── Animated Scroll Indicator ── */}
      <motion.div 
        animate={{ y: [0, 8, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">Initialize Hub</span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-600 to-transparent" />
      </motion.div>
    </section>
  );
};

export default CalculatorHero;
