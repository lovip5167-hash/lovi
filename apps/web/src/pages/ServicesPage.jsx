import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  PieChart, 
  Target, 
  Briefcase, 
  Home, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  MousePointerClick
} from 'lucide-react';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Mutual Fund Advisory",
      description: "We don't just pick funds; we architect portfolios. Our multi-factor scientific selection process ensures your capital is deployed in high-conviction, risk-adjusted strategies.",
      benefits: [
        "Scientific fund selection methodology",
        "Quarterly portfolio hygiene checks",
        "Direct plan transition assistance",
        "Real-time performance dashboards"
      ],
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: PieChart,
      title: "Portfolio Management",
      description: "Professional asset allocation that adapts to market cycles. We manage the complexity of rebalancing so you can focus on your life.",
      benefits: [
        "Dynamic asset allocation (Equity/Debt/Gold)",
        "Automated rule-based rebalancing",
        "Tax-loss harvesting strategies",
        "Consolidated family-level reporting"
      ],
      image: "https://images.unsplash.com/photo-1611974714658-058f137213af?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Target,
      title: "Goal-Based Planning",
      description: "Turn abstract dreams into concrete mathematical milestones. We map every rupee you invest to a specific future life event.",
      benefits: [
        "Retirement corpus engineering",
        "Children's higher education funding",
        "Home purchase path mapping",
        "Inflation-adjusted cash flow analysis"
      ],
      image: "https://images.unsplash.com/photo-1454165833762-0204b28c6797?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Briefcase,
      title: "Investment Guidance",
      description: "Navigate market volatility with a professional by your side. We provide the behavioral coaching needed to stay the course.",
      benefits: [
        "Bi-annual strategy consultations",
        "Market cycle context & education",
        "Risk appetite assessment",
        "Wealth transfer & legacy planning"
      ],
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Home,
      title: "Retirement Strategy",
      description: "Ensuring your lifestyle never has an expiry date. We create passive income machines that outpace inflation.",
      benefits: [
        "SWP (Systematic Withdrawal Plan) setups",
        "Annuity & debt laddering",
        "Healthcare cost provisioning",
        "Passive income sustainability stress-tests"
      ],
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Our Services | The Success Point Wealth Seed LLP</title>
        <meta name="description" content="Comprehensive wealth management services including mutual fund advisory, portfolio management, and goal-based financial planning." />
      </Helmet>

      <Header />

      <main>
        {/* Compact & Friendly Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden bg-white border-b border-slate-50">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.3em]">Smart & Simple Help</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-primary leading-[0.9] mb-8 tracking-tighter italic">
                  How We Help You <br/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Build Your Future.</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium italic mb-10">
                  We take the confusing parts of money and make them easy. Think of us as your personal coaches for picking the right investments and making sure your savings stay safe while they grow.
                </p>
                
                {/* 3 Simple Pillars of Service */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                   {[
                      { icon: "🌱", title: "Pick Good Funds", desc: "We find the best 'money seeds' for you." },
                      { icon: "🛡️", title: "Keep it Safe", desc: "We make sure your savings are protected." },
                      { icon: "🏔️", title: "Plan for Big Goals", desc: "Like college, a home, or retiring early." }
                   ].map((item, i) => (
                     <div key={i} className="bg-blue-50/30 border border-blue-100 p-6 rounded-[2rem] flex flex-col items-center text-center hover:bg-blue-50 transition-colors group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</span>
                        <h4 className="text-sm font-black text-primary uppercase tracking-tight mb-1 italic">{item.title}</h4>
                        <p className="text-[11px] font-bold text-slate-500 leading-tight">{item.desc}</p>
                     </div>
                   ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES SHOWCASE ── */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="space-y-28">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'}>
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 shadow-sm">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight italic">
                      {service.title}
                    </h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-600 font-bold text-sm leading-tight">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact">
                      <Button variant="outline" className="rounded-xl border-blue-100 hover:bg-blue-50 text-blue-600 font-black h-12 px-8 uppercase text-xs tracking-widest transition-all">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" />
                      <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50 hidden sm:block">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                            <Zap className="text-green-600 w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Impact</p>
                            <p className="text-base font-black text-primary leading-none italic">Smart Execution</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-28 bg-slate-50 relative overflow-hidden border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-4">The Value Add</h2>
              <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter italic">Why Professional <br/>Management?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-12 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-2xl font-black text-primary mb-4 tracking-tight italic">Regulated Safety</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  All advice is delivered by SEBI-registered professionals, ensuring absolute transparency and compliance.
                </p>
              </div>
              
              <div className="p-12 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                  <MousePointerClick className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-black text-primary mb-4 tracking-tight italic">Frictionless Ops</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  We handle the paperwork, KYC, and transaction coordination so you never have to deal with bureaucracy.
                </p>
              </div>
              
              <div className="p-12 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                  <Zap className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="text-2xl font-black text-primary mb-4 tracking-tight italic">Alpha Generation</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Our scientific selection process aims to consistently outperform benchmarks over the long term.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
