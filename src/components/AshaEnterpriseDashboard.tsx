import React from 'react';

export const AshaEnterpriseDashboard = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASHASetu Enterprise Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      /* Premium Fluid Palette */
      --teal-50: #f0fdfa; --teal-100: #ccfbf1; --teal-500: #14b8a6; --teal-600: #0d9488; --teal-700: #0f766e; --teal-950: #042f2e;
      --amber-50: #fffbeb; --amber-100: #fef3c7; --amber-500: #f59e0b; --amber-600: #d97706; --amber-700: #b45309;
      --red-50: #fef2f2; --red-100: #fee2e2; --red-500: #ef4444; --red-600: #dc2626; --red-700: #b91c1c;
      --coral-50: #fff7ed; --coral-500: #f97316; --coral-600: #ea580c;
      
      /* Semantic Structure */
      --bg-main: #f8fafc;
      --bg-card: #ffffff;
      --border-color: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --radius-lg: 16px;
      --radius-md: 12px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
      --shadow-premium: 0 10px 25px -5px rgba(15, 118, 110, 0.05), 0 8px 10px -6px rgba(15, 118, 110, 0.05);
    }

    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* Enterprise App Container Layout */
    .app {
      display: flex;
      min-height: 100vh;
      width: 100%;
    }

    /* Premium Left Navigation Sidebar */
    .sidebar {
      width: 260px;
      background: var(--teal-950);
      color: #fff;
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
      position: fixed;
      height: 100vh;
      z-index: 10;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 12px 32px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .brand-icon {
      background: linear-gradient(135deg, var(--teal-500), var(--teal-700));
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .brand-name { font-weight: 700; font-size: 18px; letter-spacing: -0.5px; }

    .nav-group { margin-top: 24px; display: flex; flex-direction: column; gap: 4px; flex: 1; }

    .ntab {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.65);
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      transition: all 0.2s ease;
    }

    .ntab:hover { color: #fff; background: rgba(255,255,255,0.05); }
    .ntab.active { color: #fff; background: var(--teal-600); box-shadow: var(--shadow-md); }
    .ntab i { font-size: 20px; }

    /* Dashboard Main Stage Layout */
    .main-stage {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* Premium Top Global Header */
    .header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border-color);
      padding: 16px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 9;
    }

    .hdr-title { font-size: 20px; font-weight: 700; color: var(--text-main); letter-spacing: -0.5px; }
    .hdr-sub { color: var(--text-muted); font-size: 12px; margin-top: 2px; font-weight: 400; }
    
    .hdr-right { display: flex; align-items: center; gap: 20px; }
    .hdr-badge { background: var(--red-500); border-radius: 20px; padding: 4px 12px; color: #fff; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
    
    .profile-pill { display: flex; align-items: center; gap: 10px; background: var(--bg-main); padding: 6px 14px; border-radius: 30px; border: 1px solid var(--border-color); }
    .avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--teal-600); display: flex; align-items: center; justify-content: center; font-size: 11px; color: #fff; font-weight: 600; }
    .profile-name { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Core Dynamic Workspace Wrapper */
    .content-wrapper { padding: 40px; max-width: 1200px; width: 100%; margin: 0 auto; flex: 1; }
    .content { display: flex; flex-direction: column; gap: 24px; animation: fadeIn 0.3s ease; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    /* Cards Infrastructure */
    .card { background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color); padding: 24px; box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s; }
    .card-interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-premium); }
    
    .card-teal { background: var(--teal-50); border-color: var(--teal-100); }
    .card-amber { background: var(--amber-50); border-color: var(--amber-100); }
    .card-red { background: var(--red-50); border-color: var(--red-100); }

    .sec-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 8px; margin-top: 12px; }

    /* Grid Layout Frameworks */
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .split-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }

    /* Premium UI Components */
    .chip { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 30px; text-transform: uppercase; letter-spacing: 0.3px; }
    .chip-red { background: var(--red-50); color: var(--red-700); border: 1px solid var(--red-100); }
    .chip-amber { background: var(--amber-50); color: var(--amber-700); border: 1px solid var(--amber-100); }
    .chip-teal { background: var(--teal-50); color: var(--teal-700); border: 1px solid var(--teal-100); }
    .chip-coral { background: var(--coral-50); color: var(--coral-600); border: 1px solid #fed7aa; }

    .flag-box { margin-top: 14px; font-size: 13px; border-radius: var(--radius-md); padding: 12px 16px; display: flex; gap: 10px; align-items: flex-start; line-height: 1.5; }
    .flag-red { background: var(--red-50); color: var(--red-700); border: 1px solid var(--red-100); }
    .flag-amber { background: var(--amber-50); color: var(--amber-700); border: 1px solid var(--amber-100); }

    .progress-bar { height: 6px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 8px; }
    .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }

    .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-muted); background: #f1f5f9; border-radius: var(--radius-md); padding: 12px 16px; border: 1px solid var(--border-color); }

    /* Input & Button Styling */
    .input { width: 100%; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: #fff; font-size: 14px; color: var(--text-main); font-family: inherit; transition: border-color 0.2s; }
    .input:focus { outline: none; border-color: var(--teal-500); box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1); }
    .label { font-size: 13px; font-weight: 600; color: var(--text-main); margin-bottom: 6px; display: block; }

    .btn-group { display: flex; gap: 12px; margin-top: 8px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 20px; border-radius: var(--radius-md); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; border: none; }
    .btn-primary { background: var(--teal-600); color: #fff; }
    .btn-primary:hover { background: var(--teal-700); }
    .btn-secondary { background: #fff; color: var(--text-main); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); }
    .btn-secondary:hover { background: var(--bg-main); border-color: #cbd5e1; }
    .btn-red { background: var(--red-500); color: #fff; }
    .btn-red:hover { background: var(--red-600); }

    /* Interactive Map Grid */
    .map-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(65px, 1fr)); gap: 8px; margin: 16px 0; }
    .map-cell { height: 50px; border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; transition: all 0.2s; }
    .map-cell:hover { transform: scale(1.05); z-index: 2; }

    /* Navigation Back Button Control */
    .hdr-back { background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-color); transition: all 0.2s; }
    .hdr-back:hover { background: var(--bg-main); color: var(--text-main); }

    /* Scan View Styling Optimization */
    .scan-option { cursor: pointer; text-align: left; font-size: 14px; padding: 16px; color: var(--text-main); display: flex; align-items: center; gap: 12px; background: #fff; border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: all 0.2s; width: 100%; margin-bottom: 10px; font-family: inherit;}
    .scan-option:hover { border-color: var(--teal-500); background: var(--teal-50); }
  </style>
</head>
<body>

<div class="app" id="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon"><i class="ti ti-activity-heartbeat"></i></div>
      <div class="brand-name">ASHASetu</div>
    </div>
    <nav class="nav-group" id="bnav"></nav>
  </aside>

  <main class="main-stage">
    <header class="header" id="global-header"></header>
    <div class="content-wrapper">
      <div id="main-content"></div>
    </div>
  </main>
</div>

<script>
const TEAL={50:'#f0fdfa',100:'#ccfbf1',400:'#14b8a6',600:'#0d9488',800:'#0f766e',950:'#042f2e'};
const AMBER={50:'#fffbeb',100:'#fef3c7',400:'#f59e0b',600:'#d97706',800:'#b45309'};
const RED={50:'#fef2f2',100:'#fee2e2',400:'#ef4444',600:'#dc2626',800:'#b91c1c'};
const CORAL={50:'#fff7ed',400:'#f97316',600:'#ea580c'};

let state = {
  tab:'home', sub:null, selB:null, scanStep:0, scanAns:{},
  gType:'', gNote:'', gDone:false, searchQ:'', newB:{name:'',age:'',village:'',cat:'anc',phone:''},
  beneficiaries:[
    {id:1,name:'Sunita Reang',age:24,village:'Raishyabari',cat:'anc',risk:'high',due:'15 Jun 2026',lastVisit:'10 May 2026',weeks:32,bp:'138/90',hb:'9.1',wt:58,visits:3,flag:'Gestational hypertension risk — BP elevated across 2 visits.'},
    {id:2,name:'Priya Tripura',age:19,village:'Nalchar',cat:'anc',risk:'normal',due:'20 Jul 2026',lastVisit:'5 May 2026',weeks:24,bp:'118/76',hb:'11.2',wt:52,visits:2,flag:null},
    {id:3,name:'Ramu Jamatia',age:45,village:'Ambassa',cat:'malaria',risk:'high',lastVisit:'12 May 2026',flag:'Fever 4+ days. High-malaria zone. RDT overdue 6 months.'},
    {id:4,name:'Basanti Reang',age:32,village:'Raishyabari',cat:'tb',risk:'medium',lastVisit:'1 May 2026',flag:'Persistent cough 3 weeks. Refer for sputum test.'},
    {id:5,name:'Kamala Debbarma',age:28,village:'Nalchar',cat:'anc',risk:'normal',due:'10 Aug 2026',lastVisit:'8 May 2026',weeks:20,bp:'116/74',hb:'10.8',wt:55,visits:2,flag:null},
    {id:6,name:'Mohan Tripura',age:38,village:'Ambassa',cat:'immunisation',risk:'low',lastVisit:'3 May 2026',flag:null}
  ],
  incentives:[
    {label:'ANC Visit',icon:'ti-heart',count:12,rate:20,total:240},
    {label:'Immunisation',icon:'ti-vaccine',count:8,rate:40,total:320},
    {label:'JSSK Referral',icon:'ti-ambulance',count:3,rate:50,total:150},
    {label:'TB Suspect Flag',icon:'ti-virus',count:2,rate:100,total:200},
    {label:'Delivery Assist',icon:'ti-baby-carriage',count:4,rate:200,total:800},
    {label:'Malaria RDT',icon:'ti-droplet',count:13,rate:10,total:130}
  ],
  scanQs:[
    {id:'fever',q:'Does the person have fever?',opts:['Yes, 4+ days','Yes, 1–3 days','No']},
    {id:'cough',q:'Is there a persistent cough?',opts:['Yes, 3+ weeks','Yes, under 3 weeks','No']},
    {id:'area',q:'Which district are they from?',opts:['Dhalai (High malaria zone)','South Tripura (High malaria zone)','Other district']},
    {id:'rdt',q:'When was last malaria RDT test?',opts:['Never / Unknown','6+ months ago','Within 3 months']},
    {id:'weight',q:'Is there noticeable weight loss?',opts:['Yes, significant','Slight','No']}
  ],
  grievanceTypes:['App error caused late entry warning','Connectivity failure (not my fault)','PHC was closed during hours','Doctor was absent','Referral not honored by facility','Incorrect AI health flag','Vaccine stock out at sub-centre']
};

const S = (id)=>document.getElementById(id);
const catLabel=(c)=>({anc:'ANC',malaria:'Malaria',tb:'TB Suspect',immunisation:'Immunisation'}[c]||c);
const riskColor=(r)=>r==='high'?RED[400]:r==='medium'?AMBER[400]:TEAL[400];
const riskBg=(r)=>r==='high'?RED[50]:r==='medium'?AMBER[50]:TEAL[50];
const riskLabel=(r)=>r==='high'?'High risk':r==='medium'?'Medium':'Low risk';
const catColor=(c)=>({anc:TEAL[600],malaria:CORAL[600],tb:AMBER[600],immunisation:TEAL[600]}[c]||TEAL[600]);
const totalEarned=()=>state.incentives.reduce((s,i)=>s+i.total,0);
const flaggedCount=()=>state.beneficiaries.filter(b=>b.flag).length;
const highRisk=()=>state.beneficiaries.filter(b=>b.risk==='high').length;

function computeScan(){
  const a=state.scanAns; let m=0,tb=0;
  if(a.fever==='Yes, 4+ days')m+=40; else if(a.fever==='Yes, 1–3 days')m+=15;
  if(a.area&&a.area.includes('High malaria'))m+=30;
  if(a.rdt==='Never / Unknown'||a.rdt==='6+ months ago')m+=20;
  if(a.cough==='Yes, 3+ weeks')tb+=50; else if(a.cough==='Yes, under 3 weeks')tb+=20;
  if(a.weight==='Yes, significant')tb+=35; else if(a.weight==='Slight')tb+=15;
  return{malaria:Math.min(m,95),tb:Math.min(tb,90)};
}

function set(key,val){state[key]=val;render();}
function go(tab,sub=null,selB=null){state.tab=tab;state.sub=sub;state.selB=selB;render();}

function render(){
  const mc=S('main-content');
  mc.innerHTML='';
  let html='';
  const sub=state.sub, tab=state.tab;

  // Build Dynamic Page Content Workspace
  if(sub==='detail'&&state.selB) html=detailScreen(state.selB);
  else if(sub==='add') html=addScreen();
  else if(sub==='emergency') html=emergencyScreen();
  else if(sub==='rights') html=rightsScreen();
  else if(sub==='map') html=mapScreen();
  else if(tab==='home') html=homeScreen();
  else if(tab==='beneficiaries') html=beneScreen();
  else if(tab==='scan') html=scanScreen();
  else if(tab==='incentives') html=incentiveScreen();
  else if(tab==='more') html=moreScreen();

  mc.innerHTML=html;
  renderHeader();
  renderNav();
  attachEvents();
}

function renderHeader() {
  const gh=S('global-header');
  const flagged=flaggedCount();
  let titleText = "Dashboard";
  let showBackBtn = false;
  let backActionStr = 'go("home")';

  if (state.sub === 'detail') {
    const b = state.beneficiaries.find(x=>x.id===state.selB);
    titleText = b ? b.name : 'Beneficiary Profile';
    showBackBtn = true; backActionStr = 'go("beneficiaries")';
  } else if (state.sub === 'add') { titleText = 'Register Beneficiary'; showBackBtn = true; backActionStr = 'go("beneficiaries")'; }
  else if (state.sub === 'emergency') { titleText = 'Emergency SOS Protocol'; showBackBtn = true; backActionStr = 'state.sub=null;render()'; }
  else if (state.sub === 'rights') { titleText = 'Your Data Rights'; showBackBtn = true; backActionStr = 'state.sub=null;render()'; }
  else if (state.sub === 'map') { titleText = 'Village Health Map Analytics'; showBackBtn = true; backActionStr = 'state.sub=null;render()'; }
  else if (state.tab === 'beneficiaries') titleText = 'Families Registry';
  else if (state.tab === 'scan') titleText = 'On-Device AI Health Scan';
  else if (state.tab === 'incentives') titleText = 'Incentives Performance';
  else if (state.tab === 'more') titleText = 'System Settings & Core Tools';

  gh.innerHTML = \`
    <div>
      <div style="display:flex; align-items:center; gap:16px;">
        \${showBackBtn ? \`<button class="hdr-back" onclick='\${backActionStr}'><i class="ti ti-arrow-left"></i></button>\` : ''}
        <div>
          <h1 class="hdr-title">\${titleText}</h1>
          <div class="hdr-sub">ASH-TRP-2847 · Ambassa Block, Dhalai District</div>
        </div>
      </div>
    </div>
    <div class="hdr-right">
      \${flagged > 0 ? \`<div class="hdr-badge">\${flagged} Active Alerts</div>\` : ''}
      <div class="profile-pill">
        <div class="avatar">AN</div>
        <div class="profile-name">Anita Debbarma</div>
      </div>
    </div>
  \`;
}

function homeScreen(){
  const te=totalEarned(), hr=highRisk(), fc=flaggedCount();
  const priority=state.beneficiaries.filter(b=>b.risk==='high');
  return \`
  <div class="content">
    <div class="card card-teal" style="display:flex; justify-content:between; align-items:center; padding:16px 24px;">
      <div>
        <div style="font-size:15px;color:\${TEAL[800]}; font-weight:600">Welcome Back, Anita</div>
        <div style="font-size:13px;color:\${TEAL[600]};margin-top:2px"><i class="ti ti-wifi-off" style="margin-right:4px;"></i> Intelligent Offline Engine Active — 5 records queued safely in local system cache</div>
      </div>
    </div>
    
    <div class="grid-4">
      <div class="card card-interactive"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><i class="ti ti-users" style="font-size:18px;color:\${TEAL[600]}"></i><span style="font-size:13px;font-weight:600;color:var(--text-muted)">Total Mapped</span></div><div style="font-size:28px;font-weight:700">\${state.beneficiaries.length}</div></div>
      <div class="card card-interactive"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><i class="ti ti-alert-triangle" style="font-size:18px;color:\${RED[400]}"></i><span style="font-size:13px;font-weight:600;color:var(--text-muted)">High Risk</span></div><div style="font-size:28px;font-weight:700;color:\${RED[500]}">\${hr}</div></div>
      <div class="card card-interactive"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><i class="ti ti-coin" style="font-size:18px;color AMBER[600]}"></i><span style="font-size:13px;font-weight:600;color:var(--text-muted)">Total Earned</span></div><div style="font-size:28px;font-weight:700;color:\${AMBER[600]}">₹\${te.toLocaleString()}</div></div>
      <div class="card card-interactive"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><i class="ti ti-brain" style="font-size:18px;color:\${CORAL[400]}"></i><span style="font-size:13px;font-weight:600;color:var(--text-muted)">Clinical Insights</span></div><div style="font-size:28px;font-weight:700;color:\${CORAL[400]}">\${fc}</div></div>
    </div>

    <div class="split-layout">
      <div>
        <div class="sec-title">Critical Attention Visits</div>
        \${priority.map(b=>\`
        <div class="card card-interactive" style="margin-bottom:12px; border-left:4px solid \${riskColor(b.risk)}" onclick="go('beneficiaries','detail',\${b.id})">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-weight:600;font-size:15px">\${b.name}</div>
              <div style="font-size:13px;color:var(--text-muted);margin-top:2px">\${b.village} &middot; <span style="color:\${catColor(b.cat)}; font-weight:500;">\${catLabel(b.cat)}</span></div>
            </div>
            <span class="chip chip-red">High Criticality</span>
          </div>
          \${b.flag?\`<div class="flag-box flag-red"><i class="ti ti-brain" style="font-size:15px;flex-shrink:0;"></i><span>\${b.flag}</span></div>\`:''}
        </div>\`).join('')}
      </div>

      <div>
        <div class="sec-title">Smart Workflows</div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <button onclick="go('beneficiaries','add')" class="card card-interactive" style="width:100%; text-align:left; display:flex; align-items:center; gap:14px; padding:16px;"><i class="ti ti-user-plus" style="font-size:22px;color:\${TEAL[600]}"></i><span style="font-size:14px;font-weight:600">Register Case File</span></button>
          <button onclick="go('scan')" class="card card-interactive" style="width:100%; text-align:left; display:flex; align-items:center; gap:14px; padding:16px;"><i class="ti ti-stethoscope" style="font-size:22px;color:\${TEAL[600]}"></i><span style="font-size:14px;font-weight:600">Run Edge AI Diagnosis</span></button>
          <button onclick="go('incentives')" class="card card-interactive" style="width:100%; text-align:left; display:flex; align-items:center; gap:14px; padding:16px;"><i class="ti ti-coin" style="font-size:22px;color:\${AMBER[600]}"></i><span style="font-size:14px;font-weight:600">Claims Ledger</span></button>
          <button onclick="go('home','emergency')" class="card card-interactive" style="width:100%; text-align:left; display:flex; align-items:center; gap:14px; padding:16px; background:\${RED[50]}; border-color:\${RED[100]}"><i class="ti ti-sos" style="font-size:22px;color:\${RED[400]}"></i><span style="font-size:14px;font-weight:600;color:\${RED[800]}">Emergency Broadcast</span></button>
        </div>
      </div>
    </div>
    
    <div class="info-row"><i class="ti ti-cloud-off" style="font-size:15px;"></i><span>No upstream connection detected. System safely tracking structural activity logs for administrative validation compliance.</span></div>
  </div>\`;
}

function beneScreen(){
  const q=state.searchQ.toLowerCase();
  const filtered=state.beneficiaries.filter(b=>b.name.toLowerCase().includes(q)||b.village.toLowerCase().includes(q));
  return \`
  <div class="content">
    <div style="display:flex;gap:16px; align-items:center;">
      <div style="position:relative; flex:1;">
        <input id="search-inp" class="input" style="padding-left:40px;" placeholder="Search families by indexical name, village cluster location..." value="\${state.searchQ}">
        <i class="ti ti-search" style="position:absolute; left:14px; top:14px; color:var(--text-muted)"></i>
      </div>
      <button onclick="go('beneficiaries','add')" class="btn btn-primary"><i class="ti ti-plus"></i> New Intake Registration</button>
    </div>

    <div class="grid-2">
      \${filtered.map(b=>\`
      <div class="card card-interactive" style="border-left:4px solid \${riskColor(b.risk)}" onclick="go('beneficiaries','detail',\${b.id})">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="display:flex;gap:14px;align-items:center">
            <div style="width:40px;height:40px;border-radius:50%;background:\${TEAL[50]};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:\${TEAL[600]}">\${b.name.split(' ').map(n=>n[0]).join('')}</div>
            <div>
              <div style="font-weight:600;font-size:15px">\${b.name}</div>
              <div style="font-size:13px;color:var(--text-muted);margin-top:1px">\${b.age?b.age+' Years old &middot; ':''}\${b.village}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            <span class="chip" style="color:\${catColor(b.cat)}; background:\${catColor(b.cat)}10; border:1px solid \${catColor(b.cat)}30">\${catLabel(b.cat)}</span>
            \${b.risk!=='low'?\`<span class="chip \${b.risk==='high'?'chip-red':'chip-amber'}">\${riskLabel(b.risk)}</span>\`:''}
          </div>
        </div>
        \${b.flag?\`<div class="flag-box \${b.risk==='high'?'flag-red':'flag-amber'}"><i class="ti ti-brain" style="font-size:14px;flex-shrink:0;"></i><span>\${b.flag}</span></div>\`:''}
        <div style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border-color); font-size:12px;color:var(--text-muted); display:flex; justify-content:between;">
          <span>Telemetry Audit: \${b.lastVisit}</span>
          <span>ID: #BST-\${b.id}</span>
        </div>
      </div>\`).join('')}
    </div>
    \${filtered.length===0?\`<div style="text-align:center;padding:60px;color:var(--text-muted);font-size:14px; background:#fff; border-radius:12px; border:1px solid var(--border-color)">No administrative case matches found.</div>\`:''}
  </div>\`;
}

function detailScreen(selId){
  const b=state.beneficiaries.find(x=>x.id===selId);
  if(!b) return '';
  return \`
  <div class="content">
    <div class="split-layout">
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div>
              <h2 style="font-size:22px;font-weight:700">\${b.name}</h2>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px">\${b.age?b.age+' Years old &middot; ':''}\${b.village} \${b.phone?' &middot; '+b.phone:''}</div>
            </div>
            <span class="chip \${b.risk==='high'?'chip-red':b.risk==='medium'?'chip-amber':'chip-teal'}">\${riskLabel(b.risk)} Core Status</span>
          </div>
          <div class="grid-4" style="background:var(--bg-main); padding:16px; border-radius:12px; font-size:13px;">
            <div><span style="color:var(--text-muted); display:block; margin-bottom:2px;">Category</span><strong>\${catLabel(b.cat)}</strong></div>
            <div><span style="color:var(--text-muted); display:block; margin-bottom:2px;">Last Inspection</span><strong>\${b.lastVisit}</strong></div>
            \${b.due?\`<div><span style="color:var(--text-muted); display:block; margin-bottom:2px;">Expected EDD</span><strong>\${b.due}</strong></div>\`:''}
            \${b.weeks?\`<div><span style="color:var(--text-muted); display:block; margin-bottom:2px;">Gestational Age</span><strong>\${b.weeks} Weeks</strong></div>\`:''}
          </div>
        </div>

        \${b.cat==='anc'?\`
        <div class="card">
          <div class="sec-title">Antenatal Clinical Progress Tracks</div>
          <div class="grid-4" style="margin:16px 0;">
            \${\[['Systolic / Diastolic BP',b.bp||'—'],['Haemoglobin Level',b.hb?b.hb+' g/dL':'—'],['Last Tracked Weight',b.wt?b.wt+' kg':'—'],['Inspection Metrics',(b.visits||0)+'/4 Visits']].map(([l,v])=>\`
            <div style="padding:14px;background:var(--bg-main);border-radius:10px; border:1px solid var(--border-color)">
              <div style="font-size:11px;color:var(--text-muted);font-weight:600; text-transform:uppercase; margin-bottom:4px">\${l}</div>
              <div style="font-size:18px;font-weight:700">\${v}</div>
            </div>\`).join('')}
          </div>
          <div style="margin-top:16px;">
            <div style="display:flex;gap:6px;">
              \${[1,2,3,4].map(v=>\`<div style="flex:1;height:6px;border-radius:4px;background:\${v<=(b.visits||0)?TEAL[500]:'#e2e8f0'}"></div>\`).join('')}
            </div>
            <div style="font-size:13px;color:var(--text-muted);margin-top:8px; font-weight:500;">\${b.visits||0} of 4 formal clinical protocol visits achieved.</div>
          </div>
        </div>\`:''}
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        \${b.flag?\`
        <div class="card" style="border-left:4px solid \${riskColor(b.risk)};background:\${b.risk==='high'?RED[50]:AMBER[50]};border-color:\${b.risk==='high'?RED[100]:AMBER[100]}">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
            <i class="ti ti-brain" style="font-size:18px;color:\${b.risk==='high'?RED[500]:AMBER[500]}"></i>
            <span style="font-weight:700;font-size:14px;color:\${b.risk==='high'?RED[800]:AMBER[800]}">Edge Machine Flags</span>
          </div>
          <div style="font-size:13px;color:\${b.risk==='high'?RED[800]:AMBER[800]};line-height:1.5; margin-bottom:14px">\${b.flag}</div>
          <button class="btn btn-secondary" style="width:100%; font-size:12px; padding:8px; color:\${b.risk==='high'?RED[600]:AMBER[600]}"><i class="ti ti-flag-off"></i> Overrule Flag with Audio Memo</button>
        </div>\`:''}

        \${b.due?\`
        <div class="card card-amber" style="padding:16px;">
          <div style="display:flex;gap:10px;align-items:start">
            <i class="ti ti-clock" style="font-size:18px;color:\${AMBER[600]}; margin-top:2px;"></i>
            <div>
              <div style="font-size:13px;font-weight:700;color:\${AMBER[800]}">Inspection Windows Open</div>
              <div style="font-size:12px;color:\${AMBER[600]}; margin-top:2px; line-height:1.4">Scheduled clinical evaluation within 7 open days. Audit: BP, Hb levels, structural foetal metrics.</div>
            </div>
          </div>
        </div>\`:''}

        <div class="card" style="padding:16px; display:flex; flex-direction:column; gap:10px;">
          <button class="btn btn-primary" style="width:100%;"><i class="ti ti-calendar-plus"></i> Record Visit Manifest</button>
          <button class="btn btn-secondary" style="width:100%;"><i class="ti ti-arrow-up-right"></i> Issue PHC Referral Slip</button>
          <button class="btn btn-secondary" style="width:100%; font-size:12px;"><i class="ti ti-download"></i> Archive Case Matrix (PDF)</button>
        </div>
      </div>
    </div>
  </div>\`;
}

function addScreen(){
  return \`
  <div class="content">
    <div class="card" style="max-width:600px; margin: 0 auto; width:100%;">
      <div style="margin-bottom:20px">
        <label class="label">Legal Full Name</label>
        <input id="nb-name" class="input" type="text" placeholder="e.g. Sunita Reang" value="\${state.newB.name}">
      </div>
      <div class="grid-2" style="margin-bottom:20px">
        <div>
          <label class="label">Chronological Age</label>
          <input id="nb-age" class="input" type="number" placeholder="e.g. 24" value="\${state.newB.age}">
        </div>
        <div>
          <label class="label">Village Cluster</label>
          <input id="nb-village" class="input" type="text" placeholder="e.g. Raishyabari" value="\${state.newB.village}">
        </div>
      </div>
      <div style="margin-bottom:20px">
        <label class="label">Secure Phone Number (Optional)</label>
        <input id="nb-phone" class="input" type="tel" placeholder="e.g. 98625XXXXX" value="\${state.newB.phone}">
      </div>
      <div style="margin-bottom:24px">
        <label class="label">Primary Diagnosis Classification</label>
        <select id="nb-cat" class="input">
          <option value="anc" \${state.newB.cat==='anc'?'selected':''}>ANC (Maternal Care)</option>
          <option value="malaria" \${state.newB.cat==='malaria'?'selected':''}>Malaria Vector Monitor</option>
          <option value="tb" \${state.newB.cat==='tb'?'selected':''}>TB Respiratory Registry</option>
          <option value="immunisation" \${state.newB.cat==='immunisation'?'selected':''}>Routine Infant Immunisation</option>
        </select>
      </div>
      <div class="info-row" style="margin-bottom:20px;"><i class="ti ti-wifi-off"></i><span>Offline Entry Lock. Local ABHA cryptographic identities are auto-generated. Sync execution automatically cascades when network binds.</span></div>
      <button id="save-btn" class="btn btn-primary" style="width:100%;"><i class="ti ti-device-floppy"></i> Lock System Record to Device Cache</button>
    </div>
  </div>\`;
}

function scanScreen(){
  const qs=state.scanQs, step=state.scanStep;
  if(step<qs.length){
    const q=qs[step], pct=Math.round(((step+1)/qs.length)*100);
    return \`
    <div class="content" style="max-width:650px; margin: 0 auto; width:100%;">
      <div class="card card-teal" style="margin-bottom:12px;">
        <div style="font-size:12px;color:\${TEAL[600]};font-weight:600; margin-bottom:6px">Evaluation Engine Step \${step+1} of \${qs.length} &middot; Secure Decentralized Sandbox Inference</div>
        <div class="progress-bar" style="margin-bottom:14px"><div class="progress-fill" style="width:\${pct}%;background:\${TEAL[500]}"></div></div>
        <h3 style="font-size:18px;font-weight:700;color:\${TEAL[950]}">\${q.q}</h3>
      </div>
      <div style="display:flex; flex-direction:column; margin-bottom:16px;">
        \${q.opts.map((opt,i)=>\`
        <button class="scan-option" onclick="state.scanAns['\${q.id}']='\${opt}';state.scanStep=\${step+1};render()">
          <i class="ti ti-circle" style="color:var(--border-color)"></i> \${opt}
        </button>\`).join('')}
      </div>
      \${step>0?\`<button class="btn btn-secondary" onclick="state.scanStep=\${step-1};render()"><i class="ti ti-arrow-left"></i> Previous Question</button>\`:''}
    </div>\`;
  } else {
    const r=computeScan();
    return \`
    <div class="content" style="max-width:700px; margin: 0 auto; width:100%;">
      <div class="card card-teal" style="text-align:center;padding:24px">
        <i class="ti ti-brain" style="font-size:36px;color:\${TEAL[600]}"></i>
        <h2 style="font-size:18px;font-weight:700;color:\${TEAL[800]};margin-top:8px">Neural Diagnostics Synthesized Successfully</h2>
        <div style="font-size:13px;color:\${TEAL[600]};margin-top:4px">Calculated via architectural on-device core processing matrices. No data leaves the regional perimeter.</div>
      </div>
      
      \${r.malaria>20?\`
      <div class="card" style="border-left:4px solid \${r.malaria>55?RED[500]:AMBER[500]}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-weight:700;font-size:14px">Vector Malaria Risk Probability</div>
          <span class="chip \${r.malaria>55?'chip-red':'chip-amber'}">\${r.malaria}% Score &mdash; \${r.malaria>55?'Critical Severity':'Elevated Risk'}</span>
        </div>
        <div class="progress-bar" style="margin-bottom:12px"><div class="progress-fill" style="width:\${r.malaria}%;background:\${r.malaria>55?RED[500]:AMBER[500]}"></div></div>
        <div style="font-size:13px;color:var(--text-muted);line-height:1.5"><strong>Diagnostic Vectors triggered:</strong> \${state.scanAns.fever?.includes('4+')?'Persistent systemic febrile state (4+ days). ':''}\${state.scanAns.area?.includes('High')?'Geographic hotspot endemic zone overlap. ':''}\${state.scanAns.rdt!=='Within 3 months'?'RDT timeline deficit.':''}</div>
        \${r.malaria>55?\`<div style="margin-top:14px;font-size:13px;color:\${RED[800]};font-weight:600;background:\${RED[50]};padding:10px 14px;border-radius:8px; border:1px solid var(--red-100)"><i class="ti ti-clock-hour-3"></i> Absolute Clinical Window Notice: Accelerate safe PHC clinical routing mechanisms within 72 hours.</div>\`:''}
      </div>\`:''}

      \${r.tb>20?\`
      <div class="card" style="border-left:4px solid \${r.tb>55?RED[500]:AMBER[500]}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-weight:700;font-size:14px">Respiratory Screening Probability Index</div>
          <span class="chip \${r.tb>55?'chip-red':'chip-amber'}">\${r.tb}% Score &mdash; \${r.tb>55?'Suspect Active':'Observation Status'}</span>
        </div>
        <div class="progress-bar" style="margin-bottom:12px"><div class="progress-fill" style="width:\${r.tb}%;background:\${r.tb>55?RED[500]:AMBER[500]}"></div></div>
        <div style="font-size:13px;color:var(--text-muted);line-height:1.5"><strong>Diagnostic Vectors triggered:</strong> \${state.scanAns.cough?.includes('3+ weeks')?'Prolonged respiratory tract irritation (3+ weeks). ':''}\${state.scanAns.weight?.includes('significant')?'Uncontrolled symptomatic somatic mass reduction.':''}</div>
      </div>\`:''}

      \${r.malaria<=20&&r.tb<=20?\`<div class="card card-teal"><div style="display:flex;gap:12px;align-items:center"><i class="ti ti-circle-check" style="font-size:24px;color:\${TEAL[500]}"></i><div><div style="font-weight:700;font-size:14px;color:\${TEAL[800]}">Negative Clinical Threshold Reached</div><div style="font-size:13px;color:\${TEAL[600]}">No active metrics exceed regional warning limits. Keep tracking parameters during routine community reviews.</div></div></div></div>\`:''}

      <div class="btn-group">
        <button class="btn btn-primary" style="flex:1;"><i class="ti ti-file-download"></i> Export Formal PDF Referral Manifest</button>
        <button class="btn btn-secondary" onclick="state.scanStep=0;state.scanAns={};render()"><i class="ti ti-refresh"></i> Execute New Diagnosis</button>
      </div>
    </div>\`;
  }
}

function incentiveScreen(){
  const te=totalEarned(), target=2500, pct=Math.min(Math.round((te/target)*100),100);
  return \`
  <div class="content">
    <div class="card" style="background:linear-gradient(135deg, var(--teal-700), var(--teal-950)); border:none; padding:32px; color:#fff;">
      <div style="font-size:13px;color:rgba(255,255,255,0.7); font-weight:600; text-transform:uppercase; letter-spacing:1px;">Consolidated Statement Ledger &middot; May 2026</div>
      <div style="font-size:42px;font-weight:700;color:#fff;margin-top:6px; letter-spacing:-1px;">₹\${te.toLocaleString()}</div>
      <div style="height:6px;background:rgba(255,255,255,0.15);border-radius:4px;margin:20px 0 8px">
        <div style="height:100%;width:\${pct}%;background:var(--teal-400);border-radius:4px"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.7); font-weight:500;">
        <span>Performance Tracker: \${pct}% of regional target (₹\${target.toLocaleString()})</span>
        <span>Gap Metric: ₹\${(target-te).toLocaleString()} remaining</span>
      </div>
    </div>

    <div class="card card-amber" style="padding:16px 24px;"><div style="display:flex;gap:12px;align-items:center"><i class="ti ti-comet" style="font-size:20px;color:\${AMBER[600]}"></i><div style="font-size:14px;color:\${AMBER[800]}"><strong>Administrative Optimization Metric:</strong> System operations achieved <strong>18 performance hours saved</strong> compared to classical analogue workflows.</div></div></div>

    <div class="sec-title">Activity Breakdown Ledger</div>
    <div class="grid-2">
      \${state.incentives.map(item=>\`
      <div class="card" style="padding:16px 20px;">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;gap:12px;align-items:center">
            <div style="width:36px; height:36px; background:var(--teal-50); border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="\${item.icon}" style="font-size:18px;color:\${TEAL[600]}"></i></div>
            <div>
              <div style="font-size:14px;font-weight:700">\${item.label}</div>
              <div style="font-size:12px;color:var(--text-muted); margin-top:1px">\${item.count} Actions Logging &times; Verified Rate (₹\${item.rate})</div>
            </div>
          </div>
          <div style="font-weight:700;font-size:16px;color:var(--teal-700)">₹\${item.total}</div>
        </div>
      </div>\`).join('')}
    </div>

    <div class="card" style="border-top:2px solid var(--teal-600); background:#fff;">
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700">
        <span>Verified Disbursable Balance Summary</span><span style="color:var(--teal-700)">₹\${te.toLocaleString()}</span>
      </div>
    </div>
    
    <div class="btn-group">
      <button class="btn btn-secondary"><i class="ti ti-download"></i> Download Local Ledger Statement (PDF)</button>
      <button class="btn btn-secondary"><i class="ti ti-file-certificate"></i> Generate Verified Work Attestation</button>
    </div>
  </div>\`;
}

function moreScreen(){
  if(state.sub==='emergency') return emergencyScreen();
  if(state.sub==='rights') return rightsScreen();
  if(state.sub==='map') return mapScreen();
  const gd=state.gDone;
  return \`
  <div class="content">
    <div class="grid-4">
      \${\[['Village Area Matrix','ti-map','map',false],['Worker Data Charter','ti-shield-check','rights',false],['System Hardware Log','ti-wifi-off',null,false],['Emergency Broadcast Protocol','ti-sos','emergency',true]].map(([l,ic,s,isDanger])=>\`
      <button onclick="\${s?\`state.sub='\${s}';render()\`:'null'}" class="card card-interactive" style="text-align:left; width:100%; display:flex; flex-direction:column; gap:12px; background:\${isDanger?RED[50]:'#fff'}; border-color:\${isDanger?RED[100]:'var(--border-color)'};">
        <div style="width:40px; height:40px; background:\${isDanger?RED[100]:varColor(TEAL[50])}; border-radius:10px; display:flex; align-items:center; justify-content:center;"><i class="ti \${ic}" style="font-size:22px;color:\${isDanger?RED[500]:TEAL[600]}"></i></div>
        <span style="font-size:14px;font-weight:700;color:\${isDanger?RED[800]:'var(--text-main)'}">\${l}</span>
      </button>\`).join('')}
    </div>

    <div class="sec-title">File Administrative Grievance (Encrypted Offline Vault)</div>
    \${gd?\`
    <div class="card card-teal" style="text-align:center;padding:32px 24px; max-width:600px; margin: 0 auto; width:100%;">
      <i class="ti ti-circle-check" style="font-size:36px;color:\${TEAL[500]}"></i>
      <div style="font-weight:700;font-size:16px;color:\${TEAL[800]};margin-top:12px">Grievance Stored in Offline Vault</div>
      <div style="font-size:13px;color:\${TEAL[600]};margin-top:4px">Cryptographic Tracking Reference: <strong>GRV-\${Math.floor(Math.random()*9000+1000)}</strong></div>
      <div style="font-size:13px;color:var(--text-muted);margin-top:4px">Packet scheduled for priority supervisor queuing immediately upon network attachment detection.</div>
      <button class="btn btn-secondary" style="margin-top:20px;" onclick="state.gDone=false;state.gType='';state.gNote='';render()">Draft Secondary Grievance</button>
    </div>\`:
    \`<div class="card" style="max-width:600px; margin:0 auto; width:100%;">
      <div style="margin-bottom:16px">
        <label class="label">Dispute Operational Classification</label>
        <select id="g-type" class="input">
          <option value="">Select organizational fault vector...</option>
          \${state.grievanceTypes.map(g=>\`<option value="\${g}" \${state.gType===g?'selected':''}>\${g}</option>\`).join('')}
        </select>
      </div>
      <div style="margin-bottom:16px">
        <label class="label">Incident Deposition Details</label>
        <textarea id="g-note" rows="4" class="input" style="resize:none;" placeholder="Provide explicit contextual narrative evidence logs...">\${state.gNote}</textarea>
      </div>
      <div class="info-row" style="margin-bottom:20px;"><i class="ti ti-map-pin"></i><span>Hardware Stamp: Ambassa Block Axis &middot; \${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})} IST &middot; Embedded Chronomarker Signature Attached</span></div>
      <button id="g-submit" class="btn btn-primary" style="width:100%;"><i class="ti ti-send"></i> Seal and Cache Grievance Package</button>
    </div>\`}
  </div>\`;
}

// Internal programmatic utility helper mapping variables dynamically
function varColor(v){ return v;}

function emergencyScreen(){
  return \`
  <div class="content" style="max-width:650px; margin: 0 auto; width:100%;">
    <div class="card card-red" style="text-align:center;padding:24px">
      <i class="ti ti-sos" style="font-size:42px;color:\${RED[500]}"></i>
      <h2 style="font-weight:700;font-size:18px;color:\${RED[800]};margin-top:10px">Emergency Broadcast Protocols Initialized</h2>
      <div style="font-size:13px;color:\${RED[600]};margin-top:4px; line-height:1.5">Locational telemetry markers, chronological timestamps, and secure local audio memos are compiled inside a high-priority structural buffer addressed to regional ANM + PHC infrastructure layers.</div>
    </div>
    
    <div class="sec-title">Operational Emergency Vector Select</div>
    <div style="display:flex; flex-direction:column; gap:8px;">
      \${\['Obstetric Emergency Crisis','Severe Vector Malaria Index','Acute Haemorrhagic Incident','Critical Anemic Failure Syndrome','Road Safety / Physical Accident Trauma','Unclassified Urgent Medical Hazard'].map(t=>\`
      <button class="card card-interactive" style="padding:14px 20px;text-align:left;font-size:14px;font-weight:600;color:\${RED[800]};border-color:\${RED[100]};background:\${RED[50]};display:flex;align-items:center;gap:12px; margin-bottom:0;">
        <i class="ti ti-alert-triangle" style="font-size:16px;color:\${RED[500]}"></i> \${t}
      </button>\`).join('')}
    </div>

    <div class="card">
      <div style="font-size:13px;font-weight:600;color:var(--text-main);margin-bottom:10px">Secure 60-Second Audio Evidence Matrix</div>
      <button class="btn btn-secondary" style="color:\${RED[600]};border-color:\${RED[200]}; width:100%;"><i class="ti ti-microphone"></i> Press and Engage Emergency Dictation Memo</button>
    </div>
    <button class="btn btn-red" style="width:100%; padding:14px;"><i class="ti ti-send"></i> Route Protocol Package Instantly Upon Link Validation</button>
  </div>\`;
}

function rightsScreen(){
  const rights=[
    ['ti-eye-off','Opaque Performance Management Guardrails','Your localized metrics never serve upstream algorithmic calculation pipelines targeting internal performance grading matrices without explicit consent protocols.'],
    ['ti-flag-off','Systemic Machine Diagnosis Refusal Right','You hold absolute procedural authority to override or counter automated system flags instantly via attached local voice annotations.'],
    ['ti-wifi-off','Zero-Fault Connectivity Guarantees','Physical telemetry connection dropping matrices register autonomously as institutional platform errors — avoiding structural fault attribution.'],
    ['ti-eye','Totalized Operational Transparency Matrix','You retain standard configuration access logs mirroring all visibility perspectives accessible to higher supervisory tiers.'],
    ['ti-download','Immutable Ledger Export Freedom','Your historical performance ledger is fully independent and available for cryptographic local PDF extraction on demand.']
  ];
  return \`
  <div class="content" style="max-width:750px; margin:0 auto; width:100%;">
    <div class="card card-teal" style="text-align:center;padding:24px">
      <i class="ti ti-shield-check" style="font-size:32px;color:\${TEAL[500]}"></i>
      <h2 style="font-size:18px;font-weight:700;color:\${TEAL[800]};margin-top:8px">Frontline Practitioner Data Bill of Rights</h2>
      <div style="font-size:13px;color:\${TEAL[600]};margin-top:4px">Five structured organizational rules protecting worker agency. Non-negotiable structural provisions.</div>
    </div>
    
    \${rights.map(([ic,title,desc],i)=>\`
    <div class="card" style="display:flex;gap:16px;align-items:flex-start">
      <div style="width:40px;height:40px;border-radius:10px;background:\${TEAL[50]};display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="ti \${ic}" style="font-size:18px;color:\${TEAL[600]}"></i>
      </div>
      <div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px; color:var(--text-main)">\${i+1}. \${title}</div>
        <div style="font-size:13px;color:var(--text-muted);line-height:1.6">\${desc}</div>
      </div>
    </div>\`).join('')}
  </div>\`;
}

function mapScreen(){
  const grid=Array.from({length:36},(_,i)=>{const s=(i*7+13)%100;return s<12?'high':s<28?'due':s<40?'medium':'ok'});
  return \`
  <div class="content">
    <div class="split-layout">
      <div>
        <div class="card card-teal" style="margin-bottom:16px;">
          <div style="font-size:14px;color:\${TEAL[800]}; font-weight:600">Active Sector Mapping: Raishyabari Zone</div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">148 Residential footprints checked &middot; <strong>\${grid.filter(x=>x==='high').length} Targets Flagged High Criticality</strong></div>
        </div>
        
        <div class="card">
          <div style="display:flex;gap:16px;margin-bottom:16px;font-size:12px; font-weight:600;">
            \${\[['#fff','var(--border-color)','Compliant Tracking Metrics'],[AMBER[50],AMBER[400],'Intake Windows Due'],[RED[50],RED[400],'Urgent Strategic Outliers']].map(([bg,b,l])=>\`<div style="display:flex;align-items:center;gap:6px"><div style="width:14px;height:14px;border-radius:4px;background:\${bg};border:1.5px solid \${b}"></div><span style="color:var(--text-muted)">\${l}</span></div>\`).join('')}
          </div>
          
          <div class="map-grid">
            \${grid.map((status,i)=>\`<div class="map-cell" title="Residential Compound Matrix \${i+1}" style="background:\${status==='high'?RED[50]:status==='due'?AMBER[50]:status==='medium'?AMBER[50]:'#fff'};border:1.5px solid \${status==='high'?RED[400]:status==='due'?AMBER[400]:status==='medium'?AMBER[400]:'var(--border-color)'};color:\${status==='high'?RED[800]:status==='due'?AMBER[800]:'var(--text-muted)'}">H-\${i+1}</div>\`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="height:100%;">
          <div style="font-size:14px;font-weight:700;margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted)">Algorithmic Spatial Routing</div>
          <div style="font-size:13px;color:var(--text-main);line-height:1.6; margin-bottom:12px;">The optimal spatial routing array prioritizes immediate parameters at compound blocks: <strong style="color:var(--red-600)">\${grid.map((s,i)=>s==='high'?i+1:null).filter(Boolean).map(n=>'H-'+n).join(', ')}</strong>.</div>
          <div style="font-size:13px;color:var(--text-muted);line-height:1.6;">Following clinical verification sweeps, loop vectors suggest secondary tracking metrics. <br><br><strong>Estimated Path Distance:</strong> 4.2 Linear Kilometers.</div>
        </div>
      </div>
    </div>
  </div>\`;
}

function renderNav(){
  const tabs=[{id:'home',ic:'ti-smart-home',l:'Dashboard Home'},{id:'beneficiaries',ic:'ti-users',l:'Families Registry'},{id:'scan',ic:'ti-stethoscope',l:'AI Diagnostic Engine'},{id:'incentives',ic:'ti-coin',l:'Claims & Incentives'},{id:'more',ic:'ti-adjustments',l:'Core Utilities'}];
  const bnav=S('bnav');
  bnav.innerHTML=tabs.map(t=>\`<button class="ntab\${state.tab===t.id&&!state.sub?' active':''}" onclick="state.tab='\${t.id}';state.sub=null;state.searchQ='';render()"><i class="ti \${t.ic}"></i><span>\${t.l}</span></button>\`).join('');
}

function attachEvents(){
  const si=S('search-inp');
  if(si) si.oninput=e=>{state.searchQ=e.target.value;render()};
  const sb=S('save-btn');
  if(sb) sb.onclick=()=>{
    const n=S('nb-name')?.value||'', a=S('nb-age')?.value||'', v=S('nb-village')?.value||'', c=S('nb-cat')?.value||'anc', p=S('nb-phone')?.value||'';
    if(n&&a&&v){state.beneficiaries.push({id:Date.now(),name:n,age:parseInt(a),village:v,cat:c,phone:p,risk:'normal',lastVisit:'Not yet visited',flag:null});state.newB={name:'',age:'',village:'',cat:'anc',phone:''};go('beneficiaries');}
  };
  const gs=S('g-submit');
  if(gs) gs.onclick=()=>{const t=S('g-type')?.value;if(t){state.gDone=true;render();}};
  const gt=S('g-type');
  if(gt) gt.onchange=e=>state.gType=e.target.value;
  const gn=S('g-note');
  if(gn) gn.oninput=e=>state.gNote=e.target.value;
}

window.go=(tab,sub=null,selId=null)=>{
  state.tab=tab;
  state.sub=sub;
  if(selId) state.selB=selId;
  if(tab==='scan'&&sub===null){state.scanStep=0;state.scanAns={};}
  render();
};

render();
</script>
</body>
</html>
  `;

  return (
    <div className="w-full h-full min-h-[600px] bg-white rounded-[32px] overflow-hidden shadow-2xl border border-border">
      <iframe 
        srcDoc={htmlContent} 
        title="ASHASetu Enterprise Dashboard" 
        className="w-full h-full border-none"
        style={{ height: 'calc(100vh - 80px)', minHeight: '800px' }}
      />
    </div>
  );
};
