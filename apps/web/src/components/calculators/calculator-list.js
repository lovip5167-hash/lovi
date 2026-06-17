import { 
  TrendingUp, 
  Target, 
  ArrowUpCircle, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Briefcase, 
  Calculator, 
  BarChart3, 
  PieChart, 
  CreditCard, 
  Home, 
  GraduationCap, 
  Percent, 
  Scale, 
  Wallet, 
  Banknote, 
  Coins, 
  LineChart,
  Activity,
  Award,
  BookOpen
} from 'lucide-react';

export const categories = [
  { id: 'wealth', label: 'Wealth & Savings', icon: TrendingUp },
  { id: 'goals', label: 'Goals & Retirement', icon: Target },
  { id: 'loans', label: 'Loans & Taxes', icon: CreditCard },
  { id: 'analysis', label: 'Advanced Analysis', icon: BarChart3 },
  { id: 'business', label: 'Business & Professional', icon: Briefcase },
  { id: 'general', label: 'General Finance', icon: Wallet }
];

export const calculators = [
  {
    id: 'sip',
    title: 'SIP Calculator',
    description: 'Calculate maturity amount for regular monthly investments.',
    category: 'wealth',
    icon: TrendingUp
  },
  {
    id: 'goal-sip',
    title: 'Goal Based SIP Calculator',
    description: 'Find out how much SIP you need to reach a specific goal.',
    category: 'goals',
    icon: Target
  },
  {
    id: 'goal-step-up-sip',
    title: 'Goal Based Step Up SIP',
    description: 'Reach goals faster by increasing your SIP annually.',
    category: 'goals',
    icon: ArrowUpCircle
  },
  {
    id: 'step-up-sip',
    title: 'Step Up SIP Calculator',
    description: 'See the power of increasing your SIP contributions every year.',
    category: 'wealth',
    icon: Zap
  },
  {
    id: 'future-present-value',
    title: 'Future & Present Value',
    description: 'Calculate the value of money over time with inflation.',
    category: 'analysis',
    icon: Clock
  },
  {
    id: 'term-insurance',
    title: 'Term Insurance Coverage',
    description: 'Determine the right life insurance cover for your family.',
    category: 'general',
    icon: ShieldCheck
  },
  {
    id: 'retirement-planner',
    title: 'Retirement Planning',
    description: 'Plan for a secure and comfortable retirement life.',
    category: 'goals',
    icon: Briefcase
  },
  {
    id: 'irr-calculator',
    title: 'IRR Calculator',
    description: 'Calculate Internal Rate of Return for complex investments.',
    category: 'analysis',
    icon: Percent
  },
  {
    id: 'monte-carlo',
    title: 'Monte Carlo Simulation',
    description: 'Simulate 1000s of scenarios for your portfolio success.',
    category: 'analysis',
    icon: Activity
  },
  {
    id: 'goal-planning',
    title: 'Goal Planning',
    description: 'A comprehensive tool to map out all your life goals.',
    category: 'goals',
    icon: Award
  },
  {
    id: 'swp-calculator',
    title: 'SWP Calculator',
    description: 'Plan your regular withdrawals from a lump sum investment.',
    category: 'wealth',
    icon: Banknote
  },
  {
    id: 'financial-planning-tool',
    title: 'Financial Planning Tool',
    description: 'A holistic tool for your entire financial life.',
    category: 'general',
    icon: BookOpen
  },
  {
    id: 'loan-emi',
    title: 'Loan EMI Calculator',
    description: 'Calculate monthly installments for any type of loan.',
    category: 'loans',
    icon: CreditCard
  },
  {
    id: 'hra-calculator',
    title: 'HRA Calculator',
    description: 'Calculate your tax-exempt House Rent Allowance.',
    category: 'loans',
    icon: Home
  },
  {
    id: 'child-education',
    title: 'Child Education Planner',
    description: 'Estimate future costs for your child\'s higher education.',
    category: 'goals',
    icon: GraduationCap
  },
  {
    id: 'financial-ratios',
    title: 'Financial Ratios',
    description: 'Check the health of your finances with key ratios.',
    category: 'analysis',
    icon: Scale
  },
  {
    id: 'rent-vs-buy',
    title: 'Rent vs Buy',
    description: 'Decide whether to rent a home or buy one with a loan.',
    category: 'loans',
    icon: Home
  },
  {
    id: 'asset-rebalancer',
    title: 'Asset Allocation Rebalancer',
    description: 'Keep your portfolio in sync with your target allocation.',
    category: 'analysis',
    icon: PieChart
  },
  {
    id: 'risk-profile',
    title: 'Risk Profile Assessment',
    description: 'Understand your risk tolerance for better investing.',
    category: 'general',
    icon: Activity
  },
  {
    id: 'budgeting',
    title: 'Budgeting Tool',
    description: 'Track your income and expenses effectively.',
    category: 'general',
    icon: Wallet
  },
  {
    id: 'npv-calculator',
    title: 'NPV Calculator',
    description: 'Calculate Net Present Value of future cash flows.',
    category: 'analysis',
    icon: Coins
  },
  {
    id: 'cagr-calculator',
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate of investments.',
    category: 'wealth',
    icon: LineChart
  },
  {
    id: 'investment-growth',
    title: 'Investment Growth Solver',
    description: 'Solve for returns or time needed to reach a target.',
    category: 'wealth',
    icon: Zap
  },
  {
    id: 'mf-category',
    title: 'Mutual Fund Category',
    description: 'Compare different mutual fund categories.',
    category: 'business',
    icon: BarChart3
  },
  {
    id: 'mfd-commission',
    title: 'MFD Commission Projections',
    description: 'Project earnings for mutual fund distributors.',
    category: 'business',
    icon: Banknote
  },
  {
    id: 'adv-retirement',
    title: 'Advanced Retirement Planner',
    description: 'Detailed retirement planning with inflation and taxes.',
    category: 'goals',
    icon: Briefcase
  },
  {
    id: 'cash-vs-loan',
    title: 'Cash vs Loan',
    description: 'Decide between paying cash or taking a loan for purchases.',
    category: 'loans',
    icon: CreditCard
  },
  {
    id: 'tax-harvesting',
    title: 'Tax Harvesting',
    description: 'Optimize your tax liability on capital gains.',
    category: 'loans',
    icon: Percent
  },
  {
    id: 'corpus-planner',
    title: 'Corpus Planner',
    description: 'Calculate the corpus needed for perpetual income.',
    category: 'goals',
    icon: Coins
  },
  {
    id: 'bond-compass',
    title: 'Bond Compass',
    description: 'Navigate the world of fixed income and bonds.',
    category: 'business',
    icon: Activity
  },
  {
    id: 'scale-up-business',
    title: 'Scale Up Your Business',
    description: 'Project growth for your business or practice.',
    category: 'business',
    icon: TrendingUp
  },
  {
    id: 'epf-corpus',
    title: 'EPF Corpus Calculator',
    description: 'Project your Employee Provident Fund maturity value.',
    category: 'wealth',
    icon: Wallet
  },
  {
    id: 'ppf-calculator',
    title: 'PPF Calculator',
    description: 'Calculate returns for Public Provident Fund investments.',
    category: 'wealth',
    icon: Banknote
  }
];
