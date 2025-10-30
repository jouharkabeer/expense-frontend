const BASE_URL = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8000/api'

export type TransactionType = 'INCOME' | 'EXPENSE'
export type Account = 'PARTNER1' | 'PARTNER2' | 'COMPANY'

export interface Transaction {
  id?: number
  transaction_type: TransactionType
  amount: string
  description: string
  date: string
  account: Account
  created_at?: string
}

export interface Summary {
  income_total: string
  expense_total: string
  total_balance: string
  partner1_balance: string
  partner2_balance: string
  company_balance: string
  today: string
}

export async function listTransactions(type?: TransactionType): Promise<Transaction[]> {
  const url = new URL(BASE_URL + '/transactions/')
  if (type) url.searchParams.set('type', type)
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load transactions')
  return res.json()
}

export async function createTransaction(tx: Transaction): Promise<Transaction> {
  const res = await fetch(BASE_URL + '/transactions/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx),
  })
  if (!res.ok) throw new Error('Failed to create transaction')
  return res.json()
}

export async function getSummary(): Promise<Summary> {
  const res = await fetch(BASE_URL + '/summary/')
  if (!res.ok) throw new Error('Failed to load summary')
  return res.json()
}

export async function updateTransaction(id: number, tx: Partial<Transaction>): Promise<Transaction> {
  const res = await fetch(BASE_URL + `/transactions/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx),
  })
  if (!res.ok) throw new Error('Failed to update transaction')
  return res.json()
}

export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(BASE_URL + `/transactions/${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete transaction')
}


