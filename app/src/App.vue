<template>
  <NuxtLayout>
    <div>
      <NuxtPage/>
      <VPreloader/>
    </div>
  </NuxtLayout>

  <VModal :modal-class="modalOptions.modalClass" :fade-outside="modalOptions.outsideFade" v-model="modalOpenFlag"></VModal>
</template>
<script setup lang="ts">
import {useModal} from "~/composables/useModal";

const route=useRoute();
useHead({
  titleTemplate(){
    if(route.meta.page_title){
      return `${route.meta.page_title} | Wengdo - Fast Food`
    }else{
      return `Wengdo - Fast Food`
    }

  }
});
const {modalOpenFlag,modalOptions}=useModal()
</script>
