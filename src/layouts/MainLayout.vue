<template>
  <div class="main-layout">
    <div class="content-wrap">
      <router-view />
    </div>
    <NavBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content-wrap {
  flex-grow: 1;
  padding: 1rem 1rem 6rem 1rem;
}
</style>
