import React from "react";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowLeft, BarChart3, BriefcaseBusiness, FileText,
  GitBranch, LayoutDashboard, Target, TrendingUp, UploadCloud
} from "lucide-react";
import Resume from "./Resume";
import GitHubEvidence from "./GitHubEvidence";
import "./student.css";

const nav = [
  {to:"/student", label:"Overview", icon:LayoutDashboard, end:true},
  {to:"/student/resume", label:"Resume Evidence", icon:FileText},
  {to:"/student/evidence", label:"GitHub + LeetCode", icon:GitBranch},
  {to:"/student/market", label:"Market Intelligence", icon:TrendingUp},
];

function Layout({children}:{children:React.ReactNode}) {
  const location=useLocation();
  return <div className="student-shell">
    <aside className="student-sidebar">
      <div className="student-brand"><span className="student-mark">C</span><div><b>Capability<span>Flow</span></b><small>INTELLIGENCE LAYER</small></div></div>
      <nav>{nav.map(item=>{const Icon=item.icon; const active=item.end?location.pathname==="/student":location.pathname.startsWith(item.to); return <Link key={item.to} className={active?"student-nav active":"student-nav"} to={item.to}><Icon size={17}/><span>{item.label}</span></Link>})}</nav>
      <Link className="student-back" to="/"><ArrowLeft size={15}/> Back to home</Link>
    </aside>
    <main className="student-main">{children}</main>
  </div>
}

function Overview(){
 const [market,setMarket]=React.useState<any[]>([]);
 const [loading,setLoading]=React.useState(true);
 React.useEffect(()=>{fetch(`${import.meta.env.VITE_API_URL||"http://127.0.0.1:8000"}/api/market/top-skills?limit=6`).then(r=>r.json()).then(d=>setMarket(d.rows||[])).catch(()=>{}).finally(()=>setLoading(false))},[]);
 const resume=localStorage.getItem("capabilityflow_resume_filename");
 const github=localStorage.getItem("capabilityflow_github_username");
 const leet=localStorage.getItem("capabilityflow_leetcode_username");
 return <div className="student-content">
   <div className="student-top"><div><div className="eyebrow">STUDENT / PROFESSIONAL</div><h1>Build your capability evidence.</h1><p>Move from learning and claims to observable evidence, gaps and opportunity.</p></div><Link className="student-primary" to="/student/resume"><UploadCloud size={17}/> Analyze resume</Link></div>
   <div className="signal-grid">
    <div className="signal-card"><span>RESUME</span><b>{resume?"Connected":"Not analyzed"}</b><small>{resume||"Upload your latest resume"}</small></div>
    <div className="signal-card"><span>GITHUB</span><b>{github?"Connected":"Not analyzed"}</b><small>{github?"@"+github:"Add your GitHub evidence"}</small></div>
    <div className="signal-card"><span>LEETCODE</span><b>{leet?"Connected":"Not analyzed"}</b><small>{leet?"@"+leet:"Add your problem-solving evidence"}</small></div>
    <div className="signal-card"><span>MARKET DATA</span><b>Live dataset</b><small>SAS analytics-job demand context</small></div>
   </div>
   <div className="two-col">
    <section className="panel"><div className="panel-head"><div><span className="panel-kicker">PIPELINE</span><h2>Evidence → Capability → Opportunity</h2></div><BarChart3 size={20}/></div>
      <div className="flow-list">
       {[
        ["01","Resume claims","What you say you can do"],
        ["02","Independent evidence","GitHub + LeetCode signals"],
        ["03","Capability view","Supported / Partial / Unverified"],
        ["04","Market context","Demand and role signals"],
       ].map(([n,t,d])=><div className="flow-row" key={n}><strong>{n}</strong><div><b>{t}</b><small>{d}</small></div></div>)}
      </div>
    </section>
    <section className="panel"><div className="panel-head"><div><span className="panel-kicker">TOP MARKET SIGNALS</span><h2>Skills appearing in demand</h2></div><TrendingUp size={20}/></div>
      {loading?<p className="muted">Loading market data…</p>:market.map((r:any)=><div className="market-row" key={r.skill}><span>{r.skill}</span><b>{r.share_pct}%</b></div>)}
    </section>
   </div>
   <div className="action-strip"><div><BriefcaseBusiness size={20}/><div><b>Ready to test a target role?</b><span>Select a role in Evidence and inspect where your current signals support or leave gaps.</span></div></div><Link to="/student/evidence">Open capability view →</Link></div>
 </div>
}

function Market(){
 const [data,setData]=React.useState<any[]>([]);
 React.useEffect(()=>{fetch(`${import.meta.env.VITE_API_URL||"http://127.0.0.1:8000"}/api/market/capability-flow`).then(r=>r.json()).then(d=>setData(d.rows||[])).catch(()=>{})},[]);
 return <div className="student-content"><div className="student-top"><div><div className="eyebrow">MARKET INTELLIGENCE</div><h1>Capability vs demand context</h1><p>These are aggregate market signals from the supplied SAS analytics datasets—not a personal score.</p></div></div>
 <section className="panel"><div className="panel-head"><div><span className="panel-kicker">CAPABILITY FLOW</span><h2>Observed cohort capability vs market demand</h2></div><Target size={20}/></div>
 <div className="market-table">{data.map((r:any)=><div className="market-table-row" key={r.skill}><b>{String(r.skill).replaceAll("_"," ")}</b><span>Capability proxy {r.capability_score}%</span><span>Market demand {r.market_demand_pct}%</span></div>)}</div></section>
 </div>
}

export default function StudentApp(){
 return <Layout><Routes><Route index element={<Overview/>}/><Route path="resume" element={<Resume/>}/><Route path="evidence" element={<GitHubEvidence/>}/><Route path="market" element={<Market/>}/></Routes></Layout>
}
