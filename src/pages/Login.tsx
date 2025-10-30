import { FormEvent, useState } from 'react'
import { login } from '../auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [pass, setPass] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (login(pass)) {
      navigate('/')
    } else {
      setError('Invalid passcode')
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <div className="panel">
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Login</h2>
        <p style={{ color: '#9aa4b2', marginTop: 0 }}>Enter passcode to continue.</p>
        <form onSubmit={onSubmit} className="form">
          <input className="input" type="password" placeholder="Passcode" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button className="btn" type="submit">Login</button>
        </form>
        {error && <div style={{ color: '#ff7a90' }}>{error}</div>}
      </div>
    </div>
  )
}


