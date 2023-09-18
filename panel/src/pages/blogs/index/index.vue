<script setup lang="ts">
definePageMeta({
  name:'BLOGS',
  page_title:'Products'
})
const {data,pending}=await useFetch('/api/blogs',{
  method:'POST',
  query:{
    method:'GET',
    page:1,
    per:6
  }
})
</script>

<template>
  bl {{data}}
</template>

<style scoped>

</style>