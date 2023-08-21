<template>
  link
</template>

<script setup lang="ts">
definePageMeta({
  name:'BLOG_DETAIL',
  path:'/blogs/:link',
  layout:'pages',
  page_title:'Blog detail',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Products',
      link:{name:'BLOG_LIST'},
      on:false
    }
  ]
});
</script>

<style scoped>

</style>