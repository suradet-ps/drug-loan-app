<template>
  <div class="history-container">
    <h2 class="section-title">ประวัติการยืม-คืนยา</h2>
    <div v-if="loading" class="loading">กำลังโหลด...</div>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>วันที่</th>
          <th>ชื่อยา</th>
          <th>โรงพยาบาล</th>
          <th>ประเภท</th>
          <th>จำนวน</th>
          <th>สถานะ</th>
          <th>หมายเหตุ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactions" :key="t.id">
          <td>{{ t.transaction_date }}</td>
          <td>{{ t.drug_name }}</td>
          <td>{{ t.hospital?.name }}</td>
          <td>
            <span
              :class="{
                'type-loan': t.transaction_type === 'LOAN',
                'type-return': t.transaction_type === 'RETURN',
              }"
            >
              {{ t.transaction_type === 'LOAN' ? 'ยืม' : 'คืน' }}
            </span>
          </td>
          <td>{{ t.quantity }}</td>
          <td>
            <span v-if="t.status" :class="'status-' + t.status.toLowerCase()">{{ t.status }}</span>
            <span v-else>-</span>
          </td>
          <td>{{ t.notes || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactions } from '../composables/useTransactions'

const { transactions, fetchHistory, loading } = useTransactions()

onMounted(() => {
  fetchHistory()
})
</script>

<style scoped>
.history-container {
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

.type-loan {
  color: #e74c3c;
  font-weight: bold;
}

.type-return {
  color: #27ae60;
  font-weight: bold;
}

.status-outstanding {
  color: #e74c3c;
  font-weight: bold;
}

.status-partially_returned {
  color: #f39c12;
  font-weight: bold;
}

.status-returned {
  color: #27ae60;
  font-weight: bold;
}
</style>
