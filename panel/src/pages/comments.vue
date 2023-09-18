<script setup lang="ts">
definePageMeta({
  name:'COMMENTS',
  page_title:'Comments'
})

const {data:blog_comments,pending:blog_comments_pending}=await useFetch('/api/blog-comment',{
  method:'POST',
  query:{
    method:'GET',
    page:1,
    per:6
  }
})
const {data:product_comments,pending:product_comments_pending}=await useFetch('/api/product-comment',{
  method:'POST',
  query:{
    method:'GET',
    page:1,
    per:6
  }
})

</script>

<template>
  comments{{blog_comments}}{{product_comments}}
</template>

<style scoped>

</style>