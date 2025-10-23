<template>
  <header class="app-header">
    <div class="header-glow"></div>
    <div class="header-content">
      <router-link to="/" class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span class="brand-name text-gradient">ระบบบันทึกยายืม-คืน</span>
          <span class="brand-tagline">โรงพยาบาลสระโบสถ์</span>
        </div>
      </router-link>

      <nav class="main-nav">
        <router-link to="/" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="nav-text">Dashboard</span>
        </router-link>

        <router-link to="/history" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 6V12L16 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="nav-text">History</span>
        </router-link>
      </nav>

      <button @click="handleLogout" class="logout-btn">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
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
  background: var(--bg-card);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--glass-border);
  padding: 0 var(--space-lg);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: var(--shadow-md);
}

.header-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--neon-blue),
    var(--neon-purple),
    transparent
  );
  animation: headerGlow 3s ease-in-out infinite;
}

@keyframes headerGlow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.header-content {
  width: 100%;
  max-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

/* Brand Logo & Text */
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  transition: transform var(--transition-base);
}

.brand:hover {
  transform: translateY(-2px);
}

.brand:hover .brand-icon {
  transform: scale(1.1) rotate(5deg);
}

.brand-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: var(--border-radius-md);
  color: var(--neon-blue);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.brand-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.brand-icon svg {
  width: 24px;
  height: 24px;
  z-index: 1;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.brand-tagline {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
}

/* Main Navigation */
.main-nav {
  display: flex;
  gap: var(--space-sm);
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.75rem var(--space-md);
  border-radius: var(--border-radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  background: var(--glass-bg);
  border: 1px solid transparent;
}

.nav-link svg {
  width: 20px;
  height: 20px;
  transition: filter var(--transition-base);
}

.nav-link:hover {
  color: var(--neon-blue);
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
}

.nav-link:hover svg {
  filter: drop-shadow(0 0 8px currentColor);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-accent);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform var(--transition-base);
}

.nav-link.router-link-exact-active {
  color: var(--neon-blue);
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.nav-link.router-link-exact-active::after {
  transform: scaleX(0.8);
}

/* Logout Button */
.logout-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.75rem var(--space-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition-base);
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}

.logout-btn:hover {
  background: rgba(255, 110, 199, 0.1);
  border-color: rgba(255, 110, 199, 0.3);
  color: var(--neon-pink);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 110, 199, 0.2);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .app-header {
    padding: 0 var(--space-md);
  }

  .header-content {
    gap: var(--space-sm);
  }

  .brand-text,
  .nav-text,
  .btn-text {
    display: none;
  }

  .main-nav {
    gap: var(--space-xs);
  }

  .nav-link,
  .logout-btn {
    padding: 0.75rem;
  }
}
</style>
