import { FormEvent, useEffect, useState } from 'react'
import { Account, createTransaction, listTransactions, Transaction, updateTransaction, deleteTransaction } from '../api'

export default function Income() {
  const [items, setItems] = useState<Transaction[]>([])
  const [form, setForm] = useState<Pick<Transaction, 'amount' | 'description' | 'date' | 'account'>>({
    amount: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    account: 'COMPANY',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [rowForm, setRowForm] = useState<Pick<Transaction, 'amount' | 'description' | 'date' | 'account'> | null>(null)

  function load() {
    listTransactions('INCOME').then(setItems).catch((e) => setError((e as Error).message))
  }

  useEffect(() => { load() }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createTransaction({
        transaction_type: 'INCOME',
        amount: form.amount,
        description: form.description,
        date: form.date,
        account: form.account as Account,
      })
      setForm({ amount: '', description: '', date: new Date().toISOString().slice(0, 10), account: 'COMPANY' })
      load()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Income</h2>
      <div className="panel">
        <form onSubmit={onSubmit} className="form">
          <input className="input" placeholder="Amount" type="number" step="0.01" required value={form.amount}
                 onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <input className="input" placeholder="Description" value={form.description}
                 onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input" type="date" required value={form.date}
                 onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <select className="select" required value={form.account}
                  onChange={(e) => setForm({ ...form, account: e.target.value as Account })}>
            <option value="PARTNER1">Jouhar</option>
            <option value="PARTNER2">Aleena</option>
            <option value="COMPANY">Lsofito innovations</option>
          </select>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Income'}</button>
        </form>
        {error && <div style={{ color: '#ff7a90' }}>{error}</div>}
      </div>

      <div style={{ height: 12 }} />

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Account</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id}>
                {editingId === t.id ? (
                  <>
                    <td>
                      <input className="input" type="date" value={rowForm?.date || ''} onChange={(e) => setRowForm(prev => ({ ...(prev as any), date: e.target.value }))} />
                    </td>
                    <td>
                      <input className="input" type="number" step="0.01" value={rowForm?.amount || ''} onChange={(e) => setRowForm(prev => ({ ...(prev as any), amount: e.target.value }))} />
                    </td>
                    <td>
                      <input className="input" value={rowForm?.description || ''} onChange={(e) => setRowForm(prev => ({ ...(prev as any), description: e.target.value }))} />
                    </td>
                    <td>
                      <select className="select" value={rowForm?.account || 'COMPANY'} onChange={(e) => setRowForm(prev => ({ ...(prev as any), account: e.target.value as Account }))}>
                        <option value="PARTNER1">Jouhar</option>
                        <option value="PARTNER2">Aleena</option>
                        <option value="COMPANY">Lsofito innovations</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button className="btn secondary" type="button" onClick={() => { setEditingId(null); setRowForm(null) }}>Cancel</button>
                        <button className="btn" type="button" onClick={async () => {
                          if (!t.id || !rowForm) return
                          try {
                            await updateTransaction(t.id, {
                              amount: rowForm.amount,
                              description: rowForm.description,
                              date: rowForm.date,
                              account: rowForm.account,
                            })
                            setEditingId(null)
                            setRowForm(null)
                            load()
                          } catch (e) { setError((e as Error).message) }
                        }}>Save</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{t.date}</td>
                    <td>₹ {Number(t.amount).toFixed(2)}</td>
                    <td>{t.description}</td>
                    <td>
                      <span className={`chip ${t.account === 'PARTNER1' ? 'p1' : t.account === 'PARTNER2' ? 'p2' : 'company'}`}>
                        {t.account === 'PARTNER1' ? 'Jouhar' : t.account === 'PARTNER2' ? 'Aleena' : 'Lsofito innovations'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button className="btn secondary" type="button" onClick={() => { setEditingId(t.id!); setRowForm({ amount: String(t.amount), description: t.description, date: t.date, account: t.account }) }}>Edit</button>
                        <button className="btn danger" type="button" onClick={async () => { if (!t.id) return; if (!confirm('Delete this transaction?')) return; try { await deleteTransaction(t.id); load() } catch (e) { setError((e as Error).message) } }}>Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


