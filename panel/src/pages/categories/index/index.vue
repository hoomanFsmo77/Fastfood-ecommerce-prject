<script setup lang="ts">
definePageMeta({
  name:'CATEGORIES',
  page_title:'Categories'
})
const {data:blog_category,pending:blog_category_pending}=await useFetch('/api/blog-category',{
  method:'POST',
  query:{
    method:'GET',
  }
})
const {data:product_category,pending:product_category_pending}=await useFetch('/api/product-category',{
  method:'POST',
  query:{
    method:'GET',
  }
})
</script>

<template>
  cat {{blog_category}} {{product_category}}
</template>

<style scoped>

</style>