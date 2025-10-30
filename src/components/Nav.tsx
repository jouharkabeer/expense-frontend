import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isAuthed, logout } from '../auth'

export default function Nav() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand" aria-label="Lsofito innovations home">
          <img src="/image.png" alt="Lsofito innovations" className="brand-logo" />
        </Link>
        <nav className="nav">
          {isAuthed() && (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/income" className={({ isActive }) => isActive ? 'active' : ''}>Income</NavLink>
              <NavLink to="/expense" className={({ isActive }) => isActive ? 'active' : ''}>Expense</NavLink>
            </>
          )}
        </nav>
        {isAuthed() && <LogoutButton />}
      </div>
    </div>
  )
}

function LogoutButton() {
  const navigate = useNavigate()
  return (
    <button className="btn secondary" onClick={() => { logout(); navigate('/login') }}>Logout</button>
  )
}


