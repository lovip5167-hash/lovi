import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Zap,
  Calendar,
  Activity,
} from 'lucide-react';
import heroVideo from '@/media/hero-bg.mp4';

/* ─── Floating Particle ─────────────────────────────────────── */
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full bg-blue-400/20 blur-sm pointer-events-none"
    style={style}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
    transition={{
      duration: style.duration || 5,
      repeat: Infinity,
      delay: style.delay || 0,
      ease: 'easeInOut',
    }}
  />
);

const particles = Array.from({ length: 15 }, (_, i) => ({
  width: `${Math.random() * 6 + 2}px`,
  height: `${Math.random() * 6 + 2}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
}));

/* ─── Main Component ────────────────────────────────────────── */
const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-[50vh] lg:min-h-[580px] flex items-center overflow-hidden bg-[#03060f]">

      {/* ── Video BG ── */}
      {heroVideo && (
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0">
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03060f] via-[#03060f]/60 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03060f] via-transparent to-transparent z-[2]" />

      {/* ── Glow orbs ── */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[140px] z-[2]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-700/10 rounded-full blur-[120px] z-[2]" />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {particles.map((p, i) => <Particle key={i} style={p} />)}
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 md:pt-20 lg:pt-16 pb-10 md:pb-12 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-400"> Qualified Personal Finance Proffesion </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[68px] font-black text-white leading-[1] lg:leading-[1.2] mb-5 tracking-tighter"
            >
              Growing Wealth
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-100 to-blue-500">
                   Protecting Futures
                </span>              
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-blue-600 rounded-full blur-[1px]"
                />
              </span>
            </motion.h1>

            {/* Sub-tagline */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="hidden lg:block h-[2px] w-10 bg-blue-600 rounded-full" />
              <p className="text-xs md:text-sm font-black text-blue-400 uppercase tracking-[0.1em] md:tracking-[0.15em]">
                Growing Wealth. Protecting Futures.
              </p>
              <div className="lg:hidden h-[1px] w-6 bg-blue-600/30 rounded-full" />
            </motion.div>

            {/* Body copy */}
            <motion.p variants={itemVariants}
              className="text-sm md:text-lg text-slate-300 mb-10 max-w-lg lg:max-w-xl leading-relaxed font-medium px-4 lg:px-0"
            >
              Experience the precision of institutional-grade advisory. We align your capital with <span className="text-white font-bold">scientific research</span> for resilient growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-10 sm:px-0">
              <a
                href="https://wa.me/8968812137?text=Hello!%20I%20would%20like%20to%20start%20my%20wealth%20journey."
                target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="relative w-full sm:min-w-[180px] flex items-center justify-center gap-3 h-10 sm:h-12 px-5 sm:px-8 rounded-xl font-black uppercase tracking-[0.1em] text-[9px] sm:text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  Start Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </a>
              <Link to="/mutual-funds" className="w-full sm:w-auto">
                <button className="w-full sm:min-w-[180px] flex items-center justify-center h-11 sm:h-12 px-5 sm:px-8 rounded-xl font-black uppercase tracking-[0.1em] text-[9px] sm:text-xs text-slate-300 border border-white/10 backdrop-blur-md hover:bg-white/5 transition-all">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Growth Bars Only - HIDDEN ON MOBILE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            className="hidden md:flex items-end justify-center relative min-h-[450px]"
          >
            <div className="relative w-full max-w-sm h-[400px] flex items-end justify-center px-10 pb-10">
               
               {/* ── ANIMATED GROWTH BARS ── */}
               <div className="flex items-end gap-5 w-full h-[300px] z-20">
                  {[35, 55, 75, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-3 group">
                       <motion.div
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ duration: 1.5, delay: i * 0.1 + 0.5, ease: "circOut" }}
                         className="w-full bg-gradient-to-t from-blue-600/90 via-blue-500/60 to-blue-400/40 rounded-t-2xl border-x border-t border-white/20 relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                       >
                          {/* Animated upward pulse */}
                          <motion.div 
                            animate={{ y: ['100%', '-100%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                            className="absolute inset-x-0 h-full bg-gradient-to-t from-transparent via-white/30 to-transparent"
                          />
                          
                          {/* Internal Glow Shard */}
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-400/20 blur-xl" />
                       </motion.div>
                       
                       {/* Subtle bottom indicator */}
                       <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: i * 0.1 + 1.5, duration: 1 }}
                            className="h-full bg-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,1)]"
                          />
                       </div>
                    </div>
                  ))}
               </div>

               {/* Deep Ground Glow */}
               <div className="absolute bottom-[-10px] w-full h-32 bg-blue-600/20 blur-[60px] rounded-full z-10" />
               
               {/* Ambient Atmosphere Nodes */}
               <div className="absolute inset-0 pointer-events-none">
                  {[
                    { top: '10%', right: '10%' },
                    { top: '40%', left: '5%' },
                    { top: '70%', right: '5%' }
                  ].map((pos, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i }}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
                      style={pos}
                    />
                  ))}
               </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;