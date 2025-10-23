<template>
  <div class="login-container">
    <div class="background-animation">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="login-wrapper">
      <div class="login-art">
        <div class="art-content">
          <div class="logo-large">
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
          <h1 class="art-title">NeoMed AI</h1>
          <p class="art-subtitle">Next-Generation Healthcare Management</p>
          <div class="art-features">
            <div class="feature-item">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.86"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M22 4L12 14.01L9 11.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>Secure & Encrypted</span>
            </div>
            <div class="feature-item">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>Real-Time Updates</span>
            </div>
            <div class="feature-item">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" />
                <path
                  d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>Multi-User Support</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-card login-form-card">
        <div class="form-header">
          <h1 class="form-title">Welcome Back</h1>
          <p class="form-subtitle">Sign in to access your dashboard</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Email Address
            </label>
            <div class="input-wrapper">
              <input
                id="email"
                type="email"
                v-model="email"
                class="form-input"
                required
                placeholder="you@example.com"
                autocomplete="email"
              />
              <div class="input-border"></div>
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Password
            </label>
            <div class="input-wrapper">
              <input
                id="password"
                type="password"
                v-model="password"
                class="form-input"
                required
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <div class="input-border"></div>
            </div>
          </div>

          <button type="submit" class="btn login-btn" :disabled="loading">
            <span v-if="!loading" class="btn-content">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M10 17L15 12L10 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
              Sign In
            </span>
            <span v-else class="btn-loading">
              <div class="spinner"></div>
              Authenticating...
            </span>
          </button>

          <transition name="error-slide">
            <div v-if="errorMsg" class="error-msg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
              </svg>
              {{ errorMsg }}
            </div>
          </transition>
        </form>

        <div class="form-footer">
          <div class="divider">
            <span>Secure Authentication</span>
          </div>
          <p class="footer-text">Protected by AI-powered security</p>
        </div>
      </div>
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
    errorMsg.value = 'Invalid credentials. Please check your email and password.'
    if (error instanceof Error) {
      console.error('Login failed:', error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.background-animation {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.circle-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(183, 148, 246, 0.4), transparent);
  bottom: -250px;
  right: -250px;
  animation-delay: 5s;
}

.circle-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.login-wrapper {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

/* Art Section */
.login-art {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
}

.login-art::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(183, 148, 246, 0.1));
  opacity: 0.5;
}

.art-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.logo-large {
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: 30px;
  color: white;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
}

.logo-large svg {
  width: 64px;
  height: 64px;
}

.art-title {
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.art-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.art-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(10px);
}

.feature-item svg {
  width: 24px;
  height: 24px;
  color: var(--neon-blue);
  flex-shrink: 0;
}

.feature-item span {
  color: var(--text-primary);
  font-weight: 500;
}

/* Form Section */
.login-form-card {
  padding: 3rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.login-form {
  margin-bottom: 2rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.form-label svg {
  width: 16px;
  height: 16px;
  color: var(--neon-blue);
}

.input-wrapper {
  position: relative;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--gradient-accent);
  transition: width 0.3s ease;
}

.form-input:focus + .input-border {
  width: 100%;
}

.login-btn {
  margin-top: 1.5rem;
}

.btn-content,
.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.btn-content svg {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-msg {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(250, 112, 154, 0.1);
  border: 1px solid rgba(250, 112, 154, 0.3);
  border-radius: 12px;
  color: #fa709a;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.error-msg svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.form-footer {
  text-align: center;
}

.divider {
  position: relative;
  margin: 2rem 0 1rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.divider span {
  position: relative;
  background: var(--bg-dark);
  padding: 0 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-text {
  font-size: 0.875rem;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .login-wrapper {
    grid-template-columns: 1fr;
  }

  .login-art {
    display: none;
  }
}

@media (max-width: 640px) {
  .login-container {
    padding: 1rem;
  }

  .login-form-card {
    padding: 2rem 1.5rem;
  }

  .form-title {
    font-size: 2rem;
  }
}
</style>
