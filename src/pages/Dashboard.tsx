import { useEffect, useState } from 'react'
import { getSummary, Summary } from '../api'
import Card from '../components/Card'

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getSummary()
      .then(setSummary)
      .catch((e) => setError((e as Error).message))
  }, [])

  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!summary) return <div>Loading...</div>

  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 16 }}>Dashboard</h2>
      <div className="cards" style={{ marginBottom: 16 }}>
        <Card label="Total Balance" value={summary.total_balance} />
        <Card label="Income" value={summary.income_total} />
        <Card label="Expense" value={summary.expense_total} />
      </div>
      <div className="cards">
        <Card label="Jouhar" value={summary.partner1_balance} />
        <Card label="Aleena" value={summary.partner2_balance} />
        <Card label="Lsofito innovations" value={summary.company_balance} />
      </div>
    </div>
  )
}


