import React, { useState, useEffect, useRef } from 'react';
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
  Cpu,
  Database,
  FileText,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useTheme } from '../lib/themeContext';
import { Sun, Moon } from 'lucide-react';
import { ThreeDLogo } from './ThreeDLogo';

export const AshaAppPreview = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  const triggerHaptic = (pattern: number | number[] = 15) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Silently fail if vibration is blocked or not supported
      }
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const { theme, toggleTheme } = useTheme();

  const [screen, setScreen] = useState('home');
  const [language, setLanguage] = useState<'bn' | 'kb' | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [pendingRecords, setPendingRecords] = useState(47); // Updated to 47 per user prompt
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
      noRecords: 'সিঙ্ক করার কোনো রেকর্ড নেই',
      migrationTitle: 'কাগজের খাতা ডিজিটাল করুন',
      migrationDesc: 'আপনার পুরনো খাতার ছবি তুলুন। আমরা ডেটা মাইগ্রেট করে দেব।',
      migrationAction: 'ফটো তুলুন',
      systemHealth: 'সিস্টেম হেলথ',
      batteryText: 'ব্যাটারি ড্রেন: <৮% (আজ)',
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
      noRecords: 'Sync khunai baki kwrwi',
      migrationTitle: 'Capture Paper Register',
      migrationDesc: 'Take a photo of your old register. We will migrate your data.',
      migrationAction: 'Take Photo',
      systemHealth: 'System Health',
      batteryText: 'Battery Drain: <8% (Today)',
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
      triggerHaptic(10);
      return;
    }
    triggerHaptic([40, 30, 40]);
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingRecords(0);
      triggerToast(t.syncedToCloud);
      triggerHaptic(20);
    }, 2000);
  };

  const handleAnalyze = () => {
    triggerHaptic([30, 40]);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      triggerToast('AI Analysis Complete');
      triggerHaptic([40, 30, 40]);
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
      case 'migration': return t.migrationTitle;
      default: return t.appName;
    }
  };

  return (
    <motion.div 
      animate={!fullScreen ? {
        y: [0, -10, 0],
        rotateX: [0, 2, 0],
        rotateY: [0, -2, 0]
      } : {}}
      transition={!fullScreen ? {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
      whileHover={!fullScreen ? {
        scale: 1.05,
        rotateY: 8,
        rotateX: -5,
        z: 50,
      } : {}}
      className={`relative transform-gpu perspective-1000 bg-bg overflow-hidden group select-none transition-all duration-700 ${
      fullScreen 
        ? 'w-full h-full' 
        : 'w-full max-w-[280px] mx-auto aspect-[9/19] rounded-[48px] border-[8px] border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] ring-1 ring-border'
    }`}>
      {/* Background Atmosphere & Parallax Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: parallax1 }}
          className="absolute top-[-10%] left-[-10%] w-[80%] h-[40%] rounded-full bg-accent/5 blur-[80px]" 
        />
        <motion.div 
          style={{ y: parallax2 }}
          className="absolute bottom-[20%] right-[-5%] w-[60%] h-[50%] rounded-full bg-accent-light/5 blur-[100px]" 
        />
        <motion.div 
          style={{ y: parallax3 }}
          className="absolute top-[30%] right-[10%] w-[30%] h-[20%] rounded-full bg-accent/5 blur-[60px]" 
        />
        
        {/* Subtle Glass Textures */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      {/* Speaker/Camera Notch - Only in phone mode */}
      {!fullScreen && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-white rounded-b-[18px] z-40 flex items-center justify-center border-x border-b border-border shadow-sm">
          <div className="w-10 h-1 bg-black/5 rounded-full" />
        </div>
      )}

      {/* Status Bar */}
      <div className={`flex justify-between items-center font-sans font-medium text-text/40 z-20 ${
        fullScreen ? 'h-10 px-8 text-[12px]' : 'h-8 px-6 text-[9px] pt-2'
      }`}>
        <span className="tracking-tight">10:42</span>
        <div className="flex items-center gap-1.5">
          <WifiOff size={fullScreen ? 14 : 10} className="text-accent" />
          <div className="w-4 h-2 rounded-[2px] border border-text/20 relative">
             <div className="absolute inset-[1px] bg-accent/60 rounded-[1px] w-[80%]" />
          </div>
        </div>
      </div>


      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-0 left-4 right-4 z-50 bg-accent text-white text-[10px] font-bold py-2 px-3 rounded-xl shadow-xl flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 size={12} />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Header */}
      <div className={`glass-card border-b border-border flex justify-between items-center z-20 relative transition-all duration-500 ${fullScreen ? 'p-8 h-24' : 'p-5'}`}>
        <div className="flex items-center gap-4">
          {screen === 'home' ? (
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
              <Menu size={fullScreen ? 20 : 14} className="text-accent cursor-pointer" onClick={() => {
                triggerHaptic(15);
                setScreen('people');
              }} />
            </div>
          ) : (
            <div 
              className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center border border-black/5 hover:bg-black/10 transition-colors cursor-pointer"
              onClick={() => {
                triggerHaptic(10);
                setScreen('home');
              }}
            >
              <ArrowLeft size={fullScreen ? 20 : 14} className="text-text" />
            </div>
          )}
          <span className={`font-serif font-bold text-text tracking-tight ${fullScreen ? 'text-2xl' : 'text-[15px]'}`}>
            {getHeaderTitle()}
          </span>
        </div>
        <div className="relative group" onClick={() => {
          triggerHaptic(15);
          setScreen('alerts');
        }}>
          <button 
            className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center border border-black/5 group-hover:bg-black/10 transition-colors"
            aria-label={`${getHeaderTitle()} notifications`}
          >
            <Bell size={fullScreen ? 20 : 14} className="text-text" />
          </button>
          <div 
            className={`absolute top-0 right-0 bg-red-500 rounded-full border-2 border-bg animate-pulse ${fullScreen ? 'w-4 h-4' : 'w-2.5 h-2.5'}`} 
            aria-hidden="true"
          />
        </div>
      </div>

      {/* App Content */}
      <div 
        ref={scrollRef}
        className={`overflow-y-auto custom-scrollbar relative z-10 ${
        fullScreen ? 'p-10 h-[calc(100%-144px)]' : 'p-3 h-[calc(100%-100px)]'
      }`}>
        <AnimatePresence mode="wait">
          {!language && (
            <motion.div
              key="lang-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-bg/80 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-accent-light/10 rounded-full blur-[120px]" />
              </div>

              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-20 h-20 bg-accent rounded-[24px] flex items-center justify-center mb-8 shadow-2xl shadow-accent/20 border-t border-white/40"
              >
                <Activity size={40} className="text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-serif font-black text-text tracking-tighter mb-2">ASHASETU</h2>
              <p className="text-[12px] text-muted font-semibold tracking-[0.2em] mb-12 uppercase">Select Language / ভাষা চয়ন করুন</p>
              
              <div className="w-full max-w-[320px] space-y-4" role="group" aria-label="Language selection">
                <button 
                  onClick={() => {
                    triggerHaptic(20);
                    setLanguage('bn');
                  }}
                  className="group relative w-full glass-card p-6 rounded-[24px] overflow-hidden transition-all duration-300 three-d-shadow border-t-accent/10"
                  aria-label="Select Bengali language"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-lg font-bold text-text tracking-tight">বাংলা (BENGALI)</span>
                </button>
                
                <button 
                  onClick={() => {
                    triggerHaptic(20);
                    setLanguage('kb');
                  }}
                  className="group relative w-full glass-card p-6 rounded-[24px] overflow-hidden transition-all duration-300 three-d-shadow border-t-accent/10"
                  aria-label="Select Kokborok language"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-lg font-bold text-text tracking-tight uppercase">Kokborok</span>
                </button>
              </div>
              
              <div className="mt-16 text-[9px] text-muted font-bold tracking-[0.3em] uppercase">
                Enterprise Grade Health Infrastructure
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
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <div className={`${fullScreen ? 'text-sm' : 'text-[11px]'} text-accent font-bold uppercase tracking-[0.2em] mb-2`}>{t.welcome}</div>
                  <div className={`${fullScreen ? 'text-5xl' : 'text-3xl'} font-serif font-black text-text tracking-tighter`}>{t.ashaName}</div>
                  <div className={`${fullScreen ? 'text-lg' : 'text-[10px]'} text-muted font-medium mt-2`}>{t.sector}</div>
                </div>
                <ThreeDLogo size={fullScreen ? 56 : 40} />
              </div>

              {/* Sync Pill */}
              <div className="flex justify-center mb-8">
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="group relative flex flex-col items-center gap-2 glass-card px-6 py-3 rounded-3xl hover:bg-white transition-all active:scale-95 disabled:opacity-50 overflow-hidden shadow-lg shadow-accent/10 border-t-accent/20"
                >
                  <div className="flex items-center gap-3">
                    <RefreshCw size={14} className={`text-accent ${isSyncing ? 'animate-spin' : ''}`} />
                    <span className="text-[12px] text-text font-black tracking-tight">
                      {isSyncing ? t.syncing : t.pending(pendingRecords)}
                    </span>
                  </div>
                  {!isSyncing && (
                    <span className="text-[9px] text-muted uppercase font-bold tracking-widest">{`Waiting for Network`}</span>
                  )}
                  {isSyncing && (
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2 }}
                    />
                  )}
                </button>
              </div>

              {/* Grid Layout: Bento Style */}
              <div className="grid grid-cols-6 gap-3 mb-6">
                {/* Local Storage */}
                <div className="col-span-3 glass-card p-4 rounded-[24px] three-d-shadow border-t-accent/10">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Database size={16} className="text-accent" />
                  </div>
                  <div className="text-[10px] text-muted uppercase font-bold tracking-wider mb-1">{t.localStorage}</div>
                  <div className="text-[13px] font-bold text-text leading-tight">{`142 ${t.recordsUnit}`}</div>
                  <div className="text-[9px] text-accent font-mono mt-1">SQLite Active</div>
                </div>

                {/* Edge AI */}
                <div className="col-span-3 glass-card p-4 rounded-[24px] three-d-shadow border-t-accent/10">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Cpu size={16} className="text-accent" />
                  </div>
                  <div className="text-[10px] text-muted uppercase font-bold tracking-wider mb-1">{t.edgeAI}</div>
                  <div className="text-[13px] font-bold text-text leading-tight">{t.modelsLoaded}</div>
                  <div className="text-[9px] text-accent font-mono mt-1">NPU Core Enabled</div>
                </div>

                {/* Offline Map Pill */}
                <div className="col-span-6 glass-card p-4 rounded-[24px] flex items-center gap-4 three-d-shadow border-t-accent/10">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-bold text-text">Majlishpur Sector 2</div>
                    <div className="text-[10px] text-muted">Offline Maps Cache (12.4 MB)</div>
                  </div>
                  <div className="px-3 py-1 bg-accent/10 rounded-full border border-accent/20 text-[9px] font-black text-accent uppercase">Active</div>
                </div>
              </div>

              {/* Main Actions */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button 
                  onClick={() => {
                    triggerHaptic(15);
                    setScreen('new');
                  }}
                  className="group relative glass-card rounded-[32px] p-6 flex flex-col items-start gap-4 hover:bg-white active:scale-95 transition-all overflow-hidden text-left shadow-xl three-d-shadow border-t-accent/10"
                  aria-label={t.newPatient}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform" aria-hidden="true">
                    <Plus size={80} className="text-accent" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
                    <Plus size={24} className="text-accent" />
                  </div>
                  <span className="text-[16px] font-black text-text tracking-tighter leading-none">{t.newPatient}</span>
                </button>
                
                <button 
                  onClick={() => {
                    triggerHaptic(15);
                    setScreen('screening');
                  }}
                  className="group relative glass-card rounded-[32px] p-6 flex flex-col items-start gap-4 hover:bg-white active:scale-95 transition-all overflow-hidden text-left shadow-xl three-d-shadow border-t-accent/10"
                  aria-label={t.screening}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform" aria-hidden="true">
                    <Activity size={80} className="text-accent" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
                    <Activity size={24} className="text-accent" />
                  </div>
                  <span className="text-[16px] font-black text-text tracking-tighter leading-none">{t.screening}</span>
                </button>
              </div>

              {/* Paper Register Migration Action (Step 1.2) */}
              <button 
                onClick={() => {
                  triggerHaptic(15);
                  setScreen('migration');
                }}
                className="w-full glass-card p-5 rounded-[28px] mb-8 flex items-center gap-5 hover:bg-white transition-all shadow-xl three-d-shadow border-t-gold/20 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[14px] font-black text-text tracking-tight uppercase leading-none mb-1">Paper Migration</div>
                  <div className="text-[10px] text-muted font-medium">Replace your physical registers</div>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>

              {/* Recent Referrals */}
              <div className="mb-10">
                <div className="text-[11px] text-accent font-bold uppercase tracking-[0.2em] mb-4 flex justify-between items-center group">
                  <span className="flex items-center gap-2">
                    <Activity size={14} /> {t.recentReferrals}
                  </span>
                  <span className="text-[10px] text-muted cursor-pointer hover:text-accent transition-colors">{t.viewAll}</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'S. Reang', type: 'TB Suspect', status: 'High Risk', color: 'bg-red-500/5 border-red-500/10 text-red-500' },
                    { name: 'M. Chakma', type: 'ANC Visit 3', status: 'Normal', color: 'bg-accent/5 border-accent/10 text-accent' },
                    { name: 'B. Das', type: 'Malaria', status: 'Follow-up', color: 'bg-yellow-500/5 border-yellow-500/10 text-yellow-500' }
                  ].map((patient, i) => (
                    <div key={i} className="group glass-card p-4 rounded-[24px] flex items-center justify-between hover:bg-white transition-all cursor-pointer shadow-lg three-d-shadow border-t-accent/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-[18px] text-muted/30 font-black border border-black/5 transition-transform group-hover:scale-105">
                          {patient.name[0]}
                        </div>
                        <div>
                          <div className="text-[15px] font-bold text-text tracking-tight">{patient.name}</div>
                          <div className="text-[11px] text-muted font-medium">{patient.type}</div>
                        </div>
                      </div>
                      <div className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border backdrop-blur-md ${patient.color}`}>
                        {patient.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Tips / Alerts */}
              <div 
                className="group relative bg-red-500/5 backdrop-blur-md border border-red-500/10 p-6 rounded-[32px] cursor-pointer hover:bg-white transition-all mb-24 overflow-hidden shadow-xl shadow-red-500/5" 
                onClick={() => setScreen('alerts')}
                role="alert"
                aria-label={`Health Alert: ${t.healthAlert}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform" aria-hidden="true">
                  <AlertCircle size={60} className="text-red-500" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-inner">
                    <AlertCircle size={20} className="text-red-500" />
                  </div>
                  <span className="text-[14px] font-black text-red-500 uppercase tracking-widest">{t.healthAlert}</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed font-medium">{t.malariaWarning}</p>
              </div>
            </motion.div>
          )}

          {screen === 'patients' && language && (
            <motion.div
              key="patients"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">{t.patients}</div>
                  <div className="text-2xl font-serif font-black text-text tracking-tighter">Directory</div>
                </div>
                <div className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-[10px] text-muted font-bold">142 Total</div>
              </div>
              
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/30 group-focus-within:text-accent transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  className="w-full glass-card rounded-2xl py-3 pl-12 pr-4 text-[13px] text-text outline-none focus:border-accent/40 focus:bg-white transition-all placeholder:text-muted/40 shadow-inner"
                />
              </div>

              <div className="space-y-3">
                {[
                  { name: 'S. Reang', id: 'TR-0921', risk: 'High' },
                  { name: 'M. Chakma', id: 'TR-0842', risk: 'Low' },
                  { name: 'B. Das', id: 'TR-1102', risk: 'Medium' },
                  { name: 'R. Debbarma', id: 'TR-0731', risk: 'Low' },
                  { name: 'P. Jamatia', id: 'TR-1254', risk: 'Medium' },
                  { name: 'K. Tripura', id: 'TR-0998', risk: 'High' },
                ].map((p, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group glass-card p-4 rounded-[24px] flex items-center justify-between hover:bg-white transition-all cursor-pointer active:scale-[0.98] shadow-lg three-d-shadow border-t-white/60"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-[14px] text-accent font-black border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors">
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-text tracking-tight">{p.name}</div>
                        <div className="text-[10px] text-muted font-mono tracking-widest uppercase">ID: {p.id}</div>
                      </div>
                    </div>
                    <div className={`text-[10px] font-black px-3 py-1 rounded-full border backdrop-blur-md ${
                      p.risk === 'High' 
                        ? 'bg-red-500/5 border-red-500/10 text-red-500' 
                        : p.risk === 'Medium' 
                          ? 'bg-yellow-500/5 border-yellow-500/10 text-yellow-500' 
                          : 'bg-accent/5 border-accent/10 text-accent'
                    }`}>
                      {p.risk}
                    </div>
                  </motion.div>
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
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold">{t.alerts}</div>
              
              <div className="space-y-3">
                <div className="bg-red-500/[0.03] backdrop-blur-xl border border-red-500/10 p-4 rounded-[24px] shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="text-[10px] font-bold text-red-500 uppercase">Malaria Outbreak</span>
                  </div>
                  <p className="text-[11px] text-text/70 mb-2 leading-relaxed">High incidence reported in Majlishpur Sector 2. Immediate screening of all fever cases required.</p>
                  <div className="text-[9px] text-muted font-mono uppercase">2 Hours Ago</div>
                </div>

                <div className="bg-accent/[0.03] backdrop-blur-xl border border-accent/10 p-4 rounded-[24px] shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell size={14} className="text-accent" />
                    <span className="text-[10px] font-bold text-accent uppercase">Vaccination Drive</span>
                  </div>
                  <p className="text-[11px] text-text/70 mb-2 leading-relaxed">Pulse Polio drive scheduled for next Sunday. Please update your target list.</p>
                  <div className="text-[9px] text-muted font-mono uppercase">Yesterday</div>
                </div>

                <div className="bg-yellow-500/[0.03] backdrop-blur-xl border border-yellow-500/10 p-4 rounded-[24px] shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw size={14} className="text-yellow-500" />
                    <span className="text-[10px] font-bold text-yellow-500 uppercase">System Update</span>
                  </div>
                  <p className="text-[11px] text-text/70 mb-2 leading-relaxed">New TB screening protocols added. Please sync your device to update the AI model.</p>
                  <div className="text-[9px] text-muted font-mono uppercase">2 Days Ago</div>
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
              className="space-y-6 pb-24"
            >
              <div className="mb-4">
                <div className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">{t.people}</div>
                <div className="text-2xl font-serif font-black text-text tracking-tighter">Support Network</div>
              </div>
              
              <div className="space-y-4" role="list">
                {/* Theme & Language Section */}
                <div className="glass-card p-5 rounded-[28px] shadow-xl border-t-accent/10" role="listitem">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] text-muted uppercase font-bold tracking-widest leading-none">Appearance & Language</div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={() => {
                        triggerHaptic(10);
                        if (theme !== 'light') toggleTheme();
                      }}
                      className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${theme === 'light' ? 'bg-accent text-white' : 'bg-surface/50 text-muted'}`}
                    >
                      <Sun size={14} />
                      <span className="text-[10px] font-bold">Light</span>
                    </button>
                    <button 
                      onClick={() => {
                        triggerHaptic(10);
                        if (theme !== 'dark') toggleTheme();
                      }}
                      className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${theme === 'dark' ? 'bg-accent text-white' : 'bg-surface/50 text-muted'}`}
                    >
                      <Moon size={14} />
                      <span className="text-[10px] font-bold">Dark</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        triggerHaptic(40);
                        setLanguage('bn');
                      }}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${language === 'bn' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-surface/50 text-muted border border-border'}`}
                    >
                      বাংলা
                    </button>
                    <button 
                      onClick={() => {
                        triggerHaptic(40);
                        setLanguage('kb');
                      }}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${language === 'kb' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-surface/50 text-muted border border-border'}`}
                    >
                      KOKBOROK
                    </button>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-[32px] group shadow-xl three-d-shadow border-t-accent/10" role="listitem">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20 shadow-inner">
                      <User size={28} />
                    </div>
                    <div>
                      <div className="text-[16px] font-black text-text tracking-tight">Dr. S. K. Roy</div>
                      <div className="text-[10px] text-accent font-bold uppercase tracking-widest">Medical Officer (MO-IC)</div>
                    </div>
                  </div>
                   <div className="mt-5 flex gap-3">
                    <button className="flex-1 bg-accent text-white font-black py-3 rounded-2xl text-[11px] shadow-lg shadow-accent/20 active:scale-95 transition-transform uppercase tracking-wider" onClick={() => triggerHaptic(20)}>Call Now</button>
                    <button className="flex-1 bg-black/5 border border-black/5 py-3 rounded-2xl text-[11px] font-bold text-text active:scale-95 transition-colors uppercase tracking-wider" onClick={() => triggerHaptic(15)}>Message</button>
                  </div>
                </div>

                <div className="text-[11px] text-accent font-bold uppercase tracking-widest mt-8 mb-4 flex items-center gap-2">
                  <Users size={14} /> Other ASHA Workers
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Priya Debbarma', role: 'ASHA (Sector 1)' },
                    { name: 'Rita Reang', role: 'ASHA (Sector 3)' },
                    { name: 'Sumita Das', role: 'ASHA (Sector 2)' },
                  ].map((person, i) => (
                    <div key={i} className="group glass-card p-4 rounded-[24px] flex items-center justify-between hover:bg-white transition-all cursor-pointer shadow-lg three-d-shadow border-t-white/40">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-[14px] text-text font-bold border border-black/5">
                          {person.name[0]}
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-text tracking-tight">{person.name}</div>
                          <div className="text-[10px] text-muted font-medium">{person.role}</div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors shadow-inner" onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic(20);
                      }}>
                        <Phone size={14} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-accent font-bold uppercase tracking-widest mt-10 mb-4 flex items-center gap-2">
                  <Activity size={14} /> System Health (Offline)
                </div>
                <div className="glass-card p-6 rounded-[32px] space-y-4 shadow-2xl three-d-shadow border-t-accent/10">
                  <div className="flex justify-between items-center bg-black/5 p-3 rounded-2xl border border-black/5">
                    <span className="text-[11px] text-muted font-medium">Local Database</span>
                    <span className="text-[11px] text-accent font-black tracking-tighter">ACTIVE (SQLite)</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3 rounded-2xl border border-black/5">
                    <span className="text-[11px] text-muted font-medium">Edge AI Model</span>
                    <span className="text-[11px] text-accent font-black tracking-tighter">v2.4.1 Production</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3 rounded-2xl border border-black/5">
                    <span className="text-[11px] text-muted font-medium">Storage Used</span>
                    <span className="text-[11px] text-text font-black tracking-tighter">142.8 MB / 2.0 GB</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3 rounded-2xl border border-black/5">
                    <span className="text-[11px] text-muted font-medium">Battery Efficiency</span>
                    <span className="text-[11px] text-accent font-black tracking-tighter">Healthy (&lt;8% use)</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/5 p-3 rounded-2xl border border-black/5">
                    <span className="text-[11px] text-muted font-medium">Encryption</span>
                    <span className="text-[11px] text-accent font-black tracking-tighter">AES-256 Enabled</span>
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
              className="space-y-8 pb-32"
            >
              <div className="mb-4">
                <div className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">{t.patientRegistration}</div>
                <div className="text-2xl font-serif font-black text-text tracking-tighter">Onboarding</div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3 relative">
                  <label className={`${fullScreen ? 'text-sm' : 'text-[10px]'} text-accent font-black uppercase tracking-widest ml-1`}>{t.fullName}</label>
                  <div className="relative">
                    <input type="text" className={`w-full glass-card rounded-2xl text-text outline-none focus:border-accent/40 focus:bg-white transition-all shadow-inner border-border ${fullScreen ? 'p-6 text-xl pr-16' : 'p-4 text-[14px] pr-12'}`} placeholder="Enter patient name..." />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-accent/10 rounded-xl transition-colors" aria-label="Voice Input">
                      <Mic size={fullScreen ? 24 : 18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className={`${fullScreen ? 'text-sm' : 'text-[10px]'} text-accent font-black uppercase tracking-widest ml-1`}>{t.aadhar}</label>
                  <input type="text" className={`w-full glass-card rounded-2xl text-text outline-none focus:border-accent/40 focus:bg-white transition-all shadow-inner border-border ${fullScreen ? 'p-6 text-xl' : 'p-4 text-[14px]'}`} placeholder="XXXX XXXX XXXX" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className={`${fullScreen ? 'text-sm' : 'text-[10px]'} text-accent font-black uppercase tracking-widest ml-1`}>{t.age}</label>
                    <input type="number" className={`w-full glass-card rounded-2xl text-text outline-none focus:border-accent/40 focus:bg-white transition-all shadow-inner border-border ${fullScreen ? 'p-6 text-xl' : 'p-4 text-[14px]'}`} />
                  </div>
                  <div className="space-y-3">
                    <label className={`${fullScreen ? 'text-sm' : 'text-[10px]'} text-accent font-black uppercase tracking-widest ml-1`}>{t.gender}</label>
                    <select className={`w-full glass-card rounded-2xl text-text outline-none focus:border-accent/40 focus:bg-white transition-all shadow-inner border-border ${fullScreen ? 'p-6 text-xl' : 'p-4 text-[14px]'}`}>
                      <option>{t.male}</option>
                      <option>{t.female}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="group glass-card border-dashed border-accent/20 p-8 rounded-[32px] flex flex-col items-center gap-4 cursor-pointer hover:bg-white transition-all hover:border-accent/40 shadow-inner">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-lg border border-accent/20">
                  <Camera size={32} />
                </div>
                <span className="text-[12px] text-muted font-black uppercase tracking-widest group-hover:text-accent transition-colors">Capture Identity Photo</span>
              </div>

              <button 
                onClick={() => {
                  triggerHaptic([40, 20, 40]);
                  setPendingRecords(prev => prev + 1);
                  triggerToast(t.savedToLocal);
                  setScreen('home');
                }}
                className="w-full bg-accent text-white font-black py-4 rounded-[24px] text-[15px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(42,184,113,0.3)] active:scale-95 transition-all uppercase tracking-tight"
              >
                <Save size={18} /> {t.saveRecord}
              </button>
            </motion.div>
          )}

          {screen === 'migration' && language && (
            <motion.div
              key="migration"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8 pb-32"
            >
              <div className="mb-4">
                <div className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Step 1.2</div>
                <div className="text-2xl font-serif font-black text-text tracking-tighter">{t.migrationTitle}</div>
              </div>

              <div className="glass-card p-8 rounded-[36px] border-t-gold/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 animate-pulse">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                </div>
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 rounded-[32px] bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shadow-inner">
                    <Camera size={48} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-text mb-2">{t.migrationAction}</h3>
                    <p className="text-[12px] text-muted leading-relaxed">
                      {t.migrationDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] text-muted font-bold tracking-widest uppercase ml-1">Supported Paper Formats</div>
                <div className="grid grid-cols-1 gap-2">
                  {['NHM Household Register', 'MCP Care Cards', 'Incentive Formats', 'High Risk Tracker'].map(format => (
                    <div key={format} className="flex items-center gap-3 p-4 glass-card rounded-2xl border-white/40">
                      <CheckCircle2 size={14} className="text-accent" />
                      <span className="text-[11px] font-bold text-text/80">{format}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-accent/5 rounded-3xl border border-accent/10">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Activity size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[12px] font-black text-text mb-1 uppercase tracking-tight">AI OCR Migration</div>
                    <p className="text-[10px] text-muted leading-relaxed">
                      Our edge-AI will process handwritten Bengali/Kokborok text from your photos and populate your digital directory automatically.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  triggerHaptic([40, 20, 40]);
                  triggerToast('AI Scanning Registry...');
                  setTimeout(() => {
                    setPendingRecords(prev => prev + 12);
                    setShowToast(true);
                    setToastMsg('12 Records Migrated Successfully');
                    setScreen('home');
                  }, 2000);
                }}
                className="w-full bg-gold text-white font-black py-4 rounded-[24px] text-[15px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(197,160,89,0.3)] active:scale-95 transition-all uppercase tracking-tight"
              >
                <Camera size={18} /> {t.migrationAction}
              </button>
            </motion.div>
          )}

          {screen === 'screening' && language && (
            <motion.div
              key="screening"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8 pb-32"
            >
              <div className="mb-4">
                <div className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">{t.screeningTitle}</div>
                <div className="text-2xl font-serif font-black text-text tracking-tighter">Clinical Edge AI</div>
              </div>
              
              <div className="glass-card p-6 rounded-[32px] space-y-6 shadow-xl three-d-shadow border-t-accent/10 relative">
                <button className="absolute top-4 right-4 p-2 text-accent/40 hover:text-accent transition-colors" aria-label="Voice Playback">
                  <Volume2 size={16} />
                </button>
                <p className="text-[15px] font-medium text-text tracking-tight leading-snug pr-8">{t.coughQuestion}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      triggerHaptic(10);
                      setSymptoms(prev => ({ ...prev, cough: true }));
                    }}
                    className={`flex-1 py-4 rounded-2xl text-[14px] font-black transition-all active:scale-95 ${symptoms.cough === true ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-black/5 text-muted border border-black/5 shadow-inner'}`}
                  >
                    {t.yes}
                  </button>
                  <button 
                    onClick={() => {
                      triggerHaptic(10);
                      setSymptoms(prev => ({ ...prev, cough: false }));
                    }}
                    className={`flex-1 py-4 rounded-2xl text-[14px] font-black transition-all active:scale-95 ${symptoms.cough === false ? 'bg-black/10 text-text shadow-inner' : 'bg-black/5 text-muted border border-black/5 shadow-inner'}`}
                  >
                    {t.no}
                  </button>
                </div>
              </div>

              <div className="glass-card p-6 rounded-[32px] space-y-6 shadow-xl three-d-shadow border-t-accent/10 relative">
                <button className="absolute top-4 right-4 p-2 text-accent/40 hover:text-accent transition-colors" aria-label="Voice Playback">
                  <Volume2 size={16} />
                </button>
                <p className="text-[15px] font-medium text-text tracking-tight leading-snug pr-8">{t.feverQuestion}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      triggerHaptic(10);
                      setSymptoms(prev => ({ ...prev, fever: true }));
                    }}
                    className={`flex-1 py-4 rounded-2xl text-[14px] font-black transition-all active:scale-95 ${symptoms.fever === true ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-black/5 text-muted border border-black/5 shadow-inner'}`}
                  >
                    {t.yes}
                  </button>
                  <button 
                    onClick={() => {
                      triggerHaptic(10);
                      setSymptoms(prev => ({ ...prev, fever: false }));
                    }}
                    className={`flex-1 py-4 rounded-2xl text-[14px] font-black transition-all active:scale-95 ${symptoms.fever === false ? 'bg-black/10 text-text shadow-inner' : 'bg-black/5 text-muted border border-black/5 shadow-inner'}`}
                  >
                    {t.no}
                  </button>
                </div>
              </div>

              <div className={`p-8 glass-card rounded-[32px] relative overflow-hidden shadow-2xl three-d-shadow border-t-accent/10 ${fullScreen ? 'mb-12' : 'mb-6'}`}>
                {isAnalyzing && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-1.5 bg-accent origin-left z-20"
                  />
                )}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
                      <Cpu size={24} className={isAnalyzing ? "text-accent animate-spin" : "text-muted/40"} />
                    </div>
                    <span className={`${fullScreen ? 'text-sm' : 'text-[11px]'} font-black text-muted/40 uppercase tracking-widest`}>Risk Assessment</span>
                  </div>
                  {isAnalyzing && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className={`${fullScreen ? 'text-sm' : 'text-[9px]'} text-accent font-mono font-bold uppercase tracking-tighter`}
                    >
                      Inferencing...
                    </motion.span>
                  )}
                </div>
                
                <div className="space-y-6 pt-1">
                  <div className="flex justify-between items-end">
                    <span className={`${fullScreen ? 'text-lg' : 'text-[13px]'} text-text font-medium tracking-tight`}>{t.riskScore}</span>
                    <span className={`font-black ${fullScreen ? 'text-5xl' : 'text-3xl'} tracking-tight ${calculateRisk() > 60 ? 'text-red-500' : calculateRisk() > 0 ? 'text-yellow-500' : 'text-accent'}`}>
                      {isAnalyzing ? '--%' : `${calculateRisk()}%`}
                    </span>
                  </div>
                  <div className={`bg-black/5 rounded-full overflow-hidden border border-black/5 ${fullScreen ? 'h-4' : 'h-2'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isAnalyzing ? 0 : `${calculateRisk()}%` }}
                      className={`h-full transition-all duration-1000 ${calculateRisk() > 60 ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-accent shadow-[0_0_20px_rgba(42,184,113,0.2)]'}`}
                    />
                  </div>
                </div>
                <div className={`mt-6 font-mono uppercase tracking-[0.3em] text-center text-muted/30 font-bold ${fullScreen ? 'text-[11px]' : 'text-[8px]'}`}>
                  Secure Neural Engine Processing
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    triggerHaptic(20);
                    handleAnalyze();
                  }}
                  disabled={isAnalyzing || symptoms.cough === null || symptoms.fever === null}
                  className="flex-[2] bg-white border border-border text-text font-black py-4 rounded-[24px] text-[13px] flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-20 uppercase tracking-tight shadow-sm"
                >
                  <Cpu size={18} className={isAnalyzing ? "animate-spin" : ""} /> 
                  {isAnalyzing ? 'Processing...' : 'Run Bio-AI Analysis'}
                </button>
                <button 
                   onClick={() => {
                    triggerHaptic(10);
                    setScreen('home');
                    setSymptoms({ cough: null, fever: null });
                  }}
                  className="flex-1 bg-black/5 border border-black/5 text-muted font-black py-4 rounded-[24px] text-[13px] active:scale-95 uppercase tracking-tight"
                >
                  Reset
                </button>
              </div>

              <button 
                onClick={() => {
                  triggerHaptic([40, 20, 60]);
                  triggerToast('Referral Protocol Initiated');
                  setScreen('home');
                  setSymptoms({ cough: null, fever: null });
                }}
                disabled={isAnalyzing || calculateRisk() === 0}
                className="w-full bg-accent text-white font-black py-5 rounded-[28px] text-[16px] flex items-center justify-center gap-3 shadow-[0_24px_48px_rgba(42,184,113,0.3)] active:scale-95 transition-all uppercase tracking-tight disabled:opacity-20"
              >
                {t.generateReferral}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <div className={`absolute bottom-6 left-6 right-6 glass-card rounded-[32px] flex justify-around items-center z-50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-t-white ${
        fullScreen ? 'h-24 px-12' : 'h-16 px-6'
      }`} role="navigation" aria-label="App Navigation">
        {[
          { id: 'home', icon: Activity, label: t.home },
          { id: 'patients', icon: Users, label: t.patients },
          { id: 'alerts', icon: Bell, label: t.alerts },
          { id: 'people', icon: User, label: t.people }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => {
              triggerHaptic(15);
              setScreen(item.id);
            }}
            aria-label={item.label}
            aria-current={screen === item.id ? 'page' : undefined}
            className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${screen === item.id ? 'text-accent' : 'text-muted/40 hover:text-text'}`}
          >
            {screen === item.id && (
              <motion.div 
                layoutId="nav-bg"
                className="absolute -inset-x-4 -inset-y-2 bg-accent/10 rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            )}
            <item.icon size={fullScreen ? 28 : 20} className={screen === item.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(42,184,113,0.3)]' : ''} />
            <span className={`${fullScreen ? 'text-[12px]' : 'text-[8px]'} font-bold uppercase tracking-tight`}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-black/5 rounded-full z-50" />
    </motion.div>
  );
};
