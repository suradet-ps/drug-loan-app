<template>
  <div class="list-container">
    <h2 class="section-title">
      <span class="title-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 11L12 14L22 4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M21 12V19C21 19.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      Outstanding Loans
      <span class="count-badge">{{ transactionStore.outstandingLoans.length }}</span>
    </h2>

    <div
      v-if="transactionStore.loading && transactionStore.outstandingLoans.length === 0"
      class="loading list-card"
    >
      Loading transactions...
    </div>

    <div v-else-if="transactionStore.outstandingLoans.length === 0" class="empty-state list-card">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 11L12 14L22 4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3" />
        </svg>
      </div>
      <h3>All Clear</h3>
      <p>No outstanding loans at the moment</p>
    </div>

    <div v-else class="card-list">
      <div
        v-for="(loan, index) in transactionStore.outstandingLoans"
        :key="loan.id"
        class="list-card item-card"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-decoration"></div>
        <div class="card-header">
          <div class="header-left">
            <h3 class="drug-name">
              <span class="drug-icon">💊</span>
              {{ loan.drug_name }}
            </h3>
            <span class="hospital-name">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" />
              </svg>
              {{ loan.hospital?.name }}
            </span>
          </div>
          <div class="status-badge outstanding">
            <span class="status-dot"></span>
            Outstanding
          </div>
        </div>

        <div class="card-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Loan Date</span>
              <strong class="info-value">
                {{
                  new Date(loan.transaction_date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              </strong>
            </div>
            <div class="info-item">
              <span class="info-label">Borrowed</span>
              <strong class="info-value highlight"> {{ loan.quantity }} {{ loan.unit }} </strong>
            </div>
            <div class="info-item">
              <span class="info-label">Returned</span>
              <strong class="info-value success">
                {{ transactionStore.getReturnedQuantity(loan.id) }} {{ loan.unit }}
              </strong>
            </div>
            <div class="info-item">
              <span class="info-label">Unit Price</span>
              <strong class="info-value"> ฿{{ loan.price_per_unit.toLocaleString() }} </strong>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <div class="remaining-section">
            <span class="remaining-label">Remaining to Return</span>
            <div class="remaining-value">
              <span class="remaining-number">
                {{ loan.quantity - transactionStore.getReturnedQuantity(loan.id) }}
              </span>
              <span class="remaining-unit">{{ loan.unit }}</span>
            </div>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{
                width: `${(transactionStore.getReturnedQuantity(loan.id) / loan.quantity) * 100}%`,
              }"
            ></div>
          </div>
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
.list-container {
  animation: fadeIn 0.6s ease-out 0.7s backwards;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-bottom: var(--space-sm);
}

.title-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-success);
  border-radius: var(--border-radius-md);
  color: white;
}
.title-icon svg {
  width: 24px;
  height: 24px;
}

.count-badge {
  margin-left: auto;
  padding: var(--space-xs) var(--space-sm);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  font-weight: 600;
  color: var(--neon-blue);
}

.loading.list-card {
  padding: var(--space-xl);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-success);
  border-radius: var(--border-radius-lg);
  color: white;
  margin-bottom: var(--space-md);
}
.empty-icon svg {
  width: 48px;
  height: 48px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}
.empty-state p {
  font-size: 1rem;
  color: var(--text-secondary);
}

.card-list {
  display: grid;
  gap: var(--space-md);
}

.item-card {
  padding: 0;
  animation: slideInRight 0.5s ease-out backwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.item-card:hover {
  transform: translateX(8px);
  box-shadow: var(--glass-shadow), var(--shadow-glow);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-decoration {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--gradient-warning);
  opacity: 0;
  transition: opacity var(--transition-base);
}
.item-card:hover .card-decoration {
  opacity: 1;
}

.card-header,
.card-body,
.card-footer {
  padding: var(--space-md);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--glass-border);
}

.drug-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: var(--space-xs);
}

.drug-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.hospital-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
.hospital-name svg {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.status-badge {
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-lg);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.status-badge.outstanding {
  background: rgba(250, 112, 154, 0.15);
  color: #fa709a;
  border: 1px solid rgba(250, 112, 154, 0.3);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}
.info-value.highlight {
  color: var(--neon-orange);
}
.info-value.success {
  color: var(--neon-green);
}

.card-footer {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid var(--glass-border);
}

.remaining-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}
.remaining-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}
.remaining-value {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
}
.remaining-number {
  font-size: 2rem;
  font-weight: 800;
  color: #fa709a;
  line-height: 1;
  text-shadow: 0 0 20px rgba(250, 112, 154, 0.5);
}
.remaining-unit {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--gradient-success);
  border-radius: var(--border-radius-md);
  transition: width var(--transition-slow) ease;
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }
  .card-header {
    flex-direction: column;
    gap: var(--space-sm);
  }
  .status-badge {
    align-self: flex-start;
  }
}
</style>
