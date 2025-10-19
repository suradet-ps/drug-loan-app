<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item" active-class="active">
      <span>🏠</span>
      <span class="label">หน้าหลัก</span>
    </router-link>
    <router-link to="/borrow" class="nav-item" active-class="active">
      <span>➕</span>
      <span class="label">ยืมยา</span>
    </router-link>
    <router-link to="/return" class="nav-item" active-class="active">
      <span>↩️</span>
      <span class="label">คืนยา</span>
    </router-link>
    <router-link to="/history" class="nav-item" active-class="active">
      <span>📜</span>
      <span class="label">ประวัติ</span>
    </router-link>
    <button @click="handleLogout" class="nav-item">
      <span>🚪</span>
      <span class="label">ออก</span>
    </button>
  </nav>
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
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--glass-border);
  z-index: 1000;
  max-width: 1280px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
}

.nav-item .label {
  font-size: 0.7rem;
  margin-top: 2px;
}

.nav-item.active {
  color: var(--primary-accent);
}

.nav-item:hover {
  color: var(--secondary-accent);
}
</style>
