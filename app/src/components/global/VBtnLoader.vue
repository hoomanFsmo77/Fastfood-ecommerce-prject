<script setup lang="ts">
import { HalfCircleSpinner } from 'epic-spinners';
const {flag=false}=defineProps<{
  flag:boolean
}>();
</script>

<template>
  <button v-bind="$attrs" class="flex items-center gap-1">
    <slot />
    <half-circle-spinner
        v-if="flag"
        :animation-duration="1000"
        :size="20"
        color="#fff"
    />
  </button>
</template>

<style scoped>

</style>