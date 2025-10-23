<template>
  <div class="main-layout">
    <TheHeader />
    <main class="content-wrap">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-light);
}
.content-wrap {
  flex-grow: 1;
  padding: 100px 2rem 2rem;
}
</style>
