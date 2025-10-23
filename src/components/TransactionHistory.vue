<template>
  <div class="history-container">
    <header class="page-header">
      <div>
        <h2>ประวัติการทำรายการ</h2>
        <p>ประวัติการยืม-คืนยาทั้งหมด</p>
      </div>
    </header>
    <div
      v-if="transactionStore.loading && transactionStore.allTransactions.length === 0"
      class="loading list-card"
    >
      กำลังโหลด...
    </div>
    <div v-else-if="transactionStore.allTransactions.length === 0" class="empty-state list-card">
      ยังไม่มีประวัติการทำรายการ
    </div>
    <div v-else class="card-list">
      <div v-for="t in transactionStore.allTransactions" :key="t.id" class="list-card item-card">
        <div class="card-header">
          <div>
            <h3 class="drug-name">{{ t.drug_name }}</h3>
            <span class="hospital-name">{{ t.hospital?.name }}</span>
          </div>
          <span :class="['tag', t.transaction_type.toLowerCase()]">
            {{ t.transaction_type === 'LOAN' ? 'ยืม' : 'คืน' }}
          </span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span>วันที่ทำรายการ:</span>
            <strong>{{ new Date(t.transaction_date).toLocaleDateString('th-TH') }}</strong>
          </div>
          <div class="info-row">
            <span>จำนวน:</span>
            <strong>{{ t.quantity }} {{ t.unit }}</strong>
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
.page-header {
  margin-bottom: 2rem;
}
.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
}
.page-header p {
  color: var(--text-secondary);
}
.loading,
.empty-state {
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem;
  font-size: 1.1rem;
}
.card-list {
  display: grid;
  gap: 1rem;
}
.item-card {
  padding: 1.5rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}
.drug-name {
  font-size: 1.2rem;
  font-weight: 600;
}
.hospital-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.card-body .info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}
.info-row strong {
  color: var(--text-primary);
  font-weight: 600;
}
.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--bg-white);
}
.tag.loan {
  background-color: var(--danger);
}
.tag.return {
  background-color: var(--success);
}

.status-outstanding {
  color: var(--danger);
}
.status-partially_returned {
  color: var(--warning);
}
.status-returned {
  color: var(--success);
}
</style>
