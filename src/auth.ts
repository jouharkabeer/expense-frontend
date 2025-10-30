const KEY = 'auth-v1'

export function isAuthed(): boolean {
  return localStorage.getItem(KEY) === '1'
}

export function login(passcode: string): boolean {
  const expected = (import.meta as any).env?.VITE_APP_PASS || '16062025'
  const ok = passcode === expected
  if (ok) localStorage.setItem(KEY, '1')
  return ok
}

export function logout(): void {
  localStorage.removeItem(KEY)
}


