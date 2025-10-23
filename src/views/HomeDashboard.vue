<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <p>ภาพรวมการยืม-คืนยาของคุณ</p>
    </header>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>รายการค้างคืน</h3>
        <p class="metric-value">{{ transactionStore.outstandingLoans.length }}</p>
      </div>
      <div class="metric-card">
        <h3>จำนวนยาที่ค้าง (ชิ้น)</h3>
        <p class="metric-value">{{ totalOutstandingQuantity }}</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="actions-grid">
      <router-link to="/borrow" class="action-card borrow">
        <span class="icon">➕</span>
        <h2>ยืมยา</h2>
        <p>บันทึกรายการยืมยาใหม่</p>
      </router-link>
      <router-link to="/return" class="action-card return">
        <span class="icon">↩️</span>
        <h2>คืนยา</h2>
        <p>บันทึกรายการคืนยา</p>
      </router-link>
    </div>

    <OutstandingList />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import OutstandingList from '../components/OutstandingList.vue'
import { useTransactionStore } from '@/stores/transactionStore'

const transactionStore = useTransactionStore()

const totalOutstandingQuantity = computed(() => {
  return transactionStore.outstandingLoans.reduce((total, loan) => {
    const returned = transactionStore.getReturnedQuantity(loan.id)
    return total + (loan.quantity - returned)
  }, 0)
})
</script>

<style scoped>
.dashboard-header {
  margin-bottom: 2rem;
}
.dashboard-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
.dashboard-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: var(--bg-white);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}
.metric-card h3 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-accent);
  margin-top: 0.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.action-card {
  padding: 2rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: var(--bg-white);
}
.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.action-card .icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
}
.action-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.action-card p {
  opacity: 0.9;
}
.action-card.borrow {
  background: linear-gradient(135deg, #56ab2f, #a8e063);
}
.action-card.return {
  background: linear-gradient(135deg, #11998e, #38ef7d);
}
</style>
