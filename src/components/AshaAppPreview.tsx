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
  X,
  Phone,
  MapPin,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AshaAppPreview = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  const [screen, setScreen] = useState('home');
  const [language, setLanguage] = useState<'bn' | 'kb' | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [pendingRecords, setPendingRecords] = useState(3);
  const [isOffline, setIsOffline] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptoms, setSymptoms] = useState<{ cough: boolean | null, fever: boolean | null }>({
    cough: null,
    fever: null
  });

  const translations = {
    bn: {
      appName: 'আশা সেতু',
      home: 'হোম',
      patients: 'রোগী',
      alerts: 'সতর্কবার্তা',
      people: 'সহকর্মী',
      welcome: 'স্বাগতম',
      ashaName: 'আশা: অঞ্জলি দেববর্মা',
      sector: 'ব্লক: মজলিশপুর · সেক্টর ২',
      syncing: 'সিঙ্ক হচ্ছে...',
      pending: (n: number) => `${n}টি রেকর্ড বাকি`,
      localStorage: 'লোকাল স্টোরেজ',
      edgeAI: 'এজ এআই',
      recordsUnit: 'রেকর্ড',
      modelsLoaded: 'মডেল লোড হয়েছে',
      searchPlaceholder: 'রোগী খুঁজুন',
      newPatient: 'নতুন রোগী',
      screening: 'স্ক্রিনিং',
      recentReferrals: 'সাম্প্রতিক রেফারেল',
      viewAll: 'সব দেখুন',
      healthAlert: 'সতর্কতা: ম্যালেরিয়া বেড়েছে',
      malariaWarning: 'মশারি ব্যবহার নিশ্চিত করুন।',
      patientRegistration: 'রোগী নিবন্ধন',
      fullName: 'পুরো নাম',
      aadhar: 'আধার নম্বর',
      age: 'বয়স',
      gender: 'লিঙ্গ',
      male: 'পুরুষ',
      female: 'মহিলা',
      saveRecord: 'রেকর্ড সংরক্ষণ করুন',
      screeningTitle: 'টিবি/ম্যালেরিয়া স্ক্রিনিং',
      coughQuestion: 'রোগীর কি দীর্ঘস্থায়ী কাশি রয়েছে (>২ সপ্তাহ)?',
      feverQuestion: 'কাঁপুনি সহ জ্বরের ইতিহাস আছে কি?',
      yes: 'হ্যাঁ',
      no: 'না',
      voiceInput: 'ভয়েস ইনপুট',
      riskScore: 'এআই ঝুঁকি স্কোর',
      generateReferral: 'রেফারেল তৈরি করুন',
      savedToLocal: 'রেকর্ড লোকাল স্টোরেজে সংরক্ষিত হয়েছে',
      syncedToCloud: 'সব রেকর্ড এনএইচএম ক্লাউডে সিঙ্ক হয়েছে',
      noRecords: 'সিঙ্ক করার কোনো রেকর্ড নেই'
    },
    kb: {
      appName: 'ASHASETU',
      home: 'Home',
      patients: 'Rogi',
      alerts: 'Saitwima',
      people: 'Baksa-rog',
      welcome: 'Khumulwng',
      ashaName: 'ASHA: Anjali Debbarma',
      sector: 'Block: Majlishpur · Sector 2',
      syncing: 'Sync wungtong...',
      pending: (n: number) => `${n}thok baki tong`,
      localStorage: 'Local Storage',
      edgeAI: 'Edge AI',
      recordsUnit: 'Records',
      modelsLoaded: 'Model-rog hapbai',
      searchPlaceholder: 'Rogi thwiui',
      newPatient: 'Rogi Kwtal',
      screening: 'Screening',
      recentReferrals: 'Recent Referrals',
      viewAll: 'Bukcha nukhry di',
      healthAlert: 'Malaria Spike',
      malariaWarning: 'Mosari kwm di.',
      patientRegistration: 'Rogi Registration',
      fullName: 'Mung Gwnang',
      aadhar: 'Aadhar Number',
      age: 'Bisi',
      gender: 'Gender',
      male: 'Chwla',
      female: 'Bwkhwi',
      saveRecord: 'Save Record',
      screeningTitle: 'TB/Malaria Screening',
      coughQuestion: 'Saksal tong kha? (>2 weeks)',
      feverQuestion: 'Bwswm tong kha?',
      yes: 'Ang',
      no: 'Maya',
      voiceInput: 'Voice Input',
      riskScore: 'AI Risk Score',
      generateReferral: 'Referral Khunai',
      savedToLocal: 'Record save wungbai local storage-o',
      syncedToCloud: 'NHM Cloud-o sync wungbai',
      noRecords: 'Sync khunai baki kwrwi'
    }
  };

  const t = language ? translations[language ] : translations.bn;

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSync = () => {
    if (pendingRecords === 0) {
      triggerToast(t.noRecords);
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingRecords(0);
      triggerToast(t.syncedToCloud);
    }, 2000);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      triggerToast('AI Analysis Complete');
    }, 2500);
  };

  const calculateRisk = () => {
    let score = 0;
    if (symptoms.cough) score += 42;
    if (symptoms.fever) score += 42;
    return score;
  };

  const getHeaderTitle = () => {
    switch(screen) {
      case 'home': return t.appName;
      case 'new': return t.newPatient;
      case 'screening': return t.screening;
      case 'patients': return t.patientList || t.patients;
      case 'alerts': return t.alerts;
      case 'people': return t.people;
      default: return t.appName;
    }
  };

  return (
    <div className={`relative bg-[#0a0a0a] overflow-hidden group select-none transition-all duration-500 ${
      fullScreen 
        ? 'w-full h-full' 
        : 'w-full max-w-[280px] mx-auto aspect-[9/19] rounded-[32px] border-[6px] border-[#1a1a1a] shadow-2xl'
    }`}>
      {/* Speaker/Camera Notch - Only in phone mode */}
      {!fullScreen && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a1a] rounded-b-xl z-30 flex items-center justify-center">
          <div className="w-8 h-1 bg-[#222] rounded-full" />
        </div>
      )}

      {/* Status Bar */}
      <div className={`bg-accent/10 flex justify-between items-center font-mono text-accent/80 z-20 ${
        fullScreen ? 'h-8 px-6 text-[10px]' : 'h-6 px-4 text-[8px] pt-1'
      }`}>
        <span>10:42 AM</span>
        <div className="flex items-center gap-1">
          <WifiOff size={fullScreen ? 12 : 8} />
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
      <div className={`bg-accent flex justify-between items-center z-20 relative ${fullScreen ? 'p-6' : 'p-4'}`}>
        <div className="flex items-center gap-3">
          {screen === 'home' ? (
            <Menu size={fullScreen ? 24 : 16} className="text-bg cursor-pointer" />
          ) : (
            <ArrowLeft size={fullScreen ? 24 : 16} className="text-bg cursor-pointer" onClick={() => setScreen('home')} />
          )}
          <span className={`font-serif font-bold text-bg ${fullScreen ? 'text-xl' : 'text-sm'}`}>
            {getHeaderTitle()}
          </span>
        </div>
        <div className="relative cursor-pointer" onClick={() => setScreen('alerts')}>
          <Bell size={fullScreen ? 24 : 16} className="text-bg" />
          <div className={`absolute -top-1 -right-1 bg-red-500 rounded-full border-2 border-accent ${fullScreen ? 'w-3 h-3' : 'w-2 h-2'}`} />
        </div>
      </div>

      {/* App Content */}
      <div className={`overflow-y-auto custom-scrollbar relative z-10 ${
        fullScreen ? 'p-10 h-[calc(100%-144px)]' : 'p-3 h-[calc(100%-100px)]'
      }`}>
        <AnimatePresence mode="wait">
          {!language && (
            <motion.div
              key="lang-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-6">
                <Activity size={24} className="text-bg" />
              </div>
              <h2 className="text-xl font-serif font-bold text-text mb-2">ASHASETU</h2>
              <p className="text-[10px] text-muted uppercase tracking-widest mb-8">Select Language / ভাষা চয়ন করুন</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={() => setLanguage('bn')}
                  className="w-full bg-accent/10 border border-accent/20 py-4 rounded-sm text-accent font-bold hover:bg-accent hover:text-bg transition-all"
                >
                  বাংলা (BENGALI)
                </button>
                <button 
                  onClick={() => setLanguage('kb')}
                  className="w-full bg-accent/10 border border-accent/20 py-4 rounded-sm text-accent font-bold hover:bg-accent hover:text-bg transition-all"
                >
                  KOKBOROK
                </button>
              </div>
              
              <div className="mt-12 text-[7px] text-muted uppercase font-mono tracking-tighter">
                Frontline Health Infrastructure · Tripura
              </div>
            </motion.div>
          )}

          {screen === 'home' && language && (
            <motion.div
              key="home"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              {/* Welcome Section */}
              <div className="mb-8">
                <div className={`${fullScreen ? 'text-sm' : 'text-[10px]'} text-muted uppercase tracking-widest mb-2`}>{t.welcome}</div>
                <div className={`${fullScreen ? 'text-4xl' : 'text-text'} font-serif font-bold`}>{t.ashaName}</div>
                <div className={`${fullScreen ? 'text-base' : 'text-[9px]'} text-accent font-mono mt-2`}>{t.sector}</div>
              </div>

              {/* Sync Banner */}
              <div className="bg-accent/5 border border-accent/20 p-2 rounded-sm mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw size={12} className={`text-accent ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="text-[9px] text-text font-medium">
                    {isSyncing ? t.syncing : t.pending(pendingRecords)}
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

              {/* Local Storage & AI Status */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white/5 border border-border/50 p-2 rounded-sm">
                  <div className="text-[7px] text-muted uppercase tracking-wider">{t.localStorage}</div>
                  <div className="text-[9px] font-bold text-accent">{`142 ${t.recordsUnit}`} (SQLite)</div>
                </div>
                <div className="bg-white/5 border border-border/50 p-2 rounded-sm">
                  <div className="text-[7px] text-muted uppercase tracking-wider">{t.edgeAI}</div>
                  <div className="text-[9px] font-bold text-accent">{t.modelsLoaded}</div>
                </div>
              </div>

              {/* Offline Map Indicator */}
              <div className="flex items-center gap-2 mb-4 bg-white/5 p-2 rounded-sm border border-border/50">
                <MapPin size={12} className="text-accent" />
                <div className="flex-1">
                  <div className="text-[8px] font-bold text-text uppercase">Offline Map: Majlishpur</div>
                  <div className="text-[7px] text-muted">Sector 2 cache active (12.4 MB)</div>
                </div>
                <div className="text-[6px] bg-accent/20 text-accent px-1 rounded-xs font-bold">CACHED</div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted" size={12} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  className="w-full bg-[#151515] border border-border rounded-sm py-1.5 pl-8 pr-2 text-[10px] text-text outline-none focus:border-accent/50"
                  readOnly
                  onClick={() => setScreen('patients')}
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button 
                  onClick={() => setScreen('new')}
                  className="bg-accent/10 border border-accent/20 p-3 rounded-sm flex flex-col items-center gap-2 hover:bg-accent/20 transition-colors active:scale-95"
                >
                  <Plus size={16} className="text-accent" />
                  <span className="text-[9px] font-bold text-text text-center leading-tight">{t.newPatient}</span>
                </button>
                <button 
                  onClick={() => setScreen('screening')}
                  className="bg-accent/10 border border-accent/20 p-3 rounded-sm flex flex-col items-center gap-2 hover:bg-accent/20 transition-colors active:scale-95"
                >
                  <Activity size={16} className="text-accent" />
                  <span className="text-[9px] font-bold text-text text-center leading-tight">{t.screening}</span>
                </button>
              </div>

              {/* Recent Referrals */}
              <div className="mb-4">
                <div className="text-[9px] text-muted uppercase tracking-widest mb-2 flex justify-between">
                  <span>{t.recentReferrals}</span>
                  <span className="text-accent cursor-pointer">{t.viewAll}</span>
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
              <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-sm cursor-pointer" onClick={() => setScreen('alerts')}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={10} className="text-red-500" />
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider">{t.healthAlert}</span>
                </div>
                <p className="text-[8px] text-muted leading-tight">{t.malariaWarning}</p>
              </div>
            </motion.div>
          )}

          {screen === 'patients' && language && (
            <motion.div
              key="patients"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-muted uppercase tracking-widest">{t.patients}</div>
                <div className="text-[8px] text-accent font-bold">Total: 142</div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted" size={10} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  className="w-full bg-[#151515] border border-border rounded-sm py-1 pl-7 pr-2 text-[9px] text-text outline-none"
                />
              </div>

              <div className="space-y-2">
                {[
                  { name: 'S. Reang', id: 'TR-0921', risk: 'High' },
                  { name: 'M. Chakma', id: 'TR-0842', risk: 'Low' },
                  { name: 'B. Das', id: 'TR-1102', risk: 'Medium' },
                  { name: 'R. Debbarma', id: 'TR-0731', risk: 'Low' },
                  { name: 'P. Jamatia', id: 'TR-1254', risk: 'Medium' },
                  { name: 'K. Tripura', id: 'TR-0998', risk: 'High' },
                ].map((p, i) => (
                  <div key={i} className="bg-[#151515] border border-border p-2 rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent/5 flex items-center justify-center text-[9px] text-accent font-bold border border-accent/10">
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-text">{p.name}</div>
                        <div className="text-[7px] text-muted">ID: {p.id}</div>
                      </div>
                    </div>
                    <div className={`text-[7px] font-bold px-1.5 py-0.5 rounded-xs ${p.risk === 'High' ? 'bg-red-500/10 text-red-500' : p.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-accent/10 text-accent'}`}>
                      {p.risk}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'alerts' && language && (
            <motion.div
              key="alerts"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[10px] text-muted uppercase tracking-widest">{t.alerts}</div>
              
              <div className="space-y-3">
                <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="text-[10px] font-bold text-red-500 uppercase">Malaria Outbreak</span>
                  </div>
                  <p className="text-[9px] text-muted mb-2">High incidence reported in Majlishpur Sector 2. Immediate screening of all fever cases required.</p>
                  <div className="text-[7px] text-muted font-mono uppercase">2 Hours Ago</div>
                </div>

                <div className="bg-accent/5 border border-accent/20 p-3 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell size={14} className="text-accent" />
                    <span className="text-[10px] font-bold text-accent uppercase">Vaccination Drive</span>
                  </div>
                  <p className="text-[9px] text-muted mb-2">Pulse Polio drive scheduled for next Sunday. Please update your target list.</p>
                  <div className="text-[7px] text-muted font-mono uppercase">Yesterday</div>
                </div>

                <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw size={14} className="text-yellow-500" />
                    <span className="text-[10px] font-bold text-yellow-500 uppercase">System Update</span>
                  </div>
                  <p className="text-[9px] text-muted mb-2">New TB screening protocols added. Please sync your device to update the AI model.</p>
                  <div className="text-[7px] text-muted font-mono uppercase">2 Days Ago</div>
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'people' && language && (
            <motion.div
              key="people"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[10px] text-muted uppercase tracking-widest">{t.people}</div>
              
              <div className="space-y-3">
                {/* Language Selection Action */}
                <div className="bg-[#151515] border border-border p-3 rounded-sm mb-4">
                  <div className="text-[8px] text-muted uppercase mb-3 tracking-widest">Language / ভাষা</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setLanguage('bn')}
                      className={`flex-1 py-1.5 rounded-xs text-[9px] font-bold transition-all ${language === 'bn' ? 'bg-accent text-bg shadow-lg shadow-accent/20' : 'bg-white/5 text-muted'}`}
                    >
                      বাংলা
                    </button>
                    <button 
                      onClick={() => setLanguage('kb')}
                      className={`flex-1 py-1.5 rounded-xs text-[9px] font-bold transition-all ${language === 'kb' ? 'bg-accent text-bg shadow-lg shadow-accent/20' : 'bg-white/5 text-muted'}`}
                    >
                      KOKBOROK
                    </button>
                  </div>
                </div>
                <div className="bg-[#151515] border border-border p-3 rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-text">Dr. S. K. Roy</div>
                      <div className="text-[8px] text-muted uppercase tracking-wider">Medical Officer (MO-IC)</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-accent/10 border border-accent/20 py-1 rounded-xs text-[8px] font-bold text-accent">CALL</button>
                    <button className="flex-1 bg-white/5 border border-border py-1 rounded-xs text-[8px] font-bold text-muted">MESSAGE</button>
                  </div>
                </div>

                <div className="text-[8px] text-muted uppercase tracking-widest mt-4 mb-2">Other ASHA Workers</div>
                <div className="space-y-2">
                  {[
                    { name: 'Priya Debbarma', role: 'ASHA (Sector 1)' },
                    { name: 'Rita Reang', role: 'ASHA (Sector 3)' },
                    { name: 'Sumita Das', role: 'ASHA (Sector 2)' },
                  ].map((person, i) => (
                    <div key={i} className="bg-[#151515] border border-border p-2 rounded-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-muted">
                          {person.name[0]}
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-text">{person.name}</div>
                          <div className="text-[7px] text-muted">{person.role}</div>
                        </div>
                      </div>
                      <Phone size={10} className="text-accent cursor-pointer" />
                    </div>
                  ))}
                </div>

                <div className="text-[8px] text-muted uppercase tracking-widest mt-6 mb-2">System Health (Offline)</div>
                <div className="bg-[#151515] border border-border p-3 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-muted">Local Database</span>
                    <span className="text-[9px] text-accent font-bold">ACTIVE (SQLite)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-muted">AI Model Ver.</span>
                    <span className="text-[9px] text-accent font-bold">v2.4.1 (On-Device)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-muted">Storage Used</span>
                    <span className="text-[9px] text-text font-bold">142.8 MB / 2.0 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-muted">Offline Map</span>
                    <span className="text-[9px] text-accent font-bold">Majlishpur (Sector 2)</span>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <div className="text-[7px] text-accent/60 font-mono uppercase tracking-tighter">Encrypted with AES-256 · DPDPA Compliant</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'new' && language && (
            <motion.div
              key="new"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[10px] text-muted uppercase tracking-widest">{t.patientRegistration}</div>
              
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className={`${fullScreen ? 'text-xs' : 'text-[8px]'} text-muted uppercase`}>{t.fullName}</label>
                    <input type="text" className={`w-full bg-[#151515] border border-border rounded-sm text-text ${fullScreen ? 'p-4 text-base' : 'p-2 text-[10px]'}`} placeholder="..." />
                  </div>
                  <div className="space-y-2">
                    <label className={`${fullScreen ? 'text-xs' : 'text-[8px]'} text-muted uppercase`}>{t.aadhar}</label>
                    <input type="text" className={`w-full bg-[#151515] border border-border rounded-sm text-text ${fullScreen ? 'p-4 text-base' : 'p-2 text-[10px]'}`} placeholder="XXXX XXXX XXXX" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`${fullScreen ? 'text-xs' : 'text-[8px]'} text-muted uppercase`}>{t.age}</label>
                      <input type="number" className={`w-full bg-[#151515] border border-border rounded-sm text-text ${fullScreen ? 'p-4 text-base' : 'p-2 text-[10px]'}`} />
                    </div>
                    <div className="space-y-2">
                      <label className={`${fullScreen ? 'text-xs' : 'text-[8px]'} text-muted uppercase`}>{t.gender}</label>
                      <select className={`w-full bg-[#151515] border border-border rounded-sm text-text focus:outline-none ${fullScreen ? 'p-4 text-base' : 'p-2 text-[10px]'}`}>
                        <option>{t.male}</option>
                        <option>{t.female}</option>
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
                  setPendingRecords(prev => prev + 1);
                  triggerToast(t.savedToLocal);
                  setScreen('home');
                }}
                className="w-full bg-accent text-bg font-bold py-3 rounded-sm text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Save size={14} /> {t.saveRecord}
              </button>
            </motion.div>
          )}

          {screen === 'screening' && language && (
            <motion.div
              key="screening"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-[10px] text-muted uppercase tracking-widest">{t.screeningTitle}</div>
              
              <div className="bg-[#151515] border border-border p-3 rounded-sm">
                <p className="text-[10px] text-text mb-3">{t.coughQuestion}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSymptoms(prev => ({ ...prev, cough: true }))}
                    className={`flex-1 border py-2 rounded-sm text-[10px] font-bold transition-all ${symptoms.cough === true ? 'bg-accent border-accent text-bg' : 'bg-accent/10 border-accent/20 text-accent'}`}
                  >
                    {t.yes}
                  </button>
                  <button 
                    onClick={() => setSymptoms(prev => ({ ...prev, cough: false }))}
                    className={`flex-1 border py-2 rounded-sm text-[10px] font-bold transition-all ${symptoms.cough === false ? 'bg-white/10 border-white/20 text-text' : 'bg-white/5 border-border text-muted'}`}
                  >
                    {t.no}
                  </button>
                </div>
              </div>

              <div className="bg-[#151515] border border-border p-3 rounded-sm">
                <p className="text-[10px] text-text mb-3">{t.feverQuestion}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSymptoms(prev => ({ ...prev, fever: true }))}
                    className={`flex-1 border py-2 rounded-sm text-[10px] font-bold transition-all ${symptoms.fever === true ? 'bg-accent border-accent text-bg' : 'bg-accent/10 border-accent/20 text-accent'}`}
                  >
                    {t.yes}
                  </button>
                  <button 
                    onClick={() => setSymptoms(prev => ({ ...prev, fever: false }))}
                    className={`flex-1 border py-2 rounded-sm text-[10px] font-bold transition-all ${symptoms.fever === false ? 'bg-white/10 border-white/20 text-text' : 'bg-white/5 border-border text-muted'}`}
                  >
                    {t.no}
                  </button>
                </div>
              </div>

              <div className={`p-4 bg-[#151515] border border-border rounded-sm relative overflow-hidden ${fullScreen ? 'mb-8' : 'mb-4'}`}>
                {isAnalyzing && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-1 bg-accent origin-left z-20"
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Activity size={fullScreen ? 18 : 12} className={isAnalyzing ? "text-accent animate-pulse" : "text-muted"} />
                    <span className={`${fullScreen ? 'text-xs' : 'text-[9px]'} font-bold text-muted uppercase`}>Edge AI Status</span>
                  </div>
                  {isAnalyzing && <span className={`${fullScreen ? 'text-sm' : 'text-[7px]'} text-accent font-mono animate-pulse uppercase`}>Analyzing Data...</span>}
                </div>
                
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center">
                    <span className={`${fullScreen ? 'text-base' : 'text-[10px]'} text-text`}>{t.riskScore}</span>
                    <span className={`font-black ${fullScreen ? 'text-2xl' : 'text-[11px]'} ${calculateRisk() > 60 ? 'text-red-500' : calculateRisk() > 0 ? 'text-yellow-500' : 'text-accent'}`}>
                      {isAnalyzing ? '--%' : `${calculateRisk()}%`}
                    </span>
                  </div>
                  <div className={`bg-white/5 rounded-full overflow-hidden ${fullScreen ? 'h-3' : 'h-1'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isAnalyzing ? 0 : `${calculateRisk()}%` }}
                      className={`h-full transition-all duration-1000 ${calculateRisk() > 60 ? 'bg-red-500' : 'bg-accent'}`}
                    />
                  </div>
                </div>
                <div className={`mt-3 font-mono uppercase tracking-widest text-center text-muted ${fullScreen ? 'text-[10px]' : 'text-[6px]'}`}>
                  Local Inference (No cloud processing required)
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || symptoms.cough === null || symptoms.fever === null}
                  className="flex-[2] bg-accent/20 border border-accent/40 text-accent font-bold py-3 rounded-sm text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-30"
                >
                  <Cpu size={14} className={isAnalyzing ? "animate-spin" : ""} /> 
                  {isAnalyzing ? 'Processing...' : 'Run Edge AI Analysis'}
                </button>
                <button 
                   onClick={() => {
                    setScreen('home');
                    setSymptoms({ cough: null, fever: null });
                  }}
                  className="flex-1 bg-white/5 border border-border text-muted font-bold py-3 rounded-sm text-[10px] active:scale-95"
                >
                  Reset
                </button>
              </div>

              <button 
                onClick={() => {
                  triggerToast('Referral Generated');
                  setScreen('home');
                  setSymptoms({ cough: null, fever: null });
                }}
                disabled={isAnalyzing || calculateRisk() === 0}
                className="w-full bg-accent text-bg font-bold py-3 rounded-sm text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform uppercase disabled:opacity-50"
              >
                {t.generateReferral}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <div className={`absolute bottom-0 left-0 right-0 bg-[#151515] border-t border-border flex justify-around items-center z-20 ${
        fullScreen ? 'h-20 px-10' : 'h-12 px-4'
      }`}>
        <div 
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${screen === 'home' ? 'text-accent' : 'text-muted'}`}
        >
          <Activity size={fullScreen ? 24 : 16} />
          <span className={`${fullScreen ? 'text-[10px]' : 'text-[7px]'} uppercase font-bold`}>{t.home}</span>
        </div>
        <div 
          onClick={() => setScreen('patients')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${screen === 'patients' ? 'text-accent' : 'text-muted'}`}
        >
          <Users size={fullScreen ? 24 : 16} />
          <span className={`${fullScreen ? 'text-[10px]' : 'text-[7px]'} uppercase font-bold`}>{t.patients}</span>
        </div>
        <div 
          onClick={() => setScreen('alerts')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${screen === 'alerts' ? 'text-accent' : 'text-muted'}`}
        >
          <Bell size={fullScreen ? 24 : 16} />
          <span className={`${fullScreen ? 'text-[10px]' : 'text-[7px]'} uppercase font-bold`}>{t.alerts}</span>
        </div>
        <div 
          onClick={() => setScreen('people')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${screen === 'people' ? 'text-accent' : 'text-muted'}`}
        >
          <User size={fullScreen ? 24 : 16} />
          <span className={`${fullScreen ? 'text-[10px]' : 'text-[7px]'} uppercase font-bold`}>{t.people}</span>
        </div>
      </div>

      {/* Android Home Bar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/20 rounded-full z-20" />
    </div>
  );
};
