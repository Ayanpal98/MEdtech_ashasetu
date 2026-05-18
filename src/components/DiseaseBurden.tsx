import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Activity, Users, Skull, ArrowUpRight } from 'lucide-react';

const Reveal: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
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

export const DiseaseBurden = () => {
  const diseases = [
    {
      name: 'Malaria',
      stat: 'High Endemicity',
      sub: 'Dhalai & South Tripura',
      description: 'Tripura consistently reports some of the highest malaria cases in the Northeast. Remote forest areas lack quick diagnostic turnaround.',
      icon: <Activity className="text-red-500" size={24} />,
      urgency: 92,
      trend: '+12% and. growth'
    },
    {
      name: 'Tuberculosis',
      stat: '2,800+',
      sub: 'New Cases Annually',
      description: 'Diagnostic delay of 15-20 days due to sample transport issues from hills to district labs. Missing the "Golden Window" of treatment.',
      icon: <Skull className="text-white/60" size={24} />,
      urgency: 85,
      trend: 'Stagnant recovery'
    },
    {
      name: 'High-Risk Pregnancy',
      stat: '18.4%',
      sub: 'Detection Gap',
      description: 'Late detection of gestational hypertension and anemia leads to high maternal/infant mortality in Khowai and Gomati districts.',
      icon: <Users className="text-accent" size={24} />,
      urgency: 95,
      trend: 'Critical priority'
    }
  ];

  return (
    <section id="diseases" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="font-sans text-[11px] text-accent font-black tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <AlertTriangle size={14} /> 05 · DISEASE BURDEN
              </div>
              <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter leading-none mb-8">
                The Cost of<br /><span className="text-white/30">Delayed Data.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed">
                In Tripura's deep terrain, a 1-week delay in screening isn't just a logistic failure — it's a medical catastrophe. We visualize the burden that ASHASETU targets.
              </p>
            </Reveal>
          </div>
          
          <Reveal delay={0.2}>
            <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-xl">
              <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Total Impact Population</div>
              <div className="text-4xl font-black text-white tracking-tight">4.1M+</div>
              <div className="text-xs text-accent font-bold mt-1">Lives across 8 districts</div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diseases.map((d, i) => (
            <Reveal key={i} delay={0.1 * i} className="h-full">
              <TiltCard className="h-full">
                <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[48px] hover:bg-white/10 transition-all duration-700 h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    {d.icon}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                      {d.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-1">{d.name}</h3>
                      <div className="text-[11px] text-accent font-bold uppercase tracking-widest">{d.trend}</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-4xl font-black text-white tracking-tighter mb-1">{d.stat}</div>
                    <div className="text-xs text-white/40 font-medium uppercase tracking-wider">{d.sub}</div>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed mb-10 flex-1">
                    {d.description}
                  </p>

                  <div className="pt-8 border-t border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Invention Urgency</span>
                      <span className="text-[10px] text-accent font-black">{d.urgency}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${d.urgency}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-accent shadow-[0_0_15px_rgba(61,220,132,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-20 group bg-white/5 border border-white/10 p-10 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-8 hover:border-accent/40 transition-all cursor-pointer">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-accent text-bg flex items-center justify-center shadow-2xl">
                <Activity size={40} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white tracking-tight mb-1">State Health Analytics 2026</h4>
                <p className="text-white/40 font-medium">Download the complete Tripura Disease Burden Landscape research paper.</p>
              </div>
            </div>
            <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              Request Full Report <ArrowUpRight size={20} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
