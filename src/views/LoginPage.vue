<template>
  <div class="login-container">
    <div class="form-card">
      <h1 class="title">Tech Talk</h1>
      <p class="subtitle">Drug Loan System</p>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="form-input"
            required
            placeholder="you@example.com"
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="form-input"
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Loading...' : 'Log In' }}
        </button>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (error: unknown) {
    errorMsg.value = 'Invalid login credentials. Please try again.'

    if (error instanceof Error) {
      console.error('Login failed:', error.message)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}
.form-card {
  width: 100%;
  max-width: 400px;
}
.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
.error-msg {
  color: var(--danger);
  text-align: center;
  margin-top: 1rem;
}
</style>
