import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const ContactPage = () => {
  const faqs = [
    {
      question: "How do I start my investment journey with TSP?",
      answer: "Starting is simple. You can fill out the contact form on this page or call us directly. We'll schedule a complimentary discovery session to understand your goals and current financial situation before designing a custom strategy."
    },
    {
      question: "What is the minimum investment required?",
      answer: "We cater to a wide range of clients, from first-time investors to high-net-worth individuals. Our 'Wealth Seed' program is specifically designed to help young professionals start with smaller monthly SIPs while building toward significant wealth."
    },
    {
      question: "Are your services restricted to Mumbai residents?",
      answer: "Not at all! While our headquarters is in Mumbai, we leverage digital tools to serve clients across India and even non-resident Indians (NRIs) globally. We offer secure virtual consultations for all our services."
    },
    {
      question: "What makes TSP different from other wealth managers?",
      answer: "We combine 'Quantitative Intelligence' with a personalized human touch. Our strategies are data-driven and goal-obsessed, but we never lose sight of the unique life circumstances that drive your financial decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <Helmet>
        <title>Connect with Us | The Success Point Wealth Seed LLP</title>
        <meta name="description" content="Connect with our institutional-grade wealth advisors. Get personalized financial strategies and expert investment guidance." />
      </Helmet>

      {/* ── Page Wide Background Graphics ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Header />

      <main className="relative z-10">
        {/* ── Shiny Blue Animated Hero ── */}
        <section className="relative pt-32 pb-24 overflow-hidden">
           {/* Base Shiny Blue Gradient */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1A6FFF] to-[#0A3E99] -z-10" />
           
           {/* Moving Shine/Shimmer Animation */}
           <motion.div 
             animate={{ 
               left: ['-100%', '200%'],
             }}
             transition={{ 
               duration: 4, 
               repeat: Infinity, 
               ease: "linear",
               repeatDelay: 3
             }}
             className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 skew-x-[35deg]"
           />
           
           {/* Animated Glowing Orbs */}
           <div className="absolute inset-0 -z-10">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 50, 0],
                  y: [0, 30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/40 rounded-full blur-[120px]" 
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.5, 0.2],
                  x: [0, -40, 0],
                  y: [0, -20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-30%] right-[-20%] w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px]" 
              />
           </div>

           {/* Subtle Texture Overlay */}
           <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10" />

           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8 shadow-2xl"
               >
                 <Sparkles className="w-4 h-4 text-blue-300" />
                 <span className="text-[10px] font-black text-blue-100 uppercase tracking-[0.3em]">Global Advisory Terminal</span>
               </motion.div>
               
               <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 tracking-tighter italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                 Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Connect.</span>
               </h1>
               
               <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed font-medium">
                 Bridge the gap between your present capital and your future legacy.
               </p>
             </motion.div>
           </div>

           {/* Floating elements */}
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
             transition={{ duration: 6, repeat: Infinity }}
             className="absolute top-1/2 left-[5%] hidden lg:block w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
           />
           <motion.div 
             animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
             transition={{ duration: 5, repeat: Infinity, delay: 1 }}
             className="absolute bottom-5 right-[8%] hidden lg:block w-20 h-20 bg-blue-400/20 backdrop-blur-xl border border-white/20 rounded-full"
           />
        </section>

        {/* ── Main Contact Section ── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-2 border-slate-50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-primary mb-4 italic tracking-tighter">Send a Message</h2>
                <p className="text-slate-500 font-bold mb-12 opacity-80 uppercase tracking-widest text-xs">Direct Intelligence Pipeline</p>
                
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              {/* Modern Info Cards */}
              <div className="bg-slate-900 text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden flex-1 group">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
                 <h3 className="text-2xl font-black italic mb-10 tracking-tight flex items-center gap-3">
                   <Globe className="w-6 h-6 text-blue-400" />Our Office 
                 </h3>
                 
                 <div className="space-y-10">
                   <div className="flex gap-6 group/item">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                       <MapPin className="w-6 h-6 text-blue-400 group-hover/item:text-white" />
                     </div>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Location</p>
                       <p className="text-l font-bold leading-snug">The Success Point Wealth Seed LLP<br /><br />Pathra wala gate , Garshankar road, Banga</p>
                     </div>
                   </div>

                   <div className="flex gap-6 group/item">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                       <Phone className="w-6 h-6 text-blue-400 group-hover/item:text-white" />
                     </div>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct Line</p>
                       <p className="text-xl font-black">+91 98888-89338</p>
                     </div>
                   </div>

                   <div className="flex gap-6 group/item">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 transition-colors">
                       <Mail className="w-6 h-6 text-blue-400 group-hover/item:text-white" />
                     </div>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email</p>
                       <p className="text-lg font-bold">thesuccesspointbanga@gmail.com</p>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Hours Card */}
              <div className="bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] p-10 flex items-center justify-between group overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-200 transition-colors" />
                 <div className="relative z-10 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                       <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-blue-600/60 mb-1">Operating Window</p>
                       <p className="text-lg font-black text-slate-800">Mon - Fri: 09:00 - 18:00</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Map Section ── */}
        <section className="py-24 bg-slate-50 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 italic tracking-tighter">Find us in <span className="text-blue-600">The Financial District.</span></h2>
                 <p className="text-slate-500 font-bold max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px]">Strategically Positioned for Global Impact</p>
              </div>
              
              <div className="relative group">
                 <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[4rem] blur-2xl opacity-5 group-hover:opacity-10 transition duration-1000" />
                 <div className="h-[500px] w-full rounded-[3.5rem] border-[4px] border-white bg-white shadow-2xl overflow-hidden relative">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.3701625902127!2d75.99662107539568!3d31.184905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDExJzA1LjciTiA3NcKwNTknNTcuMSJF!5e0!3m2!1sen!2sin!4v1718023123456!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="TSP Headquarters Map"
                    />
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-xl">
                       <p className="text-sm font-black italic">The Success Point HQ</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 opacity-50" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 italic tracking-tighter leading-none">Common <br />Questions.</h2>
              <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, i) => (
                <AccordionItem 
                  key={i} 
                  value={`item-${i}`}
                  className="border-none bg-slate-50/50 hover:bg-white rounded-[2rem] px-10 py-2 transition-all duration-300 border-2 border-transparent hover:border-blue-100 hover:shadow-xl shadow-sm"
                >
                  <AccordionTrigger className="text-left text-xl font-black tracking-tight italic text-slate-800 hover:no-underline hover:text-blue-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 font-bold leading-relaxed pb-8 text-lg opacity-90 text-left">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-24 p-12 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <h4 className="text-2xl font-black italic mb-4 tracking-tight relative z-10">Have a more specific inquiry?</h4>
               <p className="text-blue-100 font-medium mb-8 relative z-10">Our quantitative specialists are ready to architect your bespoke strategy.</p>
               <button className="bg-white text-blue-700 h-16 px-12 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10">
                 Schedule Deep Dive
               </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
