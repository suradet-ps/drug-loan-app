<template>
  <div class="history-container">
    <header class="page-header">
      <div>
        <h2 class="text-gradient">ประวัติการทำรายการ</h2>
        <p class="subtitle">ประวัติการยืม-คืนยาทั้งหมดที่ถูกบันทึกในระบบ</p>
      </div>
    </header>

    <div
      v-if="transactionStore.loading && transactionStore.allTransactions.length === 0"
      class="loading list-card"
    >
      Loading transaction history...
    </div>

    <div v-else-if="transactionStore.allTransactions.length === 0" class="empty-state list-card">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <h3>No History Found</h3>
      <p>ยังไม่มีประวัติการทำรายการในระบบ</p>
    </div>

    <div v-else class="card-list">
      <div
        v-for="(t, index) in transactionStore.allTransactions"
        :key="t.id"
        class="list-card item-card"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <div class="card-header">
          <div class="header-info">
            <h3 class="drug-name">{{ t.drug_name || 'N/A' }}</h3>
            <span class="hospital-name">{{ t.hospital?.name || 'N/A' }}</span>
          </div>
          <span :class="['tag', t.transaction_type.toLowerCase()]">
            {{ t.transaction_type === 'LOAN' ? 'ยืม' : 'คืน' }}
          </span>
        </div>

        <div class="card-body">
          <div class="info-row">
            <span>วันที่ทำรายการ:</span>
            <strong>{{
              new Date(t.transaction_date).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }}</strong>
          </div>
          <div class="info-row">
            <span>จำนวน:</span>
            <strong>{{ t.quantity }} {{ t.unit || '' }}</strong>
          </div>
          <div v-if="t.transaction_type === 'LOAN'" class="info-row">
            <span>สถานะ:</span>
            <strong v-if="t.status" :class="`status-${t.status.toLowerCase()}`">{{
              getStatusText(t.status)
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import type { TransactionStatus } from '@/types'

const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.fetchAllTransactions()
})

const getStatusText = (status: TransactionStatus | null) => {
  switch (status) {
    case 'OUTSTANDING':
      return 'ยังไม่ได้คืน'
    case 'PARTIALLY_RETURNED':
      return 'คืนบางส่วน'
    case 'RETURNED':
      return 'คืนครบแล้ว'
    default:
      return '-'
  }
}
</script>

<style scoped>
.history-container {
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

.page-header {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--glass-border);
}
.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}
.page-header p {
  font-size: 1rem;
  color: var(--text-secondary);
}

.loading,
.empty-state {
  padding: var(--space-xl);
  min-height: 200px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.empty-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
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
  color: var(--text-secondary);
}

.card-list {
  display: grid;
  gap: var(--space-md);
}

.item-card {
  padding: var(--space-md);
  animation: slideInUp 0.5s ease-out backwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--space-sm);
  margin-bottom: var(--space-sm);
  border-bottom: 1px solid var(--glass-border);
}

.drug-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.hospital-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.card-body .info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.card-body .info-row:not(:last-child) {
  margin-bottom: var(--space-sm);
}
.info-row strong {
  color: var(--text-primary);
  font-weight: 600;
}

.tag {
  padding: 4px var(--space-sm);
  border-radius: var(--border-radius-lg);
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
  margin-left: var(--space-sm);
}

.tag.loan {
  background: var(--gradient-danger);
}
.tag.return {
  background: var(--gradient-success);
}

.status-outstanding {
  color: var(--neon-pink);
}
.status-partially_returned {
  color: var(--neon-orange);
}
.status-returned {
  color: var(--neon-green);
}
</style>
