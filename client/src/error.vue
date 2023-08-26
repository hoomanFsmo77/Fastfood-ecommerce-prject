<script setup lang="ts">
definePageMeta({
  layout:false
})
const error=useError()
onMounted(()=>{
  const el=document.querySelector('.preloader') as HTMLElement;
  el!.style.opacity='0'
  el!.style.visibility='hidden'
  el!.style.zIndex='-1'
})
</script>

<template>
  <h1>{{error}}</h1>
  <LayoutFooter/>
</template>

<style scoped>

</style>