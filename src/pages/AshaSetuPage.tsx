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

const Reveal: React.FC<{ children: React.ReactNode, delay?: number, id?: string, className?: string }> = ({ children, delay = 0, id, className }) => (
  <motion.div
    id={id}
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-bg">
      <AnimatePresence>
        {isDemoFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-bg flex flex-col"
          >
            <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Activity size={18} className="text-bg" />
                </div>
                <span className="font-serif font-black tracking-tighter text-lg uppercase">ASHASETU LIVE SESSION</span>
              </div>
              <button 
                onClick={() => setIsDemoFullScreen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <AshaAppPreview fullScreen={true} />
            </div>
            <div className="h-12 border-t border-border bg-card/30 flex items-center justify-center px-6">
              <div className="font-mono text-[9px] text-muted tracking-widest uppercase">
                Enterprise Edition · Edge AI Runtime Active · Encrypted Local Session
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeft size={16} className="text-bg" />
            </div>
            <span className="font-mono text-[11px] tracking-widest text-muted uppercase group-hover:text-text transition-colors">Back to ATSFY</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-accent uppercase font-bold">Live Demo Available</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest">Edge AI Healthcare · v1.0.4</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
                ASHASETU<br />
                <span className="text-accent">Zero-Connectivity</span> Architecture.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-xl">
                The definitive offline engineering solution for India's frontline health workforce. Designed for Tripura's remotest blocks where internet is a luxury, but healthcare is a necessity.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <button className="bg-accent text-bg px-8 py-4 rounded-sm font-bold text-sm hover:bg-accent-light transition-all flex items-center gap-2">
                  Technical Whitepaper <Download size={18} />
                </button>
                <button className="border border-border text-text px-8 py-4 rounded-sm font-medium text-sm hover:border-accent hover:text-accent transition-all">
                  Request Sandbox Access
                </button>
              </div>
            </Reveal>
          </div>

            <Reveal delay={0.4} className="relative group/device">
              <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-full -z-10 group-hover/device:bg-accent/20 transition-all duration-1000" />
              <div className="relative z-10 flex justify-center transform lg:rotate-3 hover:rotate-0 transition-transform duration-1000">
                 <div className="relative cursor-pointer" onClick={() => setIsDemoFullScreen(true)}>
                   <AshaAppPreview />
                   <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover/device:opacity-100 transition-opacity backdrop-blur-[2px] rounded-[32px] flex flex-col items-center justify-center border-4 border-accent/20">
                     <div className="w-16 h-16 rounded-full bg-accent text-bg flex items-center justify-center shadow-2xl shadow-accent/40 animate-bounce">
                       <Maximize2 size={32} />
                     </div>
                     <span className="mt-4 font-mono text-[10px] text-accent font-black uppercase tracking-[0.2em] bg-bg px-4 py-2 rounded-full border border-accent/20">Launch Full Experience</span>
                   </div>
                 </div>
              </div>
              
              {/* Context Floating Labels */}
            <div className="absolute -left-4 top-1/4 bg-card border border-border p-4 rounded-sm shadow-2xl backdrop-blur-md hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Database size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider">Local SQLite</div>
                  <div className="text-[9px] text-muted">256MB Encrypted Cache</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-card border border-border p-4 rounded-sm shadow-2xl backdrop-blur-md hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                  <Cpu size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider">Edge AI Model</div>
                  <div className="text-[9px] text-muted">On-Device Risk Analysis</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering Specs */}
      <section className="py-24 md:py-32 bg-card/30 border-y border-border px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="font-mono text-[11px] text-accent tracking-widest uppercase mb-16 text-center">
              SYSTEM ARCHITECTURE · OFF-GRID PILLARS
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Server size={32} />,
                title: 'CRDT Sync Engine',
                desc: 'Conflict-free Replicated Data Types ensure that data recorded on 4,000+ devices never overlaps during synchronization, even after weeks of offline status.'
              },
              {
                icon: <Lock size={32} />,
                title: 'AES-256 Edge Encryption',
                desc: 'Every patient record is encrypted at the point of entry before being committed to the local storage. Security remains intact even if hardware is compromised.'
              },
              {
                icon: <Layers size={32} />,
                title: 'Multi-Lingual NLP',
                desc: 'Offline voice models for Bengali and Kokborok allows ASHA workers to record symptoms hands-free while maintaining focus on patient interaction.'
              }
            ].map((spec, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="group">
                  <div className="text-accent mb-6 group-hover:scale-110 transition-transform origin-left">
                    {spec.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-4">{spec.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 md:py-32 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <Reveal className="flex-1">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Designed for the <br /><span className="italic text-accent">Last Mile</span> Healthcare.
              </h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-border flex items-center justify-center font-mono text-accent">01</div>
                  <div>
                    <h4 className="font-bold mb-2">Eliminating Paper Lags</h4>
                    <p className="text-sm text-muted">Traditional reporting takes 15-20 days to reach state health centers. ASHASETU reduces this to milliseconds upon any network ping.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-border flex items-center justify-center font-mono text-accent">02</div>
                  <div>
                    <h4 className="font-bold mb-2">Smart Referral Pathways</h4>
                    <p className="text-sm text-muted">AI flags high-risk pregnancies or suspected TB cases on-device, generating a temporary QR-code referral that tertiary hospitals can scan instantly.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-border flex items-center justify-center font-mono text-accent">03</div>
                  <div>
                    <h4 className="font-bold mb-2">Battery Optimization</h4>
                    <p className="text-sm text-muted">Engineered for low-power consumption on entry-level Android devices, ensuring the app lasts a full field day in areas with limited electricity.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="flex-1 w-full flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-accent/5 border border-accent/20 flex flex-col items-center justify-center rounded-sm group">
                <div className="absolute inset-0 bg-linear-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Globe size={180} className="text-accent/20 mb-8" />
                <div className="text-center px-10">
                  <div className="text-4xl font-serif font-bold text-accent mb-2">99.9%</div>
                  <div className="text-xs text-muted uppercase tracking-[0.2em] font-mono font-bold">Offline Availability Guaranteed</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Ready to transform rural healthcare infrastructure?</h2>
            <p className="text-muted text-lg mb-12">
              Join ATSFY in deploying ASHASETU across the Northeast. We are actively seeking strategic partners for scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsDemoFullScreen(true)}
                className="w-full sm:w-auto bg-accent text-bg px-10 py-5 rounded-sm font-bold text-sm hover:bg-accent-light transition-all flex items-center justify-center gap-2"
              >
                Launch Live Demo <Maximize2 size={18} />
              </button>
              <Link to="/#contact" className="w-full sm:w-auto border border-border text-text px-10 py-5 rounded-sm font-bold text-sm hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2">
                Connect with ATSFY <ChevronRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-border/30 px-6 md:px-10 bg-card/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-accent rounded-sm" />
             <span className="font-serif font-black tracking-tighter text-sm uppercase">ASHASETU</span>
          </div>
          <div className="text-[10px] text-muted font-mono uppercase tracking-[0.3em]">
            © 2026 ATSFY TECHNOLOGIES PVT LTD · PROPRIETARY TECHNOLOGY
          </div>
          <div className="flex items-center gap-4">
            <Zap size={14} className="text-accent" />
            <span className="text-[10px] text-muted uppercase font-bold tracking-widest">Enterprise Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
