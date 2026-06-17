import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WealthIntelligenceCard from '../components/WealthIntelligenceCard';
import { motion } from 'framer-motion';
import { Shield, Target, Cpu, BarChart3, Globe, Lock } from 'lucide-react';

const IntelligencePage = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Precision Targeting",
      description: "Our algorithms identify high-alpha opportunities aligned with your specific risk tolerance."
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      title: "AI-Driven Insights",
      description: "Real-time processing of SEBI reports and market sentiment to keep your portfolio ahead."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Risk Containment",
      description: "Multi-layered validation systems designed to protect capital during market volatility."
    }
  ];

  return (
    <div className="min-h-screen bg-[#03060f] text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Proprietary Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">
              Strategic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Wealth Intelligence
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Go beyond traditional advisory. Our Wealth Intelligence Terminal provides institutional-grade data visualization and predictive modeling for the modern investor.
            </p>

            <div className="grid gap-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group"
                >
                  <div className="shrink-0 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Component Showcase Section */}
          <div className="relative flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-blue-500/10 rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-indigo-500/10 rounded-full animate-reverse-spin duration-[20s]" />

            <WealthIntelligenceCard />
          </div>

        </div>

        {/* Global Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-32 p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-600/10 to-transparent border border-white/5 backdrop-blur-sm grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Active Capital", value: "₹450Cr+" },
            { label: "Success Rate", value: "94.2%" },
            { label: "Data Nodes", value: "1,200+" },
            { label: "AI Models", value: "12" }
          ].map((s, i) => (
            <div key={i} className="text-center space-y-2">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{s.label}</p>
              <p className="text-3xl font-black text-white">{s.value}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default IntelligencePage;
