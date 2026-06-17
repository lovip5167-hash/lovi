
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about-us', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/mutual-funds', label: 'Mutual Funds' },
    { path: '/insurance', label: 'Insurance' },
    { path: '/calculator', label: 'Calculator' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={cn(
      "sticky top-0 z-50 backdrop-blur-xl border-b border-white/20 shadow-sm",
      location.pathname === "/" ? "bg-white" : "bg-white/80"
    )}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="https://horizons-cdn.hostinger.com/1d17585c-381d-4c52-bb2d-1cd2a5f27753/e56838daec924a5f1fa5543c2a7b04ee.png" 
              alt="Wealth Seed Logo" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex items-center">
              <span className=" font-black text-slate-900 text-xl md:text-sm lg:text-base  whitespace-nowrap">
                The Success Point <span className="hidden sm:inline">Wealth Seed LLP</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  bg-black
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-800 via-blue-400 to-blue-700
                  bg-[length:200%_auto]
                  font-bold text-[11px] lg:text-[12px] uppercase tracking-widest
                  px-4 lg:px-5 py-2.5
                  rounded-full
                  border border-white/10
                  transition-all duration-300
                  hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
                  hover:bg-right
                  hover:-translate-y-0.5
                  cursor-pointer
                  flex items-center justify-center
                  whitespace-nowrap
                  ${isActive(link.path) ? 'border-blue-500/60 bg-blue-950/80 shadow-[0_0_22px_rgba(59,130,246,0.28)] ring-1 ring-blue-400/20' : ''}
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Large Screen Nav (Alternative for 1024-1280px) */}
          <nav className="hidden md:flex xl:hidden items-center gap-1.3">
             {navLinks.slice(0, 5).map((link) => (
                <Link key={link.path} to={link.path} className={`text-[11px] font-black uppercase tracking-tighter px-3 py-2 rounded-full border border-slate-100 ${isActive(link.path) ? 'text-blue-600 bg-blue-50 shadow-[0_0_14px_rgba(59,130,246,0.25)]' : 'text-slate-600'}`}>
                   {link.label}
                </Link>
             ))}
             <Link to="/contact" className="ml-4">
                <Button size="sm" className="rounded-full text-[11px] h-8 px-4 bg-primary text-white">Join Us</Button>
             </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-8 border-t border-slate-100 bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col gap-5 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    bg-black
                    text-transparent bg-clip-text
                    bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700
                    bg-[length:200%_auto]
                    font-bold text-sm uppercase tracking-widest
                    px-6 py-4
                    rounded-2xl
                    border border-slate-800
                    transition-all duration-300
                    text-center
                    ${isActive(link.path) ? 'border-blue-500/50 bg-blue-50 text-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.18)]' : ''}
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
