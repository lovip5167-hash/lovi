import React, { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const formatCurrency = (val) => 
  new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0,
    notation: val > 10000000 ? 'compact' : 'standard'
  }).format(val);

export const GoalStepUpSIPCalculator = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);
  const [stepUp, setStepUp] = useState(10);

  const requiredSIP = useMemo(() => {
    // Binary search for the required starting SIP
    let low = 1;
    let high = targetAmount;
    let iterations = 0;
    
    while (low <= high && iterations < 100) {
      let mid = (low + high) / 2;
      let maturity = 0;
      let currentSIP = mid;
      const r = expectedReturn / 12 / 100;
      
      for (let year = 1; year <= timePeriod; year++) {
        for (let month = 1; month <= 12; month++) {
          maturity = (maturity + currentSIP) * (1 + r);
        }
        currentSIP = currentSIP * (1 + stepUp / 100);
      }
      
      if (Math.abs(maturity - targetAmount) < 1) {
        return mid;
      }
      if (maturity < targetAmount) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
      iterations++;
    }
    return low;
  }, [targetAmount, expectedReturn, timePeriod, stepUp]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Target Wealth</Label>
          <Slider value={[targetAmount]} min={100000} max={100000000} step={100000} onValueChange={(val) => setTargetAmount(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Returns (%)</Label>
          <Slider value={[expectedReturn]} min={1} max={30} step={0.5} onValueChange={(val) => setExpectedReturn(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Step-up (%)</Label>
          <Slider value={[stepUp]} min={1} max={50} step={1} onValueChange={(val) => setStepUp(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Years</Label>
          <Slider value={[timePeriod]} min={1} max={40} onValueChange={(val) => setTimePeriod(val[0])} />
        </div>
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 text-white text-center shadow-2xl">
         <p className="text-blue-100 font-black uppercase tracking-[0.2em] mb-4">Required Starting Monthly SIP</p>
         <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{formatCurrency(Math.round(requiredSIP))}</h3>
         <p className="text-blue-100/70 max-w-lg mx-auto">
            Starting with {formatCurrency(Math.round(requiredSIP))} and increasing it by {stepUp}% every year will help you reach {formatCurrency(targetAmount)} in {timePeriod} years.
         </p>
      </div>
    </div>
  );
};

export const RiskProfileAssessment = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: "What is your investment horizon?",
      options: [
        { text: "Less than 3 years", s: 1 },
        { text: "3 to 5 years", s: 2 },
        { text: "5 to 10 years", s: 3 },
        { text: "More than 10 years", s: 4 }
      ]
    },
    {
      q: "What is your primary goal?",
      options: [
        { text: "Capital Preservation", s: 1 },
        { text: "Regular Income", s: 2 },
        { text: "Balanced Growth", s: 3 },
        { text: "Aggressive Wealth Creation", s: 4 }
      ]
    },
    {
      q: "How would you react if your portfolio dropped 20% in a month?",
      options: [
        { text: "Panic and sell everything", s: 1 },
        { text: "Be very worried but wait", s: 2 },
        { text: "Stay calm and hold", s: 3 },
        { text: "Invest more at lower prices", s: 4 }
      ]
    }
  ];

  const getProfile = () => {
    const avg = score / questions.length;
    if (avg <= 1.5) return { name: "Conservative", desc: "Focus on safety and stability.", allocation: "Debt: 80%, Equity: 20%" };
    if (avg <= 2.5) return { name: "Moderate", desc: "Balance between growth and safety.", allocation: "Debt: 50%, Equity: 50%" };
    if (avg <= 3.5) return { name: "Aggressive", desc: "Focus on high growth with higher risk.", allocation: "Debt: 20%, Equity: 80%" };
    return { name: "Very Aggressive", desc: "Maximum wealth creation with high volatility.", allocation: "Equity: 100%" };
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      {step < questions.length ? (
        <div className="space-y-8 text-center">
           <Badge className="bg-blue-100 text-blue-600 border-none px-4 py-1">Question {step + 1} of {questions.length}</Badge>
           <h3 className="text-3xl font-black text-primary italic leading-tight">{questions[step].q}</h3>
           <div className="grid grid-cols-1 gap-4">
              {questions[step].options.map((opt, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="h-16 rounded-2xl border-slate-100 font-bold text-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
                  onClick={() => {
                    setScore(score + opt.s);
                    setStep(step + 1);
                  }}
                >
                  {opt.text}
                </Button>
              ))}
           </div>
        </div>
      ) : (
        <div className="text-center space-y-8">
           <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200">
              <Sparkles className="text-white w-12 h-12" />
           </div>
           <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Your Risk Profile is</p>
           <h3 className="text-6xl font-black text-blue-600 italic tracking-tighter">{getProfile().name}</h3>
           <p className="text-xl text-slate-500 font-medium">{getProfile().desc}</p>
           <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
              <p className="text-xs font-black text-slate-400 uppercase mb-4">Recommended Asset Allocation</p>
              <p className="text-2xl font-black text-primary">{getProfile().allocation}</p>
           </div>
           <Button variant="ghost" className="text-slate-400 font-bold" onClick={() => {setStep(0); setScore(0);}}>Retake Assessment</Button>
        </div>
      )}
    </div>
  );
};

export const NPVCalculator = () => {
  const [discountRate, setDiscountRate] = useState(10);
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [cashFlows, setCashFlows] = useState([300000, 300000, 300000, 300000, 300000]);

  const npv = useMemo(() => {
    let value = -initialInvestment;
    const r = discountRate / 100;
    cashFlows.forEach((cf, i) => {
      value += cf / Math.pow(1 + r, i + 1);
    });
    return value;
  }, [discountRate, initialInvestment, cashFlows]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Initial Investment</Label>
          <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Discount Rate (%)</Label>
          <Slider value={[discountRate]} min={1} max={30} step={0.5} onValueChange={(val) => setDiscountRate(val[0])} />
        </div>
        <div className="space-y-4">
           <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Annual Cash Flows (5 Years)</Label>
           <div className="grid grid-cols-2 gap-4">
              {cashFlows.map((cf, i) => (
                <div key={i} className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">Y{i+1}</span>
                  <input 
                    type="number" 
                    value={cf} 
                    onChange={(e) => {
                      const newCF = [...cashFlows];
                      newCF[i] = Number(e.target.value);
                      setCashFlows(newCF);
                    }} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 font-bold text-sm"
                  />
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col justify-center text-center">
         <div className={`p-12 rounded-[3.5rem] shadow-2xl mb-8 ${npv >= 0 ? 'bg-green-600 shadow-green-200' : 'bg-red-600 shadow-red-200'}`}>
            <p className="text-white/70 font-black uppercase text-[10px] tracking-widest mb-4">Net Present Value (NPV)</p>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white">{formatCurrency(Math.round(npv))}</h3>
            <p className="mt-6 text-white font-bold px-6 py-2 rounded-full bg-white/10 inline-block">
               {npv >= 0 ? 'Project is Viable ✅' : 'Project is NOT Viable ❌'}
            </p>
         </div>
         <p className="text-slate-500 text-sm font-medium px-8 leading-relaxed">
            NPV is the difference between the present value of cash inflows and the present value of cash outflows over a period of time.
         </p>
      </div>
    </div>
  );
};

export const CashVsLoanCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [loanInterest, setLoanInterest] = useState(9);
  const [investmentReturn, setInvestmentReturn] = useState(12);
  const [tenure, setTenure] = useState(5);

  const analysis = useMemo(() => {
    // Option 1: Buy with Cash
    // Opportunity cost: What that cash would have earned if invested
    const opportunityCost = purchasePrice * Math.pow(1 + investmentReturn / 100, tenure);

    // Option 2: Buy with Loan
    // Keep cash invested, pay EMI
    const r = loanInterest / 12 / 100;
    const n = tenure * 12;
    const emi = (purchasePrice * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = emi * n;
    const investedGrowth = purchasePrice * Math.pow(1 + investmentReturn / 100, tenure);
    
    const netLoanWealth = investedGrowth - totalPaid;

    return { opportunityCost, netLoanWealth, emi, totalPaid };
  }, [purchasePrice, loanInterest, investmentReturn, tenure]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Purchase Price</Label>
          <Slider value={[purchasePrice]} min={50000} max={10000000} step={10000} onValueChange={(val) => setPurchasePrice(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Loan Interest Rate (%)</Label>
          <Slider value={[loanInterest]} min={5} max={20} step={0.5} onValueChange={(val) => setLoanInterest(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Inv. Return Rate (%)</Label>
          <Slider value={[investmentReturn]} min={1} max={30} step={0.5} onValueChange={(val) => setInvestmentReturn(val[0])} />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
         <div className={`p-10 rounded-[3rem] text-center shadow-2xl ${analysis.netLoanWealth > 0 ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 shadow-blue-200'} text-white`}>
            <h3 className="text-4xl font-black italic mb-4">
               {analysis.netLoanWealth > purchasePrice ? 'Take the Loan! 💳' : 'Pay with Cash! 💰'}
            </h3>
            <p className="text-white/70">
               By taking a loan and keeping your cash invested at {investmentReturn}%, you could end up with {formatCurrency(Math.round(analysis.netLoanWealth))} after {tenure} years (after paying off the loan).
            </p>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex justify-between items-center">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Monthly EMI</p>
               <p className="text-2xl font-black text-primary">{formatCurrency(Math.round(analysis.emi))}</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Loan Cost</p>
               <p className="text-2xl font-black text-primary">{formatCurrency(Math.round(analysis.totalPaid))}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export const IRRCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [cashFlows, setCashFlows] = useState([300000, 300000, 300000, 300000, 300000]);

  const irr = useMemo(() => {
    const calculateNPV = (rate) => {
      let value = -initialInvestment;
      for (let i = 0; i < cashFlows.length; i++) {
        value += cashFlows[i] / Math.pow(1 + rate, i + 1);
      }
      return value;
    };

    // Binary search for IRR
    let low = -0.99;
    let high = 5.0; // 500%
    for (let i = 0; i < 100; i++) {
      let mid = (low + high) / 2;
      let npv = calculateNPV(mid);
      if (Math.abs(npv) < 0.01) return mid * 100;
      if (npv > 0) low = mid;
      else high = mid;
    }
    return low * 100;
  }, [initialInvestment, cashFlows]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Initial Investment</Label>
          <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="space-y-4">
           <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Annual Cash Flows (5 Years)</Label>
           <div className="grid grid-cols-2 gap-4">
              {cashFlows.map((cf, i) => (
                <div key={i} className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">Y{i+1}</span>
                  <input 
                    type="number" 
                    value={cf} 
                    onChange={(e) => {
                      const newCF = [...cashFlows];
                      newCF[i] = Number(e.target.value);
                      setCashFlows(newCF);
                    }} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 font-bold text-sm"
                  />
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col justify-center text-center">
         <div className="p-12 rounded-[3.5rem] bg-indigo-600 shadow-2xl mb-8 shadow-indigo-200">
            <p className="text-indigo-100 font-black uppercase text-[10px] tracking-widest mb-4">Internal Rate of Return (IRR)</p>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white">{irr.toFixed(2)}%</h3>
            <p className="mt-6 text-indigo-100 font-bold px-6 py-2 rounded-full bg-white/10 inline-block">
               Annualized Return
            </p>
         </div>
         <p className="text-slate-500 text-sm font-medium px-8 leading-relaxed italic">
            "IRR is the discount rate that makes the net present value (NPV) of all cash flows equal to zero."
         </p>
      </div>
    </div>
  );
};

export const FinancialRatios = () => {
  const [assets, setAssets] = useState(1000000);
  const [liabilities, setLiabilities] = useState(400000);
  const [currentAssets, setCurrentAssets] = useState(200000);
  const [currentLiabilities, setCurrentLiabilities] = useState(100000);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [annualDebtPayments, setAnnualDebtPayments] = useState(300000);

  const ratios = useMemo(() => {
    return {
      solvency: assets / (liabilities || 1),
      liquidity: currentAssets / (currentLiabilities || 1),
      debtToIncome: (annualDebtPayments / (annualIncome || 1)) * 100,
      savingsRate: ((annualIncome - annualDebtPayments - (annualIncome * 0.5)) / (annualIncome || 1)) * 100 // simplified
    };
  }, [assets, liabilities, currentAssets, currentLiabilities, annualIncome, annualDebtPayments]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label className="text-[10px] font-black text-slate-400 uppercase">Total Assets</Label>
               <input type="number" value={assets} onChange={(e) => setAssets(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold" />
            </div>
            <div className="space-y-2">
               <Label className="text-[10px] font-black text-slate-400 uppercase">Total Liabilities</Label>
               <input type="number" value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold" />
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label className="text-[10px] font-black text-slate-400 uppercase">Current Assets</Label>
               <input type="number" value={currentAssets} onChange={(e) => setCurrentAssets(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold" />
            </div>
            <div className="space-y-2">
               <Label className="text-[10px] font-black text-slate-400 uppercase">Current Liabilities</Label>
               <input type="number" value={currentLiabilities} onChange={(e) => setCurrentLiabilities(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold" />
            </div>
         </div>
         <div className="space-y-2">
            <Label className="text-[10px] font-black text-slate-400 uppercase">Annual Debt Payments (EMIs)</Label>
            <input type="number" value={annualDebtPayments} onChange={(e) => setAnnualDebtPayments(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 font-bold" />
         </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
         <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-center">
            <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Solvency Ratio</p>
            <p className="text-4xl font-black text-blue-700 tracking-tighter">{ratios.solvency.toFixed(2)}</p>
            <p className="text-[10px] mt-2 text-slate-400">Target: {'>'} 2.0</p>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 text-center">
            <p className="text-[10px] font-black text-indigo-600 uppercase mb-2">Liquidity Ratio</p>
            <p className="text-4xl font-black text-indigo-700 tracking-tighter">{ratios.liquidity.toFixed(2)}</p>
            <p className="text-[10px] mt-2 text-slate-400">Target: {'>'} 1.5</p>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-orange-50 border border-orange-100 text-center">
            <p className="text-[10px] font-black text-orange-600 uppercase mb-2">Debt-to-Income</p>
            <p className="text-4xl font-black text-orange-700 tracking-tighter">{ratios.debtToIncome.toFixed(1)}%</p>
            <p className="text-[10px] mt-2 text-slate-400">Target: {'<'} 35%</p>
         </div>
         <div className={`p-8 rounded-[2.5rem] border text-center ${ratios.solvency > 2 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            <p className="text-[10px] font-black uppercase mb-2">Health Score</p>
            <p className={`text-4xl font-black tracking-tighter ${ratios.solvency > 2 ? 'text-green-700' : 'text-red-700'}`}>
               {ratios.solvency > 2 ? 'Elite' : 'Warning'}
            </p>
         </div>
      </div>
    </div>
  );
};

export const MFDCommissionCalculator = () => {
  const [aum, setAum] = useState(100000000);
  const [avgCommission, setAvgCommission] = useState(0.75);
  const [monthlySip, setMonthlySip] = useState(2000000);
  const [years, setYears] = useState(5);
  const [marketGrowth, setMarketGrowth] = useState(10);

  const projections = useMemo(() => {
    let currentAum = aum;
    let totalCommission = 0;
    const data = [];

    for (let y = 1; y <= years; y++) {
      const yearStartAum = currentAum;
      // Add SIPs
      currentAum += monthlySip * 12;
      // Market Growth
      currentAum *= (1 + marketGrowth / 100);
      
      const yearEndAum = currentAum;
      const avgAum = (yearStartAum + yearEndAum) / 2;
      const yearCommission = avgAum * (avgCommission / 100);
      totalCommission += yearCommission;

      data.push({
        year: `Year ${y}`,
        AUM: Math.round(currentAum),
        Earnings: Math.round(yearCommission)
      });
    }

    return { finalAum: currentAum, annualEarnings: totalCommission / years, data };
  }, [aum, avgCommission, monthlySip, years, marketGrowth]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Current AUM</Label>
          <Slider value={[aum]} min={0} max={1000000000} step={1000000} onValueChange={(val) => setAum(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly SIP Inflow</Label>
          <Slider value={[monthlySip]} min={0} max={50000000} step={100000} onValueChange={(val) => setMonthlySip(val[0])} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Avg. Trail (%)</Label>
            <Slider value={[avgCommission]} min={0.1} max={1.5} step={0.05} onValueChange={(val) => setAvgCommission(val[0])} />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Market Growth (%)</Label>
            <Slider value={[marketGrowth]} min={0} max={20} step={1} onValueChange={(val) => setMarketGrowth(val[0])} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-center text-center">
         <div className="p-12 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl mb-8">
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-4">Projected Annual Trail Earnings (Year {years})</p>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-blue-400">{formatCurrency(Math.round(projections.data[years-1].Earnings))}</h3>
            <p className="mt-4 text-slate-500">Estimated AUM: {formatCurrency(projections.finalAum)}</p>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 flex justify-around">
            <div>
               <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Monthly Trail</p>
               <p className="text-2xl font-black text-blue-700">{formatCurrency(Math.round(projections.data[years-1].Earnings / 12))}</p>
            </div>
            <div>
               <p className="text-[10px] font-black text-blue-600 uppercase mb-1">AUM Multiple</p>
               <p className="text-2xl font-black text-blue-700">{(projections.finalAum / (aum || 1)).toFixed(1)}x</p>
            </div>
         </div>
      </div>
    </div>
  );
};
