<template>
  <div class="return-form-container">
    <div class="form-card">
      <h2 class="form-title">บันทึกยาที่คืน</h2>
      <div v-if="loading" class="loading">กำลังโหลด...</div>
      <div v-else>
        <div class="form-group">
          <label class="form-label">เลือกรายการยืมที่ยังไม่คืน</label>
          <select v-model="selectedLoanId" class="form-input" required>
            <option value="">เลือกรายการ</option>
            <option v-for="t in outstandingLoans" :key="t.id" :value="t.id">
              {{ t.drug_name }} - {{ t.hospital?.name }} (ยังค้าง
              {{ t.quantity - getReturnedQuantity(t.id) }} ชิ้น)
            </option>
          </select>
        </div>
        <div v-if="selectedLoanId" class="form-group">
          <label class="form-label">จำนวนที่คืน</label>
          <input
            v-model.number="returnQuantity"
            type="number"
            :min="1"
            :max="getRemaining(selectedLoanId)"
            class="form-input"
            required
          />
        </div>
        <button
          @click="submitReturn"
          :disabled="!selectedLoanId || returnQuantity <= 0"
          class="submit-btn"
        >
          บันทึกการคืน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransactions } from '../composables/useTransactions'
import type { NewReturn } from '../types'

const {
  transactions: outstandingLoans,
  fetchOutstandingLoans,
  loading,
  createReturn,
} = useTransactions()
const selectedLoanId = ref<string>('')
const returnQuantity = ref<number>(1)

onMounted(() => {
  fetchOutstandingLoans()
})

const getReturnedQuantity = (loanId: string): number => {
  const returns =
    outstandingLoans.value?.filter(
      (t) => t.linked_loan_id === loanId && t.transaction_type === 'RETURN',
    ) || []
  return returns.reduce((sum, r) => sum + r.quantity, 0)
}

const getRemaining = (loanId: string): number => {
  const loan = outstandingLoans.value?.find((t) => t.id === loanId)
  if (!loan) return 0
  const returned = getReturnedQuantity(loanId)
  return loan.quantity - returned
}

const submitReturn = async () => {
  if (!selectedLoanId.value || returnQuantity.value <= 0) {
    alert('กรุณาเลือกรายการและระบุจำนวนที่คืน')
    return
  }
  if (returnQuantity.value > getRemaining(selectedLoanId.value)) {
    alert('จำนวนที่คืนมากกว่ายอดที่ยังค้างอยู่')
    return
  }

  const returnData: NewReturn = {
    transaction_date: new Date().toISOString().slice(0, 10),
    drug_name: '',
    quantity: returnQuantity.value,
    price_per_unit: 0,
    transaction_type: 'RETURN',
    partner_hospital_id: '',
    linked_loan_id: selectedLoanId.value,
    notes: '',
  }

  const loan = outstandingLoans.value?.find((t) => t.id === selectedLoanId.value)
  if (loan) {
    returnData.drug_name = loan.drug_name
    returnData.price_per_unit = loan.price_per_unit
    returnData.partner_hospital_id = loan.partner_hospital_id
  }

  try {
    await createReturn(returnData)
    alert('บันทึกการคืนเรียบร้อย')
    selectedLoanId.value = ''
    returnQuantity.value = 1
    fetchOutstandingLoans()
  } catch (e) {
    console.error(e)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>

<style scoped>
.return-form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.form-card {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.form-title {
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #219653;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
