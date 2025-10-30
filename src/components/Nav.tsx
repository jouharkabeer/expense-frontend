import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand" aria-label="Lsofito innovations home">
          <img src="/image.png" alt="Lsofito innovations" className="brand-logo" />
        </Link>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/income" className={({ isActive }) => isActive ? 'active' : ''}>Income</NavLink>
          <NavLink to="/expense" className={({ isActive }) => isActive ? 'active' : ''}>Expense</NavLink>
        </nav>
      </div>
    </div>
  )
}


