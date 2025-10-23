<template>
  <div class="page-container">
    <header class="page-header">
      <div>
        <h2>บันทึกข้อมูลคืนยา</h2>
        <p>เลือกรายการยาที่ต้องการคืน</p>
      </div>
      <router-link to="/" class="back-btn">&larr; กลับไปหน้า Dashboard</router-link>
    </header>
    <ReturnForm />
  </div>
</template>

<script setup lang="ts">
import ReturnForm from '../components/ReturnForm.vue'
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
}
.page-header p {
  color: var(--text-secondary);
}
.back-btn {
  background-color: var(--bg-white);
  border: 1px solid var(--border-color);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}
.back-btn:hover {
  background-color: var(--bg-light);
  color: var(--primary-accent);
}
</style>
