import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/data', label: 'Data' },
  { to: '/profile', label: 'Profile' },
  { to: '/admin', label: 'Admin' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>After School</h2>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active-link' : '')}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}