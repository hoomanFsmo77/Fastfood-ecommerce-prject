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
  layout:'default'
});


</script>

<style scoped>

</style>