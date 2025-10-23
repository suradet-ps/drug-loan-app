<template>
  <div class="return-form-container">
    <div class="form-card">
      <h2 class="form-title text-gradient">บันทึกยาที่คืน</h2>
      <div
        v-if="transactionStore.loading && transactionStore.outstandingLoans.length === 0"
        class="loading"
      >
        Loading outstanding loans...
      </div>

      <div v-else-if="transactionStore.outstandingLoans.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 11L12 14L22 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3" />
          </svg>
        </div>
        <h3>All Clear!</h3>
        <p>ไม่มีรายการยาที่ค้างให้คืน</p>
      </div>

      <form v-else @submit.prevent="submitReturn">
        <div class="form-group">
          <label class="form-label">เลือกรายการที่ยืม</label>
          <select v-model="selectedLoanId" @change="updateMaxQuantity" class="form-input" required>
            <option disabled value="">-- เลือกรายการ --</option>
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

        <button type="submit" :disabled="!isValid" class="btn">
          {{ transactionStore.loading ? 'กำลังบันทึก...' : 'บันทึกการคืน' }}
        </button>
      </form>
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
    returnQuantity.value = maxReturnQuantity.value > 0 ? 1 : 0
  } else {
    maxReturnQuantity.value = 1
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
    maxReturnQuantity.value = 1
  } catch (e) {
    console.error(e)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>

<style scoped>
.return-form-container {
  max-width: 700px;
  margin: var(--space-lg) auto;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: var(--space-lg);
  color: var(--text-primary);
}

.loading {
  padding: var(--space-xl);
  min-height: 150px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  text-align: center;
  min-height: 150px;
}

.empty-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-success);
  border-radius: var(--border-radius-lg);
  color: white;
  margin-bottom: var(--space-md);
}

.empty-icon svg {
  width: 40px;
  height: 40px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.empty-state p {
  font-size: 1rem;
  color: var(--text-secondary);
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
