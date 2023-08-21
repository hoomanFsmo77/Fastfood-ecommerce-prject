<template>
  list
</template>

<script setup lang="ts">
definePageMeta({
  name:'BLOG_LIST',
  path:'/blogs/list',
  layout:'pages',
  page_title:'Blogs list',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Blogs',
      link:{name:'BLOG_LIST'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>