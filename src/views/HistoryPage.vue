<template>
  <!-- ADDED: A container for consistent page layout and animation -->
  <div class="page-container">
    <TransactionHistory />
  </div>
</template>

<script setup lang="ts">
import TransactionHistory from '../components/TransactionHistory.vue'
</script>

<!-- ADDED: Style block for the page entrance animation -->
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
