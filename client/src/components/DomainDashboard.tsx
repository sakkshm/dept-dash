import { AlertTriangle, ArrowUpRight, CircleCheck, Clock3 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardData } from "../lib/dashboardData";
import MetricStrip from "./MetricStrip";

type DomainDashboardProps = {
  data: DashboardData;
};

const statusIcon = {
  high: AlertTriangle,
  medium: Clock3,
  low: CircleCheck,
};

export default function DomainDashboard({ data }: DomainDashboardProps) {
  return (
    <div className="dashboard-page">
      <header className="page-heading">
        <div>
          <span className="eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
        <div className="period-control" aria-label="Selected reporting period">
          <span>Reporting period</span>
          <strong>{data.period}</strong>
        </div>
      </header>

      <MetricStrip metrics={data.metrics} />

      <div className="analysis-grid">
        <section className="panel trend-panel">
          <div className="panel-heading">
            <div>
              <h2>{data.trendTitle}</h2>
              <p>{data.trendDescription}</p>
            </div>
            <div className="chart-legend" aria-label="Chart legend">
              <span><i className="legend-primary" />Current</span>
              {data.secondaryKey && <span><i className="legend-secondary" />Comparison</span>}
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`fill-${data.primaryKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#73d6a1" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#73d6a1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.055)" vertical={false} />
                <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fill: "#737a82", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#737a82", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#171a1d", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, fontSize: 12 }} />
                {data.secondaryKey && (
                  <Area type="monotone" dataKey={data.secondaryKey} stroke="#596169" strokeWidth={1.5} fill="transparent" strokeDasharray="4 5" />
                )}
                <Area type="monotone" dataKey={data.primaryKey} stroke="#73d6a1" strokeWidth={2} fill={`url(#fill-${data.primaryKey})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel distribution-panel">
          <div className="panel-heading">
            <div>
              <h2>{data.distributionTitle}</h2>
              <p>Share of the current reporting set.</p>
            </div>
          </div>
          <div className="bar-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.distribution} layout="vertical" margin={{ top: 4, right: 20, left: 4, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.045)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={76} tick={{ fill: "#9aa1a9", fontSize: 11 }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,.025)" }} contentStyle={{ background: "#171a1d", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, fontSize: 12 }} />
                <Bar dataKey="value" fill="#73d6a1" radius={[0, 3, 3, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="distribution-list">
            {data.distribution.map((item) => (
              <div key={item.name}><span>{item.name}</span><strong>{item.value}%</strong></div>
            ))}
          </div>
        </section>
      </div>

      <div className="operations-grid">
        <section className="panel attention-panel">
          <div className="panel-heading">
            <div>
              <h2>Needs attention</h2>
              <p>Signals ordered by operational priority.</p>
            </div>
            <span className="count-badge">{data.alerts.length}</span>
          </div>
          <div className="attention-list">
            {data.alerts.map((alert) => {
              const Icon = statusIcon[alert.severity];
              return (
                <article key={alert.title} className={`attention-item ${alert.severity}`}>
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                  <div><strong>{alert.title}</strong><p>{alert.detail}</p></div>
                  <ArrowUpRight size={15} className="attention-arrow" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="panel table-panel">
          <div className="panel-heading">
            <div>
              <h2>{data.tableTitle}</h2>
              <p>Records requiring review in the selected period.</p>
            </div>
            <button className="text-button" type="button">View all <ArrowUpRight size={14} /></button>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr>{data.tableColumns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
              <tbody>
                {data.tableRows.map((row) => (
                  <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{index === row.length - 1 ? <span className="status-cell">{cell}</span> : cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
