<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="main-title">
            <span class="title-line-text">ยินดีต้อนรับ</span>
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
/*
  NOTE: This scoped style now uses variables from the global stylesheet.
  This makes it consistent and easier to maintain.
*/
.dashboard-container {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Header Section */
.dashboard-header {
  margin-bottom: var(--space-xl); /* REFACTORED */
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-lg); /* REFACTORED */
}

.main-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs); /* REFACTORED */
  margin-bottom: var(--space-sm); /* REFACTORED */
}

.title-line-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ADDED: Reusable animated gradient text class */
.text-gradient-animated {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientShift 3s ease infinite;
  letter-spacing: -1px;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.subtitle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--neon-green);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--neon-green);
  animation: pulse 2s ease-in-out infinite; /* Already defined globally */
}

.ai-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm); /* REFACTORED */
  padding: var(--space-sm) var(--space-md); /* REFACTORED */
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: var(--border-radius-lg); /* REFACTORED */
  backdrop-filter: blur(10px);
}

.ai-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary); /* REFACTORED */
  border-radius: var(--border-radius-md); /* REFACTORED */
  color: white;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.ai-icon svg {
  width: 24px;
  height: 24px;
}

.ai-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ai-text span {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ai-text strong {
  font-size: 1rem;
  color: var(--neon-blue);
  font-weight: 700;
}

/* Metrics Grid - REFACTORED to align with .list-card style */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md); /* REFACTORED */
  margin-bottom: var(--space-xl); /* REFACTORED */
}

.metric-card {
  /* Inherits from .list-card from the master stylesheet conceptually */
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg); /* REFACTORED */
  padding: var(--space-lg); /* REFACTORED */
  box-shadow: var(--glass-shadow);
  transition: all var(--transition-base); /* REFACTORED */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: var(--space-md); /* REFACTORED */
  animation: slideUp 0.6s ease-out backwards;
}

.metric-card:nth-child(1) {
  animation-delay: 0.1s;
}
.metric-card:nth-child(2) {
  animation-delay: 0.2s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: var(--glass-shadow), var(--shadow-glow); /* REFACTORED */
  transform: translateY(-8px) scale(1.02);
}

.metric-icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0; /* Prevent icon from shrinking */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md); /* REFACTORED */
}

/* Using gradient variables */
.metric-card.outstanding .metric-icon {
  background: var(--gradient-danger);
  color: white; /* Make icon color contrast with gradient */
}

.metric-card.quantity .metric-icon {
  background: var(--gradient-success);
  color: white; /* Make icon color contrast with gradient */
}

.metric-icon svg {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
}

.metric-content {
  flex: 1;
}

.metric-content h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-xs); /* REFACTORED */
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: var(--space-xs); /* REFACTORED */
}
/* ADDED: Utility classes for text gradients */
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
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Section Title */
.section-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm); /* REFACTORED */
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-md); /* REFACTORED */
}

.title-line-divider {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.5), transparent);
}

/* Actions Section */
.actions-section {
  margin-bottom: var(--space-xl);
} /* REFACTORED */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-md); /* REFACTORED */
}

.action-card {
  position: relative;
  padding: var(--space-lg); /* REFACTORED */
  border-radius: var(--border-radius-lg); /* REFACTORED */
  text-decoration: none;
  overflow: hidden;
  transition: all var(--transition-base); /* REFACTORED */
  animation: slideUp 0.6s ease-out backwards;
  color: white;
  background-size: 100% 100%;
  background-position: center;
}
.action-card::before {
  /* Gradient overlay */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  transition: all var(--transition-slow);
  z-index: 0;
}

.action-card.borrow {
  background-image: var(--gradient-success);
}
.action-card.return {
  background-image: var(--gradient-primary);
}

.action-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg); /* REFACTORED */
}
.action-card:hover::before {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.action-card:nth-child(1) {
  animation-delay: 0.3s;
}
.action-card:nth-child(2) {
  animation-delay: 0.4s;
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg); /* REFACTORED */
  margin-bottom: var(--space-md); /* REFACTORED */
  transition: all var(--transition-base); /* REFACTORED */
}

.action-card:hover .action-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: var(--shadow-md);
}

.action-icon svg {
  width: 32px;
  height: 32px;
}

.action-content h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.action-content p {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: var(--space-md); /* REFACTORED */
}

.action-arrow {
  font-size: 2rem;
  font-weight: 700;
  opacity: 0.7;
  transition: all var(--transition-base); /* REFACTORED */
}

.action-card:hover .action-arrow {
  opacity: 1;
  transform: translateX(10px);
}

/* Outstanding Section */
.outstanding-section {
  animation: slideUp 0.6s ease-out 0.5s backwards;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
  .text-gradient-animated {
    font-size: 2rem;
  }
  .ai-badge {
    align-self: flex-start;
  }
  .metrics-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }
  .action-card,
  .metric-card {
    padding: var(--space-md);
  } /* REFACTORED */
}
</style>
