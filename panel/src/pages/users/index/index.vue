<script setup lang="ts">
definePageMeta({
  name:'USERS',
  page_title:'Users'
})
const {data,pending}=await useFetch('/api/users',{
  method:'POST',
  query:{
    method:'GET',
    page:1,
    per:6
  }
})
</script>

<template>
  users {{data}}
</template>

<style scoped>

</style>