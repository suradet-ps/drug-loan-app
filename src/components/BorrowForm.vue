<template>
  <div class="borrow-form-container">
    <div class="form-card">
      <h2 class="form-title">บันทึกยาที่ยืม</h2>
      <form @submit.prevent="submitBorrow" class="borrow-form">
        <div class="form-group">
          <label class="form-label">ชื่อยา</label>
          <input
            v-model="formData.drug_name"
            class="form-input"
            placeholder="พิมพ์ชื่อยา"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label">วันที่</label>
          <input v-model="formData.transaction_date" type="date" class="form-input" required />
        </div>
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
          <label class="form-label">ราคาต่อหน่วย</label>
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
          <label class="form-label">โรงพยาบาล</label>
          <select v-model="formData.partner_hospital_id" class="form-input" required>
            <option value="">เลือกโรงพยาบาล</option>
            <option v-for="h in hospitals" :key="h.id" :value="h.id">
              {{ h.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">หมายเหตุ (ถ้ามี)</label>
          <textarea v-model="formData.notes" class="form-textarea"></textarea>
        </div>
        <button type="submit" class="submit-btn">บันทึก</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useHospitals } from '../composables/useHospitals'
import { useTransactions } from '../composables/useTransactions'
import type { NewLoan } from '../types'

const { hospitals, fetchHospitals } = useHospitals()
const { createLoan } = useTransactions()

const formData = reactive<NewLoan>({
  transaction_date: new Date().toISOString().slice(0, 10),
  drug_name: '',
  quantity: 1,
  price_per_unit: 0,
  transaction_type: 'LOAN',
  partner_hospital_id: '',
  notes: '',
})

onMounted(() => {
  fetchHospitals()
})

const submitBorrow = async () => {
  try {
    await createLoan(formData)
    alert('บันทึกยาที่ยืมเรียบร้อย')
    resetForm()
  } catch (e) {
    console.error(e)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}

const resetForm = () => {
  formData.drug_name = ''
  formData.quantity = 1
  formData.price_per_unit = 0
  formData.partner_hospital_id = ''
  formData.notes = ''
  formData.transaction_date = new Date().toISOString().slice(0, 10)
}
</script>

<style scoped>
.borrow-form-container {
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

.form-group {
  margin-bottom: 1.2rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2980b9;
}
</style>
