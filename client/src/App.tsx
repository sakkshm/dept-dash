import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

export default function Home() {
  return (
    <div>
      <h1>Department Command Center</h1>
      <ul className="module-grid">
        <li>
          <NavLink to="/academics">Academics</NavLink>
        </li>
        <li>
          <NavLink to="/placements">Placements</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects & Research</NavLink>
        </li>
        <li>
          <NavLink to="/publications">Publications</NavLink>
        </li>
      </ul>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function AcademicsPage() {
  return <h2>Academics & Student Performance</h2>;
}
function PlacementsPage() {
  return <h2>Career & Placements</h2>;
}
function ProjectsPage() {
  return <h2>Projects & Research Initiatives</h2>;
}
function PublicationsPage() {
  return <h2>Scholarly Publications & Citations</h2>;
}
