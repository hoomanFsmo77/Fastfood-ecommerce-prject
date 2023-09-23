<template>
  <NuxtLayout>
    <NuxtPage />
    <VPreloader/>
  </NuxtLayout>

  <VModal :modal-class="modalOptions.modalClass" :fade-outside="modalOptions.outsideFade" v-model="modalOpenFlag"></VModal>
</template>
<script setup lang="ts">
const route=useRoute()
useHead({
  titleTemplate(){
    return `${route?.meta?.page_title ? route.meta.page_title : ''} | Wengdo - Fast Food`
  }
})
const {modalOpenFlag,modalOptions}=useModal()
</script>
