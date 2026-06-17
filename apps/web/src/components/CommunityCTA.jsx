import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CommunityCTA = () => {
  return (
    <section className="lg:h-[700px] flex items-center px-6 py-16 lg:py-0 bg-slate-50/50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-slate-900 rounded-[5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="https://cdn.pixabay.com/video/2021/04/12/70878-537440474_large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay for visibility and style */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
          </div>

          {/* Refined Decorative Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-64 -mt-64 z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -ml-48 -mb-48 z-10" />
          
          <div className="relative z-20 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic leading-none"
            >
              Join our community <br/>
              <span className="text-blue-500">to learn more.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl mb-12 opacity-90 font-medium leading-relaxed"
            >
              Building a legacy starts with one small decision. Join thousands of investors who trust our expert-led approach and grow your knowledge.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <button className="bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:scale-105 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-2">
                Get Started Now <ArrowUpRight size={24} />
              </button>
              <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-5 rounded-[2rem] font-bold text-xl hover:bg-white/10 transition-all">
                Consult Expert
              </button>
            </motion.div>
            
            <p className="mt-12 text-[9px] text-white/30 uppercase tracking-[0.3em] max-w-md mx-auto leading-relaxed">
              Investment involves market risk. Please evaluate all documentation before committing capital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityCTA;
