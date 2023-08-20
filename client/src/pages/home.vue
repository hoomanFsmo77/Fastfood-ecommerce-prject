<template>
  <LazyHomeRecommendation/>
  <LazyHomeProducts />
  <LazyHomeOffer />
  <LazyHomeNews/>
  <LazyHomeDelivery />
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