import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Transaction, NewLoan, NewReturn } from '../types'
import { supabase } from './useSupabase'

const transactions: Ref<Transaction[] | null> = ref(null)
const loading = ref(false)

const getCurrentUserId = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user?.id
}

export const useTransactions = () => {
  // ดึงรายการที่ยังไม่คืน
  const fetchOutstandingLoans = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(
          `
          *,
          hospital:hospitals(name)
        `,
        )
        .eq('transaction_type', 'LOAN')
        .in('status', ['OUTSTANDING', 'PARTIALLY_RETURNED'])
        .order('created_at', { ascending: false })

      if (error) throw error
      transactions.value = data
    } catch (e) {
      console.error('Error fetching outstanding loans:', e)
    } finally {
      loading.value = false
    }
  }

  // ดึงประวัติทั้งหมด
  const fetchHistory = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(
          `
          *,
          hospital:hospitals(name)
        `,
        )
        .order('created_at', { ascending: false })

      if (error) throw error
      transactions.value = data
    } catch (e) {
      console.error('Error fetching history:', e)
    } finally {
      loading.value = false
    }
  }

  // บันทึกยาที่ยืม
  const createLoan = async (loanData: NewLoan) => {
    const userId = await getCurrentUserId()
    const { error } = await supabase.from('transactions').insert([
      {
        ...loanData,
        status: 'OUTSTANDING',
        user_id: userId,
      },
    ])
    if (error) throw error
  }

  // บันทึกยาที่คืน
  const createReturn = async (returnData: NewReturn) => {
    const userId = await getCurrentUserId()
    const { error } = await supabase.from('transactions').insert([
      {
        ...returnData,
        user_id: userId,
      },
    ])
    if (error) throw error

    // อัปเดตสถานะของรายการยืมหลัก
    await updateLoanStatus(returnData.linked_loan_id)
  }

  // อัปเดตสถานะของรายการยืม
  const updateLoanStatus = async (loanId: string) => {
    const { data: loan, error: loanError } = await supabase
      .from('transactions')
      .select('quantity, id')
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

    if (totalReturned === loan.quantity) {
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
    transactions,
    loading,
    fetchOutstandingLoans,
    fetchHistory,
    createLoan,
    createReturn,
  }
}
