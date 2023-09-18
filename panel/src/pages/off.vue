<script setup lang="ts">
definePageMeta({
  name:'OFF',
  page_title:'Off'
})

const {data,pending}=await useFetch('/api/coupons',{
  method:'POST',
  query:{
    method:'GET',
  }
})

</script>

<template>
  {{data}}
</template>

<style scoped>

</style>