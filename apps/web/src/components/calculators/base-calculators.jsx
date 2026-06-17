import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const formatCurrency = (val) => 
  new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0,
    notation: val > 10000000 ? 'compact' : 'standard'
  }).format(val);

export const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(20);

  const calculateSIP = useMemo(() => {
    const i = expectedReturn / 12 / 100;
    const n = timePeriod * 12;
    const maturityAmount = monthlyInvestment * (((Math.pow(1 + i, n)) - 1) / i) * (1 + i);
    const investedAmount = monthlyInvestment * n;
    const wealthGained = maturityAmount - investedAmount;

    const data = [];
    for (let year = 1; year <= timePeriod; year++) {
      const months = year * 12;
      const amount = monthlyInvestment * (((Math.pow(1 + i, months)) - 1) / i) * (1 + i);
      const invested = monthlyInvestment * months;
      data.push({
        year: `Year ${year}`,
        Wealth: Math.round(amount),
        Investment: invested
      });
    }

    return { maturityAmount, investedAmount, wealthGained, data };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Investment</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(monthlyInvestment)}</span>
          </div>
          <Slider 
            value={[monthlyInvestment]} 
            min={500} 
            max={100000} 
            step={500}
            onValueChange={(val) => setMonthlyInvestment(val[0])}
            className="py-2"
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{expectedReturn}%</span>
          </div>
          <Slider 
            value={[expectedReturn]} 
            min={1} 
            max={30} 
            step={0.5}
            onValueChange={(val) => setExpectedReturn(val[0])}
            className="py-2"
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Time Period (Years)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{timePeriod} Yrs</span>
          </div>
          <Slider 
            value={[timePeriod]} 
            min={1} 
            max={40} 
            onValueChange={(val) => setTimePeriod(val[0])}
            className="py-2"
          />
        </div>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Invested</p>
            <p className="text-2xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculateSIP.investedAmount)}</p>
          </div>
          <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Estimated Maturity</p>
            <p className="text-2xl font-black tracking-tighter">{formatCurrency(calculateSIP.maturityAmount)}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col">
        <div className="flex justify-between items-center mb-8">
           <h4 className="text-xl font-black text-primary tracking-tight italic">Wealth Growth Projection</h4>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Wealth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Principal</span>
              </div>
           </div>
        </div>
        <div className="flex-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculateSIP.data}>
              <defs>
                <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" hide />
              <YAxis hide domain={[0, 'auto']} />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">{payload[0].payload.year}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-black text-blue-600">Wealth: {formatCurrency(payload[0].value)}</p>
                          <p className="text-[10px] font-bold text-slate-400">Invested: {formatCurrency(payload[1].value)}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="Wealth" 
                stroke="#2563eb" 
                fillOpacity={1} 
                fill="url(#colorWealth)" 
                strokeWidth={4} 
              />
              <Area 
                type="monotone" 
                dataKey="Investment" 
                stroke="#e2e8f0" 
                fill="transparent" 
                strokeWidth={2} 
                strokeDasharray="8 8" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 p-6 rounded-3xl bg-green-50 border border-green-100 flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Total Wealth Gained</p>
              <p className="text-3xl font-black text-green-700 tracking-tighter">+{formatCurrency(calculateSIP.wealthGained)}</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Growth Multiple</p>
              <p className="text-3xl font-black text-green-700 tracking-tighter">{(calculateSIP.maturityAmount / calculateSIP.investedAmount).toFixed(2)}x</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const LumpsumCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const calculateLumpsum = useMemo(() => {
    const i = expectedReturn / 100;
    const n = timePeriod;
    const maturityAmount = totalInvestment * Math.pow(1 + i, n);
    const wealthGained = maturityAmount - totalInvestment;

    const data = [];
    for (let year = 1; year <= timePeriod; year++) {
      const amount = totalInvestment * Math.pow(1 + i, year);
      data.push({
        year: `Year ${year}`,
        Wealth: Math.round(amount),
        Investment: totalInvestment
      });
    }

    return { maturityAmount, investedAmount: totalInvestment, wealthGained, data };
  }, [totalInvestment, expectedReturn, timePeriod]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Total Investment</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(totalInvestment)}</span>
          </div>
          <Slider 
            value={[totalInvestment]} 
            min={5000} 
            max={10000000} 
            step={5000}
            onValueChange={(val) => setTotalInvestment(val[0])}
            className="py-2"
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{expectedReturn}%</span>
          </div>
          <Slider 
            value={[expectedReturn]} 
            min={1} 
            max={30} 
            step={0.5}
            onValueChange={(val) => setExpectedReturn(val[0])}
            className="py-2"
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Time Period (Years)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{timePeriod} Yrs</span>
          </div>
          <Slider 
            value={[timePeriod]} 
            min={1} 
            max={40} 
            onValueChange={(val) => setTimePeriod(val[0])}
            className="py-2"
          />
        </div>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Invested</p>
            <p className="text-2xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculateLumpsum.investedAmount)}</p>
          </div>
          <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Estimated Maturity</p>
            <p className="text-2xl font-black tracking-tighter">{formatCurrency(calculateLumpsum.maturityAmount)}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col">
        <div className="flex justify-between items-center mb-8">
           <h4 className="text-xl font-black text-primary tracking-tight italic">Wealth Growth Projection</h4>
        </div>
        <div className="flex-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculateLumpsum.data}>
              <defs>
                <linearGradient id="colorWealthLump" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" hide />
              <YAxis hide domain={[0, 'auto']} />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">{payload[0].payload.year}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-black text-blue-600">Wealth: {formatCurrency(payload[0].value)}</p>
                          <p className="text-[10px] font-bold text-slate-400">Invested: {formatCurrency(payload[1].value)}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="Wealth" stroke="#2563eb" fillOpacity={1} fill="url(#colorWealthLump)" strokeWidth={4} />
              <Area type="monotone" dataKey="Investment" stroke="#e2e8f0" fill="transparent" strokeWidth={2} strokeDasharray="8 8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 p-6 rounded-3xl bg-green-50 border border-green-100 flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Total Wealth Gained</p>
              <p className="text-3xl font-black text-green-700 tracking-tighter">+{formatCurrency(calculateLumpsum.wealthGained)}</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Growth Multiple</p>
              <p className="text-3xl font-black text-green-700 tracking-tighter">{(calculateLumpsum.maturityAmount / calculateLumpsum.investedAmount).toFixed(2)}x</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const GoalPlanner = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  const calculateGoal = useMemo(() => {
    const i = expectedReturn / 12 / 100;
    const n = timePeriod * 12;
    const requiredSIP = targetAmount / (((Math.pow(1 + i, n)) - 1) / i) / (1 + i);
    
    return { requiredSIP: Math.round(requiredSIP) };
  }, [targetAmount, expectedReturn, timePeriod]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Target Wealth</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
            <input 
              type="number" 
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-10 pr-4 font-black text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <Slider 
            value={[targetAmount]} 
            min={100000} 
            max={500000000} 
            step={100000}
            onValueChange={(val) => setTargetAmount(val[0])}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
          <input 
            type="number" 
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Slider 
            value={[expectedReturn]} 
            min={1} 
            max={30} 
            step={0.5}
            onValueChange={(val) => setExpectedReturn(val[0])}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Years to Goal</Label>
          <input 
            type="number" 
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Slider 
            value={[timePeriod]} 
            min={1} 
            max={50} 
            onValueChange={(val) => setTimePeriod(val[0])}
          />
        </div>
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 text-white text-center shadow-2xl shadow-blue-200">
         <p className="text-blue-100 font-black uppercase tracking-[0.2em] mb-4">Required Monthly Investment</p>
         <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{formatCurrency(calculateGoal.requiredSIP)}</h3>
         <p className="text-blue-100/70 max-w-lg mx-auto leading-relaxed">
            Investing {formatCurrency(calculateGoal.requiredSIP)} every month for {timePeriod} years at {expectedReturn}% return will help you reach your target of {formatCurrency(targetAmount)}.
         </p>
      </div>
    </div>
  );
};
