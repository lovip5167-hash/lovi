import React, { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const formatCurrency = (val) => 
  new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0,
    notation: val > 10000000 ? 'compact' : 'standard'
  }).format(val);

export const RentVsBuyCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [rent, setRent] = useState(30000);
  const [tenure, setTenure] = useState(15);
  const [appreciation, setAppreciation] = useState(5);
  const [rentIncrease, setRentIncrease] = useState(8);
  const [interestRate, setInterestRate] = useState(8.5);

  const comparison = useMemo(() => {
    let totalRent = 0;
    let currentRent = rent;
    for (let i = 1; i <= tenure; i++) {
      totalRent += currentRent * 12;
      currentRent *= (1 + rentIncrease / 100);
    }

    const downPayment = propertyValue * 0.2;
    const loanAmount = propertyValue * 0.8;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalEMI = emi * n;
    
    const finalValue = propertyValue * Math.pow(1 + appreciation / 100, tenure);
    const netCostBuy = downPayment + totalEMI - finalValue;

    return { totalRent, totalEMI, finalValue, netCostBuy, emi };
  }, [propertyValue, rent, tenure, appreciation, rentIncrease, interestRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Property Value</Label>
          <Slider value={[propertyValue]} min={1000000} max={50000000} step={100000} onValueChange={(val) => setPropertyValue(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Rent</Label>
          <Slider value={[rent]} min={5000} max={200000} step={1000} onValueChange={(val) => setRent(val[0])} />
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Home Loan Rate (%)</Label>
             <Slider value={[interestRate]} min={5} max={15} step={0.1} onValueChange={(val) => setInterestRate(val[0])} />
           </div>
           <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Tenure (Years)</Label>
             <Slider value={[tenure]} min={5} max={30} onValueChange={(val) => setTenure(val[0])} />
           </div>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Total Rent Paid</p>
               <p className="text-2xl font-black text-primary">{formatCurrency(Math.round(comparison.totalRent))}</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Monthly EMI</p>
               <p className="text-2xl font-black text-primary">{formatCurrency(Math.round(comparison.emi))}</p>
            </div>
         </div>
         <div className={`p-10 rounded-[3rem] text-center shadow-2xl ${comparison.netCostBuy < comparison.totalRent ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 shadow-blue-200'} text-white`}>
            <h3 className="text-4xl font-black italic mb-4">
               {comparison.netCostBuy < comparison.totalRent ? 'Better to Buy! ✅' : 'Better to Rent! 🏠'}
            </h3>
            <p className="text-white/70">
               Buying will result in a net {comparison.netCostBuy < comparison.totalRent ? 'gain' : 'cost'} of {formatCurrency(Math.abs(Math.round(comparison.netCostBuy)))} after {tenure} years including property appreciation.
            </p>
         </div>
      </div>
    </div>
  );
};

export const BudgetingTool = () => {
  const [income, setIncome] = useState(100000);
  const [expenses, setExpenses] = useState({
    Needs: 50,
    Wants: 30,
    Savings: 20
  });

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
         <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly In-Hand Income</Label>
         <div className="relative max-w-md mx-auto">
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 px-8 font-black text-4xl text-center text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Needs', color: 'bg-blue-600', desc: 'Rent, Food, EMI, Bills' },
           { label: 'Wants', color: 'bg-indigo-500', desc: 'Dining, Travel, Hobbies' },
           { label: 'Savings', color: 'bg-green-500', desc: 'SIP, Emergency Fund' }
         ].map((item, i) => (
           <Card key={i} className="p-8 rounded-[2.5rem] border-slate-100 flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-2xl ${item.color} mb-6`} />
              <h4 className="text-xl font-black text-primary mb-2 italic">{item.label}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase mb-6">{item.desc}</p>
              <p className="text-3xl font-black text-primary tracking-tighter mb-2">{formatCurrency(income * (expenses[item.label] / 100))}</p>
              <p className="text-sm font-bold text-slate-400">{expenses[item.label]}% of income</p>
              <Slider 
                value={[expenses[item.label]]} 
                max={100} 
                onValueChange={(val) => {
                  const newExp = {...expenses};
                  newExp[item.label] = val[0];
                  setExpenses(newExp);
                }}
                className="mt-8"
              />
           </Card>
         ))}
      </div>

      <div className="bg-slate-50 rounded-[2.5rem] p-8 text-center border border-slate-100">
         <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Rule of Thumb: 50/30/20</p>
         <p className="text-sm text-slate-500 font-medium">Your current total allocation: <span className={`font-black ${expenses.Needs + expenses.Wants + expenses.Savings === 100 ? 'text-green-600' : 'text-red-500'}`}>{expenses.Needs + expenses.Wants + expenses.Savings}%</span></p>
      </div>
    </div>
  );
};

export const AssetAllocationRebalancer = () => {
  const [current, setCurrent] = useState({ equity: 700000, debt: 300000 });
  const [target, setTarget] = useState({ equity: 60, debt: 40 });

  const rebalance = useMemo(() => {
    const total = current.equity + current.debt;
    const targetEquityAmount = total * (target.equity / 100);
    const targetDebtAmount = total * (target.debt / 100);
    
    return {
      equityDiff: targetEquityAmount - current.equity,
      debtDiff: targetDebtAmount - current.debt
    };
  }, [current, target]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-xl font-black text-primary italic mb-6">Current Portfolio</h4>
          <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Equity Value</Label>
             <input type="number" value={current.equity} onChange={(e) => setCurrent({...current, equity: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          </div>
          <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Debt Value</Label>
             <input type="number" value={current.debt} onChange={(e) => setCurrent({...current, debt: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-xl font-black text-primary italic mb-6">Target Allocation (%)</h4>
          <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Target Equity: {target.equity}%</Label>
             <Slider value={[target.equity]} max={100} onValueChange={(val) => setTarget({equity: val[0], debt: 100 - val[0]})} />
          </div>
          <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Target Debt: {target.debt}%</Label>
             <Slider value={[target.debt]} max={100} onValueChange={(val) => setTarget({debt: val[0], equity: 100 - val[0]})} />
          </div>
        </div>
      </div>

      <div className="p-12 rounded-[3.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-200">
         <h3 className="text-3xl font-black italic mb-8 text-center">Rebalancing Strategy</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/10 text-center">
               <p className="text-blue-100 font-black uppercase text-[10px] tracking-widest mb-2">Equity Action</p>
               <p className={`text-3xl font-black ${rebalance.equityDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {rebalance.equityDiff >= 0 ? 'Buy' : 'Sell'} {formatCurrency(Math.abs(rebalance.equityDiff))}
               </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/10 text-center">
               <p className="text-blue-100 font-black uppercase text-[10px] tracking-widest mb-2">Debt Action</p>
               <p className={`text-3xl font-black ${rebalance.debtDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {rebalance.debtDiff >= 0 ? 'Buy' : 'Sell'} {formatCurrency(Math.abs(rebalance.debtDiff))}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export const InvestmentGrowthSolver = () => {
  const [target, setTarget] = useState(10000000);
  const [initial, setInitial] = useState(100000);
  const [years, setYears] = useState(10);
  const [returns, setReturns] = useState(12);

  const solve = useMemo(() => {
    const r = returns / 100;
    const futureVal = initial * Math.pow(1 + r, years);
    const gap = target - futureVal;
    
    // Monthly SIP needed to bridge the gap
    const monthlyRate = returns / 12 / 100;
    const months = years * 12;
    const neededSIP = gap / (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) / (1 + monthlyRate);

    return { futureVal, gap, neededSIP: Math.max(0, neededSIP) };
  }, [target, initial, years, returns]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Target Amount</Label>
          <Slider value={[target]} min={100000} max={100000000} step={100000} onValueChange={(val) => setTarget(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Initial Investment</Label>
          <Slider value={[initial]} min={1000} max={10000000} step={1000} onValueChange={(val) => setInitial(val[0])} />
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
             <Slider value={[returns]} min={1} max={30} step={0.5} onValueChange={(val) => setReturns(val[0])} />
           </div>
           <div className="space-y-4">
             <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Duration (Years)</Label>
             <Slider value={[years]} min={1} max={40} onValueChange={(val) => setYears(val[0])} />
           </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col justify-center gap-6">
         <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Lumpsum will grow to</p>
            <p className="text-3xl font-black text-primary">{formatCurrency(Math.round(solve.futureVal))}</p>
         </div>
         <div className="p-12 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 text-center">
            <p className="text-indigo-100 font-black uppercase text-[10px] tracking-widest mb-4">Bridge the Gap</p>
            <h3 className="text-4xl font-black tracking-tighter mb-4">Start SIP of {formatCurrency(Math.round(solve.neededSIP))}</h3>
            <p className="text-indigo-100/70">To reach your target of {formatCurrency(target)} in {years} years.</p>
         </div>
      </div>
    </div>
  );
};
