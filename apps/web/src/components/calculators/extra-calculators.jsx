import React, { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const formatCurrency = (val) => 
  new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0,
    notation: val > 10000000 ? 'compact' : 'standard'
  }).format(val);

export const FuturePresentValueCalculator = () => {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(10);
  const [mode, setMode] = useState('FV'); // FV or PV

  const result = useMemo(() => {
    const r = rate / 100;
    if (mode === 'FV') {
      return amount * Math.pow(1 + r, time);
    } else {
      return amount / Math.pow(1 + r, time);
    }
  }, [amount, rate, time, mode]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setMode('FV')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${mode === 'FV' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
        >
          Future Value
        </button>
        <button 
          onClick={() => setMode('PV')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${mode === 'PV' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
        >
          Present Value
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">{mode === 'FV' ? 'Present Amount' : 'Future Amount'}</Label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[amount]} min={1000} max={100000000} step={1000} onValueChange={(val) => setAmount(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Inflation/Return Rate (%)</Label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[rate]} min={1} max={30} step={0.5} onValueChange={(val) => setRate(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Time Period (Years)</Label>
          <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[time]} min={1} max={50} onValueChange={(val) => setTime(val[0])} />
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center shadow-2xl">
         <p className="text-slate-400 font-black uppercase tracking-[0.2em] mb-4">{mode === 'FV' ? 'Value after' : 'Value today of'} {time} years</p>
         <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{formatCurrency(Math.round(result))}</h3>
         <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            {mode === 'FV' 
              ? `₹1,00,000 today will be equivalent to ${formatCurrency(Math.round(result / (amount/100000)))} in ${time} years at ${rate}% inflation.`
              : `To have the purchasing power of ${formatCurrency(amount)} in ${time} years, you need ${formatCurrency(Math.round(result))} today assuming ${rate}% inflation.`
            }
         </p>
      </div>
    </div>
  );
};

export const TermInsuranceCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [liabilities, setLiabilities] = useState(5000000);
  const [existingCover, setExistingCover] = useState(0);

  const recommendedCover = useMemo(() => {
    const yearsToRetire = retirementAge - currentAge;
    const humanLifeValue = annualIncome * Math.min(yearsToRetire, 20); // Standard rule of thumb
    const totalNeeded = humanLifeValue + liabilities - existingCover;
    return Math.max(0, totalNeeded);
  }, [annualIncome, currentAge, retirementAge, liabilities, existingCover]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Annual Income</Label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[annualIncome]} min={100000} max={50000000} step={100000} onValueChange={(val) => setAnnualIncome(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Total Liabilities (Loans etc.)</Label>
          <input type="number" value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[liabilities]} min={0} max={100000000} step={100000} onValueChange={(val) => setLiabilities(val[0])} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Current Age</Label>
            <Slider value={[currentAge]} min={18} max={65} onValueChange={(val) => setCurrentAge(val[0])} />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Retirement Age</Label>
            <Slider value={[retirementAge]} min={currentAge} max={75} onValueChange={(val) => setRetirementAge(val[0])} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-center gap-6">
        <div className="p-12 rounded-[3.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-200 text-center">
           <p className="text-blue-100 font-black uppercase text-[10px] tracking-widest mb-4">Recommended Life Cover</p>
           <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">{formatCurrency(recommendedCover)}</h3>
           <p className="text-blue-100/70">Ensure your family's lifestyle and goals are protected.</p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
           <h4 className="font-black text-primary mb-4 italic">Why this amount?</h4>
           <ul className="space-y-3 text-sm text-slate-500 font-medium">
             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Human Life Value (Income Replacement)</li>
             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Outstanding Debt Coverage</li>
             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Future Goal Protection (Education/Marriage)</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export const HRACalculator = () => {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [da, setDa] = useState(0);
  const [hraReceived, setHraReceived] = useState(25000);
  const [actualRent, setActualRent] = useState(20000);
  const [isMetro, setIsMetro] = useState(true);

  const exemption = useMemo(() => {
    const salary = (basicSalary + da) * 12;
    const received = hraReceived * 12;
    const rentPaid = actualRent * 12;
    
    const limit1 = received;
    const limit2 = isMetro ? salary * 0.5 : salary * 0.4;
    const limit3 = Math.max(0, rentPaid - salary * 0.1);

    return Math.min(limit1, limit2, limit3);
  }, [basicSalary, da, hraReceived, actualRent, isMetro]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Basic Salary</Label>
          <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly HRA Received</Label>
          <input type="number" value={hraReceived} onChange={(e) => setHraReceived(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Actual Rent Paid (Monthly)</Label>
          <input type="number" value={actualRent} onChange={(e) => setActualRent(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="flex items-center gap-4 pt-4">
           <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Living in Metro City?</Label>
           <button 
             onClick={() => setIsMetro(!isMetro)}
             className={`w-14 h-8 rounded-full transition-all relative ${isMetro ? 'bg-blue-600' : 'bg-slate-200'}`}
           >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${isMetro ? 'left-7' : 'left-1'}`} />
           </button>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="p-12 rounded-[3.5rem] bg-green-600 text-white shadow-2xl shadow-green-200 text-center mb-8">
           <p className="text-green-100 font-black uppercase text-[10px] tracking-widest mb-4">Annual HRA Exemption</p>
           <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">{formatCurrency(Math.round(exemption))}</h3>
           <p className="text-green-100/70">Taxable HRA: {formatCurrency(Math.max(0, (hraReceived * 12) - exemption))}</p>
        </div>
        <Card className="p-8 border-slate-100 rounded-[2rem]">
           <h4 className="font-black text-primary mb-6 italic">Calculation Logic</h4>
           <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Actual HRA Received</span>
                <span className="font-bold">{formatCurrency(hraReceived * 12)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{isMetro ? '50%' : '40%'} of Basic Salary</span>
                <span className="font-bold">{formatCurrency((basicSalary + da) * 12 * (isMetro ? 0.5 : 0.4))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Rent Paid - 10% of Basic</span>
                <span className="font-bold">{formatCurrency(Math.max(0, (actualRent * 12) - (basicSalary + da) * 12 * 0.1))}</span>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export const EPFCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [contribution, setContribution] = useState(12);
  const [age, setAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(58);
  const [expectedHike, setExpectedHike] = useState(5);
  const interestRate = 8.25;

  const calculateEPF = useMemo(() => {
    let balance = currentBalance;
    let salary = basicSalary;
    const years = retirementAge - age;
    const data = [];

    for (let year = 1; year <= years; year++) {
      const annualEmployer = Math.min(salary, 15000) * 0.0367 * 12; // Standard cap for employer
      const annualEmployee = salary * (contribution / 100) * 12;
      const totalAnnual = annualEmployer + annualEmployee;
      
      const interest = (balance + totalAnnual / 2) * (interestRate / 100);
      balance += totalAnnual + interest;
      
      data.push({
        year: `Year ${year}`,
        Balance: Math.round(balance)
      });
      salary = salary * (1 + expectedHike / 100);
    }

    return { finalBalance: balance, data };
  }, [basicSalary, currentBalance, contribution, age, retirementAge, expectedHike]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Basic + DA</Label>
          <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[basicSalary]} min={5000} max={500000} step={1000} onValueChange={(val) => setBasicSalary(val[0])} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Current Age</Label>
            <Slider value={[age]} min={18} max={57} onValueChange={(val) => setAge(val[0])} />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Hike (%)</Label>
            <Slider value={[expectedHike]} min={0} max={20} step={1} onValueChange={(val) => setExpectedHike(val[0])} />
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">EPF Interest Rate</p>
           <p className="text-3xl font-black text-blue-700 tracking-tighter">{interestRate}% p.a.</p>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="p-12 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl text-center mb-8">
           <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-4">Projected EPF Corpus at {retirementAge}</p>
           <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-blue-400">{formatCurrency(Math.round(calculateEPF.finalBalance))}</h3>
           <p className="text-slate-500">Based on standard EPF contribution rules.</p>
        </div>
      </div>
    </div>
  );
};

export const TaxHarvestingCalculator = () => {
  const [unrealizedGains, setUnrealizedGains] = useState(200000);
  const exemptionLimit = 125000;
  const taxRate = 0.125;

  const savings = useMemo(() => {
    return Math.min(unrealizedGains, exemptionLimit) * taxRate;
  }, [unrealizedGains]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-6">
        <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Total Unrealized LTCG (Equity)</Label>
        <div className="max-w-md mx-auto">
          <input type="number" value={unrealizedGains} onChange={(e) => setUnrealizedGains(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-8 px-10 font-black text-5xl text-center text-blue-600 focus:outline-none" />
          <Slider value={[unrealizedGains]} min={0} max={1000000} step={10000} onValueChange={(val) => setUnrealizedGains(val[0])} className="mt-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-10 rounded-[3rem] bg-green-600 text-white shadow-2xl shadow-green-200 text-center">
            <p className="text-green-100 font-black uppercase text-[10px] tracking-widest mb-4">Tax Saved this Year</p>
            <h3 className="text-5xl font-black tracking-tighter mb-4">{formatCurrency(savings)}</h3>
            <p className="text-green-100/70">By realizing gains up to {formatCurrency(exemptionLimit)}</p>
         </div>
         <div className="p-10 rounded-[3rem] bg-blue-50 border border-blue-100 text-center flex flex-col justify-center">
            <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-2">Benefit of Harvesting</p>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
               Tax harvesting involves selling your equity investments to "realize" the {formatCurrency(exemptionLimit)} tax-free limit every year, and then reinvesting the same amount to reset your cost base higher.
            </p>
         </div>
      </div>
    </div>
  );
};

export const CorpusPlanner = () => {
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflation, setInflation] = useState(6);

  const requiredCorpus = useMemo(() => {
    const realRate = ((1 + expectedReturn / 100) / (1 + inflation / 100)) - 1;
    return (desiredMonthlyIncome * 12) / realRate;
  }, [desiredMonthlyIncome, expectedReturn, inflation]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Desired Monthly Income</Label>
          <input type="number" value={desiredMonthlyIncome} onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
          <Slider value={[expectedReturn]} min={1} max={15} step={0.5} onValueChange={(val) => setExpectedReturn(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Inflation (%)</Label>
          <Slider value={[inflation]} min={1} max={10} step={0.5} onValueChange={(val) => setInflation(val[0])} />
        </div>
      </div>

      <div className="p-16 rounded-[4rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 text-center">
         <p className="text-indigo-100 font-black uppercase text-[10px] tracking-widest mb-4">Required Perpetual Corpus</p>
         <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">{formatCurrency(Math.round(requiredCorpus))}</h3>
         <p className="text-indigo-100/70 max-w-xl mx-auto">
            A corpus of {formatCurrency(Math.round(requiredCorpus))} will provide you a monthly income of {formatCurrency(desiredMonthlyIncome)} adjusted for inflation, theoretically forever.
         </p>
      </div>
    </div>
  );
};
