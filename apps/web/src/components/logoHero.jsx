import React from 'react';
import { motion } from 'framer-motion';
import aboutLogo from '@/media/aboutlogo.png';

const logoHero = () => {
  const revealVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { 
      clipPath: 'inset(0 0% 0 0)', 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" } 
    }
  };

  const gradientVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden border-b border-slate-100">
      {/* Blurred background chart effect */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
                d="M0 800 L 100 750 L 200 780 L 300 700 L 400 720 L 500 600 L 600 650 L 700 500 L 800 550 L 900 400 L 1000 450 V 1000 H 0 Z" 
                fill="#2563eb"
                animate={{ d: [
                    "M0 800 L 100 750 L 200 780 L 300 700 L 400 720 L 500 600 L 600 650 L 700 500 L 800 550 L 900 400 L 1000 450 V 1000 H 0 Z",
                    "M0 830 L 100 780 L 200 810 L 300 730 L 400 750 L 500 630 L 600 680 L 700 530 L 800 580 L 900 430 L 1000 480 V 1000 H 0 Z",
                    "M0 800 L 100 750 L 200 780 L 300 700 L 400 720 L 500 600 L 600 650 L 700 500 L 800 550 L 900 400 L 1000 450 V 1000 H 0 Z"
                ] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                filter="blur(60px)"
            />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-full px-6 py-2"
            >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Institutional Authority</span>
            </motion.div>

            <div className="space-y-8">
                <div className="overflow-hidden">
                    <motion.h2 
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black italic tracking-tighter text-slate-900 leading-[0.9] lg:leading-[0.85]"
                    >
                        Qualified <br />
                        <span className="text-blue-600">Finance Pros.</span>
                    </motion.h2>
                </div>
                
                <div className="overflow-hidden">
                    <motion.p 
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl text-slate-500 font-medium leading-tight max-w-2xl italic"
                    >
                        Managing <span className="text-slate-900 font-black">₹50 Cr Assets</span> <br className="hidden md:block" />
                        with <span className="text-slate-900 font-black">11+ Years</span> of expertise.
                    </motion.p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {[
                    { label: "Assets Under Management", value: "₹50 Cr+", desc: "Cohesive Wealth Growth" },
                    { label: "Domain Excellence", value: "11+ Years", desc: "Scientific Research Backed" }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.2 }}
                        className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                        <p className="text-5xl font-black text-primary tracking-tighter italic mb-2 group-hover:text-blue-600 transition-colors">{stat.value}</p>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{stat.desc}</p>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Right Logo Area */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div 
              className="relative rounded-[5rem] group"
            >
              <div className="absolute -inset-4 bg-blue-500/5 rounded-[6rem] blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />
              <div className="relative bg-white rounded-[4.8rem] p-10 md:p-16 overflow-hidden flex items-center justify-center">
                <img 
                  src={aboutLogo} 
                  alt="TSP Logo" 
                  className="w-full h-auto object-contain scale-125 transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Glossy sweep effect */}
                <motion.div 
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-12"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default logoHero;
