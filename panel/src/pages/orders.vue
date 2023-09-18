<script setup lang="ts">
definePageMeta({
  name:'ORDERS',
  page_title:'Orders'
})
const {data,pending}=await useFetch('/api/orders',{
  query:{
    method:'GET',
    page:1,
    per:6
  }
})
</script>

<template>
  {{data}}
</template>

<style scoped>

</style>