<template>
  <div class="list-container">
    <h2 class="section-title">รายการยาที่ยังไม่คืน</h2>
    <div
      v-if="transactionStore.loading && transactionStore.outstandingLoans.length === 0"
      class="loading"
    >
      กำลังโหลด...
    </div>
    <div v-else-if="transactionStore.outstandingLoans.length === 0" class="empty-state">
      ไม่มีรายการค้างชำระ 🎉
    </div>
    <div v-else class="card-list">
      <div
        v-for="loan in transactionStore.outstandingLoans"
        :key="loan.id"
        class="list-card item-card"
      >
        <div class="card-header">
          <h3 class="drug-name">{{ loan.drug_name }}</h3>
          <span class="hospital-name">{{ loan.hospital?.name }}</span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span>วันที่ยืม:</span>
            <span>{{ new Date(loan.transaction_date).toLocaleDateString('th-TH') }}</span>
          </div>
          <div class="info-row">
            <span>จำนวนยืม:</span>
            <span>{{ loan.quantity }}</span>
          </div>
          <div class="info-row">
            <span>คืนแล้ว:</span>
            <span>{{ transactionStore.getReturnedQuantity(loan.id) }}</span>
          </div>
        </div>
        <div class="card-footer">
          <span>ยังค้าง:</span>
          <span class="remaining-qty">{{
            loan.quantity - transactionStore.getReturnedQuantity(loan.id)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.fetchAllTransactions()
})
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
.card-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.remaining-qty {
  font-size: 1.25rem;
  color: var(--danger);
}
</style>
