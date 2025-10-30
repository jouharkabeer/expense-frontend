import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expense from './pages/Expense'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'income', element: <Income /> },
      { path: 'expense', element: <Expense /> },
    ],
  },
])

const root = createRoot(document.getElementById('root')!)
root.render(<RouterProvider router={router} />)


