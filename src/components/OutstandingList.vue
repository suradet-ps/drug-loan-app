<template>
  <div class="list-container">
    <h2 class="section-title">รายการยาที่ยังค้างคืน</h2>
    <div
      v-if="transactionStore.loading && transactionStore.outstandingLoans.length === 0"
      class="loading"
    >
      กำลังโหลด...
    </div>
    <div v-else-if="transactionStore.outstandingLoans.length === 0" class="empty-state list-card">
      ไม่มีรายการค้างชำระ
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
            <strong>{{ new Date(loan.transaction_date).toLocaleDateString('th-TH') }}</strong>
          </div>
          <div class="info-row">
            <span>จำนวนยืม:</span>
            <strong>{{ loan.quantity }} {{ loan.unit }}</strong>
          </div>
          <div class="info-row">
            <span>คืนแล้ว:</span>
            <strong>{{ transactionStore.getReturnedQuantity(loan.id) }} {{ loan.unit }}</strong>
          </div>
        </div>
        <div class="card-footer">
          <span>ยังเหลือต้องคืน:</span>
          <span class="remaining-qty"
            >{{ loan.quantity - transactionStore.getReturnedQuantity(loan.id) }}
            {{ loan.unit }}</span
          >
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
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
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
  gap: 1.5rem;
}
.item-card {
  padding: 1.5rem;
  transition: all 0.2s ease;
}
.item-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px var(--shadow-color);
}
.card-header {
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
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
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}
.info-row strong {
  color: var(--text-primary);
  font-weight: 600;
}
.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
}
.remaining-qty {
  font-size: 1.5rem;
  color: var(--danger);
  font-weight: 700;
}
</style>
