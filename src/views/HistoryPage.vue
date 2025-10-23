<template>
  <div class="page-container">
    <TransactionHistory />
  </div>
</template>

<script setup lang="ts">
import TransactionHistory from '../components/TransactionHistory.vue'
</script>

<style scoped>
.page-container {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
