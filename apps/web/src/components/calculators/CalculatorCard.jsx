import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryColors = {
  wealth: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    border: 'border-emerald-200/50',
    hoverBorder: 'hover:border-emerald-400',
    shadow: 'shadow-emerald-200/60',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    text: 'text-emerald-700',
    mesh: 'radial-gradient(at 0% 0%, hsla(150, 80%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(170, 80%, 90%, 1) 0, transparent 50%)'
  },
  goals: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    iconBg: 'bg-blue-100',
    border: 'border-blue-200/50',
    hoverBorder: 'hover:border-blue-400',
    shadow: 'shadow-blue-200/60',
    gradient: 'from-blue-400 via-indigo-500 to-violet-500',
    text: 'text-blue-700',
    mesh: 'radial-gradient(at 0% 0%, hsla(210, 80%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(230, 80%, 90%, 1) 0, transparent 50%)'
  },
  loans: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    iconBg: 'bg-amber-100',
    border: 'border-amber-200/50',
    hoverBorder: 'hover:border-amber-400',
    shadow: 'shadow-amber-200/60',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    text: 'text-amber-700',
    mesh: 'radial-gradient(at 0% 0%, hsla(40, 80%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(20, 80%, 90%, 1) 0, transparent 50%)'
  },
  analysis: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    iconBg: 'bg-purple-100',
    border: 'border-purple-200/50',
    hoverBorder: 'hover:border-purple-400',
    shadow: 'shadow-purple-200/60',
    gradient: 'from-purple-400 via-fuchsia-500 to-pink-500',
    text: 'text-purple-700',
    mesh: 'radial-gradient(at 0% 0%, hsla(270, 80%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(300, 80%, 90%, 1) 0, transparent 50%)'
  },
  business: {
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    iconBg: 'bg-rose-100',
    border: 'border-rose-200/50',
    hoverBorder: 'hover:border-rose-400',
    shadow: 'shadow-rose-200/60',
    gradient: 'from-rose-400 via-pink-500 to-orange-500',
    text: 'text-rose-700',
    mesh: 'radial-gradient(at 0% 0%, hsla(340, 80%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(10, 80%, 90%, 1) 0, transparent 50%)'
  },
  general: {
    bg: 'bg-sky-50',
    icon: 'text-sky-600',
    iconBg: 'bg-sky-100',
    border: 'border-sky-200/50',
    hoverBorder: 'hover:border-sky-400',
    shadow: 'shadow-sky-200/60',
    gradient: 'from-sky-400 via-blue-500 to-cyan-500',
    text: 'text-sky-700',
    mesh: 'radial-gradient(at 0% 0%, hsla(190, 80%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(210, 80%, 90%, 1) 0, transparent 50%)'
  }
};

const CalculatorCard = ({ calc, onClick }) => {
  const colors = categoryColors[calc.category] || categoryColors.general;
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full perspective-1000 transform-style-3d"
    >
      <div
        onClick={onClick}
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "group relative h-full w-full rounded-[3rem] border-2 bg-white p-10 cursor-pointer overflow-hidden transition-all duration-500 shadow-xl shadow-slate-200/50",
          colors.border,
          colors.hoverBorder,
          "hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]"
        )}
      >
        {/* Animated Background Mesh */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: colors.mesh }}
        />

        {/* 3D Content Layers */}
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10 flex flex-col h-full">
          <div 
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 bg-white border border-slate-100",
            )}
          >
             {calc.icon && <calc.icon className={cn("w-8 h-8", colors.icon)} />}
          </div>

          <h3 className="text-2xl font-black text-primary mb-3 italic tracking-tighter group-hover:text-blue-600 transition-colors leading-none">
            {calc.title}
          </h3>
          
          <p className="text-slate-500 font-bold text-base leading-snug flex-1 opacity-90 group-hover:opacity-100 transition-opacity">
            {calc.description}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <div 
               style={{ transform: "translateZ(10px)" }}
               className={cn(
              "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border transition-all duration-500",
              colors.bg,
              colors.text,
              colors.border,
              "bg-white/90 backdrop-blur-sm"
            )}>
              {calc.category}
            </div>
            
            <div 
              style={{ transform: "translateZ(20px)" }}
              className="flex items-center text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"
            >
              Launch <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
        
        {/* Glossy Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
            transform: "translateZ(50px)"
          }}
        />
      </div>
    </motion.div>
  );
};

export default CalculatorCard;
