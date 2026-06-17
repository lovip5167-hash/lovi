import React, { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Award, 
  Shield, 
  Users, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  Globe,
  PieChart,
  Activity,
  CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const BLUE = "#1A6FFF";
const BLUE_LIGHT = "#4D9EFF";
const BLUE_DARK = "#0A3E99";
const BLUE_PALE = "#E8F1FF";
const NAVY = "#0A1628";
const GLASS = "rgba(26,111,255,0.08)";
const GLASS_BORDER = "rgba(26,111,255,0.18)";

// --- Animated Counter ---
function Counter({ end, prefix = "", suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.floor(p * end));
          if (p < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// --- Fade-in wrapper ---
function FadeIn({ children, delay = 0, y = 30 }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const AboutUsPage = () => {
  const coreValues = [
    {
      icon: Target,
      title: "Client-First Protocol",
      description: "Your financial sovereignty is our primary mission. Every recommendation is calibrated to your unique life-timeline and risk profile."
    },
    {
      icon: ShieldCheck,
      title: "Radical Transparency",
      description: "We eliminate the 'hidden' in finance. Honest communication and ethical investment practices form the bedrock of our client partnerships."
    },
    {
      icon: Lightbulb,
      title: "Adaptive Intelligence",
      description: "Markets are biological systems. We evolve our strategies in real-time to capture alpha while others follow yesterday's trends."
    },
    {
      icon: Shield,
      title: "Risk-First Architecture",
      description: "Capital preservation is not a passive act. We implement rigorous mathematical models to shield your wealth from volatility."
    }
  ];

  const milestones = [
    { year: "2015", event: "The Foundation", desc: "Started with a vision to democratize elite wealth management." },
    { year: "2018", event: "₹10Cr+ AUM", desc: "Reached our first major milestone in managed assets." },
    { year: "2021", event: "Digital Evolution", desc: "Launched proprietary intelligence tools for client portfolios." },
    { year: "2024", event: "The Legacy Phase", desc: "Managing multi-generational wealth for 500+ families." }
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", minHeight: "100vh", color: NAVY }}>
      <Helmet>
        <title>The Architects of Your Legacy | TSP Wealth</title>
        <meta name="description" content="Learn about our mission, values, and the experienced team behind The Success Point Wealth Seed LLP. SEBI-registered advisors committed to your financial success." />
      </Helmet>

      <Header />

      <main>
        {/* ── HERO ── */}
        <section style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0E2A5F 60%, #1A4AB5 100%)`,
          padding: "160px 32px 120px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}>
          {/* Background orbs */}
          {[
            { w: 400, h: 400, top: -100, right: -100, o: 0.1 },
            { w: 300, h: 300, bottom: -80, left: -60, o: 0.08 },
          ].map((orb, i) => (
            <div key={i} style={{
              position: "absolute", width: orb.w, height: orb.h,
              borderRadius: "50%", background: BLUE,
              top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left,
              opacity: orb.o, pointerEvents: "none", filter: "blur(60px)",
            }} />
          ))}

          <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                display: "inline-block",
                background: "rgba(77,158,255,0.15)",
                border: "1px solid rgba(77,158,255,0.35)",
                borderRadius: 50, padding: "6px 20px",
                color: BLUE_LIGHT, fontSize: 13, fontWeight: 700, marginBottom: 26, letterSpacing: 2,
              }}>
                OUR ORIGIN & PHILOSOPHY
              </div>
              <h1 style={{
                fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 900, margin: "0 0 24px",
                color: "#fff", lineHeight: 1, letterSpacing: -2, fontStyle: "italic"
              }}>
                The Architects of <br />
                <span style={{ color: BLUE_LIGHT }}>Your Financial Legacy.</span>
              </h1>
              <p style={{ fontSize: 19, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 auto 48px", maxWidth: 640 }}>
                Since 2015, The Success Point Wealth Seed has been at the forefront of wealth engineering. We don't just pick funds; we design futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MISSION SECTION ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 80, alignItems: "center" }}>
            <FadeIn>
              <div>
                <span style={{ fontSize: 12, fontWeight: 800, color: BLUE, letterSpacing: 3, textTransform: "uppercase" }}>Mission Vector</span>
                <h2 style={{ fontSize: 42, fontWeight: 900, margin: "12px 0 24px", lineHeight: 1.1, fontStyle: "italic" }}>Democratizing <br />Elite Advisory.</h2>
                <p style={{ fontSize: 18, lineHeight: 1.8, color: "#4A5568", marginBottom: 20 }}>
                  We believe that institutional-grade wealth management shouldn't be reserved for the ultra-wealthy. Our mission is to provide every individual with the same <strong style={{ color: NAVY }}>mathematical precision</strong> and <strong style={{ color: NAVY }}>strategic depth</strong> used by global family offices.
                </p>
                <p style={{ fontSize: 18, lineHeight: 1.8, color: "#4A5568", marginBottom: 32 }}>
                  By combining deep market expertise with SEBI-registered integrity, we ensure your capital is not just growing, but working towards a specific, calibrated objective.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { label: "Families Served", val: "500+" },
                    { label: "Expert Advisors", val: "12+" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: BLUE_PALE, borderRadius: 20, padding: "20px 24px", border: `1.5px solid ${GLASS_BORDER}` }}>
                      <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: BLUE }}>{s.val}</p>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#8CA7CC", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", top: -20, left: -20, right: 20, bottom: 20,
                  border: `2px solid ${BLUE_LIGHT}`, borderRadius: 32, zIndex: 0
                }} />
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                  alt="Team collaboration" 
                  style={{ width: "100%", borderRadius: 32, position: "relative", zIndex: 1, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section style={{ background: BLUE_PALE, padding: "100px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: BLUE, letterSpacing: 3, textTransform: "uppercase" }}>Operational DNA</span>
              <h2 style={{ fontSize: 42, fontWeight: 900, margin: "12px 0 16px", fontStyle: "italic" }}>The Principles of Success.</h2>
              <p style={{ fontSize: 18, color: "#6B7280", maxWidth: 540, margin: "0 auto" }}>We operate at the intersection of technical excellence and unwavering ethical standards.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {coreValues.map((val, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{
                    background: "#fff", borderRadius: 24, padding: "40px",
                    border: `1.5px solid ${GLASS_BORDER}`, boxShadow: "0 10px 30px rgba(26,111,255,0.05)",
                    height: "100%", display: "flex", gap: 24
                  }}>
                    <div style={{ 
                      width: 60, height: 60, borderRadius: 18, background: BLUE_PALE,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <val.icon size={30} color={BLUE} />
                    </div>
                    <div>
                      <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 900, color: NAVY, fontStyle: "italic" }}>{val.title}</h3>
                      <p style={{ margin: 0, fontSize: 15, color: "#4A5568", lineHeight: 1.7 }}>{val.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── MILESTONES ── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: BLUE, letterSpacing: 3, textTransform: "uppercase" }}>Timeline</span>
            <h2 style={{ fontSize: 42, fontWeight: 900, margin: "12px 0 16px", fontStyle: "italic" }}>Our Evolutionary Path.</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 40, left: 0, right: 0, h: 2, background: BLUE_PALE, zIndex: 0 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
              {milestones.map((m, i) => (
                <FadeIn key={i} delay={i * 150}>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ 
                      width: 80, height: 80, borderRadius: "50%", background: BLUE, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900,
                      margin: "0 auto 24px", border: "8px solid #fff", boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}>
                      {m.year}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <h4 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 900, color: NAVY }}>{m.event}</h4>
                      <p style={{ margin: 0, fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{m.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE TSP EDGE ── */}
        <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #03060f 100%)`, padding: "100px 32px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <FadeIn>
              <h2 style={{ fontSize: 48, fontWeight: 900, color: "#fff", margin: "0 0 32px", fontStyle: "italic", letterSpacing: -1 }}>
                Why Sophisticated Investors <br />
                <span style={{ color: BLUE_LIGHT }}>Choose Us.</span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { title: "Institutional Research", icon: PieChart, desc: "Access to proprietary fund analysis tools not available to retail investors." },
                  { title: "Zero Conflict", icon: Zap, desc: "We are pure advisors. Our success is mathematically coupled with yours." },
                  { title: "Active Governance", icon: Activity, desc: "Continuous monitoring of fund house changes, manager moves, and portfolio drift." },
                ].map((edge, i) => (
                  <div key={i} style={{ 
                    padding: "32px", borderRadius: 24, background: "rgba(255,255,255,0.03)", 
                    border: "1px solid rgba(255,255,255,0.1)", textAlign: "left"
                  }}>
                    <edge.icon size={32} color={BLUE_LIGHT} style={{ marginBottom: 20 }} />
                    <h4 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: "#fff" }}>{edge.title}</h4>
                    <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{edge.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`,
          padding: "80px 32px", textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0, 
            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px", opacity: 0.3
          }} />
          <FadeIn>
            <h2 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 20px", fontStyle: "italic" }}>
              Ready to Align Your Wealth Logic?
            </h2>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 auto 40px" }}>
              Join the families who have transitioned from ad-hoc investing to institutional wealth architecture.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <button style={{
                background: "#fff", color: BLUE, padding: "16px 40px", borderRadius: 50,
                fontWeight: 900, fontSize: 15, cursor: "pointer", border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)", transition: "transform 0.2s"
              }} onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}>
                CONSULT AN ARCHITECT
              </button>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
