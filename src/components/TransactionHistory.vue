<template>
  <div class="history-container">
    <h2 class="section-title">ประวัติการยืม-คืนยา</h2>
    <div
      v-if="transactionStore.loading && transactionStore.allTransactions.length === 0"
      class="loading"
    >
      กำลังโหลด...
    </div>
    <div v-else-if="transactionStore.allTransactions.length === 0" class="empty-state">
      ยังไม่มีประวัติ
    </div>
    <div v-else class="card-list">
      <div v-for="t in transactionStore.allTransactions" :key="t.id" class="list-card item-card">
        <div class="card-header">
          <h3 class="drug-name">{{ t.drug_name }}</h3>
          <span class="hospital-name">{{ t.hospital?.name }}</span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span>วันที่:</span>
            <span>{{ new Date(t.transaction_date).toLocaleDateString('th-TH') }}</span>
          </div>
          <div class="info-row">
            <span>จำนวน:</span>
            <span>{{ t.quantity }}</span>
          </div>
          <div class="info-row">
            <span>ประเภท:</span>
            <span :class="`type-${t.transaction_type.toLowerCase()}`">
              {{ t.transaction_type === 'LOAN' ? 'ยืม' : 'คืน' }}
            </span>
          </div>
          <div v-if="t.transaction_type === 'LOAN'" class="info-row">
            <span>สถานะ:</span>
            <span v-if="t.status" :class="'status-' + t.status.toLowerCase()">{{
              getStatusText(t.status)
            }}</span>
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
      return 'ค้างชำระ'
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
.section-title {
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
.card-list {
  display: grid;
  gap: 1rem;
}
.item-card {
  padding: 1rem;
}
.card-header {
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
}
.drug-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}
.hospital-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.card-body .info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.type-loan {
  color: var(--danger);
  font-weight: bold;
}
.type-return {
  color: var(--success);
  font-weight: bold;
}
.status-outstanding {
  color: var(--danger);
  font-weight: bold;
}
.status-partially_returned {
  color: var(--warning);
  font-weight: bold;
}
.status-returned {
  color: var(--success);
  font-weight: bold;
}
</style>
