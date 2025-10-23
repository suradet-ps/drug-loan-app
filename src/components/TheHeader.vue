<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="brand">DrugLoan</router-link>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">Dashboard</router-link>
        <router-link to="/history" class="nav-link">History</router-link>
      </nav>
      <button @click="handleLogout" class="logout-btn">Logout</button>
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
  background-color: var(--bg-white);
  border-bottom: 1px solid var(--border-color);
  padding: 0 2rem;
  height: 70px;
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
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-link.router-link-exact-active {
  color: var(--primary-accent);
  border-bottom-color: var(--primary-accent);
}

.nav-link:hover {
  color: var(--primary-accent);
}

.logout-btn {
  background-color: var(--bg-light);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: var(--primary-accent);
  color: var(--bg-white);
  border-color: var(--primary-accent);
}
</style>
