import React, { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lightbulb,
  Award, 
  Users, 
  Target, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tutorials = [
  {
    id: 1,
    title: 'Digital Symptom Mapping (Bengali/Kokborok)',
    duration: '15:00',
    description: 'Master the art of digital history taking. This module teaches ASHAs how to navigate the multi-lingual interface to record complex respiratory and systemic symptoms using both structured forms and AI-powered voice-to-text in local dialects.',
    steps: [
      'Navigate the bilingual interface (Bengali & Kokborok)',
      'Utilize AI Voice-to-Text for hands-free symptom recording',
      'Identify "Red Flag" symptoms requiring immediate escalation',
      'Record duration and severity of cough, fever, and weight loss',
      'Validate patient identity using biometric or OTP-based verification'
    ]
  },
  {
    id: 2,
    title: 'AI Risk Stratification & Referral Logic',
    duration: '25:00',
    description: 'Deep dive into the "Brain" of MedTech Tripura. Learn how the local AI model processes symptoms to generate a risk score (Low, Medium, High) and the specific government protocols for each referral category.',
    steps: [
      'Understand the 1-100 AI Risk Indexing system',
      'Interpret color-coded urgency indicators (Green, Yellow, Red)',
      'Execute the NTEP (TB) and NCVBDC (Malaria) referral workflows',
      'Communicate risk scores to patients without causing panic',
      'Map the nearest functional PHC/CHC for immediate referral'
    ]
  },
  {
    id: 3,
    title: 'Offline Data Integrity & Cloud Sync',
    duration: '12:00',
    description: 'Critical for Tripura\'s hilly terrain. This module ensures no data is lost in "Shadow Zones." Learn how the CRDT-based offline engine stores records locally and manages automatic background synchronization.',
    steps: [
      'Monitor the "Sync Status" dashboard for pending records',
      'Troubleshoot local storage alerts on low-end Android devices',
      'Perform manual sync triggers when entering 4G/5G zones',
      'Understand end-to-end encryption (E2EE) for patient privacy',
      'Manage battery optimization settings for long field days'
    ]
  }
];

const faqs = [
  {
    question: 'How is the training performance tracked?',
    answer: 'Every ASHA worker has a unique profile. Completion of modules, quiz scores, and field-screening accuracy are tracked in the Supervisor Dashboard (MO-IC level) to identify workers needing additional support.'
  },
  {
    question: 'Are these modules available in offline mode?',
    answer: 'Yes. Once downloaded, the training videos and interactive simulations are available completely offline, allowing ASHAs to refresh their knowledge even in remote villages.'
  },
  {
    question: 'What is the certification process?',
    answer: 'Upon completing all 12 core modules and passing the final competency assessment with >80%, ASHAs receive a digital certificate recognized by the State Health Society, Tripura.'
  },
  {
    question: 'Can supervisors assign specific modules?',
    answer: 'Yes. If a supervisor notices a high rate of "Incomplete Screenings" in a specific area, they can push targeted "Refresher Modules" to the ASHAs in that sub-center.'
  }
];

export const AshaTrainingModule = () => {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'faqs'>('tutorials');
  const [activeTutorial, setActiveTutorial] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const selectedModule = tutorials.find(t => t.id === selectedModuleId);

  return (
    <div className="mt-12 border-t border-border pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <GraduationCap size={20} />
          </div>
          <div>
            <h4 className="text-xl font-serif font-bold text-text">ASHA Training & Capacity Building</h4>
            <p className="text-xs text-muted font-mono uppercase tracking-widest mt-1">Empowering Frontline Workers</p>
          </div>
        </div>

        {/* Tab Switcher */}
        {!selectedModuleId && (
          <div className="flex bg-surface border border-border p-1 rounded-sm">
            <button 
              onClick={() => setActiveTab('tutorials')}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'tutorials' ? 'bg-accent text-bg shadow-lg' : 'text-muted hover:text-text'}`}
            >
              <PlayCircle size={14} />
              Tutorials
            </button>
            <button 
              onClick={() => setActiveTab('faqs')}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'faqs' ? 'bg-accent text-bg shadow-lg' : 'text-muted hover:text-text'}`}
            >
              <HelpCircle size={14} />
              FAQs
            </button>
          </div>
        )}
      </div>

      <div className="min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {selectedModule ? (
            <motion.div 
              key="module-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card border border-border p-8 rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              
              <button 
                onClick={() => setSelectedModuleId(null)}
                className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-widest mb-8 hover:gap-3 transition-all group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                Back to Modules
              </button>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-sm bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h4 className="text-3xl font-serif font-bold text-text mb-1">{selectedModule.title}</h4>
                  <div className="flex items-center gap-4 text-[10px] text-muted font-mono uppercase tracking-widest">
                    <span>{selectedModule.duration} MINS</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-accent">Core Certification Module</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <h5 className="text-[10px] font-bold text-text uppercase tracking-widest mb-4 border-b border-border pb-2">Module Description</h5>
                  <p className="text-sm text-muted leading-relaxed mb-8">
                    {selectedModule.description}
                  </p>

                  <h5 className="text-[10px] font-bold text-text uppercase tracking-widest mb-4 border-b border-border pb-2">Learning Objectives</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedModule.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-surface border border-border/50 rounded-xs">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                          <CheckCircle2 size={12} />
                        </div>
                        <span className="text-[11px] text-text leading-tight">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-surface p-6 border border-border rounded-sm">
                    <h5 className="text-[10px] font-bold text-text uppercase tracking-widest mb-6">Prerequisites</h5>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>Basic Android Navigation</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>Bengali/Kokborok Proficiency</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>Completed Module 0: Intro</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-8 bg-accent text-bg font-bold text-xs py-4 rounded-sm uppercase tracking-widest hover:bg-accent-light transition-all shadow-xl shadow-accent/20">
                      Launch Session
                    </button>
                  </div>

                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex items-start gap-3">
                    <Lightbulb size={16} className="text-accent shrink-0 mt-1" />
                    <p className="text-[10px] text-muted leading-relaxed italic">
                      "Pro Tip: Use headphones during the voice-to-text session for better accuracy in noisy field environments."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'tutorials' ? (
            <motion.div 
              key="tutorials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Progress Indicator */}
              <div className="bg-surface border border-border p-6 rounded-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-bold text-text uppercase tracking-widest">Your Training Progress</div>
                    <div className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full">
                      Level 1: Novice
                    </div>
                  </div>
                  <div className="text-[10px] text-muted font-mono uppercase tracking-widest">
                    4 of 12 Modules Completed · <span className="text-accent font-bold">33%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '33.33%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-accent relative"
                  >
                    <div className="absolute top-0 right-0 w-4 h-full bg-white/20 skew-x-[-20deg] animate-pulse" />
                  </motion.div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-[10px] text-muted italic">Complete 2 more modules to unlock "Field Agent" status.</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                    {[5, 6, 7, 8, 9, 10, 11, 12].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-border" />)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <div 
                    key={tutorial.id}
                    className={`bg-card border transition-all cursor-pointer relative overflow-hidden flex flex-col h-full ${activeTutorial === tutorial.id ? 'border-accent ring-1 ring-accent/20' : 'border-border hover:border-accent/30'}`}
                    onClick={() => setActiveTutorial(activeTutorial === tutorial.id ? null : tutorial.id)}
                  >
                    <div className="p-5 flex flex-col h-full relative z-10 bg-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-sm bg-accent/5 flex items-center justify-center text-accent">
                          <BookOpen size={18} />
                        </div>
                        <div className="text-[10px] text-muted font-mono bg-bg px-2 py-1 border border-border/10">{tutorial.duration} MINS</div>
                      </div>
                      
                      <h5 className="text-sm font-bold text-text mb-2">{tutorial.title}</h5>
                      <p className="text-[11px] text-muted leading-relaxed mb-6 flex-grow">{tutorial.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {tutorial.steps.slice(0, 3).map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-[9px] text-text/80">
                            <CheckCircle2 size={10} className="text-accent/50" />
                            {step}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModuleId(tutorial.id);
                        }}
                        className="w-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] py-2.5 rounded-sm uppercase tracking-widest hover:bg-accent hover:text-bg transition-all"
                      >
                        Start Module
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:col-span-3 mt-4 p-4 bg-accent/5 border border-accent/20 rounded-sm flex items-center gap-4">
                <Lightbulb size={18} className="text-accent shrink-0" />
                <p className="text-[11px] text-muted leading-relaxed italic">
                  "ASHA workers who complete all 12 modules show a 40% higher accuracy in identifying high-risk TB suspects during field visits."
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="faqs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto space-y-3"
            >
              {faqs.map((faq, i) => (
                <div 
                  key={i}
                  className="bg-card border border-border rounded-sm overflow-hidden"
                >
                  <button 
                    className="w-full p-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-medium text-text pr-6">{faq.question}</span>
                    {openFaq === i ? <ChevronUp size={16} className="text-accent" /> : <ChevronDown size={16} className="text-muted" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-muted leading-relaxed border-t border-border/30 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border/30 pt-12">
        <div>
          <h5 className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-6">Training Methodology</h5>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <PlayCircle size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-text">Scenario-Based Learning</div>
                <p className="text-xs text-muted mt-1">ASHAs are presented with real-world patient scenarios from rural Tripura, requiring them to make screening decisions in a simulated environment before field deployment.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Award size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-text">Gamified Assessments</div>
                <p className="text-xs text-muted mt-1">Modules include interactive quizzes and "badge" rewards to maintain high engagement levels among frontline workers with varying digital literacy.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 border border-border rounded-sm">
          <h5 className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-4">Capacity Building Impact</h5>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-muted uppercase tracking-widest">Digital Literacy Gain</span>
              <span className="text-sm font-bold text-accent">+65%</span>
            </div>
            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-accent" />
            </div>
            
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-muted uppercase tracking-widest">Screening Accuracy</span>
              <span className="text-sm font-bold text-accent">94.2%</span>
            </div>
            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
              <div className="w-[94%] h-full bg-accent" />
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[10px] text-muted uppercase tracking-widest">Avg. Completion Time</span>
              <span className="text-sm font-bold text-accent">14 Days</span>
            </div>
            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-surface border border-border rounded-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <MessageSquare size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-text">Need Support?</div>
            <div className="text-xs text-muted">Dedicated ASHA Helpdesk for Tripura</div>
          </div>
        </div>
        <div className="flex gap-4">
          <a href="tel:9862510477" className="bg-accent text-bg font-bold text-[10px] px-6 py-3 rounded-sm uppercase tracking-widest hover:bg-accent-light transition-colors">
            Call Helpdesk
          </a>
          <button className="bg-transparent border border-border text-text font-bold text-[10px] px-6 py-3 rounded-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-colors">
            WhatsApp Support
          </button>
        </div>
      </div>
    </div>
  );
};
