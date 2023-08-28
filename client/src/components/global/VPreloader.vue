<script setup lang="ts">
const nuxtApp=useNuxtApp();
const show=ref(true)
nuxtApp.hook('page:start',()=>{
  const el=document.querySelector('.preloader') as HTMLElement;
  show.value=true
  el!.style.opacity='1'
  el!.style.visibility='visible'
  el!.style.zIndex='9999999999'
})
nuxtApp.hook('page:finish',()=>{
  const el=document.querySelector('.preloader') as HTMLElement;
  show.value=false
  el!.style.opacity='0'
  el!.style.visibility='hidden'
  el!.style.zIndex='-1'
})

</script>

<template>
  <Teleport  to="body">
    <div v-if="show" class="preloader">
      <span class="spinner-wrapper">
        <span class="spinner-inner"></span>
      </span>

    </div>
  </Teleport>
</template>

<style scoped >

</style>