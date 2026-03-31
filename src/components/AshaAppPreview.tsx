import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  RefreshCw, 
  User, 
  Users,
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  WifiOff,
  Menu,
  Bell,
  ArrowLeft,
  Camera,
  Mic,
  Save,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AshaAppPreview = () => {
  const [screen, setScreen] = useState('home');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast('Data Synced Successfully');
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-[280px] mx-auto aspect-[9/19] bg-[#0a0a0a] rounded-[32px] border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden group select-none">
      {/* Speaker/Camera Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a1a] rounded-b-xl z-30 flex items-center justify-center">
        <div className="w-8 h-1 bg-[#222] rounded-full" />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-accent/10 px-4 flex justify-between items-center text-[8px] font-mono text-accent/80 pt-1 z-20">
        <span>10:42 AM</span>
        <div className="flex items-center gap-1">
          <WifiOff size={8} />
          <span>OFFLINE</span>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-0 left-4 right-4 z-50 bg-accent text-bg text-[10px] font-bold py-2 px-3 rounded-sm shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 size={12} />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Header */}
      <div className="bg-accent p-4 flex justify-between items-center z-20 relative">
        <div className="flex items-center gap-2">
          {screen === 'home' ? (
            <Menu size={16} className="text-bg cursor-pointer" />
          ) : (
            <ArrowLeft size={16} className="text-bg cursor-pointer" onClick={() => setScreen('home')} />
          )}
          <span className="font-serif font-bold text-bg text-sm">
            {screen === 'home' ? 'MedTech Tripura' : screen === 'new' ? 'নতুন রোগী' : 'স্ক্রিনিং'}
          </span>
        </div>
        <div className="relative cursor-pointer">
          <Bell size={16} className="text-bg" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-accent" />
        </div>
      </div>

      {/* App Content */}
      <div className="p-3 overflow-y-auto h-[calc(100%-100px)] custom-scrollbar relative z-10">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              {/* Welcome Section */}
              <div className="mb-4">
                <div className="text-[10px] text-muted uppercase tracking-widest mb-1">স্বাগতম (Welcome)</div>
                <div className="text-text font-serif font-bold">ASHA: Anjali Debbarma</div>
                <div className="text-[9px] text-accent font-mono mt-1">Block: Majlishpur · Sector 2</div>
              </div>

              {/* Sync Banner */}
              <div className="bg-accent/5 border border-accent/20 p-2 rounded-sm mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw size={12} className={`text-accent ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="text-[9px] text-text font-medium">
                    {isSyncing ? 'সিঙ্ক হচ্ছে...' : '৩টি রেকর্ড বাকি (3 Pending)'}
                  </span>
                </div>
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="text-[8px] bg-accent text-bg px-2 py-0.5 rounded-xs font-bold uppercase disabled:opacity-50"
                >
                  {isSyncing ? '...' : 'Sync'}
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted" size={12} />
                <input 
                  type="text" 
                  placeholder="রোগী খুঁজুন (Search Patient)" 
                  className="w-full bg-[#151515] border border-border rounded-sm py-1.5 pl-8 pr-2 text-[10px] text-text outline-none focus:border-accent/50"
                  readOnly
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button 
                  onClick={() => setScreen('new')}
                  className="bg-accent/10 border border-accent/20 p-3 rounded-sm flex flex-col items-center gap-2 hover:bg-accent/20 transition-colors active:scale-95"
                >
                  <Plus size={16} className="text-accent" />
                  <span className="text-[9px] font-bold text-text text-center leading-tight">নতুন রোগী<br/>(New Patient)</span>
                </button>
                <button 
                  onClick={() => setScreen('screening')}
                  className="bg-accent/10 border border-accent/20 p-3 rounded-sm flex flex-col items-center gap-2 hover:bg-accent/20 transition-colors active:scale-95"
                >
                  <Activity size={16} className="text-accent" />
                  <span className="text-[9px] font-bold text-text text-center leading-tight">স্ক্রিনিং<br/>(Screening)</span>
                </button>
              </div>

              {/* Recent Referrals */}
              <div className="mb-4">
                <div className="text-[9px] text-muted uppercase tracking-widest mb-2 flex justify-between">
                  <span>সাম্প্রতিক রেফারেল (Recent)</span>
                  <span className="text-accent cursor-pointer">View All</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'S. Reang', type: 'TB Suspect', status: 'High Risk', color: 'text-red-500' },
                    { name: 'M. Chakma', type: 'ANC Visit 3', status: 'Normal', color: 'text-accent' },
                    { name: 'B. Das', type: 'Malaria', status: 'Follow-up', color: 'text-yellow-500' }
                  ].map((patient, i) => (
                    <div key={i} className="bg-[#151515] border border-border p-2 rounded-sm flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-[10px] text-accent font-bold">
                          {patient.name[0]}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-text">{patient.name}</div>
                          <div className="text-[8px] text-muted">{patient.type}</div>
                        </div>
                      </div>
                      <div className={`text-[8px] font-bold uppercase ${patient.color}`}>
                        {patient.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Tips / Alerts */}
              <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-sm">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={10} className="text-red-500" />
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider">Alert: Malaria Spike</span>
                </div>
                <p className="text-[8px] text-muted leading-tight">আপনার এলাকায় ম্যালেরিয়া বাড়ছে। মশারি ব্যবহার নিশ্চিত করুন। (Increase in cases in your sector.)</p>
              </div>
            </motion.div>
          )}

          {screen === 'new' && (
            <motion.div
              key="new"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[10px] text-muted uppercase tracking-widest">Patient Registration</div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-muted uppercase">Full Name (নাম)</label>
                  <input type="text" className="w-full bg-[#151515] border border-border rounded-sm p-2 text-[10px] text-text" placeholder="Enter name" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-muted uppercase">Aadhar Number</label>
                  <input type="text" className="w-full bg-[#151515] border border-border rounded-sm p-2 text-[10px] text-text" placeholder="XXXX XXXX XXXX" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[8px] text-muted uppercase">Age</label>
                    <input type="number" className="w-full bg-[#151515] border border-border rounded-sm p-2 text-[10px] text-text" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-muted uppercase">Gender</label>
                    <select className="w-full bg-[#151515] border border-border rounded-sm p-2 text-[10px] text-text">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 border border-dashed border-accent/30 p-4 rounded-sm flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/10 transition-colors">
                <Camera size={20} className="text-accent" />
                <span className="text-[9px] text-accent font-bold uppercase">Take Photo</span>
              </div>

              <button 
                onClick={() => {
                  triggerToast('Patient Registered Offline');
                  setScreen('home');
                }}
                className="w-full bg-accent text-bg font-bold py-3 rounded-sm text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Save size={14} /> SAVE RECORD
              </button>
            </motion.div>
          )}

          {screen === 'screening' && (
            <motion.div
              key="screening"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[10px] text-muted uppercase tracking-widest">TB/Malaria Screening</div>
              
              <div className="bg-[#151515] border border-border p-3 rounded-sm">
                <p className="text-[10px] text-text mb-3">Does the patient have a persistent cough (&gt;2 weeks)?</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-accent/10 border border-accent/20 py-2 rounded-sm text-[10px] font-bold text-accent">YES</button>
                  <button className="flex-1 bg-white/5 border border-border py-2 rounded-sm text-[10px] font-bold text-muted">NO</button>
                </div>
              </div>

              <div className="bg-[#151515] border border-border p-3 rounded-sm">
                <p className="text-[10px] text-text mb-3">Is there a history of high fever with chills?</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-accent/10 border border-accent/20 py-2 rounded-sm text-[10px] font-bold text-accent">YES</button>
                  <button className="flex-1 bg-white/5 border border-border py-2 rounded-sm text-[10px] font-bold text-muted">NO</button>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/20 p-3 rounded-sm flex items-center gap-3 cursor-pointer hover:bg-accent/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-bg">
                  <Mic size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-text uppercase">Voice Input</div>
                  <div className="text-[8px] text-muted">Bengali / Kokborok supported</div>
                </div>
              </div>

              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={12} className="text-red-500" />
                  <span className="text-[9px] font-bold text-red-500 uppercase">AI Risk Score: 84%</span>
                </div>
                <p className="text-[8px] text-muted">High probability of TB. Priority referral recommended to AGMC.</p>
              </div>

              <button 
                onClick={() => {
                  triggerToast('Referral Generated');
                  setScreen('home');
                }}
                className="w-full bg-accent text-bg font-bold py-3 rounded-sm text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                GENERATE REFERRAL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#151515] border-t border-border flex justify-around items-center px-4 z-20">
        <div 
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${screen === 'home' ? 'text-accent' : 'text-muted'}`}
        >
          <Activity size={16} />
          <span className="text-[7px] uppercase font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-muted cursor-pointer">
          <Users size={16} />
          <span className="text-[7px] uppercase font-bold">Patients</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-muted cursor-pointer">
          <Bell size={16} />
          <span className="text-[7px] uppercase font-bold">Alerts</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-muted cursor-pointer">
          <User size={16} />
          <span className="text-[7px] uppercase font-bold">Profile</span>
        </div>
      </div>

      {/* Android Home Bar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/20 rounded-full z-20" />
    </div>
  );
};
