import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, BarChart3, ShieldCheck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import aboutGif from '@/media/about.gif';
import Abo from './Abo.jsx';

const AboutSection = () => {
  return (
    <>
      <Abo />

      {/* Quick About & 3D Cards Section */}
      <section className="py-20 bg-[#03060f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Side: About Text */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6">Who We Are</h2>
                <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none mb-8 text-white">
                  Architecting Your <br /> <span className="text-blue-500">Wealth Destiny.</span>
                </h3>
                <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
                  At The Success Point Wealth Seed LLP, we go beyond traditional advisory. We are financial architects committed to building resilient, high-growth portfolios through institutional-grade strategies and deep quantitative research.
                </p>
              </motion.div>
            </div>

            {/* Right Side: 3D Cards Grid */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000 mb-12 w-full">
                {[
                  {
                    title: "Strategic Advisory",
                    desc: "Bespoke wealth plans aligned with your long-term vision.",
                    icon: Target,
                    color: "from-blue-600 to-cyan-500"
                  },
                  {
                    title: "Alpha Research",
                    desc: "Data-driven fund selection for superior risk-adjusted returns.",
                    icon: BarChart3,
                    color: "from-indigo-600 to-blue-500"
                  },
                  {
                    title: "Risk Engineering",
                    desc: "Advanced protocols to shield your capital from volatility.",
                    icon: ShieldCheck,
                    color: "from-blue-500 to-indigo-600"
                  },
                  {
                    title: "Tax Efficiency",
                    desc: "Maximizing your post-tax CAGR through legal optimization.",
                    icon: Shield,
                    color: "from-cyan-500 to-blue-600"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ 
                      rotateY: idx % 2 === 0 ? 5 : -5, 
                      rotateX: 5,
                      scale: 1.02,
                      translateZ: 20
                    }}
                    className="relative group cursor-pointer"
                  >
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm h-full transition-all duration-500 group-hover:border-blue-500/30 group-hover:bg-white/[0.04]">
                      <div className={cn("w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", item.color)}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-xl font-black italic tracking-tight text-white mb-3">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/about-us">
                  <Button className="h-16 px-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-[0.2em] transition-all group shadow-2xl shadow-blue-600/20">
                    Learn More <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
