import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
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

export const StepUpSIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(20);
  const [stepUp, setStepUp] = useState(10);

  const calculateStepUpSIP = useMemo(() => {
    const r = expectedReturn / 12 / 100;
    let totalInvested = 0;
    let maturityAmount = 0;
    let currentMonthly = monthlyInvestment;
    
    const data = [];
    for (let year = 1; year <= timePeriod; year++) {
      for (let month = 1; month <= 12; month++) {
        maturityAmount = (maturityAmount + currentMonthly) * (1 + r);
        totalInvested += currentMonthly;
      }
      data.push({
        year: `Year ${year}`,
        Wealth: Math.round(maturityAmount),
        Investment: totalInvested
      });
      currentMonthly = currentMonthly * (1 + stepUp / 100);
    }

    return { maturityAmount, investedAmount: totalInvested, wealthGained: maturityAmount - totalInvested, data };
  }, [monthlyInvestment, expectedReturn, timePeriod, stepUp]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Investment</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(monthlyInvestment)}</span>
          </div>
          <Slider value={[monthlyInvestment]} min={500} max={100000} step={500} onValueChange={(val) => setMonthlyInvestment(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Annual Step-up (%)</Label>
            <span className="text-2xl font-black text-blue-600 tracking-tighter">{stepUp}%</span>
          </div>
          <Slider value={[stepUp]} min={1} max={50} step={1} onValueChange={(val) => setStepUp(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{expectedReturn}%</span>
          </div>
          <Slider value={[expectedReturn]} min={1} max={30} step={0.5} onValueChange={(val) => setExpectedReturn(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Time Period (Years)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{timePeriod} Yrs</span>
          </div>
          <Slider value={[timePeriod]} min={1} max={40} onValueChange={(val) => setTimePeriod(val[0])} />
        </div>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Invested</p>
            <p className="text-2xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculateStepUpSIP.investedAmount)}</p>
          </div>
          <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Estimated Maturity</p>
            <p className="text-2xl font-black tracking-tighter">{formatCurrency(calculateStepUpSIP.maturityAmount)}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col">
        <h4 className="text-xl font-black text-primary tracking-tight italic mb-8">Growth with Annual Step-up</h4>
        <div className="flex-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculateStepUpSIP.data}>
              <defs>
                <linearGradient id="colorWealthStep" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="Wealth" stroke="#2563eb" fillOpacity={1} fill="url(#colorWealthStep)" strokeWidth={4} />
              <Area type="monotone" dataKey="Investment" stroke="#e2e8f0" fill="transparent" strokeWidth={2} strokeDasharray="8 8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [withdrawalAmount, setWithdrawalAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [timePeriod, setTimePeriod] = useState(10);

  const calculateSWP = useMemo(() => {
    const r = expectedReturn / 12 / 100;
    let balance = totalInvestment;
    let totalWithdrawn = 0;
    const data = [];

    for (let month = 1; month <= timePeriod * 12; month++) {
      const interest = balance * r;
      balance = balance + interest - withdrawalAmount;
      totalWithdrawn += withdrawalAmount;

      if (month % 12 === 0) {
        data.push({
          year: `Year ${month / 12}`,
          Balance: Math.max(0, Math.round(balance)),
          Withdrawn: totalWithdrawn
        });
      }
      if (balance <= 0) break;
    }

    return { finalBalance: Math.max(0, balance), totalWithdrawn, data };
  }, [totalInvestment, withdrawalAmount, expectedReturn, timePeriod]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Initial Investment</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(totalInvestment)}</span>
          </div>
          <Slider value={[totalInvestment]} min={100000} max={50000000} step={100000} onValueChange={(val) => setTotalInvestment(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Withdrawal</Label>
            <span className="text-2xl font-black text-blue-600 tracking-tighter">{formatCurrency(withdrawalAmount)}</span>
          </div>
          <Slider value={[withdrawalAmount]} min={1000} max={500000} step={1000} onValueChange={(val) => setWithdrawalAmount(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{expectedReturn}%</span>
          </div>
          <Slider value={[expectedReturn]} min={1} max={20} step={0.5} onValueChange={(val) => setExpectedReturn(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Time Period (Years)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{timePeriod} Yrs</span>
          </div>
          <Slider value={[timePeriod]} min={1} max={30} onValueChange={(val) => setTimePeriod(val[0])} />
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Withdrawn</p>
            <p className="text-2xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculateSWP.totalWithdrawn)}</p>
          </div>
          <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Final Balance</p>
            <p className="text-2xl font-black tracking-tighter">{formatCurrency(calculateSWP.finalBalance)}</p>
          </div>
        </div>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculateSWP.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" hide />
              <YAxis hide />
              <ChartTooltip />
              <Area type="monotone" dataKey="Balance" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const LoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = useMemo(() => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loanAmount;

    return { emi: Math.round(emi), totalPayment, totalInterest };
  }, [loanAmount, interestRate, tenure]);

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#e2e8f0' },
    { name: 'Interest', value: calculateEMI.totalInterest, color: '#2563eb' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Loan Amount</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(loanAmount)}</span>
          </div>
          <Slider value={[loanAmount]} min={100000} max={100000000} step={100000} onValueChange={(val) => setLoanAmount(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Interest Rate (%)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{interestRate}%</span>
          </div>
          <Slider value={[interestRate]} min={5} max={20} step={0.1} onValueChange={(val) => setInterestRate(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Tenure (Years)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{tenure} Yrs</span>
          </div>
          <Slider value={[tenure]} min={1} max={30} onValueChange={(val) => setTenure(val[0])} />
        </div>

        <div className="bg-blue-600 rounded-3xl p-8 text-white text-center shadow-xl shadow-blue-200">
           <p className="text-blue-100 font-black uppercase text-[10px] tracking-widest mb-2">Monthly EMI</p>
           <h3 className="text-4xl font-black tracking-tighter">{formatCurrency(calculateEMI.emi)}</h3>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col items-center justify-center">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full mt-8">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Interest</p>
              <p className="text-xl font-black text-slate-700">{formatCurrency(calculateEMI.totalInterest)}</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-xl font-black text-slate-700">{formatCurrency(calculateEMI.totalPayment)}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const CAGRCalculator = () => {
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(250000);
  const [years, setYears] = useState(5);

  const cagr = useMemo(() => {
    return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  }, [initialValue, finalValue, years]);

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Initial Investment</Label>
          <input type="number" value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Final Value</Label>
          <input type="number" value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Duration (Years): {years}</Label>
        <Slider value={[years]} min={1} max={30} step={1} onValueChange={(val) => setYears(val[0])} />
      </div>

      <div className="bg-green-600 rounded-[3rem] p-12 text-white text-center shadow-2xl shadow-green-200">
         <p className="text-green-100 font-black uppercase tracking-[0.2em] mb-4">Compounded Annual Growth Rate</p>
         <h3 className="text-7xl font-black tracking-tighter mb-4">{cagr.toFixed(2)}%</h3>
         <p className="text-green-100/70">Your investment grew by {((finalValue/initialValue - 1) * 100).toFixed(2)}% in total.</p>
      </div>
    </div>
  );
};

export const PPFCalculator = () => {
  const [annualInvestment, setAnnualInvestment] = useState(150000);
  const [timePeriod, setTimePeriod] = useState(15);
  const interestRate = 7.1; // Current PPF rate

  const calculatePPF = useMemo(() => {
    const r = interestRate / 100;
    let maturityAmount = 0;
    let totalInvested = 0;
    const data = [];

    for (let year = 1; year <= timePeriod; year++) {
      maturityAmount = (maturityAmount + annualInvestment) * (1 + r);
      totalInvested += annualInvestment;
      data.push({
        year: `Year ${year}`,
        Wealth: Math.round(maturityAmount),
        Investment: totalInvested
      });
    }

    return { maturityAmount, totalInvested, wealthGained: maturityAmount - totalInvested, data };
  }, [annualInvestment, timePeriod]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Annual Investment</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(annualInvestment)}</span>
          </div>
          <Slider value={[annualInvestment]} min={500} max={150000} step={500} onValueChange={(val) => setAnnualInvestment(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Time Period (Years)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{timePeriod} Yrs</span>
          </div>
          <Slider value={[timePeriod]} min={15} max={50} onValueChange={(val) => setTimePeriod(val[0])} />
        </div>

        <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Current Interest Rate</p>
           <p className="text-3xl font-black text-blue-700 tracking-tighter">{interestRate}% p.a.</p>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Invested</p>
            <p className="text-2xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculatePPF.totalInvested)}</p>
          </div>
          <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Maturity Value</p>
            <p className="text-2xl font-black tracking-tighter">{formatCurrency(calculatePPF.maturityAmount)}</p>
          </div>
        </div>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculatePPF.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" hide />
              <YAxis hide />
              <ChartTooltip />
              <Area type="monotone" dataKey="Wealth" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const RetirementPlanner = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [returnPre, setReturnPre] = useState(12);
  const [returnPost, setReturnPost] = useState(8);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const calculateRetirement = useMemo(() => {
    const yearsToRetire = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Monthly expenses at retirement age (adjusted for inflation)
    const inflatedMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetire);
    const annualExpensesPost = inflatedMonthlyExpenses * 12;
    
    // Corpus needed at retirement
    // PV of growing annuity
    const rPost = returnPost / 100;
    const g = inflation / 100;
    const realRate = (1 + rPost) / (1 + g) - 1;
    
    const corpusNeeded = annualExpensesPost * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate);
    
    // SIP needed to reach corpus
    const rPre = returnPre / 12 / 100;
    const monthsToRetire = yearsToRetire * 12;
    const requiredSIP = corpusNeeded / (((Math.pow(1 + rPre, monthsToRetire)) - 1) / rPre) / (1 + rPre);

    return { 
      corpusNeeded: Math.round(corpusNeeded), 
      requiredSIP: Math.round(requiredSIP), 
      inflatedMonthlyExpenses: Math.round(inflatedMonthlyExpenses)
    };
  }, [currentAge, retirementAge, monthlyExpenses, inflation, returnPre, returnPost, lifeExpectancy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Current Age</Label>
            <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Retirement Age</Label>
            <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Monthly Expenses (Today)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(monthlyExpenses)}</span>
          </div>
          <Slider value={[monthlyExpenses]} min={10000} max={500000} step={5000} onValueChange={(val) => setMonthlyExpenses(val[0])} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Inflation (%)</Label>
            <Slider value={[inflation]} min={1} max={15} step={0.5} onValueChange={(val) => setInflation(val[0])} />
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Pre-Ret. Return (%)</Label>
            <Slider value={[returnPre]} min={1} max={20} step={0.5} onValueChange={(val) => setReturnPre(val[0])} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-center gap-6">
        <div className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-2xl shadow-blue-200 text-center">
           <p className="text-blue-100 font-black uppercase text-[10px] tracking-widest mb-4">Required Retirement Corpus</p>
           <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">{formatCurrency(calculateRetirement.corpusNeeded)}</h3>
           <p className="text-blue-100/70">To maintain your lifestyle until age {lifeExpectancy}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Required Monthly SIP</p>
             <p className="text-3xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculateRetirement.requiredSIP)}</p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Exp. at Retirement</p>
             <p className="text-3xl font-black text-slate-700 tracking-tighter">{formatCurrency(calculateRetirement.inflatedMonthlyExpenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoalBasedSIPCalculator = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  const requiredSIP = useMemo(() => {
    const i = expectedReturn / 12 / 100;
    const n = timePeriod * 12;
    return targetAmount / (((Math.pow(1 + i, n)) - 1) / i) / (1 + i);
  }, [targetAmount, expectedReturn, timePeriod]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Target Wealth</Label>
          <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[targetAmount]} min={100000} max={100000000} step={100000} onValueChange={(val) => setTargetAmount(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
          <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[expectedReturn]} min={1} max={30} step={0.5} onValueChange={(val) => setExpectedReturn(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Years to Goal</Label>
          <input type="number" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-black text-xl" />
          <Slider value={[timePeriod]} min={1} max={50} onValueChange={(val) => setTimePeriod(val[0])} />
        </div>
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-200">
         <p className="text-blue-100 font-black uppercase tracking-[0.2em] mb-4">Required Monthly SIP</p>
         <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{formatCurrency(Math.round(requiredSIP))}</h3>
         <p className="text-blue-100/70 max-w-lg mx-auto">
            To reach your target of {formatCurrency(targetAmount)} in {timePeriod} years at {expectedReturn}% returns.
         </p>
      </div>
    </div>
  );
};

export const ChildEducationPlanner = () => {
  const [currentCost, setCurrentCost] = useState(2000000);
  const [yearsToStart, setYearsToStart] = useState(10);
  const [inflation, setInflation] = useState(10); 
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateEducation = useMemo(() => {
    const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsToStart);
    const i = expectedReturn / 12 / 100;
    const n = yearsToStart * 12;
    const requiredSIP = futureCost / (((Math.pow(1 + i, n)) - 1) / i) / (1 + i);
    
    return { futureCost, requiredSIP };
  }, [currentCost, yearsToStart, inflation, expectedReturn]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Current Course Cost</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(currentCost)}</span>
          </div>
          <Slider value={[currentCost]} min={100000} max={20000000} step={100000} onValueChange={(val) => setCurrentCost(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Years until College</Label>
            <span className="text-2xl font-black text-blue-600 tracking-tighter">{yearsToStart} Yrs</span>
          </div>
          <Slider value={[yearsToStart]} min={1} max={25} onValueChange={(val) => setYearsToStart(val[0])} />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Education Inflation (%)</Label>
            <span className="text-2xl font-black text-primary tracking-tighter">{inflation}%</span>
          </div>
          <Slider value={[inflation]} min={1} max={20} step={0.5} onValueChange={(val) => setInflation(val[0])} />
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-center gap-6">
        <div className="p-10 rounded-[3rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 text-center">
           <p className="text-indigo-100 font-black uppercase text-[10px] tracking-widest mb-4">Estimated Future Cost</p>
           <h3 className="text-5xl font-black tracking-tighter mb-4">{formatCurrency(Math.round(calculateEducation.futureCost))}</h3>
           <p className="text-indigo-100/70">At {inflation}% inflation after {yearsToStart} years.</p>
        </div>

        <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 text-center">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Required Monthly SIP</p>
           <h3 className="text-5xl font-black text-blue-600 tracking-tighter">{formatCurrency(Math.round(calculateEducation.requiredSIP))}</h3>
           <p className="text-slate-500 font-medium">At {expectedReturn}% expected annual return.</p>
        </div>
      </div>
    </div>
  );
};

export const MonteCarloSimulation = () => {
  const [amount, setAmount] = useState(1000000);
  const [years, setYears] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [volatility, setVolatility] = useState(15);

  const results = useMemo(() => {
    const simulations = 500;
    const finalValues = [];
    for (let i = 0; i < simulations; i++) {
      let current = amount;
      for (let y = 0; y < years; y++) {
        // Box-Muller transform for normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        
        const yearlyReturn = (expectedReturn / 100) + z0 * (volatility / 100);
        current *= (1 + yearlyReturn);
      }
      finalValues.push(current);
    }
    finalValues.sort((a, b) => a - b);
    return {
      worst: finalValues[Math.floor(simulations * 0.1)],
      median: finalValues[Math.floor(simulations * 0.5)],
      best: finalValues[Math.floor(simulations * 0.9)],
      successRate: (finalValues.filter(v => v > amount).length / simulations) * 100
    };
  }, [amount, years, expectedReturn, volatility]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Initial Portfolio</Label>
          <Slider value={[amount]} min={100000} max={10000000} step={100000} onValueChange={(val) => setAmount(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Expected Return (%)</Label>
          <Slider value={[expectedReturn]} min={1} max={25} step={0.5} onValueChange={(val) => setExpectedReturn(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Volatility/Risk (%)</Label>
          <Slider value={[volatility]} min={1} max={40} step={0.5} onValueChange={(val) => setVolatility(val[0])} />
        </div>
        <div className="space-y-4">
          <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Duration (Years)</Label>
          <Slider value={[years]} min={1} max={40} onValueChange={(val) => setYears(val[0])} />
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl text-center">
           <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-4">Probability of Success</p>
           <h3 className="text-6xl font-black text-blue-400 tracking-tighter mb-4">{results.successRate.toFixed(1)}%</h3>
           <p className="text-slate-500">Chance of portfolio ending above initial value</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-6 rounded-3xl bg-red-50 border border-red-100 text-center">
              <p className="text-[10px] font-black text-red-600 uppercase mb-2">Conservative (10%)</p>
              <p className="text-xl font-black text-red-700">{formatCurrency(results.worst)}</p>
           </div>
           <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-center">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Median (50%)</p>
              <p className="text-xl font-black text-blue-700">{formatCurrency(results.median)}</p>
           </div>
           <div className="p-6 rounded-3xl bg-green-50 border border-green-100 text-center">
              <p className="text-[10px] font-black text-green-600 uppercase mb-2">Aggressive (90%)</p>
              <p className="text-xl font-black text-green-700">{formatCurrency(results.best)}</p>
           </div>
        </div>
      </div>
    </div>
  );
};
