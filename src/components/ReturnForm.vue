<template>
  <div class="return-form-container">
    <div class="form-card">
      <h2 class="form-title">บันทึกยาที่คืน</h2>
      <div
        v-if="transactionStore.loading && transactionStore.outstandingLoans.length === 0"
        class="loading"
      >
        กำลังโหลด...
      </div>
      <div v-else-if="transactionStore.outstandingLoans.length === 0" class="empty-state">
        ไม่มีรายการให้คืน
      </div>
      <div v-else>
        <div class="form-group">
          <label class="form-label">เลือกรายการที่ยืม</label>
          <select v-model="selectedLoanId" @change="updateMaxQuantity" class="form-input" required>
            <option value="">-- เลือกรายการ --</option>
            <option
              v-for="loan in transactionStore.outstandingLoans"
              :key="loan.id"
              :value="loan.id"
            >
              {{ loan.drug_name }} - {{ loan.hospital?.name }} (ค้าง {{ getRemaining(loan.id) }}
              {{ loan.unit }})
            </option>
          </select>
        </div>
        <div v-if="selectedLoanId" class="form-group">
          <label class="form-label">จำนวนที่คืน (สูงสุด {{ maxReturnQuantity }})</label>
          <input
            v-model.number="returnQuantity"
            type="number"
            :min="1"
            :max="maxReturnQuantity"
            class="form-input"
            required
          />
        </div>
        <button @click="submitReturn" :disabled="!isValid" class="btn">
          {{ transactionStore.loading ? 'กำลังบันทึก...' : 'บันทึกการคืน' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import type { NewReturn } from '@/types'

const transactionStore = useTransactionStore()
const selectedLoanId = ref<string>('')
const returnQuantity = ref<number>(1)
const maxReturnQuantity = ref<number>(1)

onMounted(() => {
  transactionStore.fetchAllTransactions()
})

const getRemaining = (loanId: string): number => {
  const loan = transactionStore.outstandingLoans.find((t) => t.id === loanId)
  if (!loan) return 0
  const returned = transactionStore.getReturnedQuantity(loanId)
  return loan.quantity - returned
}

const updateMaxQuantity = () => {
  if (selectedLoanId.value) {
    maxReturnQuantity.value = getRemaining(selectedLoanId.value)
    returnQuantity.value = 1
  }
}

const isValid = computed(() => {
  return (
    selectedLoanId.value &&
    returnQuantity.value > 0 &&
    returnQuantity.value <= maxReturnQuantity.value &&
    !transactionStore.loading
  )
})

const submitReturn = async () => {
  if (!isValid.value) return

  const returnData: NewReturn = {
    transaction_date: new Date().toISOString().slice(0, 10),
    quantity: returnQuantity.value,
    transaction_type: 'RETURN',
    linked_loan_id: selectedLoanId.value,
    notes: '',
  }

  try {
    await transactionStore.createReturn(returnData)
    alert('บันทึกการคืนเรียบร้อย')
    selectedLoanId.value = ''
    returnQuantity.value = 1
  } catch (e) {
    console.error(e)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>

<style scoped>
.form-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
}
.loading,
.empty-state {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem;
}
</style>
