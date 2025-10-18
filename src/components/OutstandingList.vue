<template>
  <div class="outstanding-list-container">
    <h2 class="section-title">รายการยาที่ยังไม่คืน</h2>
    <div v-if="loading" class="loading">กำลังโหลด...</div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ชื่อยา</th>
          <th>โรงพยาบาล</th>
          <th>จำนวนยืม</th>
          <th>จำนวนคืนแล้ว</th>
          <th>ยังค้าง</th>
          <th>วันที่ยืม</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in outstandingLoans" :key="t.id">
          <td>{{ t.drug_name }}</td>
          <td>{{ t.hospital?.name }}</td>
          <td>{{ t.quantity }}</td>
          <td>{{ getReturnedQuantity(t.id) }}</td>
          <td class="status-remaining">{{ t.quantity - getReturnedQuantity(t.id) }}</td>
          <td>{{ t.transaction_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactions } from '../composables/useTransactions'

const { transactions: outstandingLoans, fetchOutstandingLoans, loading } = useTransactions()

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
</script>

<style scoped>
.outstanding-list-container {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.section-title {
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

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #ecf0f1;
  font-weight: bold;
  color: #2c3e50;
}

.data-table tr:hover {
  background-color: #f5f7fa;
}

.status-remaining {
  color: #e74c3c;
  font-weight: bold;
}
</style>
