import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  X, 
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  Target
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import CalculatorCard from '@/components/calculators/CalculatorCard.jsx';
import { categories, calculators } from '@/components/calculators/calculator-list';
import { SIPCalculator, LumpsumCalculator, GoalPlanner } from '@/components/calculators/base-calculators';
import { 
  StepUpSIPCalculator, 
  SWPCalculator, 
  LoanEMICalculator, 
  CAGRCalculator,
  PPFCalculator,
  RetirementPlanner,
  GoalBasedSIPCalculator,
  ChildEducationPlanner,
  MonteCarloSimulation
} from '@/components/calculators/advanced-calculators';
import {
  FuturePresentValueCalculator,
  TermInsuranceCalculator,
  HRACalculator,
  EPFCalculator,
  TaxHarvestingCalculator,
  CorpusPlanner
} from '@/components/calculators/extra-calculators';
import {
  GoalStepUpSIPCalculator,
  RiskProfileAssessment,
  NPVCalculator,
  CashVsLoanCalculator,
  IRRCalculator,
  FinancialRatios,
  MFDCommissionCalculator
} from '@/components/calculators/business-calculators';
import {
  RentVsBuyCalculator,
  BudgetingTool,
  AssetAllocationRebalancer,
  InvestmentGrowthSolver
} from '@/components/calculators/utility-calculators';

// Import or define other calculators here...
const PlaceholderCalculator = ({ title }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
      <Sparkles className="w-10 h-10 text-blue-600" />
    </div>
    <h3 className="text-2xl font-black text-primary mb-2 italic">{title}</h3>
    <p className="text-slate-500 max-w-md mx-auto">
      We are currently calibrating the institutional-grade logic for this calculator. It will be available shortly.
    </p>
  </div>
);

const CalculatorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCalculator, setActiveCalculator] = useState(null);

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calc => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === '' || 
                           calc.title.toLowerCase().includes(query) || 
                           calc.description.toLowerCase().includes(query);
      
      // If there's a search query, show results from ALL categories that match
      // Otherwise, respect the category filter
      const matchesCategory = query !== '' || selectedCategory === 'all' || calc.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const renderCalculator = () => {
    if (!activeCalculator) return null;

    switch (activeCalculator.id) {
      case 'sip':
        return <SIPCalculator />;
      case 'lumpsum':
        return <LumpsumCalculator />;
      case 'goal-planning':
        return <GoalPlanner />;
      case 'goal-sip':
        return <GoalBasedSIPCalculator />;
      case 'step-up-sip':
        return <StepUpSIPCalculator />;
      case 'goal-step-up-sip':
        return <GoalStepUpSIPCalculator />;
      case 'swp-calculator':
        return <SWPCalculator />;
      case 'loan-emi':
        return <LoanEMICalculator />;
      case 'cagr-calculator':
        return <CAGRCalculator />;
      case 'ppf-calculator':
        return <PPFCalculator />;
      case 'mf-category':
        return <PlaceholderCalculator title={activeCalculator.title} />;
      case 'mfd-commission':
        return <MFDCommissionCalculator />;
      case 'adv-retirement':
      case 'child-education':
        return <ChildEducationPlanner />;
      case 'financial-ratios':
        return <FinancialRatios />;
      case 'future-present-value':
        return <FuturePresentValueCalculator />;
      case 'term-insurance':
        return <TermInsuranceCalculator />;
      case 'hra-calculator':
        return <HRACalculator />;
      case 'epf-corpus':
        return <EPFCalculator />;
      case 'tax-harvesting':
        return <TaxHarvestingCalculator />;
      case 'corpus-planner':
        return <CorpusPlanner />;
      case 'risk-profile':
        return <RiskProfileAssessment />;
      case 'npv-calculator':
        return <NPVCalculator />;
      case 'irr-calculator':
        return <IRRCalculator />;
      case 'monte-carlo':
        return <MonteCarloSimulation />;
      case 'rent-vs-buy':
        return <RentVsBuyCalculator />;
      case 'budgeting':
        return <BudgetingTool />;
      case 'asset-rebalancer':
        return <AssetAllocationRebalancer />;
      case 'investment-growth':
        return <InvestmentGrowthSolver />;
      case 'cash-vs-loan':
        return <CashVsLoanCalculator />;
      default:
        return <PlaceholderCalculator title={activeCalculator.title} />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* ── Page Wide Background Graphics ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: [0, 90, 0],
             x: [0, 100, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ 
             scale: [1.2, 1, 1.2],
             rotate: [0, -90, 0],
             x: [0, -100, 0]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[100px]" 
         />
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Helmet>
        <title>Wealth Calculators | The Success Point Wealth Seed LLP</title>
        <meta name="description" content="Access 33+ institutional-grade financial calculators for SIP, Goals, Retirement, Loans, and Business." />
      </Helmet>

      <Header />

      <main className="relative z-10 pt-16 pb-32">
        <AnimatePresence mode="wait">
          {!activeCalculator ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center relative">
                {/* Simple glass header background */}
                <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-32 -z-10">
                   <motion.div 
                     initial={{ scale: 0.95, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full bg-white/18 rounded-[2.5rem] border border-white/35 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.12)] backdrop-blur-3xl relative overflow-hidden"
                   >
                     <div className="absolute -top-10 -left-12 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
                     <div className="absolute -bottom-12 right-0 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-3xl" />
                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/10 via-white/5 to-fuchsia-200/10" />
                   </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-20 flex flex-col items-center py-10"
                >
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 drop-shadow-[0_10px_20px_rgba(37,99,235,0.18)]">
                    Financial Calculators
                  </h1>
                </motion.div>
              </div>

              {/* Search and Filters */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-white/40 backdrop-blur-2xl border-[2px] border-white/60 shadow-2xl shadow-slate-200/40">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-indigo-50/30 rounded-[3.5rem] -z-10" />
                   
                   <div className="flex flex-col gap-12">
                    {/* Enhanced Search Input */}
                    <div className="relative w-full group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-5 group-focus-within:opacity-20 transition duration-500" />
                      <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-blue-600 transition-colors z-30 pointer-events-none" />
                      <Input 
                        placeholder="Search engines (e.g. SIP, Retirement, Goal)..."
                        className="relative z-20 pl-20 h-20 rounded-[1.8rem] bg-white border-2 border-slate-100/50 text-xl font-bold placeholder:text-slate-300 focus-visible:ring-blue-600 shadow-inner w-full cursor-text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Ultra-Modern Category Grid */}
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button 
                        onClick={() => setSelectedCategory('all')}
                        className={cn(
                          "relative px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 overflow-hidden group",
                          selectedCategory === 'all' 
                            ? "text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] scale-105" 
                            : "text-slate-500 bg-white/50 border-2 border-slate-100 hover:border-blue-200 hover:text-blue-600"
                        )}
                      >
                        {selectedCategory === 'all' && (
                          <motion.div layoutId="activeCat" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10" />
                        )}
                        <span className="relative z-10">All Tools</span>
                      </button>

                      {categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                          <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                              "relative px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 flex items-center gap-3 overflow-hidden group",
                              selectedCategory === cat.id 
                                ? "text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] scale-105" 
                                : "text-slate-500 bg-white/50 border-2 border-slate-100 hover:border-blue-200 hover:text-blue-600"
                            )}
                          >
                            {selectedCategory === cat.id && (
                              <motion.div layoutId="activeCat" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10" />
                            )}
                            <Icon className={cn("w-4 h-4 transition-transform duration-500 group-hover:rotate-12", selectedCategory === cat.id ? "text-white" : "text-blue-600")} />
                            <span className="relative z-10">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* Calculator Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                  {filteredCalculators.map((calc, i) => (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                    >
                      <CalculatorCard 
                        calc={calc} 
                        onClick={() => setActiveCalculator(calc)} 
                      />
                    </motion.div>
                  ))}
                </div>

                {filteredCalculators.length === 0 && (
                  <div className="py-40 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-100 rounded-full blur-3xl -z-10" />
                    <X className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                    <p className="text-3xl font-black text-slate-300 italic tracking-tighter">No engines found matching your query.</p>
                  </div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <Button 
                  variant="ghost" 
                  className="rounded-2xl px-8 h-16 font-black uppercase text-[11px] tracking-[0.3em] text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-xl transition-all"
                  onClick={() => setActiveCalculator(null)}
                >
                  <ArrowLeft className="w-5 h-5 mr-3" /> Back to Terminal
                </Button>

                <div className="text-center md:text-right flex flex-col items-center md:items-end gap-3">
                  <Badge className="rounded-full px-6 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 border-2 border-blue-100 bg-white shadow-lg">
                    {categories.find(c => c.id === activeCalculator.category)?.label}
                  </Badge>
                  <h2 className="text-4xl md:text-6xl font-black text-primary italic tracking-tighter leading-none">{activeCalculator.title}</h2>
                </div>
              </div>

              <div className="relative group">
                {/* Active Tool Glass Container */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[5rem] blur-2xl opacity-5 group-hover:opacity-10 transition duration-1000" />
                <Card className="p-10 md:p-16 lg:p-24 rounded-[4.5rem] border-[4px] border-white bg-white/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                  {renderCalculator()}
                </Card>
              </div>

              {/* Enhanced CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-28 p-16 rounded-[4.5rem] bg-primary text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
              >
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                 <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
                 
                 <div className="text-center lg:text-left relative z-10 max-w-xl">
                    <h4 className="text-4xl md:text-5xl font-black italic mb-4 tracking-tighter">Ready to activate this strategy?</h4>
                    <p className="text-blue-100 text-xl font-medium opacity-80 leading-relaxed">Connect with our quantitative advisors to bridge the gap between math and reality.</p>
                 </div>
                 <Button size="lg" className="bg-white text-primary hover:bg-blue-50 h-20 px-16 rounded-[2rem] text-xl font-black shadow-2xl relative z-10 transition-transform active:scale-95">
                   Request Strategic Consultation
                 </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default CalculatorPage;
