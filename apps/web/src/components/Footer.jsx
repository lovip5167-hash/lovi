
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ArrowUp, 
  ChevronRight, 
  TrendingUp, 
  BookOpen, 
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'Mutual Fund Advisory', path: '/services' },
      { name: 'Portfolio Management', path: '/services' },
      { name: 'Financial Planning', path: '/services' },
      { name: 'Retirement Planning', path: '/services' },
      { name: 'Wealth Accumulation', path: '/services' }
    ],
    resources: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Contact Support', path: '/contact' },
      { name: 'Client Testimonials', path: '/#testimonials' },
      { name: 'FAQ', path: '/#faq' }
    ]
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#06b6d4] via-[#3b82f6] to-[#4f46e5] text-white pt-16 pb-8 overflow-hidden border-t border-white/30 shadow-[0_-20px_50px_-10px_rgba(6,182,212,0.4)]">
      {/* ── High-Gloss Atmosphere ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
        
        {/* Neon Sheen Sweep */}
        <motion.div 
          animate={{ 
            x: ['-100%', '300%'],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[-35deg]"
        />

        {/* High-Contrast Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-[130px]" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Company Brand (Neon Look) */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-700" />
                <img 
                  src="https://horizons-cdn.hostinger.com/1d17585c-381d-4c52-bb2d-1cd2a5f27753/e56838daec924a5f1fa5543c2a7b04ee.png" 
                  alt="TSP Logo" 
                  className="w-16 h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                />
              </div>
              <div>
                <span className="text-3xl font-black italic tracking-tighter block leading-none text-white drop-shadow-md">The Success Point</span>
                <span className="text-2xl font-black italic tracking-tighter block leading-none mt-1 text-yellow-300 group-hover:text-white transition-colors duration-500">Wealth Seed LLP</span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Institutional Grade Advisory</span>
                </div>
              </div>
            </Link>

            <p className="text-lg text-white font-bold leading-relaxed max-w-sm drop-shadow-sm">
              Architecting <span className="text-yellow-300">vibrant financial futures</span> through high-velocity strategy and mathematical precision.
            </p>

            <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] relative overflow-hidden group/card">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
               <ShieldCheck className="w-10 h-10 text-white animate-pulse" />
               <p className="text-xs font-black text-white leading-tight uppercase tracking-wider">
                 SEBI Registered <br />
                 <span className="text-yellow-300 font-bold lowercase tracking-normal">Institutional Reliability</span>
               </p>
            </div>
          </div>

          {/* Navigation Matrix (Glowing Links) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300 mb-8 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" /> Engines
              </h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      className="group flex items-center text-base font-black text-white hover:text-yellow-200 transition-all duration-300"
                    >
                      <div className="w-0 h-0.5 bg-yellow-300 mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#fbbf24]" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300 mb-8 flex items-center gap-2">
                <Globe className="w-5 h-5 text-yellow-300" /> Intelligence
              </h3>
              <ul className="space-y-4">
                {footerLinks.resources.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.path} 
                      className="group flex items-center text-base font-black text-white hover:text-yellow-200 transition-all duration-300"
                    >
                      <div className="w-0 h-0.5 bg-yellow-300 mr-0 opacity-0 group-hover:w-4 group-hover:mr-3 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#fbbf24]" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pop Contact Interface */}
          <div className="lg:col-span-4 space-y-8">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-8 text-center lg:text-left">Connect Terminal</h3>

             <div className="space-y-4">
                <a href="mailto:thesuccesspointbanga@gmail.com" className="group flex items-center gap-5 p-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/40 transition-all duration-500 relative overflow-hidden shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
                   <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-500">
                      <Mail className="w-5 h-5 text-white group-hover:text-blue-600" />
                   </div>
                   <div className="relative z-10">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-0.5">Primary Link</p>
                      <p className="text-sm font-black text-white">thesuccesspointbanga@gmail.com</p>
                   </div>
                </a>

                <a href="tel:+919888889338" className="group flex items-center gap-5 p-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/40 transition-all duration-500 relative overflow-hidden shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
                   <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-500">
                      <Phone className="w-5 h-5 text-white group-hover:text-blue-600" />
                   </div>
                   <div className="relative z-10">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-0.5">Secure Line</p>
                      <p className="text-sm font-black text-white">+91 98888-89338</p>
                   </div>
                </a>
             </div>

             <Link to="/contact" className="block">
               <button className="w-full h-16 rounded-2xl bg-white text-blue-600 font-black uppercase text-xs tracking-[0.4em] shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_60px_-10px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/10 -translate-x-[150%] skew-x-[-35deg] group-hover:translate-x-[150%] transition-transform duration-1000" />
                  <span className="relative z-10">Launch Engagement</span>
               </button>
             </Link>
          </div>
        </div>

        {/* Hyper-Pop Bottom Bar */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 hover:border-white hover:-translate-y-1.5 transition-all duration-500 shadow-2xl relative group/icon"
                >
                  <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/icon:opacity-20 blur-md transition-opacity" />
                  <Icon className="w-4 h-4 relative z-10" />
                </a>
              ))}
            </div>

            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] text-center italic">
              Quantum Engine Terminal © {currentYear} TSP Wealth Seed.
            </p>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-white hover:text-white transition-all duration-300"
            >
               Reset Zenith <ArrowUp className="w-4 h-4 group-hover:-translate-y-2 transition-transform duration-500 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

