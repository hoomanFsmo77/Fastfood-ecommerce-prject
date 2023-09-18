<script setup lang="ts">
definePageMeta({
  name:'PRODUCTS',
  page_title:'Products'
})
const {data,pending}=await useFetch('/api/products',{
  method:'POST',
  query:{
    method:'GET',
    page:1,
    per:6
  }
})
</script>

<template>
  propduct {{data}}
</template>

<style scoped>

</style>