<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="main-title">
            <span class="text-gradient-animated">ระบบยืม-คืนยา รพ.สระโบสถ์</span>
          </h1>
          <p class="subtitle">
            <span class="pulse-dot"></span>
            บริหารจัดการยายืม-คืนระหว่างโรงพยาบาลได้อย่างมีประสิทธิภาพ
          </p>
        </div>
      </div>
    </header>

    <div class="metrics-grid">
      <div class="metric-card outstanding">
        <div class="metric-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="metric-content">
          <h3>จำนวนรายการ</h3>
          <p class="metric-value text-gradient-danger">
            {{ transactionStore.outstandingLoans.length }}
          </p>
          <span class="metric-label">Pending Returns</span>
        </div>
      </div>

      <div class="metric-card quantity">
        <div class="metric-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="metric-content">
          <h3>Total Quantity</h3>
          <p class="metric-value text-gradient-success">{{ totalOutstandingQuantity }}</p>
          <span class="metric-label">Units Outstanding</span>
        </div>
      </div>
    </div>

    <!-- Action Cards -->
    <div class="actions-section">
      <h2 class="section-title">
        <span class="text-gradient">Quick Actions</span>
        <div class="title-line-divider"></div>
      </h2>
      <div class="actions-grid">
        <router-link to="/borrow" class="action-card borrow">
          <div class="action-content">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h3>ยายืม</h3>
            <p>บันทึกรายการยายืม</p>
            <div class="action-arrow">→</div>
          </div>
        </router-link>

        <router-link to="/return" class="action-card return">
          <div class="action-content">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 10H21M3 10L9 4M3 10L9 16"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 14H3M21 14L15 20M21 14L15 8"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>ยาคืน</h3>
            <p>บันทึกรายการยาคืน</p>
            <div class="action-arrow">→</div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Outstanding List -->
    <div class="outstanding-section">
      <h2 class="section-title">
        <span class="text-gradient">Active Loans</span>
        <div class="title-line-divider"></div>
      </h2>
      <OutstandingList />
    </div>
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
.dashboard-container {
  padding: var(--space-lg) var(--space-md);
}

.dashboard-header {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-lg);
}

.main-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.title-line-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.text-gradient-animated {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6c6fe4 0%, #8d58b7 60%, #6c6fe4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -0.02em;
}

.subtitle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: var(--neon-green);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(92, 191, 123, 0.6);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.metric-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(140, 120, 100, 0.22);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--glass-shadow);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.metric-card:hover {
  border-color: rgba(140, 120, 100, 0.35);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.metric-icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md);
  color: white;
}

.metric-card.outstanding .metric-icon {
  background: var(--gradient-danger);
}

.metric-card.quantity .metric-icon {
  background: var(--gradient-success);
}

.metric-icon svg {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.2));
}

.metric-content {
  flex: 1;
}

.metric-content h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-xs);
}

.metric-value {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-xs);
}

.text-gradient-danger {
  background: var(--gradient-danger);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.text-gradient-success {
  background: var(--gradient-success);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.metric-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.title-line-divider {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, rgba(108, 111, 228, 0.6), transparent);
}

.actions-section {
  margin-bottom: var(--space-xl);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-md);
}

.action-card {
  position: relative;
  padding: var(--space-lg);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  overflow: hidden;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    filter var(--transition-base);
  color: white;
  background-size: 100% 100%;
  background-position: center;
  min-height: 220px;
}

.action-card.borrow {
  background-image: var(--gradient-success);
}

.action-card.return {
  background-image: var(--gradient-primary);
}

.action-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  filter: brightness(1.05);
}

.action-content {
  position: relative;
  z-index: 1;
}

.action-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--space-md);
  color: inherit;
}

.action-icon svg {
  width: 32px;
  height: 32px;
}

.action-content h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.action-content p {
  font-size: 1.05rem;
  opacity: 0.92;
  margin-bottom: var(--space-md);
}

.action-arrow {
  font-size: 2rem;
  font-weight: 700;
  opacity: 0.85;
  transition: transform var(--transition-base);
}

.action-card:hover .action-arrow {
  transform: translateX(8px);
}

.outstanding-section {
  margin-bottom: var(--space-xl);
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: var(--space-xs) var(--space-xs);
  }

  .header-content {
    flex-direction: column;
  }

  .text-gradient-animated {
    font-size: 2.4rem;
  }

  .metrics-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }

  .action-card,
  .metric-card {
    padding: var(--space-md);
  }
}
</style>
