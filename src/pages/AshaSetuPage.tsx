import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Database, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Cpu, 
  Download, 
  ArrowLeft,
  ChevronRight,
  Server,
  Layers,
  Lock,
  Maximize2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AshaAppPreview } from '../components/AshaAppPreview';
import { ThreeDLogo } from '../components/ThreeDLogo';
import { ThemeToggle } from '../components/ThemeToggle';

const Reveal: React.FC<{ children: React.ReactNode, delay?: number, id?: string, className?: string, perspective?: boolean }> = ({ children, delay = 0, id, className, perspective = true }) => (
  <motion.div
    id={id}
    className={className}
    initial={{ opacity: 0, y: 20, rotateX: perspective ? 8 : 0, perspective: 1000 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const TiltCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ 
      rotateY: 4, 
      rotateX: -4,
      scale: 1.02,
      z: 30
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`relative transform-gpu perspective-1000 ${className}`}
  >
    {children}
  </motion.div>
);

export const AshaSetuPage = () => {
  const [isDemoFullScreen, setIsDemoFullScreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-white font-sans">
      <AnimatePresence>
        {isDemoFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-bg flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="ASHASETU Live Demo Experience"
          >
            <div className="h-20 border-b border-border flex items-center justify-between px-8 bg-surface/80 backdrop-blur-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shadow-[0_10px_20px_rgba(42,184,113,0.2)]">
                  <Activity size={22} className="text-white" />
                </div>
                <div>
                  <span className="font-sans font-black tracking-tighter text-xl uppercase leading-none block text-text">ASHASETU</span>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Live Experience Session</span>
                </div>
              </div>
              <button 
                onClick={() => setIsDemoFullScreen(false)}
                className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-black/10"
                aria-label="Close demo"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 relative overflow-hidden bg-bg">
              <AshaAppPreview fullScreen={true} />
            </div>
            <div className="h-16 border-t border-border bg-surface/60 flex items-center justify-between px-10">
              <div className="font-sans text-[11px] text-muted font-bold tracking-[0.2em] uppercase flex items-center gap-4">
                <span className="flex items-center gap-2"><Lock size={12} className="text-accent" /> AES-256 Enabled</span>
                <span className="flex items-center gap-2"><Cpu size={12} className="text-accent" /> Edge AI Active</span>
              </div>
              <div className="font-mono text-[10px] text-muted/40 uppercase tracking-widest">
                Tripura Health Dept · Enterprise v1.0.4
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border bg-surface/60 backdrop-blur-2xl shadow-sm" aria-label="AshaSetu Page Navigation">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group" aria-label="Back to System Home">
            <div className="w-10 h-10 rounded-2xl bg-surface/5 border border-border flex items-center justify-center group-hover:bg-surface transition-all">
              <ArrowLeft size={20} className="text-text" />
            </div>
            <div className="flex items-center gap-2">
              <ThreeDLogo size={24} />
              <span className="font-sans text-[11px] font-black tracking-[0.2em] text-muted tracking-widest uppercase group-hover:text-text transition-colors">Back to System</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4 bg-accent/5 border border-accent/20 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(61,220,132,0.1)]">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(61,220,132,0.8)]" />
              <span className="font-sans text-[10px] tracking-tight text-accent uppercase font-black">Live Production Prototype</span>
            </div>
            <ThemeToggle className="scale-75" />
          </div>
        </div>
      </nav>

      <main className="transition-colors duration-300">
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pb-32 px-6 md:px-10" aria-labelledby="ashasetu-hero-title">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest">Edge AI Healthcare · v1.0.4</span>
                </div>
              </Reveal>
              
              <Reveal delay={0.1}>
                <h1 id="ashasetu-hero-title" className="text-6xl md:text-8xl font-sans font-black leading-[0.9] mb-10 tracking-tighter text-text">
                  ASHASETU<br />
                  <span className="text-accent">Zero-Net</span><br />
                  Architecture.
                </h1>
              </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl text-muted font-medium leading-relaxed mb-12 max-w-xl">
                The definitive offline engineering solution for India's frontline health workforce. Engineered for the deep terrain of Tripura.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <button className="bg-text text-bg px-10 py-5 rounded-[24px] font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-lg shadow-text/10">
                  Technical Spec <Download size={20} />
                </button>
                <button className="bg-muted/5 border border-muted/10 text-text px-10 py-5 rounded-[24px] font-black text-sm hover:bg-muted/10 transition-all">
                  Sandbox Access
                </button>
              </div>
            </Reveal>
          </div>

            <Reveal delay={0.4} className="relative group/device">
              <div className="absolute inset-0 bg-accent/10 blur-[150px] rounded-full -z-10 group-hover/device:bg-accent/20 transition-all duration-1000 opacity-50" />
              <div className="relative z-10 flex justify-center transform lg:rotate-6 hover:rotate-2 transition-transform duration-1000">
                 <div className="relative cursor-pointer" onClick={() => setIsDemoFullScreen(true)}>
                    <div className="absolute -inset-4 glass-card rounded-[64px] -z-10 shadow-2xl" />
                    <AshaAppPreview />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/device:opacity-100 transition-opacity backdrop-blur-md rounded-[48px] flex flex-col items-center justify-center border-4 border-accent/20">
                      <div className="w-20 h-20 rounded-3xl bg-accent text-white flex items-center justify-center shadow-[0_20px_40px_rgba(42,184,113,0.3)] animate-pulse active:scale-90 transition-transform">
                        <Maximize2 size={36} />
                      </div>
                      <span className="mt-6 font-sans text-[12px] text-accent font-black uppercase tracking-[0.3em] bg-white/80 px-6 py-3 rounded-2xl border border-accent/30 backdrop-blur-xl shadow-lg">Launch Live Experience</span>
                    </div>
                 </div>
              </div>
              
              {/* Context Floating Labels */}
            <div className="absolute -left-12 top-1/4 glass-card p-6 rounded-[32px] shadow-2xl hidden md:block group-hover/device:-translate-x-4 transition-transform duration-500 border-t-accent/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                  <Database size={24} />
                </div>
                <div>
                  <div className="text-[12px] font-black uppercase tracking-widest text-text">Local SQLite</div>
                  <div className="text-[10px] text-muted font-bold">256MB Encrypted NPU Cache</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-12 bottom-1/4 glass-card p-6 rounded-[32px] shadow-2xl hidden md:block group-hover/device:translate-x-4 transition-transform duration-500 border-t-accent/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                  <Cpu size={24} />
                </div>
                <div>
                  <div className="text-[12px] font-black uppercase tracking-widest text-text">Bio-Engine AI</div>
                  <div className="text-[10px] text-muted font-bold">On-Device Clinical Inference</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering Specs */}
      <section className="py-24 md:py-48 bg-surface relative px-6 md:px-10 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,184,113,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="font-sans text-[12px] text-accent font-black tracking-[0.3em] uppercase mb-20 text-center">
              SYSTEM ARCHITECTURE · OFF-GRID CORE
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Server size={40} />,
                title: 'CRDT Sync Engine',
                desc: 'Conflict-free Replicated Data Types ensure that data recorded on thousands of devices never overlaps during synchronization.'
              },
              {
                icon: <Lock size={40} />,
                title: 'AES-256 Protocol',
                desc: 'Zero-trust security architecture. Every patient record is encrypted at the point of entry before being committed locally.'
              },
              {
                icon: <Layers size={40} />,
                title: 'Multi-Lingual NLP',
                desc: 'Offline voice-to-text models for Bengali and Kokborok allows workers to maintain focus on patient interaction.'
              }
            ].map((spec, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <TiltCard className="h-full">
                  <div className="group h-full glass-card p-10 rounded-[40px] hover:bg-white transition-all duration-500 three-d-shadow border-t-accent/10">
                    <div className="text-accent mb-10 group-hover:scale-110 transition-transform origin-left duration-500">
                      {spec.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-6 tracking-tight text-text">{spec.title}</h3>
                    <p className="text-muted text-base leading-relaxed font-medium">
                      {spec.desc}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* App Tutorial / How it Works */}
      <section className="py-24 md:py-40 bg-bg relative px-6 md:px-10 border-y border-border overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="text-center mb-20">
            <div className="font-sans text-[12px] text-accent font-black tracking-[0.3em] uppercase mb-4">
              USER EXPERIENCE GUIDE
            </div>
            <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter text-text mb-6">
              Simple. Local. <span className="text-accent">Effective.</span>
            </h2>
            <p className="text-muted text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              We designed ASHASETU to be intuitive for everyone. Here is how it works on the ground, in just five simple steps.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                icon: <Globe size={32} />,
                title: "Language First",
                desc: "Choose between Bengali or Kokborok for an interface that feels like home.",
                delay: 0
              },
              {
                icon: <Database size={32} />,
                title: "Register Offline",
                desc: "Add patient details and Aadhar records even with zero internet bars.",
                delay: 0.1
              },
              {
                icon: <Activity size={32} />,
                title: "Smart Screening",
                desc: "Answer basic questions and let the built-in AI check for health risks.",
                delay: 0.2
              },
              {
                icon: <Zap size={32} />,
                title: "One-Tap Sync",
                desc: "When you get signal, the sync button sends all records to the cloud securely.",
                delay: 0.3
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Expert Support",
                desc: "Instantly call Medical Officers if the AI flags a critical emergency.",
                delay: 0.4
              }
            ].map((step, i) => (
              <Reveal key={i} delay={step.delay} className="relative group/step">
                <div className="h-full glass-card p-8 rounded-[32px] hover:bg-white transition-all duration-500 hover:-translate-y-2 border-t-white border-l-white shadow-xl overflow-hidden three-d-shadow border-t-accent/10">
                  <div className="absolute -right-4 -top-4 text-7xl font-sans font-black text-black/5 group-hover/step:text-accent/10 transition-colors">
                    0{i + 1}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 backdrop-blur-md flex items-center justify-center text-accent mb-8 shadow-md border border-accent/20 group-hover/step:bg-accent group-hover/step:text-white transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-black mb-4 tracking-tight text-text">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 md:py-48 px-6 md:px-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <Reveal className="flex-1">
              <h2 className="text-5xl md:text-7xl font-sans font-black mb-12 tracking-tighter text-text">
                Built for the <br /><span className="text-accent">Last Mile</span>.
              </h2>
              <div className="space-y-16">
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 glass-card flex items-center justify-center font-sans font-black text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors duration-500 three-d-shadow">01</div>
                  <div>
                    <h4 className="text-xl font-black mb-3 tracking-tight text-text">Zero-Lag Reporting</h4>
                    <p className="text-base text-muted leading-relaxed font-medium">ASHASETU eliminates paper reporting delays, syncing critical health data in milliseconds upon any available connection.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 glass-card flex items-center justify-center font-sans font-black text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors duration-500 three-d-shadow">02</div>
                  <div>
                    <h4 className="text-xl font-black mb-3 tracking-tight text-text">AI Referral Pathways</h4>
                    <p className="text-base text-muted leading-relaxed font-medium">Edge AI flags high-risk cases on-device, generating instant QR-code referrals for immediate critical hospital action.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 glass-card flex items-center justify-center font-sans font-black text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors duration-500 three-d-shadow">03</div>
                  <div>
                    <h4 className="text-xl font-black mb-3 tracking-tight text-text">Battery Optimization</h4>
                    <p className="text-base text-muted leading-relaxed font-medium">Efficient runtime architecture designed for entry-level hardware, ensuring 14+ hours of field operation on one charge.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="flex-1 w-full flex justify-center">
              <TiltCard className="w-full max-w-lg">
                <div className="relative w-full aspect-square glass-card flex flex-col items-center justify-center rounded-[64px] group overflow-hidden shadow-2xl three-d-shadow border-t-accent/20">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <Globe size={240} className="text-accent/10 mb-12 animate-pulse" />
                  <div className="text-center px-12 relative z-10">
                    <div className="text-7xl font-sans font-black text-accent mb-4 tracking-tighter">99.9%</div>
                    <div className="text-[12px] text-muted uppercase tracking-[0.4em] font-black">Uptime in Isolated Terrain</div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 md:py-48 px-6 md:px-10 border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-sans font-black mb-10 tracking-tighter text-text">Scale the Infrastructure.</h2>
            <p className="text-muted text-xl md:text-2xl mb-16 font-medium leading-relaxed max-w-3xl mx-auto">
              Join us in deploying ASHASETU across the remotest blocks of the Northeast. We are building the future of offline health.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setIsDemoFullScreen(true)}
                className="w-full sm:w-auto bg-accent text-white px-12 py-6 rounded-[24px] font-black text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(42,184,113,0.3)]"
              >
                Start Demo <Maximize2 size={24} />
              </button>
              <Link to="/" className="w-full sm:w-auto bg-white border border-border text-text px-12 py-6 rounded-[24px] font-black text-base hover:bg-muted/5 transition-all flex items-center justify-center gap-3 shadow-sm">
                Contact ATSFY <ChevronRight size={24} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-border/30 px-6 md:px-10 bg-card/10" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-accent rounded-sm" aria-hidden="true" />
             <span className="font-serif font-black tracking-tighter text-sm uppercase">ASHASETU</span>
          </div>
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.3em]">
            © 2026 ATSFY TECHNOLOGIES PVT LTD · PROPRIETARY TECHNOLOGY
          </div>
          <div className="flex items-center gap-4">
            <Zap size={14} className="text-accent" aria-hidden="true" />
            <span className="text-[10px] text-muted uppercase font-bold tracking-widest">Enterprise Edition</span>
          </div>
        </div>
      </footer>
    </main>
    </div>
  );
};
