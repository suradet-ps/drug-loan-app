export type Hospital = {
  id: string
  created_at: string
  name: string
}

export type TransactionType = 'LOAN' | 'RETURN'
export type TransactionStatus = 'OUTSTANDING' | 'RETURNED' | 'PARTIALLY_RETURNED'

export type Transaction = {
  id: string
  created_at: string
  transaction_date: string
  drug_name: string
  quantity: number
  price_per_unit: number
  transaction_type: TransactionType
  status: TransactionStatus | null
  partner_hospital_id: string
  user_id: string
  linked_loan_id: string | null
  notes?: string
  hospital?: Hospital
}

export type NewLoan = Omit<
  Transaction,
  'id' | 'created_at' | 'status' | 'linked_loan_id' | 'user_id'
> & {
  transaction_type: 'LOAN'
}

export type NewReturn = Omit<
  Transaction,
  'id' | 'created_at' | 'status' | 'user_id' | 'linked_loan_id'
> & {
  transaction_type: 'RETURN'
  linked_loan_id: string
}
