import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { Metric } from "../lib/dashboardData";

type MetricStripProps = {
  metrics: Metric[];
};

export default function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <section className="metric-strip" aria-label="Key performance indicators">
      {metrics.map((metric) => {
        const Icon = metric.tone === "good" ? ArrowUpRight : metric.tone === "warn" ? ArrowDownRight : Minus;
        return (
          <article className="metric" key={metric.label}>
            <span className="metric-label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <span className={`metric-delta ${metric.tone ?? "neutral"}`}>
              <Icon size={13} strokeWidth={1.8} aria-hidden="true" />
              {metric.delta}
            </span>
          </article>
        );
      })}
    </section>
  );
}
