import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  BadgeCheck, 
  Brain, 
  Building2, 
  ChevronRight, 
  Globe, 
  Mail, 
  MapPin, 
  Menu, 
  Phone, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Linkedin,
  Share2,
  Check,
  ExternalLink,
  Lock,
  X 
} from 'lucide-react';
import { ThreeDLogo } from '../components/ThreeDLogo';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { DelayReductionChart } from '../components/DelayReductionChart';
import { AshaAppPreview } from '../components/AshaAppPreview';
import { AshaTrainingModule } from '../components/AshaTrainingModule';
import { StartupDetails } from '../components/StartupDetails';
import { ContactForm } from '../components/ContactForm';
import { DiseaseBurden } from '../components/DiseaseBurden';
import { Roadmap3D } from '../components/Roadmap3D';
import { Financials } from '../components/Financials';
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

const SectionLabel = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <div id={id} className={`font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-4 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <h2 id={id} className={`font-serif text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 ${className}`}>
    {children}
  </h2>
);

const HeartbeatSmall = () => (
  <div className="w-12 h-6 overflow-hidden hidden sm:block">
    <svg width="48" height="24" viewBox="0 0 48 24">
      <motion.path
        d="M0 12 H10 L14 4 L18 20 L22 0 L26 24 L30 12 H48"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1],
          opacity: [0, 1, 0],
          x: [0, 0, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          times: [0, 0.4, 1],
          ease: "easeInOut"
        }}
      />
    </svg>
  </div>
);

const HeartbeatBackground = () => (
  <div className="absolute top-[25%] left-0 w-full h-[120px] pointer-events-none overflow-hidden opacity-10 z-0">
    <svg width="200%" height="120" viewBox="0 0 2000 120" preserveAspectRatio="none">
      <motion.path
        d="M0 60 H400 L410 20 L425 100 L440 10 L460 110 L480 60 H900 L910 20 L925 100 L940 10 L960 110 L980 60 H1400 L1410 20 L1425 100 L1440 10 L1460 110 L1480 60 H2000"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </svg>
    <div className="absolute inset-0 bg-linear-to-r from-bg via-transparent to-bg" />
  </div>
);

const Reveal: React.FC<{ children: React.ReactNode, className?: string, delay?: number, id?: string, perspective?: boolean }> = ({ children, className = "", delay = 0, id, perspective = true }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 32, rotateX: perspective ? 10 : 0, perspective: 1000 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const TiltCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ 
        rotateY: 5, 
        rotateX: -5,
        scale: 1.02,
        z: 50
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative transform-gpu perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'ASHASETU', href: '#ashasetu' },
    { name: 'Landscape', href: '#landscape' },
    { name: 'Opportunities', href: '#opportunities' },
    { name: 'Infrastructure', href: '#problems' },
    { name: 'Disease Burden', href: '#diseases' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Financials', href: '#financials' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-bg z-[9999] flex flex-col items-center justify-center gap-8"
          >
            <ThreeDLogo size={64} />
            <div className="flex flex-col items-center gap-4">
              <div className="font-mono text-[16px] font-black tracking-[0.3em] text-text">ASHSETU</div>
              <div className="w-[240px] h-[3px] bg-accent/15 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full bg-linear-to-r from-accent to-accent-light"
                />
              </div>
              <div className="text-[10px] text-muted tracking-[0.2em] font-mono uppercase">Clinical Edge Intelligence Engine</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-accent to-accent-light z-[200] origin-left shadow-[0_0_12px_rgba(61,220,132,0.6)]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-border shadow-sm py-3' : 'bg-transparent py-5'}`} aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" aria-label="AshaSetu Home">
            <ThreeDLogo size={32} />
            <div className="flex flex-col">
              <span className="font-mono text-sm md:text-base font-bold text-text tracking-tighter leading-none flex items-center gap-2">
                Asha<span className="text-accent">Setu</span>
                <HeartbeatSmall />
              </span>
              <span className="text-[9px] text-muted font-normal tracking-[0.1em] uppercase mt-1">
                Clinical Edge AI
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium text-muted hover:text-text hover:bg-surface/5 px-3 py-2 rounded-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacts"
              className="text-[12px] font-medium bg-accent/10 border border-accent/25 text-accent hover:bg-accent/20 px-4 py-2 rounded-sm transition-all ml-2 mr-4"
            >
              Key Contacts
            </a>
            <ThemeToggle className="scale-75 origin-right" />
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle className="scale-75" />
            <button
              className="p-2 text-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-bg/98 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-muted hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contacts"
                className="text-lg font-medium text-accent bg-accent/10 p-4 rounded-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Key Contacts
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen pt-[60px] flex flex-col lg:flex-row overflow-hidden" aria-labelledby="hero-title">
          <ParticleCanvas />
          <HeartbeatBackground />
          <div className="orb w-[400px] h-[400px] bg-radial-[circle] from-accent/12 to-transparent top-[-100px] right-[-80px] animate-[orb-float_10s_ease-in-out_infinite]" />
          <div className="orb w-[300px] h-[300px] bg-radial-[circle] from-accent-light/8 to-transparent bottom-[50px] left-[-60px] animate-[orb-float_13s_ease-in-out_infinite_delay-[-4s]]" />
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(61,220,132,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(61,220,132,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" aria-hidden="true" />
  
          <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:pl-20 py-20 relative z-10">
            <Reveal delay={0.3}>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-border text-accent font-mono text-[11px] tracking-[0.15em] px-3 py-1.5 rounded-sm mb-9">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" aria-hidden="true" />
                MARCH 2026 · A VENTURE UNDER ATSFY TECHNOLOGIES
              </div>
            </Reveal>
  
            <Reveal delay={0.5}>
              <h1 id="hero-title" className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6">
                MedTech<br />
                <em className="text-gradient not-italic">Opportunity</em><br />
                in Tripura
              </h1>
            </Reveal>

          <Reveal delay={0.7}>
            <p className="text-muted text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
              Four high-impact, commercially sustainable healthcare technology interventions for Northeast India — where zero MedTech startups currently operate, and where 4,000+ frontline health workers have no digital tools.
            </p>
          </Reveal>

          <Reveal delay={0.9} className="flex flex-wrap gap-4">
            <Link to="/ashasetu" className="bg-accent text-bg font-bold text-sm px-8 py-4 rounded-sm hover:bg-accent-light hover:-translate-y-0.5 transition-all shadow-lg shadow-accent/20">
              See ASHASETU Dedicated Page
            </Link>
            <a href="#opportunities" className="bg-transparent border border-white/15 text-text font-medium text-sm px-8 py-4 rounded-sm hover:border-accent hover:text-accent transition-all flex items-center gap-2">
              Market Opportunities <ChevronRight size={16} />
            </a>
          </Reveal>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative z-10">
          <div className="grid grid-cols-2 gap-0.5 w-full max-w-md">
            {[
              { num: '4,000+', label: 'ASHA workers in Tripura without digital tools' },
              { num: '39%', label: 'of Primary Health Centres lack lab technicians' },
              { num: '0', label: 'MedTech startups currently operating in NE India' },
              { num: '8', label: 'Northeast states sharing the same structural healthcare gap' }
            ].map((stat, i) => (
              <Reveal key={i} delay={1 + i * 0.1} className="relative z-10">
                <TiltCard className="glass-card p-7 h-full overflow-hidden group hover:border-accent/40 transition-all cursor-pointer three-d-shadow hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent to-transparent" />
                  <div className="text-3xl md:text-4xl font-serif font-black text-accent mb-2">{stat.num}</div>
                  <div className="text-[11px] text-muted leading-tight uppercase tracking-wider">{stat.label}</div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis Section */}
      <section className="relative py-24 overflow-hidden border-y border-border z-10">
        <div className="absolute inset-0 bg-linear-to-br from-surface to-bg dark:from-surface/20 dark:to-bg opacity-50" />
        <HeartbeatBackground />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <Reveal perspective={false}>
              <div className="font-mono text-[11px] font-black tracking-[0.3em] text-accent uppercase md:rotate-180 md:[writing-mode:vertical-rl] flex items-center gap-4">
                <span className="w-8 h-px bg-accent md:w-px md:h-8" />
                Key Thesis
              </div>
            </Reveal>
            
            <div className="relative">
              <span className="absolute -top-12 -left-8 text-8xl font-serif text-accent/10 pointer-events-none select-none" aria-hidden="true">
                &ldquo;
              </span>
              
              <Reveal delay={0.2}>
                <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed italic text-text">
                  The most solvable MedTech problem in Tripura is not a technology problem &mdash; it is a{" "}
                  <mark className="bg-transparent text-accent not-italic font-black border-b-2 border-accent/30 decoration-none">
                    distribution and design problem
                  </mark>. 
                  The ASHA worker network already exists, government funding already flows, and the disease burden is documented. What is missing is a{" "}
                  <strong className="text-text not-italic border-b-2 border-gold/40">software layer</strong> built for offline-first, vernacular-first, low-cost-device environments.
                </blockquote>
              </Reveal>
              
              <span className="absolute -bottom-16 -right-4 text-8xl font-serif text-accent/10 pointer-events-none select-none rotate-180" aria-hidden="true">
                &ldquo;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tripura Healthcare Landscape */}
      <section id="landscape" className="py-24 relative z-10 bg-bg" aria-labelledby="landscape-title">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>02 · Tripura Healthcare Landscape</SectionLabel>
          <SectionTitle id="landscape-title">The Data Behind<br />the Opportunity</SectionTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <Reveal className="lg:col-span-2" delay={0.2}>
              <div className="glass-card p-8 md:p-12 h-full three-d-shadow hover:-translate-y-1 transition-all rounded-sm border-t-accent/20">
                <h3 className="text-2xl font-serif font-bold mb-8">Infrastructure & Workforce</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-mono font-black text-accent">4,000+</span>
                        <span className="text-muted text-xs uppercase tracking-widest">ASHA Workers</span>
                      </div>
                      <p className="text-muted text-xs mt-2 leading-relaxed">Frontline health activists serving as the backbone of rural healthcare delivery. Currently operating with zero digital tools.</p>
                      <div className="text-[9px] text-muted/50 mt-1 uppercase tracking-tighter italic">Source: NHM Tripura, 2024</div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-mono font-black text-accent">118</span>
                        <span className="text-muted text-xs uppercase tracking-widest">PHCs</span>
                      </div>
                      <p className="text-muted text-xs mt-2 leading-relaxed">Primary Health Centres across 8 districts. 39% currently lack lab technicians for critical screening.</p>
                      <div className="text-[9px] text-muted/50 mt-1 uppercase tracking-tighter italic">Source: NITI Aayog Health Index</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-mono font-black text-accent">1,000+</span>
                        <span className="text-muted text-xs uppercase tracking-widest">Sub-Centres</span>
                      </div>
                      <p className="text-muted text-xs mt-2 leading-relaxed">The first point of contact for rural patients. Often located in areas with intermittent connectivity.</p>
                      <div className="text-[9px] text-muted/50 mt-1 uppercase tracking-tighter italic">Source: NHM Tripura Annual Report</div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-mono font-black text-accent">1:1,800</span>
                        <span className="text-muted text-xs uppercase tracking-widest">Doctor Ratio</span>
                      </div>
                      <p className="text-muted text-xs mt-2 leading-relaxed">Significantly higher than the WHO recommended 1:1,000 ratio, placing extreme burden on primary care.</p>
                      <div className="text-[9px] text-muted/50 mt-1 uppercase tracking-tighter italic">Source: Tripura Health Services Statistics</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-accent/5 border border-accent/20 p-8 md:p-12 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-6">Critical Indicators</h3>
                  <div className="space-y-8">
                    <div>
                      <div className="text-3xl font-mono font-black text-accent">37.6</div>
                      <div className="text-muted text-xs uppercase tracking-widest mt-1">Infant Mortality Rate (IMR)</div>
                      <p className="text-muted text-[11px] mt-2 leading-relaxed">Per 1,000 live births. Higher than the national average in specific rural pockets of Dhalai and Khowai.</p>
                      <div className="text-[9px] text-muted/50 mt-1 uppercase tracking-tighter italic">Source: NFHS-5 (2019-21)</div>
                    </div>
                    <div>
                      <div className="text-3xl font-mono font-black text-accent">High</div>
                      <div className="text-muted text-xs uppercase tracking-widest mt-1">Disease Burden</div>
                      <p className="text-muted text-[11px] mt-2 leading-relaxed">Tripura reports some of the highest Malaria and TB incidence rates in Northeast India per capita.</p>
                      <div className="text-[9px] text-muted/50 mt-1 uppercase tracking-tighter italic">Source: NVBDCP Data</div>
                    </div>
                  </div>
                </div>
                <div className="pt-8 mt-8 border-t border-accent/10">
                  <a href="https://tripuranrhm.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-mono text-accent hover:underline uppercase tracking-widest">
                    Official NHM Portal <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="py-24 relative z-10" aria-labelledby="opportunities-title">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>03 · Strategic Opportunities</SectionLabel>
          <SectionTitle id="opportunities-title">Four High-Impact<br />Market Openings</SectionTitle>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Each opportunity shares the same structural advantage: existing government funding, zero local competition, and a clear expansion path across all 8 Northeast states.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {/* Primary Opportunity */}
            <Reveal delay={0.2}>
              <TiltCard className="glass-card p-8 md:p-12 group transition-all overflow-hidden cursor-default three-d-shadow border-t-accent/30 rounded-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent to-accent-light" />
                <div className="absolute top-6 right-8 font-mono text-7xl md:text-9xl font-bold text-accent/5 pointer-events-none">#1</div>
                
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      PRIMARY OPPORTUNITY · RANK #1
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-black mb-6">ASHASETU:<br />The Offline Platform</h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                      A lightweight, military-grade offline application for India's 4,000+ frontline ASHA workers in Tripura. ASHASETU enables digital beneficiary registration, antenatal care tracking, TB/malaria suspect flagging, and QR-coded referral generation — all without requiring a consistent internet connection. Built with Local LLM (Edge AI) for symptom analysis.
                    </p>
                    
                    <div className="flex gap-4 mb-8">
                      <Link to="/ashasetu" className="text-[12px] font-bold text-accent border border-accent/30 px-6 py-3 rounded-sm hover:bg-accent/10 transition-colors shadow-lg shadow-accent/5">
                        Deep Dive: Technical Overview →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
                      {[
                        { val: '₹1–2 Cr', label: 'ARR at Tripura Scale' },
                        { val: '6–9 mo', label: 'MVP Timeline' },
                        { val: '0', label: 'Competing Startups in NE' },
                        { val: '75%+', label: 'Gross Margin at Scale' }
                      ].map((m, i) => (
                        <div key={i}>
                          <div className="font-mono text-xl font-bold text-accent">{m.val}</div>
                          <div className="text-[10px] text-muted uppercase tracking-wider mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-80 flex flex-col gap-6">
                    <AshaAppPreview />
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Opportunity 2 */}
            <Reveal className="relative" delay={0.3}>
              <TiltCard className="glass-card p-10 h-full overflow-hidden group transition-all three-d-shadow rounded-sm border-t-accent/10">
                <div className="absolute top-6 right-8 font-mono text-7xl font-bold text-accent/5 pointer-events-none">#2</div>
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                  HARDWARE + SOFTWARE
                </div>
                <h3 className="text-2xl font-serif font-black mb-4">Cold-Chain Medicine Delivery</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  Phase Change Material (PCM) carriers maintaining 2–8°C for 72–120 hours without electricity, paired with route optimisation software and real-time IoT temperature monitoring. Solves Tripura's pervasive cold-chain failure problem for vaccines, insulin, and blood products.
                </p>
              </TiltCard>
            </Reveal>

            {/* Opportunity 3 */}
            <Reveal className="relative" delay={0.4}>
              <TiltCard className="glass-card p-10 h-full overflow-hidden group transition-all three-d-shadow rounded-sm border-t-accent/10">
                <div className="absolute top-6 right-8 font-mono text-7xl font-bold text-accent/5 pointer-events-none">#3</div>
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                  AI / ML MODULE
                </div>
                <h3 className="text-2xl font-serif font-black mb-4">AI-Assisted TB & Malaria Screening</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  Symptom-based AI screening integrated into the ASHA platform (or standalone) assigning TB/malaria probability scores to trigger priority referrals — reducing the 1–2 week diagnosis delay to hours.
                </p>
                <DelayReductionChart />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="problems" className="py-24 bg-surface border-y border-border relative z-10" aria-labelledby="problems-title">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>04 · Infrastructure Gap</SectionLabel>
          <SectionTitle id="problems-title">The Healthcare<br />Infrastructure Reality</SectionTitle>
          
          <Reveal className="mt-12 overflow-x-auto border border-border rounded-sm" delay={0.2}>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-accent/10">
                <tr>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Facility Level</th>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Coverage Ratio</th>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Critical Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/5">
                {[
                  { level: 'Sub-Centres', ratio: '~1 per 3,000–5,000 population', gap: 'Shortage of female health workers; 24 vacancies' },
                  { level: 'PHCs', ratio: '~1 per 30,000 population', gap: '39% lack lab technicians; 18% lack pharmacists' },
                  { level: 'CHCs', ratio: '~1 per 120,000 population', gap: 'Specialist shortfall; inadequate referral network' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-accent/5 transition-colors">
                    <td className="p-5 text-text font-medium">{row.level}</td>
                    <td className="p-5 text-muted">{row.ratio}</td>
                    <td className="p-5 text-muted">{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* New Sections */}
      <DiseaseBurden />
      <Roadmap3D />
      <Financials />

      {/* Startup Details */}
      <section className="py-24 relative z-10 border-t border-border focus:outline-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>08 · Corporate Profile</SectionLabel>
          <StartupDetails />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-24 relative z-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            <div className="flex-1 w-full">
              <div className="font-mono text-[11px] text-accent tracking-widest uppercase mb-6">
                ASHASETU · OFFLINE ECOSYSTEM BY ATSFY
              </div>
              <ContactForm />
            </div>
            
            <div className="w-full md:w-80">
              <div className="text-[10px] text-muted uppercase tracking-[0.2em] mb-6">Official Inquiries</div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted uppercase">Email</div>
                    <div className="text-sm font-bold">inquiries@atsfy.in</div>
                  </div>
                </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Linkedin size={18} />
                    </div>
                    <a href="https://www.linkedin.com/company/asha-setu/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted uppercase hover:text-accent transition-colors">LinkedIn Profile</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/30 px-6 md:px-10 bg-card/10" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif font-black tracking-tighter text-sm uppercase">MEDTECH TRIPURA</div>
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.3em]">
            © 2026 ATSFY TECHNOLOGIES PVT LTD
          </div>
        </div>
      </footer>
    </main>
    </div>
  );
};
