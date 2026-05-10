import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, PieChart, Info, ArrowUpRight } from 'lucide-react';

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

export const Financials = () => {
  const metrics = [
    { label: 'Gross Margin', value: '78%', growth: '+4%', desc: 'Platform layer high-margin recurring revenue.' },
    { label: 'LTV/CAC', value: '5.2x', growth: '+1.2x', desc: 'Efficient acquisition via direct government nodes.' },
    { label: 'Burn Rate', value: 'Stable', growth: 'Optimized', desc: 'Lean engineering focus with remote-first labs.' }
  ];

  return (
    <section id="financials" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="font-sans text-[11px] text-accent font-black tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <BarChart3 size={14} /> 06 · FINANCIAL ARCHITECTURE
              </div>
              <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter leading-none mb-8">
                Building for<br /><span className="text-white/30">Profit & Impact.</span>
              </h2>
            </Reveal>
          </div>
          
          <Reveal delay={0.2}>
            <div className="bg-accent/5 border border-accent/20 p-8 rounded-[40px] text-center min-w-[240px]">
              <div className="text-[10px] text-accent font-black uppercase tracking-widest mb-2">Projected ARR (Yr 3)</div>
              <div className="text-5xl font-black text-accent tracking-tight">₹42 Cr+</div>
              <div className="text-xs text-white/40 font-bold mt-2 italic shadow-accent/20">Conservative Estimate</div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-20">
          <Reveal className="lg:col-span-2">
            <TiltCard className="h-full">
              <div className="h-full bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[48px] relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-12">
                   <div>
                     <h3 className="text-2xl font-black text-white tracking-tight mb-1">Revenue Stream Split</h3>
                     <p className="text-[14px] text-white/40 font-medium tracking-tight">Year-on-year growth distribution</p>
                   </div>
                   <PieChart className="text-accent" size={24} />
                 </div>

                 <div className="space-y-6">
                   {[
                     { label: 'Government NHM Contracts', percent: 65, color: 'bg-accent' },
                     { label: 'Private Diagnostic Partners', percent: 20, color: 'bg-accent-light' },
                     { label: 'Value Added Analytics', percent: 15, color: 'bg-white/40' }
                   ].map((item, i) => (
                     <div key={i} className="space-y-3">
                       <div className="flex justify-between items-center text-xs">
                         <span className="text-white/60 font-medium">{item.label}</span>
                         <span className="text-accent font-black tracking-widest">{item.percent}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${item.percent}%` }}
                           transition={{ duration: 1, delay: 0.1 * i }}
                           className={`h-full ${item.color}`}
                         />
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </TiltCard>
          </Reveal>

          {metrics.map((m, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <TiltCard className="h-full">
                <div className="h-full bg-white/5 border border-white/10 p-10 rounded-[48px] hover:border-accent/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-6 border border-white/5">
                      <TrendingUp size={20} />
                    </div>
                    <div className="text-[12px] text-white/30 font-bold uppercase tracking-widest mb-2">{m.label}</div>
                    <div className="text-4xl font-black text-white tracking-tighter mb-4">{m.value}</div>
                    <p className="text-white/40 text-xs leading-relaxed font-medium">
                      {m.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-accent font-black uppercase tracking-widest">{m.growth}</span>
                    <ArrowUpRight size={14} className="text-white/20" />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <Info size={24} />
            </div>
            <p className="text-[13px] text-white/40 font-medium leading-relaxed">
              <span className="text-white font-bold">Scaling Strategy:</span> Our model relies on minimal customer acquisition costs (CAC) by partnering directly with state nodal agencies, allowing us to focus capital on product engineering and field deployment.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
