import { useEffect, useState } from 'react'
import { getSummary, Summary } from '../api'
import Card from '../components/Card'
import AgeCard from '../components/AgeCard'

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

function getAgeFromDate(dateString: string): string {
  const [day, month, year] = dateString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust if negative days
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Adjust if negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} years ${months} months ${days} days`;
}


  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 16 }}>Dashboard</h2>
      <div className="cards" style={{ marginBottom: 16 }}>
        <Card label="Total Balance" value={summary.total_balance} />
        <Card label="Income" value={summary.income_total} />
        <Card label="Expense" value={summary.expense_total} />
      </div>
      <h3 style={{ marginTop: 0, marginBottom: 16 }}>Account Balance</h3>
      <div className="cards" style={{marginBottom : 16 }}>
        <Card label="Jouhar" value={summary.partner1_balance} />
        <Card label="Aleena" value={summary.partner2_balance} />
        <Card label="Lsofito innovations" value={summary.company_balance} />
      </div>
      <h3 style={{ marginTop: 0, marginBottom: 16 }}>Age</h3>
      <div className='cards'>
        <AgeCard label="Years" value={getAgeFromDate("16/06/2025").split(" ")[0]} />
        <AgeCard label="Months" value={getAgeFromDate("16/06/2025").split(" ")[2]} />
        <AgeCard label="Days" value={getAgeFromDate("16/06/2025").split(" ")[4]} />
      </div>

    </div>
  )
}


