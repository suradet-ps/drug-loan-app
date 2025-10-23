<template>
  <div class="borrow-form-container">
    <div class="form-card">
      <h2 class="form-title text-gradient">บันทึกข้อมูลยืมยา</h2>
      <form @submit.prevent="submitBorrow" class="borrow-form">
        <div class="form-group">
          <label class="form-label">ชื่อยา</label>
          <input
            v-model="formData.drug_name"
            class="form-input"
            placeholder="เช่น Paracetamol 500mg"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">ยืมจากโรงพยาบาล</label>
          <select v-model="formData.partner_hospital_id" class="form-input" required>
            <option disabled value="">เลือกโรงพยาบาล</option>
            <option v-for="h in hospitalStore.hospitals" :key="h.id" :value="h.id">
              {{ h.name }}
            </option>
          </select>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">จำนวน</label>
            <input
              v-model.number="formData.quantity"
              type="number"
              min="1"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">หน่วยนับ</label>
            <input
              v-model="formData.unit"
              type="text"
              class="form-input"
              placeholder="เช่น เม็ด, ขวด"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">ราคา/หน่วย</label>
          <input
            v-model.number="formData.price_per_unit"
            type="number"
            min="0"
            step="0.01"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">วันที่ยืม</label>
          <input v-model="formData.transaction_date" type="date" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label">หมายเหตุ (ถ้ามี)</label>
          <textarea v-model="formData.notes" class="form-textarea" rows="3"></textarea>
        </div>

        <button type="submit" class="btn" :disabled="transactionStore.loading">
          {{ transactionStore.loading ? 'กำลังบันทึก...' : 'บันทึกรายการ' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useHospitalStore } from '@/stores/hospitalStore'
import { useTransactionStore } from '@/stores/transactionStore'
import type { NewLoan } from '@/types'

const hospitalStore = useHospitalStore()
const transactionStore = useTransactionStore()

const createInitialFormData = (): NewLoan => ({
  transaction_date: new Date().toISOString().slice(0, 10),
  drug_name: '',
  quantity: 1,
  unit: '',
  price_per_unit: 0,
  transaction_type: 'LOAN',
  partner_hospital_id: '',
  notes: '',
})

const formData = reactive<NewLoan>(createInitialFormData())

onMounted(() => {
  if (hospitalStore.hospitals.length === 0) {
    hospitalStore.fetchHospitals()
  }
})

const submitBorrow = async () => {
  try {
    await transactionStore.createLoan(formData)
    alert('บันทึกยาที่ยืมเรียบร้อย')
    Object.assign(formData, createInitialFormData())
  } catch (e) {
    console.error(e)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>

<style scoped>
.borrow-form-container {
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

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.form-textarea {
  resize: vertical;
}

@media (max-width: 500px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
