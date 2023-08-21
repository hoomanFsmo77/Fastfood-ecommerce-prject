<template>
  grid
</template>

<script setup lang="ts">
definePageMeta({
  name:'BLOG_GRID',
  path:'/blogs/grid',
  layout:'pages',
  page_title:'Blogs grid',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Blogs',
      link:{name:'BLOG_GRID'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>