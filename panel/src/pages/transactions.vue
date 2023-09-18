<script setup lang="ts">
definePageMeta({
  name:'TRANSACTIONS',
  page_title:'Transactions'
})
const {data,pending}=await useFetch('/api/transactions',{
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