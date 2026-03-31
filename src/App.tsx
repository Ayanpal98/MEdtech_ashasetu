import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  ArrowUpRight, 
  BadgeCheck, 
  Brain, 
  Building2, 
  Calendar, 
  ChevronRight, 
  Globe, 
  IndianRupee, 
  Mail, 
  MapPin, 
  Menu, 
  Phone, 
  ShieldCheck, 
  Stethoscope, 
  Thermometer, 
  TrendingUp, 
  Users, 
  Linkedin,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Lock,
  X 
} from 'lucide-react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { DelayReductionChart } from './components/DelayReductionChart';
import { AshaAppPreview } from './components/AshaAppPreview';
import { AshaTrainingModule } from './components/AshaTrainingModule';
import { StartupDetails } from './components/StartupDetails';

// --- Components ---

const SectionLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-4 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 ${className}`}>
    {children}
  </h2>
);

const Reveal: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
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
    { name: 'Landscape', href: '#landscape' },
    { name: 'Opportunities', href: '#opportunities' },
    { name: 'Infrastructure', href: '#problems' },
    { name: 'Disease Burden', href: '#diseases' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Financials', href: '#financials' },
    { name: 'Funding', href: '#funding' },
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
            className="fixed inset-0 bg-bg z-[9999] flex flex-col items-center justify-center gap-6"
          >
            <div className="font-mono text-[13px] tracking-[0.2em] text-accent">MEDTECH TRIPURA</div>
            <div className="w-[200px] h-[2px] bg-accent/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-linear-to-r from-accent to-accent-light"
              />
            </div>
            <div className="text-[12px] text-muted tracking-[0.1em]">A VENTURE UNDER ATSFY TECHNOLOGIES</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-accent to-accent-light z-[200] origin-left shadow-[0_0_12px_rgba(61,220,132,0.6)]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${isScrolled ? 'bg-bg/95 backdrop-blur-md border-b border-border py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-mono text-sm md:text-base font-bold text-text tracking-tighter">
              MedTech<span className="text-accent">Tripura</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] text-muted font-normal tracking-wide ml-1">
              by ATSFY Technologies
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium text-muted hover:text-text hover:bg-white/5 px-3 py-2 rounded-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacts"
              className="text-[12px] font-medium bg-accent/10 border border-accent/25 text-accent hover:bg-accent/20 px-4 py-2 rounded-sm transition-all ml-2"
            >
              Key Contacts
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen pt-[60px] flex flex-col lg:flex-row overflow-hidden">
        <ParticleCanvas />
        <div className="orb w-[400px] h-[400px] bg-radial-[circle] from-accent/12 to-transparent top-[-100px] right-[-80px] animate-[orb-float_10s_ease-in-out_infinite]" />
        <div className="orb w-[300px] h-[300px] bg-radial-[circle] from-accent-light/8 to-transparent bottom-[50px] left-[-60px] animate-[orb-float_13s_ease-in-out_infinite_delay-[-4s]]" />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(61,220,132,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(61,220,132,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:pl-20 py-20 relative z-10">
          <Reveal delay={0.3}>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-border text-accent font-mono text-[11px] tracking-[0.15em] px-3 py-1.5 rounded-sm mb-9">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              MARCH 2026 · A VENTURE UNDER ATSFY TECHNOLOGIES
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6">
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
            <a href="#opportunities" className="bg-accent text-bg font-bold text-sm px-8 py-4 rounded-sm hover:bg-accent-light hover:-translate-y-0.5 transition-all shadow-lg shadow-accent/20">
              Explore Opportunities
            </a>
            <a href="#roadmap" className="bg-transparent border border-white/15 text-text font-medium text-sm px-8 py-4 rounded-sm hover:border-accent hover:text-accent transition-all flex items-center gap-2">
              View Roadmap <ChevronRight size={16} />
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
              <Reveal key={i} delay={1 + i * 0.1} className="bg-card border border-border p-7 relative overflow-hidden group hover:border-accent/40 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent to-transparent" />
                <div className="text-3xl md:text-4xl font-serif font-black text-accent mb-2">{stat.num}</div>
                <div className="text-[11px] text-muted leading-tight uppercase tracking-wider">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis Section */}
      <section className="bg-linear-to-br from-card to-[#0d1a10] border-y border-border py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase md:rotate-180 md:[writing-mode:vertical-rl]">
            Key Thesis
          </div>
          <p className="font-serif text-xl md:text-3xl leading-relaxed italic text-text">
            "The most solvable MedTech problem in Tripura is not a technology problem — it is a <strong className="text-accent not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-accent">distribution and design problem</strong>. The ASHA worker network already exists, government funding already flows, and the disease burden is documented. What is missing is a <strong className="text-accent not-italic">software layer</strong> built for offline-first, vernacular-first, low-cost-device environments."
          </p>
        </div>
      </section>

      {/* Tripura Healthcare Landscape */}
      <section id="landscape" className="py-24 relative z-10 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>02 · Tripura Healthcare Landscape</SectionLabel>
          <SectionTitle>The Data Behind<br />the Opportunity</SectionTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <Reveal className="lg:col-span-2" delay={0.2}>
              <div className="bg-card border border-border p-8 md:p-12 h-full">
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
      <section id="opportunities" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>03 · Strategic Opportunities</SectionLabel>
          <SectionTitle>Four High-Impact<br />Market Openings</SectionTitle>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Each opportunity shares the same structural advantage: existing government funding, zero local competition, and a clear expansion path across all 8 Northeast states.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {/* Primary Opportunity */}
            <Reveal className="md:col-span-2 bg-card p-8 md:p-12 relative overflow-hidden group" delay={0.2}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent to-accent-light" />
              <div className="absolute top-6 right-8 font-mono text-7xl md:text-9xl font-bold text-accent/5 pointer-events-none">#1</div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    PRIMARY OPPORTUNITY · RANK #1
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Offline-First<br />ASHA Worker Platform</h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                    A lightweight Android application for India's 4,000+ frontline ASHA workers in Tripura — enabling digital beneficiary registration, antenatal care tracking, TB/malaria suspect flagging, immunisation scheduling, and QR-coded referral generation. Works entirely offline with Bengali and Kokborok voice input. No internet connection required. Syncs automatically when any connectivity is available.
                  </p>
                  
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
                  
                  <div className="flex flex-col gap-3">
                    {[
                      { key: 'Core Technology Stack', val: 'Flutter' },
                      { key: 'Offline Sync Architecture', val: 'SQLite + CRDT' },
                      { key: 'Regulatory Classification', val: 'Class A SaMD' },
                      { key: 'Revenue Pathway', val: 'NHM Contract' }
                    ].map((item, i) => (
                      <div key={i} className="bg-black/20 border border-border p-4 rounded-sm">
                        <div className="font-mono text-lg font-bold text-accent">{item.val}</div>
                        <div className="text-[10px] text-muted uppercase tracking-wider mt-1">{item.key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Opportunity 2 */}
            <Reveal className="bg-card p-10 relative overflow-hidden group hover:bg-[#1c2a1e] transition-colors" delay={0.3}>
              <div className="absolute top-6 right-8 font-mono text-7xl font-bold text-accent/5 pointer-events-none">#2</div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                HARDWARE + SOFTWARE
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Cold-Chain Medicine Delivery</h3>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Phase Change Material (PCM) carriers maintaining 2–8°C for 72–120 hours without electricity, paired with route optimisation software and real-time IoT temperature monitoring. Solves Tripura's pervasive cold-chain failure problem for vaccines, insulin, and blood products.
              </p>
              <div className="flex gap-8 pt-6 border-t border-border">
                <div>
                  <div className="font-mono text-xl font-bold text-accent">$729M</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Market by 2035</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-accent">₹65–125L</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Year 1 Revenue Potential</div>
                </div>
              </div>
            </Reveal>

            {/* Opportunity 3 */}
            <Reveal className="bg-card p-10 relative overflow-hidden group hover:bg-[#1c2a1e] transition-colors" delay={0.4}>
              <div className="absolute top-6 right-8 font-mono text-7xl font-bold text-accent/5 pointer-events-none">#3</div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                AI / ML MODULE
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">AI-Assisted TB & Malaria Screening</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-xs">
                  <Lock size={10} className="text-accent" />
                  <span className="text-[9px] font-mono text-accent uppercase tracking-wider">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5 bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-xs">
                  <ShieldCheck size={10} className="text-accent" />
                  <span className="text-[9px] font-mono text-accent uppercase tracking-wider">DPDPA Compliant</span>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Symptom-based AI screening integrated into the ASHA platform (or standalone) assigning TB/malaria probability scores to trigger priority referrals — reducing the 1–2 week diagnosis delay to hours. Validated against CBNAAT at AGMC.
              </p>
              <DelayReductionChart />
              
              {/* Local Context Data Points */}
              <div className="grid grid-cols-2 gap-4 mb-6 bg-accent/5 p-4 border border-accent/10 rounded-sm">
                <div>
                  <div className="text-accent font-mono text-lg font-bold leading-none">184/Lakh</div>
                  <div className="text-[9px] text-muted uppercase tracking-widest mt-1">TB Notification Rate</div>
                  <div className="text-[8px] text-muted/50 italic mt-1 leading-tight">Source: India TB Report 2024</div>
                </div>
                <div>
                  <div className="text-accent font-mono text-lg font-bold leading-none">12.4</div>
                  <div className="text-[9px] text-muted uppercase tracking-widest mt-1">Malaria API (Dhalai)</div>
                  <div className="text-[8px] text-muted/50 italic mt-1 leading-tight">Source: NVBDCP Tripura</div>
                </div>
                <div>
                  <div className="text-accent font-mono text-lg font-bold leading-none">58%</div>
                  <div className="text-[9px] text-muted uppercase tracking-widest mt-1">Referral Completion</div>
                  <div className="text-[8px] text-muted/50 italic mt-1 leading-tight">Source: NHM Tripura (72h window)</div>
                </div>
                <div>
                  <div className="text-accent font-mono text-lg font-bold leading-none">100%</div>
                  <div className="text-[9px] text-muted uppercase tracking-widest mt-1">ASHA Paper-based</div>
                  <div className="text-[8px] text-muted/50 italic mt-1 leading-tight">Source: State Health Society</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-accent/10">
                  <p className="text-muted text-[10px] leading-relaxed">
                    <strong className="text-accent">Critical Gap:</strong> 42% of symptomatic TB cases in rural Tripura experience a diagnosis delay exceeding 14 days due to sample transport logistics.
                  </p>
                </div>
              </div>

              {/* Data Sources Section */}
              <div className="mb-8 border-l-2 border-accent/20 pl-4">
                <h4 className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-3">Verified Data Sources</h4>
                <div className="space-y-2">
                  <a 
                    href="https://tbcindia.gov.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] text-muted hover:text-accent transition-colors group"
                  >
                    <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                    <span>India TB Report 2024 (Ministry of Health & Family Welfare)</span>
                  </a>
                  <a 
                    href="https://tripuranrhm.gov.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] text-muted hover:text-accent transition-colors group"
                  >
                    <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                    <span>NVBDCP Tripura (National Vector Borne Disease Control Programme)</span>
                  </a>
                  <a 
                    href="https://tripuranrhm.gov.in/AnnualReport" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] text-muted hover:text-accent transition-colors group"
                  >
                    <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                    <span>NHM Tripura Annual Report 2023-24</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => {
                    const shareData = {
                      title: 'MedTech Tripura: Delay Reduction in TB/Malaria Screening',
                      text: 'Check out how AI-assisted screening can reduce TB/Malaria diagnosis delay from 1 week to just 4 hours in Tripura.',
                      url: window.location.href
                    };
                    
                    if (navigator.share) {
                      navigator.share(shareData).catch(() => {
                        // Fallback if share fails or is blocked
                        navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      });
                    } else {
                      navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-[10px] font-mono text-accent hover:text-accent-light transition-colors bg-accent/5 border border-accent/20 px-3 py-1.5 rounded-sm uppercase tracking-widest"
                >
                  {copied ? (
                    <><Check size={12} /> Copied!</>
                  ) : (
                    <><Share2 size={12} /> Share Chart</>
                  )}
                </button>
              </div>

              <AshaTrainingModule />

              <div className="flex gap-8 pt-6 border-t border-border mt-12">
                <div>
                  <div className="font-mono text-xl font-bold text-accent">500</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Patient Validation Study</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-accent">Add-on</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Revenue Model</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Opportunity 4 */}
          <Reveal className="mt-px bg-card p-10 border border-border relative overflow-hidden group hover:bg-[#1c2a1e] transition-colors" delay={0.5}>
            <div className="absolute top-6 right-8 font-mono text-7xl font-bold text-accent/5 pointer-events-none">#4</div>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-6">
                  HARDWARE + APP BUNDLE
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Maternal & Neonatal Health Monitoring Kit</h3>
                <p className="text-muted text-sm leading-relaxed">
                  A low-cost hardware kit — portable fetal Doppler (₹1,500–2,500), digital BP cuff (₹800–1,200), haemoglobin estimation device (₹3,000–5,000) — bundled with a structured ANC app guiding ASHA workers through visit protocols and auto-generating red/yellow/green risk alerts for supervisors.
                </p>
              </div>
              <div className="w-full md:w-80 flex flex-col gap-4">
                <div className="bg-black/20 border border-border p-4 rounded-sm">
                  <div className="font-mono text-lg font-bold text-accent">JSY · PMSMA</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Government Program Integration</div>
                </div>
                <div className="bg-black/20 border border-border p-4 rounded-sm">
                  <div className="font-mono text-lg font-bold text-accent">Colour-coded alerts</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Risk Stratification Output</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="problems" className="py-24 bg-surface border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>02 · Infrastructure Gap</SectionLabel>
          <SectionTitle>The Healthcare<br />Infrastructure Reality</SectionTitle>
          
          <Reveal className="mt-12 overflow-x-auto border border-border rounded-sm" delay={0.2}>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-accent/10">
                <tr>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Facility Level</th>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Coverage Ratio</th>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Critical Gap</th>
                  <th className="font-mono text-[10px] tracking-widest text-accent uppercase p-5 text-left border-b border-border whitespace-nowrap">Patient Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/5">
                {[
                  { level: 'Sub-Centres', ratio: '~1 per 3,000–5,000 rural population', gap: 'Shortage of female health workers; 24 vacancies in Tripura', impact: 'Undetected high-risk pregnancies; home deliveries' },
                  { level: 'Primary Health Centres', ratio: '~1 per 30,000 population', gap: '39% lack lab technicians; 18% lack pharmacists', impact: 'Delayed TB, malaria, and anaemia diagnoses' },
                  { level: 'Community Health Centres', ratio: '~1 per 120,000 population', gap: 'Specialist shortfall; inadequate referral network', impact: 'Patients travel 50–120 km for specialist care' },
                  { level: 'ASHA Workers', ratio: '~1 per 1,000 rural population', gap: 'No digital tools; fully paper-based documentation', impact: 'No risk stratification; poor referral tracking' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-accent/5 transition-colors">
                    <td className="p-5 text-text font-medium">{row.level}</td>
                    <td className="p-5 text-muted">{row.ratio}</td>
                    <td className="p-5 text-muted">{row.gap}</td>
                    <td className="p-5 text-muted">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Disease Burden Section */}
      <section id="diseases" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>02.2 · Disease Burden</SectionLabel>
          <SectionTitle>Three Conditions,<br />Three Opportunities</SectionTitle>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Tripura's disease burden is documented, persistent, and addressable with technology — if that technology reaches community level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { icon: '🫁', title: 'Tuberculosis', desc: 'Tripura\'s TB case notification rate exceeds the national average. CBNAAT machines required for diagnosis are unavailable at ASHA or sub-centre level.', alert: '2–5 day diagnostic delay in remote blocks' },
              { icon: '🦟', title: 'Malaria', desc: 'Northeast India accounts for a significant share of India\'s malaria burden. Tripura\'s forested border regions experience seasonal spikes.', alert: 'Seasonal spikes in forested border regions' },
              { icon: '🤰', title: 'Maternal & Neonatal', desc: 'Rural Infant Mortality Rate remains above the national rural average. Anaemia, gestational hypertension, and obstructed labour are frequently detected too late.', alert: 'IMR above national rural average' }
            ].map((d, i) => (
              <Reveal key={i} className="bg-card p-10 group hover:bg-[#1c2a1e] transition-all" delay={0.2 + i * 0.1}>
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{d.icon}</div>
                <h3 className="text-2xl font-serif font-bold mb-4">{d.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">{d.desc}</p>
                <div className="text-[11px] font-mono text-accent-warm bg-accent-warm/10 border border-accent-warm/20 px-3 py-2 rounded-sm">
                  ⚠ {d.alert}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 bg-surface border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>11 · Execution Roadmap</SectionLabel>
          <SectionTitle>18-Month Build<br />& Scale Plan</SectionTitle>
          
          <div className="mt-16 relative pl-8 md:pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-linear-to-b before:from-accent before:to-transparent">
            {[
              { phase: 'MONTH 1–2 · FOUNDATION', title: 'Incorporate & Engage', items: ['Incorporate entity in Agartala or Guwahati for NE state presence', 'Meet NHM Tripura State Programme Officer — present concept', 'Identify 2 pilot blocks (Majlishpur block recommended)', 'Hire CTO and begin Flutter app architecture planning', 'Apply for BIRAC BIG grant and SISFS Seed Fund'] },
              { phase: 'MONTH 3–4 · USER RESEARCH', title: 'Field Immersion & Prototype', items: ['2-week field immersion with 30 ASHA workers across 2 blocks', 'Co-design app flows in Bengali and Kokborok', 'Build clickable prototype; validate in real field conditions', 'Map connectivity zones using TRAI data'] },
              { phase: 'MONTH 5–7 · BUILD', title: 'MVP Development', items: ['Build core modules: registration, ANC tracking, TB/malaria flagging', 'Build supervisor dashboard (web PWA) for block health officers', 'Implement offline SQLite and background sync with CRDT', 'Bengali and Kokborok voice input integration'] },
              { phase: 'MONTH 8–9 · PILOT', title: '100-ASHA Pilot Launch', items: ['Deploy to 100 ASHA workers across 2 pilot blocks', 'Daily stand-up with ASHA field supervisors', 'Track: adoption rate, data completeness, high-risk flags', 'Begin CDSCO pre-submission consultation'] },
              { phase: 'MONTH 10–12 · CONTRACT', title: 'Pilot Results & State Contract', items: ['Compile pilot outcomes and present to NHM Tripura leadership', 'Negotiate state SaaS contract for full Tripura deployment', 'Seed/Pre-Series A fundraise based on pilot data', 'Hire government relations manager'] },
              { phase: 'MONTH 13–18 · SCALE', title: 'Full Deployment & NE Expansion', items: ['Full deployment to all 4,000+ ASHA workers in Tripura', 'Initial engagement with NHM Assam and NHM Meghalaya', 'Launch AI-assisted TB screening module as an add-on', 'Target ARR: ₹1.5–2 Cr from Tripura'] }
            ].map((step, i) => (
              <Reveal key={i} className="relative mb-16 last:mb-0" delay={i * 0.1}>
                <div className="absolute -left-10 md:-left-14 top-1.5 w-4 h-4 rounded-full bg-bg border-2 border-accent z-10" />
                <div className="absolute -left-10 md:-left-14 top-1.5 w-4 h-4 rounded-full bg-accent/20 animate-ping" />
                <div className="font-mono text-[11px] tracking-widest text-accent mb-2">{step.phase}</div>
                <h3 className="text-2xl font-serif font-bold mb-4">{step.title}</h3>
                <ul className="space-y-2">
                  {step.items.map((item, j) => (
                    <li key={j} className="text-muted text-sm flex items-start gap-3">
                      <span className="text-accent mt-1">→</span> {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Financials Section */}
      <section id="financials" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>03.5 · Financial Projections</SectionLabel>
          <SectionTitle>Revenue Model<br />& Growth Path</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mt-16">
            {[
              { year: 'YEAR 1 — PILOT', rev: '₹12L', label: 'Annual Revenue (high estimate)', details: { ashas: '100–500', fee: '₹200 (pilot rate)', margin: '60–65%', burn: '₹15–20 Lakhs' } },
              { year: 'YEAR 2 — FULL TRIPURA', rev: '₹1.68Cr', label: 'Annual Recurring Revenue', highlight: true, details: { ashas: '4,000', fee: '₹350 per ASHA', margin: '70–75%', burn: '₹8–12 Lakhs' } },
              { year: 'YEAR 3 — NORTHEAST STATES', rev: '₹9.6Cr', label: 'Annual Recurring Revenue', details: { ashas: '20,000+', fee: '₹300–400 per ASHA', margin: '75–80%', burn: '₹12–18 Lakhs' } }
            ].map((fin, i) => (
              <Reveal key={i} className={`p-10 text-center relative overflow-hidden ${fin.highlight ? 'bg-linear-to-br from-[#1a2e1c] to-card border-accent/30' : 'bg-card'}`} delay={0.2 + i * 0.1}>
                {fin.highlight && <div className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-sm">TARGET</div>}
                <div className="font-mono text-[11px] tracking-widest text-muted mb-4">{fin.year}</div>
                <div className="text-5xl font-serif font-black text-accent mb-2">{fin.rev}</div>
                <div className="text-xs text-muted mb-8">{fin.label}</div>
                <div className="w-10 h-px bg-border mx-auto mb-6" />
                <div className="text-left space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted">ASHAs Covered:</span> <span className="text-text font-medium">{fin.details.ashas}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Monthly Fee:</span> <span className="text-text font-medium">{fin.details.fee}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Gross Margin:</span> <span className="text-text font-medium">{fin.details.margin}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Monthly Burn:</span> <span className="text-text font-medium">{fin.details.burn}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Data Privacy & Security Section */}
      <section id="security" className="py-24 relative z-10 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>06 · Data Privacy & Security</SectionLabel>
          <SectionTitle>Built for Trust &<br />Regulatory Compliance</SectionTitle>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Healthcare data in India is governed by strict regulations. Our architecture is designed from the ground up to meet and exceed these standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal className="bg-card border border-border p-8 md:p-10" delay={0.2}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold mb-3 text-text">DPDPA & DISHA Compliance</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Full alignment with India's Digital Personal Data Protection Act (DPDPA) and the Digital Information Security in Healthcare Act (DISHA). We implement strict data residency requirements, ensuring all patient data remains within Indian borders.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="bg-card border border-border p-8 md:p-10" delay={0.3}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Lock className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold mb-3 text-text">End-to-End Encryption</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    All data is encrypted at rest (AES-256) and in transit (TLS 1.3). ASHA worker devices use secure local storage with biometric or PIN-based access control, preventing data leaks even if a device is lost or stolen.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="bg-card border border-border p-8 md:p-10" delay={0.4}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <BadgeCheck className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold mb-3 text-text">Informed Consent Architecture</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    The platform includes a mandatory, vernacular-first digital consent module. ASHA workers are guided to explain data usage to patients in Bengali or Kokborok before any screening data is captured.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Moat Section */}
      <section className="py-24 bg-surface border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>07 · Competitive Advantage</SectionLabel>
          <SectionTitle>Five Defensible<br />Moats</SectionTitle>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Once a government SaaS contract is signed and 4,000 ASHA workers are trained on a platform, switching costs become extremely high.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
            {[
              { icon: <Building2 />, title: 'Government Relationships', desc: 'A signed NHM contract is not easily displaced.' },
              { icon: <Globe />, title: 'Language Localisation', desc: 'Genuine Kokborok and Bengali voice input requires community co-design.' },
              { icon: <Users />, title: 'ASHA Training', desc: 'Retraining thousands of workers on a competitor product requires enormous coordination.' },
              { icon: <Activity />, title: 'Data Network Effects', desc: 'More health data improves AI risk model accuracy over time.' },
              { icon: <ShieldCheck />, title: 'Founder Context', desc: 'A local founder has pre-existing trust and institutional relationships.' }
            ].map((m, i) => (
              <Reveal key={i} className="bg-card p-8 text-center hover:bg-[#1c2a1e] transition-all group" delay={i * 0.1}>
                <div className="text-accent mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300">{m.icon}</div>
                <h4 className="text-sm font-bold text-text mb-3 leading-tight">{m.title}</h4>
                <p className="text-[11px] text-muted leading-relaxed">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section id="funding" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionLabel>08 · Funding Landscape</SectionLabel>
          <SectionTitle>Non-Dilutive &<br />Impact Funding Sources</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {[
              { name: 'Startup India Seed Fund (SISFS)', type: 'GOVERNMENT GRANT', amount: 'Up to ₹50L', rel: 'Explicitly for early-stage startups. High relevance — direct entry point.' },
              { name: 'BIRAC BIG Grant', type: 'GOVERNMENT GRANT', amount: '₹50L–₹2 Cr', rel: 'Health tech focus. ASHA-level software explicitly qualifies.' },
              { name: 'NHM Innovation Fund, Tripura', type: 'PILOT CONTRACT', amount: '₹10–50L', rel: 'Very high relevance — direct state government entry point.' },
              { name: 'Gates Foundation', type: 'PHILANTHROPIC', amount: '$50K–$250K', rel: 'ASHA digitisation and maternal health are explicitly funded categories.' },
              { name: 'Villgro / Menterra', type: 'IMPACT VC', amount: '₹50L–₹3 Cr', rel: 'Rural health and NE India government-aligned models are core.' },
              { name: 'Social Alpha / Tata Trusts', type: 'INCUBATION + GRANT', amount: '₹25L–₹1 Cr', rel: 'Community health tech focus. Provides mentorship and network.' }
            ].map((f, i) => (
              <Reveal key={i} className="bg-card border border-border p-8 rounded-sm hover:border-accent/50 transition-all group" delay={i * 0.05}>
                <div className="font-bold text-sm text-text mb-1">{f.name}</div>
                <div className="font-mono text-[9px] tracking-widest text-gold mb-3">{f.type}</div>
                <div className="font-serif text-xl font-bold text-accent mb-3">{f.amount}</div>
                <p className="text-[12px] text-muted leading-relaxed">{f.rel}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-radial-[ellipse_60%_60%_at_50%_50%] from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <SectionLabel className="justify-center">12 · Final Recommendation</SectionLabel>
            <h2 className="font-serif text-5xl md:text-7xl font-black leading-tight mb-8">
              The Window<br />is <em className="text-accent not-italic">Open Now</em>
            </h2>
            <p className="text-muted text-lg md:text-xl leading-relaxed mb-12">
              India's Digital Health Mission (ABDM) is driving government demand for interoperable health software. NHM budgets for digital health are growing. And Tripura — unlike any metro market — has no entrenched incumbents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#opportunities" className="bg-accent text-bg font-bold text-sm px-10 py-5 rounded-sm hover:bg-accent-light transition-all">
                Start with Opportunity #1
              </a>
              <a href="#funding" className="bg-transparent border border-white/15 text-text font-medium text-sm px-10 py-5 rounded-sm hover:border-accent hover:text-accent transition-all">
                Explore Funding Paths →
              </a>
            </div>
          </Reveal>

          <div id="contacts" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border mt-24 text-left">
            {[
              { label: 'Key Contact · 01', name: 'State Programme Officer (SPO)\nNHM Tripura, Agartala' },
              { label: 'Key Contact · 02', name: 'Agartala Government Medical College (AGMC)\nDept. of Community Medicine' },
              { label: 'Key Contact · 03', name: 'State TB Officer, Tripura\nNTEP Partnership' },
              { label: 'Key Contact · 04', name: 'Social Alpha\nImpact Incubator' },
              { label: 'Key Contact · 05', name: 'BIRAC Regional Centre\nKolkata' },
              { label: 'Key Contact · 06', name: 'Tripura Tribal Areas Autonomous\nDistrict Council' }
            ].map((c, i) => (
              <Reveal key={i} className="bg-card p-6 hover:bg-[#1c2a1e] transition-colors cursor-pointer group relative" delay={i * 0.05}>
                <ArrowUpRight className="absolute top-4 right-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                <div className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase mb-2">{c.label}</div>
                <div className="text-xs font-semibold text-text whitespace-pre-line leading-relaxed">{c.name}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StartupDetails />

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-bg relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
            <div className="flex flex-col gap-4">
              <div className="font-mono text-[11px] text-accent tracking-widest uppercase">
                ATSFY TECHNOLOGIES PRIVATE LIMITED · HEADQUARTERS
              </div>
              <div className="flex flex-wrap gap-6">
                <a href="mailto:info.atsfy@gmail.com" className="flex items-center gap-2 text-[11px] text-muted hover:text-accent transition-colors">
                  <Mail size={14} /> info.atsfy@gmail.com
                </a>
                <a href="tel:9862510477" className="flex items-center gap-2 text-[11px] text-muted hover:text-accent transition-colors">
                  <Phone size={14} /> +91 9862510477
                </a>
                <div className="flex items-center gap-2 text-[11px] text-muted">
                  <MapPin size={14} /> Agartala, Dhaleswar road no.08, Tripura
                </div>
              </div>
            </div>
            <div className="text-[11px] text-muted md:text-right max-w-xs">
              ATSFY Technologies · Empowering Frontline Healthcare
              <div className="mt-2 text-[9px] opacity-60">
                Compliant with DPDPA 2023 & DISHA Guidelines. Data residency: India (Agartala/Kolkata Regions).
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-[9px] text-muted/50 tracking-widest uppercase">
            Empowering Frontline Healthcare through Technology
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-[200] w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center shadow-lg shadow-accent/40 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ChevronRight className="-rotate-90" size={24} />
      </button>
    </div>
  );
}
