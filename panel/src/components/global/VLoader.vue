<script setup lang="ts">
defineProps<{
  flag:boolean
}>()
</script>

<template>
  <div v-if="flag" class="w-full h-[200px] flex justify-center items-center">
      <span class="spinner-wrapper">
        <span class="spinner-inner"></span>
      </span>
  </div>
</template>

<style scoped>

</style>