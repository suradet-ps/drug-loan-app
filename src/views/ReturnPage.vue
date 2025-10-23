<template>
  <div class="page-container">
    <header class="page-header">
      <div>
        <h2 class="text-gradient">บันทึกข้อมูลคืนยา</h2>
        <p>เลือกรายการยาที่ยืมมา เพื่อบันทึกการคืน</p>
      </div>

      <router-link to="/" class="back-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Dashboard</span>
      </router-link>
    </header>
    <ReturnForm />
  </div>
</template>

<script setup lang="ts">
import ReturnForm from '../components/ReturnForm.vue'
</script>

<style scoped>
.page-container {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: var(--text-secondary);
  font-size: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-base);
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.back-btn:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  color: var(--neon-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .back-btn span {
    display: none;
  }
  .back-btn {
    padding: var(--space-xs);
  }
}
</style>
