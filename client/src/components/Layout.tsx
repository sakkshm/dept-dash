import { Link, NavLink, Outlet } from "react-router-dom";

const NAV = [
  { to: "/academics", label: "Academics" },
  { to: "/placements", label: "Placements" },
  { to: "/projects", label: "Projects & Research" },
  { to: "/publications", label: "Publications" },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-title">
          Dept Dashboard
        </Link>
        <nav>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
