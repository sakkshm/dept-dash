export type DashboardKey = "overview" | "placements" | "academics" | "projects" | "publications";

export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone?: "good" | "warn" | "neutral";
};

export type DashboardData = {
  eyebrow: string;
  title: string;
  description: string;
  period: string;
  metrics: Metric[];
  trendTitle: string;
  trendDescription: string;
  trend: Array<Record<string, string | number>>;
  primaryKey: string;
  secondaryKey?: string;
  distributionTitle: string;
  distribution: Array<{ name: string; value: number }>;
  alerts: Array<{ title: string; detail: string; severity: "high" | "medium" | "low" }>;
  tableTitle: string;
  tableColumns: string[];
  tableRows: string[][];
};

export const dashboardData: Record<Exclude<DashboardKey, "overview">, DashboardData> = {
  placements: {
    eyebrow: "Career outcomes",
    title: "Placements",
    description: "Recruitment velocity, compensation movement, and focused action for the unplaced cohort.",
    period: "Batch 2022-2026",
    metrics: [
      { label: "Students placed", value: "82.5%", delta: "+6.2% vs last batch", tone: "good" },
      { label: "Total offers", value: "178", delta: "165 unique students", tone: "neutral" },
      { label: "Median CTC", value: "₹12.5L", delta: "+8.0% year over year", tone: "good" },
      { label: "Highest CTC", value: "₹42L", delta: "Product engineering", tone: "neutral" },
    ],
    trendTitle: "Offer velocity",
    trendDescription: "Offers accepted through the active recruitment cycle.",
    trend: [
      { period: "Aug", offers: 12, prior: 8 }, { period: "Sep", offers: 31, prior: 20 },
      { period: "Oct", offers: 54, prior: 37 }, { period: "Nov", offers: 42, prior: 40 },
      { period: "Dec", offers: 24, prior: 31 }, { period: "Jan", offers: 15, prior: 12 },
    ],
    primaryKey: "offers",
    secondaryKey: "prior",
    distributionTitle: "Offers by sector",
    distribution: [
      { name: "Product", value: 46 }, { name: "Services", value: 31 }, { name: "Core IT", value: 15 }, { name: "Consulting", value: 8 },
    ],
    alerts: [
      { title: "35 students remain unplaced", detail: "18 list Java as a core skill; 12 list Python.", severity: "high" },
      { title: "System design gap is recurring", detail: "Mentioned in 9 of the latest 17 recruiter reviews.", severity: "medium" },
      { title: "Two drives this week", detail: "CloudKite on Tuesday and Northstar Systems on Friday.", severity: "low" },
    ],
    tableTitle: "Upcoming recruitment drives",
    tableColumns: ["Company", "Role", "Date", "Eligible", "Status"],
    tableRows: [
      ["CloudKite", "Platform engineer", "18 Aug", "64", "Confirmed"],
      ["Northstar Systems", "Graduate analyst", "21 Aug", "92", "Confirmed"],
      ["Aster Networks", "Network engineer", "26 Aug", "41", "Pending"],
      ["Morrow Labs", "Software engineer", "02 Sep", "73", "Invited"],
    ],
  },
  academics: {
    eyebrow: "Student performance",
    title: "Academics",
    description: "Teaching progress, grade outcomes, and early signals that need faculty intervention.",
    period: "Even semester 2026",
    metrics: [
      { label: "Pass rate", value: "88.4%", delta: "+3.2% year over year", tone: "good" },
      { label: "Average CGPA", value: "7.42", delta: "+0.18 this semester", tone: "good" },
      { label: "At-risk students", value: "14", delta: "6 require immediate review", tone: "warn" },
      { label: "Syllabus completion", value: "76%", delta: "3% behind plan", tone: "warn" },
    ],
    trendTitle: "Pass-rate movement",
    trendDescription: "Department pass rate over the last six semesters.",
    trend: [
      { period: "Odd 23", rate: 81, target: 85 }, { period: "Even 24", rate: 83, target: 85 },
      { period: "Odd 24", rate: 84, target: 86 }, { period: "Even 25", rate: 85, target: 86 },
      { period: "Odd 25", rate: 87, target: 87 }, { period: "Even 26", rate: 88.4, target: 88 },
    ],
    primaryKey: "rate",
    secondaryKey: "target",
    distributionTitle: "CGPA distribution",
    distribution: [
      { name: "9.0+", value: 12 }, { name: "8.0-8.9", value: 34 }, { name: "7.0-7.9", value: 41 }, { name: "Below 7", value: 13 },
    ],
    alerts: [
      { title: "CS-301 needs intervention", detail: "8 students have attendance below 60% and failed Quiz 1.", severity: "high" },
      { title: "EC-202 is two weeks behind", detail: "Actual syllabus delivery is 11% below the planned curve.", severity: "medium" },
      { title: "Advisory reviews due", detail: "Four faculty advisor notes are pending for this cycle.", severity: "low" },
    ],
    tableTitle: "Course delivery watchlist",
    tableColumns: ["Course", "Faculty", "Progress", "Pass rate", "Signal"],
    tableRows: [
      ["CS-301 Data Structures", "Dr. Meera Nair", "68%", "74%", "Critical"],
      ["EC-202 Signals", "Prof. R. Menon", "61%", "82%", "Behind plan"],
      ["IT-304 Cloud Systems", "Dr. Kabir Shah", "79%", "91%", "On track"],
      ["IT-310 Information Security", "Prof. Leena Rao", "77%", "89%", "On track"],
    ],
  },
  projects: {
    eyebrow: "Execution and funding",
    title: "Projects",
    description: "Capstone and R&D delivery, grant utilization, milestones, and the department IP pipeline.",
    period: "Academic year 2025-26",
    metrics: [
      { label: "Active projects", value: "24", delta: "14 capstone, 10 R&D", tone: "neutral" },
      { label: "Approved grants", value: "₹1.2Cr", delta: "10 funded projects", tone: "good" },
      { label: "Budget utilized", value: "67%", delta: "₹80.4L recorded", tone: "neutral" },
      { label: "Milestones at risk", value: "3", delta: "One due within 12 days", tone: "warn" },
    ],
    trendTitle: "Grant utilization",
    trendDescription: "Approved, disbursed, and utilized funds by quarter in lakhs.",
    trend: [
      { period: "Q1", approved: 28, utilized: 11 }, { period: "Q2", approved: 36, utilized: 23 },
      { period: "Q3", approved: 31, utilized: 27 }, { period: "Q4", approved: 25, utilized: 19.4 },
    ],
    primaryKey: "approved",
    secondaryKey: "utilized",
    distributionTitle: "Project portfolio",
    distribution: [
      { name: "Capstone", value: 14 }, { name: "Sponsored R&D", value: 6 }, { name: "Internal R&D", value: 4 },
    ],
    alerts: [
      { title: "DST Phase 2 due in 12 days", detail: "Utilization certificate and milestone report are pending.", severity: "high" },
      { title: "Two grants below 50% utilization", detail: "Both funding windows close before the end of Q4.", severity: "medium" },
      { title: "Patent review scheduled", detail: "Three provisional filings move to committee review Friday.", severity: "low" },
    ],
    tableTitle: "Critical milestones",
    tableColumns: ["Initiative", "Lead", "Due", "Utilized", "Status"],
    tableRows: [
      ["Adaptive Traffic Grid", "Dr. Kavya Iyer", "29 Aug", "71%", "At risk"],
      ["Secure Edge Lab", "Prof. Dev Arora", "05 Sep", "48%", "Needs review"],
      ["Campus Digital Twin", "Dr. Nikhil Sen", "12 Sep", "82%", "On track"],
      ["Multilingual OCR", "Prof. Asha Pillai", "20 Sep", "64%", "On track"],
    ],
  },
  publications: {
    eyebrow: "Scholarly output",
    title: "Research Papers",
    description: "Publication quality, indexing coverage, citation impact, and faculty contribution.",
    period: "Calendar year 2026",
    metrics: [
      { label: "Publications", value: "48", delta: "+12 from 2025", tone: "good" },
      { label: "Total citations", value: "1,240", delta: "+18.6% year over year", tone: "good" },
      { label: "Department h-index", value: "18", delta: "+2 this year", tone: "good" },
      { label: "Q1 share", value: "45%", delta: "22 indexed papers", tone: "neutral" },
    ],
    trendTitle: "Citation growth",
    trendDescription: "Department citations and publication volume over six years.",
    trend: [
      { period: "2021", citations: 520, papers: 24 }, { period: "2022", citations: 640, papers: 29 },
      { period: "2023", citations: 770, papers: 31 }, { period: "2024", citations: 890, papers: 36 },
      { period: "2025", citations: 1045, papers: 36 }, { period: "2026", citations: 1240, papers: 48 },
    ],
    primaryKey: "citations",
    secondaryKey: "papers",
    distributionTitle: "Journal quality",
    distribution: [
      { name: "Q1", value: 45 }, { name: "Q2", value: 30 }, { name: "Q3", value: 17 }, { name: "Q4", value: 8 },
    ],
    alerts: [
      { title: "Six records need DOI review", detail: "Metadata validation failed against the current DOI format.", severity: "medium" },
      { title: "Scopus sync is pending", detail: "Eight accepted papers await indexing confirmation.", severity: "low" },
      { title: "Q1 output is above target", detail: "The department reached 45% against a 40% annual goal.", severity: "low" },
    ],
    tableTitle: "Top faculty contributors",
    tableColumns: ["Faculty", "Papers", "Q1 / Q2", "Citations", "Impact"],
    tableRows: [
      ["Dr. Ananya Sharma", "7", "4 / 2", "184", "Leading"],
      ["Dr. Rohan Patel", "6", "2 / 3", "152", "Strong"],
      ["Prof. Meera Nair", "5", "3 / 1", "129", "Strong"],
      ["Dr. Kabir Shah", "4", "2 / 2", "96", "Growing"],
    ],
  },
};

export const overviewMetrics: Metric[] = [
  { label: "Placement rate", value: "82.5%", delta: "+6.2% vs last batch", tone: "good" },
  { label: "Academic pass rate", value: "88.4%", delta: "+3.2% year over year", tone: "good" },
  { label: "Active projects", value: "24", delta: "3 milestones at risk", tone: "warn" },
  { label: "Research papers", value: "48", delta: "+12 from 2025", tone: "good" },
];
