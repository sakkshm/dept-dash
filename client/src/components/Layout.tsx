import {
  BarChart3,
  Bell,
  BookOpenCheck,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  FlaskConical,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const NAV = [
  { to: "/", label: "Overview", icon: BarChart3, end: true },
  { to: "/placements", label: "Placements", icon: BriefcaseBusiness },
  { to: "/academics", label: "Academics", icon: BookOpenCheck },
  { to: "/projects", label: "Projects", icon: FlaskConical },
  { to: "/publications", label: "Research Papers", icon: FileText },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand-row">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">IT</span>
            <span><strong>Department Ops</strong><small>Command center</small></span>
          </Link>
          <button className="icon-button close-menu" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <span className="nav-label">Workspaces</span>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
              <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-action" type="button"><Settings size={16} /> Data sources</button>
          <div className="profile-row">
            <span className="avatar">AH</span>
            <span><strong>Mr. Puneet Goswami</strong><small>Department Head</small></span>
            <ChevronDown size={14} />
          </div>
        </div>
      </aside>

      {open && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}

      <div className="content-shell">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={19} /></button>
          <div className="search-box">
            <Search size={15} strokeWidth={1.8} aria-hidden="true" />
            <span>Search students, courses, projects</span>
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <span className="demo-state">Demonstration data</span>
            <button className="icon-button notification-button" type="button" aria-label="Notifications"><Bell size={17} /><i /></button>
          </div>
        </header>
        <main className="app-main"><Outlet /></main>
      </div>
    </div>
  );
}
