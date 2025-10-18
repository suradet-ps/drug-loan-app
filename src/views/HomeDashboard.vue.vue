<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1 class="dashboard-title">ระบบจัดการยาที่ยืม-คืน</h1>
      <nav class="dashboard-nav">
        <router-link to="/borrow" class="nav-link">บันทึกยาที่ยืม</router-link>
        <router-link to="/return" class="nav-link">บันทึกยาที่คืน</router-link>
        <router-link to="/history" class="nav-link">ประวัติทั้งหมด</router-link>
      </nav>
    </header>

    <main class="dashboard-main">
      <OutstandingList />
    </main>
  </div>
</template>

<script setup lang="ts">
import OutstandingList from '../components/OutstandingList.vue'
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.dashboard-header {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.dashboard-title {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}

.dashboard-nav {
  margin-top: 1rem;
}

.nav-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #2980b9;
}

.dashboard-main {
  padding: 2rem;
}
</style>
