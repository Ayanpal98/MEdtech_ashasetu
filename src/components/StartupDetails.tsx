import React from 'react';
import { 
  Download, 
  Shield, 
  Globe, 
  Award, 
  Users, 
  Target, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';

const Reveal: React.FC<{ children: React.ReactNode, delay?: number, perspective?: boolean }> = ({ children, delay = 0, perspective = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotateX: perspective ? 8 : 0, perspective: 1000 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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

export const StartupDetails = () => {
  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Watermark
    doc.setTextColor(240, 240, 240);
    doc.setFontSize(60);
    doc.text('ATSFY TECHNOLOGIES', 10, 150, { angle: 45 });
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text('MedTech Tripura Prospectus', 20, 30);
    
    doc.setFontSize(14);
    doc.text('Parent Entity: ATSFY Technologies Pvt. Ltd.', 20, 45);
    
    doc.setFontSize(12);
    const content = [
      'Vision: To eliminate diagnostic delays in rural India through AI-driven systems.',
      'Mission: Empowering 1 Million+ frontline health workers with digital tools.',
      'Focus: Starting with Tripura, scaling across the North Eastern Region.',
      '',
      '--- STRATEGIC OPPORTUNITY: MEDTECH TRIPURA ---',
      'Primary Product: Offline-First ASHA Worker Platform',
      'Impact: Reducing TB/Malaria screening delay from 1 week to 4 hours.',
      'Target Users: 4,000+ Frontline ASHA workers in Tripura.',
      'Technology Stack: Flutter, SQLite + CRDT (Offline-First Architecture).',
      'Regulatory: CDSCO Class A SaMD Compliance.',
      'Revenue Model: NHM (National Health Mission) Contracts.',
      '',
      '--- CORPORATE VALUES ---',
      '- Community-First Engineering: Field-tested in rural Tripura.',
      '- Data Privacy: Compliant with DPDPA 2023 & DISHA Guidelines.',
      '- Regional Expansion: Clear path across all 8 Northeast Indian states.',
      '',
      '--- ATSFY TECHNOLOGIES CONTACT ---',
      'Headquarters: Agartala, Dhaleswar road no.08, Tripura',
      'Email: info.atsfy@gmail.com',
      'Phone: +91 9862510477',
      'Website: https://atsfy.tech'
    ];
    
    let y = 60;
    content.forEach(line => {
      doc.text(line, 20, y);
      y += 10;
    });
    
    doc.save('MedTech_Tripura_Prospectus_ATSFY.pdf');
  };

  return (
    <section id="startup-details" className="py-24 bg-bg relative overflow-hidden border-t border-border">
      {/* Watermark Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none">
        <div className="text-[20vw] font-black font-mono rotate-[-15deg] whitespace-nowrap">
          ATSFY TECHNOLOGIES
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-widest px-3 py-1 rounded-sm mb-4">
                CORPORATE PROFILE
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-text mb-4">
                ATSFY Technologies <span className="text-accent">Pvt. Ltd.</span>
              </h2>
              <p className="text-muted text-lg max-w-2xl">
                The parent entity behind MedTech Tripura, dedicated to building high-impact, offline-first healthcare infrastructure for the last-mile population of Northeast India.
              </p>
            </div>
            
            <button 
              onClick={handleDownload}
              className="group relative bg-accent text-bg font-bold px-8 py-4 rounded-sm flex items-center gap-3 hover:bg-accent-light transition-all active:scale-95 shadow-xl shadow-accent/10"
            >
              <Download size={18} />
              <span className="uppercase tracking-widest text-xs">Download Full Prospectus</span>
              <div className="absolute -bottom-1 -right-1 w-full h-full border border-accent/30 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Reveal delay={0.1}>
              <TiltCard>
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] h-full shadow-2xl">
                  <Target className="text-accent mb-4" size={32} />
                  <h4 className="text-2xl font-sans font-black mb-3">Our Vision</h4>
                  <p className="text-white/40 text-[13px] leading-relaxed font-medium">
                    To eliminate diagnostic delays in rural India through AI-driven, decentralized healthcare delivery systems that work anywhere, regardless of connectivity.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.2}>
              <TiltCard>
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] h-full shadow-2xl">
                  <Shield className="text-accent mb-4" size={32} />
                  <h4 className="text-2xl font-sans font-black mb-3">Our Mission</h4>
                  <p className="text-white/40 text-[13px] leading-relaxed font-medium">
                    Empowering 1 Million+ frontline health workers with digital tools that bridge the gap between rural patients and tertiary care centers.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.3}>
              <TiltCard>
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] h-full shadow-2xl">
                  <Globe className="text-accent mb-4" size={32} />
                  <h4 className="text-2xl font-sans font-black mb-3">Regional Focus</h4>
                  <p className="text-white/40 text-[13px] leading-relaxed font-medium">
                    Starting with Tripura, we aim to scale across the entire North Eastern Region (NER) of India, addressing unique geographical and logistical challenges.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-6">Core Leadership & Values</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Users size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text">Community-First Engineering</div>
                    <p className="text-xs text-muted mt-1">We build with ASHA workers, not just for them. Every feature is field-tested in rural Tripura.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text">Regulatory Compliance</div>
                    <p className="text-xs text-muted mt-1">Adhering to CDSCO Class A SaMD standards and NDHM data privacy protocols.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface p-8 border border-border rounded-sm">
              <h4 className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-6">Contact Headquarters</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <MapPin size={14} className="text-accent" />
                  <span>Agartala, Dhaleswar road no.08, Tripura</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <Mail size={14} className="text-accent" />
                  <span>info.atsfy@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <Phone size={14} className="text-accent" />
                  <span>+91 9862510477</span>
                </div>
                <div className="pt-4 mt-4 border-t border-border/30">
                  <div className="text-[10px] text-muted uppercase tracking-widest mb-2">Follow Our Journey</div>
                  <div className="flex gap-4">
                    {[
                      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/asha-setu/' },
                      { name: 'Twitter', url: '#' },
                      { name: 'Medium', url: '#' }
                    ].map(social => (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-accent hover:text-accent-light transition-colors font-bold uppercase tracking-widest">
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] text-muted font-mono uppercase tracking-widest">
              © 2026 ATSFY Technologies Private Limited · All Rights Reserved
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] text-muted hover:text-accent transition-colors uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-[10px] text-muted hover:text-accent transition-colors uppercase tracking-widest">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
