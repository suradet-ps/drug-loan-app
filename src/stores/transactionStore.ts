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

    const { error } = await supabase
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
    await fetchAllTransactions()
  }

  async function createReturn(returnData: NewReturn) {
    const userId = authStore.currentUserId()
    if (!userId) throw new Error('User not logged in')

    const loan = allTransactions.value.find((t) => t.id === returnData.linked_loan_id)
    if (!loan) throw new Error('Original loan not found')

    const fullReturnData = {
      ...returnData,
      drug_name: loan.drug_name,
      price_per_unit: loan.price_per_unit,
      partner_hospital_id: loan.partner_hospital_id,
      unit: loan.unit,
      user_id: userId,
    }

    const { error } = await supabase.from('transactions').insert([fullReturnData])

    if (error) throw error

    await fetchAllTransactions()
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
