<template>
  <NuxtLayout>
    <div>
      <NuxtPage/>
      <VPreloader/>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const route=useRoute();
useHead({
  titleTemplate(){
    if(route.meta.page_title){
      return `${route.meta.page_title} | Wengdo - Fast Food`
    }else{
      return `Wengdo - Fast Food`
    }

  }
})
</script>
