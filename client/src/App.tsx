import { ArrowRight, BookOpenCheck, BriefcaseBusiness, FileText, FlaskConical } from "lucide-react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import DomainDashboard from "./components/DomainDashboard";
import Layout from "./components/Layout";
import MetricStrip from "./components/MetricStrip";
import { dashboardData, overviewMetrics } from "./lib/dashboardData";

const modules = [
  { path: "/placements", label: "Placements", icon: BriefcaseBusiness, value: "82.5%", detail: "165 of 200 students placed", signal: "35 students need focused outreach" },
  { path: "/academics", label: "Academics", icon: BookOpenCheck, value: "88.4%", detail: "Department pass rate", signal: "14 students currently at risk" },
  { path: "/projects", label: "Projects", icon: FlaskConical, value: "24", detail: "Active capstone and R&D projects", signal: "3 milestones require review" },
  { path: "/publications", label: "Research Papers", icon: FileText, value: "48", detail: "Publications this calendar year", signal: "45% published in Q1 journals" },
];

function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page overview-page">
      <header className="page-heading overview-heading">
        <div>
          <span className="eyebrow">Department command center</span>
          <h1>Good morning, Mr. Puneet.</h1>
          <p>Four operational areas, one current view of department performance.</p>
        </div>
        <div className="period-control"><span>Last refreshed</span><strong>Today, 09:42</strong></div>
      </header>

      <MetricStrip metrics={overviewMetrics} />

      <section className="module-overview" aria-label="Department workspaces">
        <div className="section-heading"><div><h2>Operational workspaces</h2><p>Open a domain to review trends, risks, and current records.</p></div></div>
        <div className="module-list">
          {modules.map(({ path, label, icon: Icon, value, detail, signal }, index) => (
            <button key={path} className={`module-row module-${index + 1}`} onClick={() => navigate(path)} type="button">
              <span className="module-icon"><Icon size={18} strokeWidth={1.7} /></span>
              <span className="module-copy"><strong>{label}</strong><small>{detail}</small></span>
              <span className="module-value">{value}</span>
              <span className="module-signal">{signal}</span>
              <ArrowRight size={17} className="module-arrow" />
            </button>
          ))}
        </div>
      </section>

      <div className="overview-lower">
        <section className="panel executive-brief">
          <div className="panel-heading"><div><h2>Executive brief</h2><p>Signals that cross workspace boundaries.</p></div><span className="count-badge">3</span></div>
          <div className="brief-list">
            <article><span>01</span><div><strong>Placement momentum is ahead of last year</strong><p>Offer acceptance is up while median compensation has increased by 8%.</p></div></article>
            <article><span>02</span><div><strong>Academic intervention window is open</strong><p>Six of the fourteen flagged students require advisor action this week.</p></div></article>
            <article><span>03</span><div><strong>Funding utilization needs attention</strong><p>Two active grants are below 50% utilization with Q4 closure dates.</p></div></article>
          </div>
        </section>
        <section className="panel compliance-panel">
          <div className="panel-heading"><div><h2>Reporting readiness</h2><p>Coverage of required departmental records.</p></div></div>
          <div className="readiness-score"><strong>86%</strong><span>Core records complete</span></div>
          <div className="readiness-items">
            <div><span>Academic records</span><strong>94%</strong></div>
            <div><span>Placement evidence</span><strong>88%</strong></div>
            <div><span>Research metadata</span><strong>77%</strong></div>
          </div>
          <button className="report-button" type="button">Open compliance coverage <ArrowRight size={15} /></button>
        </section>
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="/placements" element={<DomainDashboard data={dashboardData.placements} />} />
        <Route path="/academics" element={<DomainDashboard data={dashboardData.academics} />} />
        <Route path="/projects" element={<DomainDashboard data={dashboardData.projects} />} />
        <Route path="/publications" element={<DomainDashboard data={dashboardData.publications} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
