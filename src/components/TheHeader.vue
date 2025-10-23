<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">ระบบบันทึกยายืม-คืน</span>
          <span class="brand-tagline">โรงพยาบาลสระโบสถ์</span>
        </div>
      </router-link>

      <nav class="main-nav">
        <router-link to="/" class="nav-link">Dashboard</router-link>
        <router-link to="/history" class="nav-link">History</router-link>
      </nav>

      <button @click="handleLogout" class="logout-btn">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M9 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 17L21 12L16 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 12H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="btn-text">Logout</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.app-header {
  background: var(--bg-card, rgba(18, 18, 18, 0.8));
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 var(--space-lg, 1.5rem);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  width: 100%;
  max-width: 1300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: color 0.25s ease;
}

.brand:hover {
  color: var(--neon-blue);
}

.brand-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neon-blue);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.brand-icon svg {
  width: 22px;
  height: 22px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.brand-tagline {
  font-size: 1rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

.main-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex: 1;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--neon-blue);
  background: rgba(94, 231, 223, 0.08);
}

.nav-link.router-link-exact-active {
  color: var(--neon-blue);
  background: rgba(94, 231, 223, 0.15);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}

.logout-btn:hover {
  background: rgba(255, 110, 199, 0.12);
  border-color: rgba(255, 110, 199, 0.3);
  color: var(--neon-pink);
}

@media (max-width: 768px) {
  .brand-text,
  .btn-text {
    display: none;
  }

  .main-nav {
    gap: 0.5rem;
  }

  .nav-link,
  .logout-btn {
    padding: 0.65rem;
  }
}
</style>
