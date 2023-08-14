<script setup lang="ts">
defineProps<{
  title:string,
  link:{name:string,query?:any},
  hasSub:boolean,
  sub?:any[]
}>()

</script>

<template>
  <li class="navbar-item">
    <NuxtLink class="navbar-item-link" :to="link">
      {{title}}
    </NuxtLink>
  </li>
</template>

<style scoped>

</style>