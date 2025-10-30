import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expense from './pages/Expense'
import './styles.css'
import Login from './pages/Login'
import { isAuthed } from './auth'

function AuthGate({ children }: { children: JSX.Element }) {
  if (!isAuthed()) return <Navigate to="/login" replace />
  return children
}

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <AuthGate><Dashboard /></AuthGate> },
      { path: 'income', element: <AuthGate><Income /></AuthGate> },
      { path: 'expense', element: <AuthGate><Expense /></AuthGate> },
    ],
  },
])

const root = createRoot(document.getElementById('root')!)
root.render(<RouterProvider router={router} />)


