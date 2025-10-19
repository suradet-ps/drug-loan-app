import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction, NewLoan, NewReturn } from '@/types'
import { supabase } from '@/composables/useSupabase'
import { useAuthStore } from './authStore'

export const useTransactionStore = defineStore('transactions', () => {
  const allTransactions = ref<Transaction[]>([])
  const loading = ref(false)

  const authStore = useAuthStore()

  const outstandingLoans = computed(() => {
    return allTransactions.value.filter(
      (t) =>
        t.transaction_type === 'LOAN' &&
        (t.status === 'OUTSTANDING' || t.status === 'PARTIALLY_RETURNED'),
    )
  })

  const getReturnedQuantity = (loanId: string): number => {
    const returns = allTransactions.value.filter(
      (t) => t.linked_loan_id === loanId && t.transaction_type === 'RETURN',
    )
    return returns.reduce((sum, r) => sum + r.quantity, 0)
  }

  async function fetchAllTransactions() {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`*, hospital:hospitals(name)`)
        .order('transaction_date', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      allTransactions.value = data || []
    } catch (e) {
      console.error('Error fetching history:', e)
    } finally {
      loading.value = false
    }
  }

  async function createLoan(loanData: NewLoan) {
    const userId = authStore.currentUserId()
    if (!userId) throw new Error('User not logged in')

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          ...loanData,
          status: 'OUTSTANDING',
          user_id: userId,
        },
      ])
      .select()
      .single()

    if (error) throw error
    await fetchAllTransactions() // Refresh data
  }

  async function createReturn(returnData: NewReturn) {
    const userId = authStore.currentUserId()
    if (!userId) throw new Error('User not logged in')

    const loan = allTransactions.value.find((t) => t.id === returnData.linked_loan_id)
    if (!loan) throw new Error('Original loan not found')

    returnData.drug_name = loan.drug_name
    returnData.price_per_unit = loan.price_per_unit
    returnData.partner_hospital_id = loan.partner_hospital_id

    const { error } = await supabase
      .from('transactions')
      .insert([{ ...returnData, user_id: userId }])
    if (error) throw error

    await updateLoanStatus(returnData.linked_loan_id)
    await fetchAllTransactions() // Refresh data
  }

  async function updateLoanStatus(loanId: string) {
    const { data: loan, error: loanError } = await supabase
      .from('transactions')
      .select('quantity')
      .eq('id', loanId)
      .single()

    if (loanError) throw loanError

    const { data: returns, error: returnError } = await supabase
      .from('transactions')
      .select('quantity')
      .eq('linked_loan_id', loanId)
      .eq('transaction_type', 'RETURN')

    if (returnError) throw returnError

    const totalReturned = returns.reduce((sum, r) => sum + r.quantity, 0)
    let newStatus: 'OUTSTANDING' | 'RETURNED' | 'PARTIALLY_RETURNED' = 'OUTSTANDING'

    if (totalReturned >= loan.quantity) {
      newStatus = 'RETURNED'
    } else if (totalReturned > 0) {
      newStatus = 'PARTIALLY_RETURNED'
    }

    const { error } = await supabase
      .from('transactions')
      .update({ status: newStatus })
      .eq('id', loanId)

    if (error) throw error
  }

  return {
    allTransactions,
    loading,
    outstandingLoans,
    fetchAllTransactions,
    createLoan,
    createReturn,
    getReturnedQuantity,
  }
})
