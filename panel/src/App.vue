<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const route=useRoute()
useHead({
  titleTemplate(){
    return `${route?.meta?.page_title ? route.meta.page_title : ''} | Wengdo - Fast Food`
  }
})

</script>
