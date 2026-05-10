import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Flag, Layers, Milestone, TrendingUp } from 'lucide-react';

const Reveal: React.FC<{ children: React.ReactNode, delay?: number, perspective?: boolean }> = ({ children, delay = 0, perspective = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: perspective ? 10 : 0, perspective: 1000 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

const TiltCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
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

export const Roadmap3D = () => {
  const steps = [
    {
      year: '2024 Q3',
      title: 'The Foundation',
      desc: 'Field research in Dhalai & Khowai. Identifying the core UI challenges for non-tech health workers.',
      icon: <Layers size={24} />,
      status: 'Completed',
      color: 'bg-white/10'
    },
    {
      year: '2025 Q1',
      title: 'Alpha Deployment',
      desc: 'Deploying ASHASETU v1.0 across 50 sub-centres. First offline sync protocol validated.',
      icon: <Flag size={24} />,
      status: 'Live',
      color: 'bg-accent/20'
    },
    {
      year: '2025 Q4',
      title: 'Edge AI Integration',
      desc: 'Deploying on-device symptom analysis models. 98.4% local inference accuracy achieved.',
      icon: <Milestone size={24} />,
      status: 'Current',
      color: 'bg-accent shadow-[0_0_30px_rgba(61,220,132,0.4)]'
    },
    {
      year: '2026 Q2',
      title: 'Statewide Expansion',
      desc: 'Scaling to all 8 districts of Tripura. Integration with state-level health dashboard.',
      icon: <Rocket size={24} />,
      status: 'Upcoming',
      color: 'bg-white/5'
    },
    {
      year: '2027 Q1',
      title: 'Regional Synergy',
      desc: 'Scale to Nagaland & Mizoram. Standardizing the NER-Medical-Data-Exchange protocol.',
      icon: <TrendingUp size={24} />,
      status: 'Vision',
      color: 'bg-white/5'
    }
  ];

  return (
    <section id="roadmap" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Sculpture Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[120%] -top-[10%] opacity-20">
        <div className="absolute top-[20%] left-[5%] w-[800px] h-[800px] bg-accent/10 rounded-full blur-[160px] transform rotate-45" />
        <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-accent-light/10 rounded-full blur-[160px] shadow-inner" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-24">
            <div className="font-sans text-[12px] text-accent font-black tracking-[0.4em] uppercase mb-8">
              05 · MISSION ROADMAP
            </div>
            <h2 className="text-6xl md:text-8xl font-sans font-black text-white tracking-tighter leading-none mb-10">
              The Path to<br /><span className="text-white/20">Digital Sovereignty.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative flex flex-col items-center">
          {/* Central Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="w-full space-y-32">
            {steps.map((step, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={`flex items-center gap-10 md:gap-20 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content Card */}
                  <div className={`flex-1 flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <TiltCard className="w-full lg:max-w-md">
                      <div className="group relative w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                        
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-accent font-black text-xl tracking-tighter font-mono">{step.year}</span>
                          <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${step.status === 'Live' || step.status === 'Current' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/5 text-white/30 border border-white/5'}`}>
                            {step.status}
                          </div>
                        </div>
                        
                        <h3 className="text-3xl font-black text-white tracking-tight mb-4">{step.title}</h3>
                        <p className="text-white/40 font-medium leading-relaxed mb-8">
                          {step.desc}
                        </p>

                        <div className="flex items-center gap-2 text-[11px] text-accent font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                           Phase Insight Available <Rocket size={14} />
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* 3D Visual node */}
                  <div className="relative flex items-center justify-center z-10">
                    <motion.div 
                      initial={{ scale: 0.5, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      className={`w-24 h-24 rounded-[32px] ${step.color} border border-white/10 backdrop-blur-3xl flex items-center justify-center text-white relative shadow-2xl transition-all duration-700`}
                    >
                      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                      {step.icon}
                      
                      {/* Sculptural Shadows */}
                      <div className="absolute -inset-4 bg-accent/20 blur-[30px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </motion.div>
                  </div>

                  {/* Invisible spacer to maintain layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
