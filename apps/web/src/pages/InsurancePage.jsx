import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  HeartPulse, 
  Umbrella, 
  Activity, 
  Stethoscope, 
  Home, 
  Car, 
  FileCheck,
  CheckCircle2,
  Users,
  Award,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const InsurancePage = () => {
  const expertBenefits = [
    {
      icon: ShieldCheck,
      title: "Need-Based Analysis",
      desc: "We don't sell policies; we solve risks. Our experts calculate your Human Life Value (HLV) to ensure you aren't under-insured."
    },
    {
      icon: Clock,
      title: "Claim Support",
      desc: "When life hits hard, we stand by you. We manage the entire documentation and coordination with insurers for smooth settlements."
    },
    {
      icon: TrendingUp,
      title: "Tax Optimization",
      desc: "Legally maximize your tax savings under Section 80C and 80D while building a robust safety net."
    },
    {
      icon: Zap,
      title: "Portfolio Integration",
      desc: "We ensure your insurance coverage works in harmony with your investment goals, preventing wealth erosion during crises."
    }
  ];

  const insuranceTypes = [
    {
      title: "Term Life Insurance",
      icon: Umbrella,
      desc: "The purest form of protection. Secure your family's financial future with a high cover at an affordable premium.",
      benefits: ["High Human Life Value Cover", "Income Replacement", "Debt Protection"],
      color: "blue"
    },
    {
      title: "Health Insurance",
      icon: Stethoscope,
      desc: "Comprehensive medical cover that protects your hard-earned savings from escalating healthcare costs.",
      benefits: ["Cashless Hospitalization", "Pre/Post Hospitalization", "No-Claim Bonus"],
      color: "green"
    },
    {
      title: "Critical Illness Cover",
      icon: HeartPulse,
      desc: "Lump-sum payout upon diagnosis of major illnesses like cancer or heart disease to manage lifestyle changes.",
      benefits: ["Fixed Payout", "Cover for 30+ Illnesses", "Income Support"],
      color: "red"
    },
    {
      title: "Personal Accident Cover",
      icon: Activity,
      desc: "Protection against accidental death or disability, ensuring your earning capacity is insured.",
      benefits: ["Disability Payouts", "Accidental Death Cover", "Global Coverage"],
      color: "orange"
    },
    {
      title: "Home Insurance",
      icon: Home,
      desc: "Secure your most valuable physical asset against natural calamities, theft, and fire accidents.",
      benefits: ["Structure Cover", "Content Protection", "Public Liability"],
      color: "purple"
    },
    {
      title: "Motor Insurance",
      icon: Car,
      desc: "Beyond mandatory compliance, we provide comprehensive protection for your private and commercial vehicles.",
      benefits: ["Own Damage Cover", "Third-Party Liability", "Zero Dep Add-ons"],
      color: "slate"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Helmet>
        <title>Insurance Strategies | The Success Point Wealth Seed LLP</title>
        <meta name="description" content="Expert-led insurance planning. Life, Health, and General insurance solutions designed to protect your wealth and your family's future." />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-primary text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/4" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Risk Management Experts</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tighter">
                  Protection is the <br/>
                  <span className="text-accent">Foundation</span> of Wealth.
                </h1>
                <p className="text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed">
                  Most insurance is sold, not planned. We architect comprehensive safety nets that ensure your financial goals survive life's uncertainties.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link to="/contact">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-16 px-10 rounded-2xl shadow-xl transition-all">
                      Review My Coverage
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] relative z-10"
                >
                  <h3 className="text-2xl font-black mb-8 italic">Benefits Under Expert Advice</h3>
                  <div className="grid gap-6">
                    {expertBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
                          <benefit.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-bold text-lg leading-tight mb-1">{benefit.title}</p>
                          <p className="text-sm text-white/60 leading-relaxed">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px]" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Types Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.4em] mb-4">Our Protection Suite</h2>
              <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">Comprehensive Coverage</h3>
              <p className="text-lg text-slate-500 mt-6 font-medium">
                From protecting your income to safeguarding your health and assets, we provide 360-degree risk mitigation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insuranceTypes.map((type, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <type.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-4 tracking-tight">{type.title}</h4>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    {type.desc}
                  </p>
                  <ul className="space-y-3">
                    {type.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Wait Section */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
               
               <div className="max-w-2xl text-center lg:text-left">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter italic">Is your safety net strong enough?</h2>
                  <p className="text-xl text-blue-50 font-medium opacity-90 leading-relaxed mb-10">
                    A single medical emergency or unforeseen event can derail decades of financial planning. Let's ensure your shield is impenetrable.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                     <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-accent" />
                        <span className="font-bold">1200+ Families Protected</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <FileCheck className="w-6 h-6 text-accent" />
                        <span className="font-bold">98.5% Settlement Support</span>
                     </div>
                  </div>
               </div>

               <div className="shrink-0">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl font-black h-20 px-12 rounded-[2rem] shadow-2xl">
                      Schedule a Review
                    </Button>
                  </Link>
               </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-primary tracking-tight italic">Common Queries</h2>
            </div>
            <div className="grid gap-6">
              {[
                { q: "Do you help with old claim rejections?", a: "Yes, our experts review old cases and help identify if a claim was wrongfully rejected and guide you on the next legal/procedural steps." },
                { q: "Why shouldn't I just buy online?", a: "Online platforms give you a policy, but we give you a strategy. Plus, we provide the physical support during claims that a website cannot." },
                { q: "How often should I review my insurance?", a: "We recommend an annual review or whenever a major life event occurs (marriage, child birth, home purchase)." }
              ].map((faq, i) => (
                <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
                  <p className="text-lg font-black text-primary mb-3">Q: {faq.q}</p>
                  <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InsurancePage;
