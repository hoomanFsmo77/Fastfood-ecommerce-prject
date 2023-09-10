<template>
  <LazyHomeRecommendation/>
  <LazyHomeProducts />
  <LazyHomeOffer />
  <LazyHomeNews/>
  <LazyHomeDelivery />
  <LazyHomeServices />
  <LazyHomeGallery />
</template>

<script setup lang="ts">
definePageMeta({
  name:'HOME',
  path:'/home',
  layout:'default',
  page_title:'Home'
});


</script>

<style scoped>

</style>