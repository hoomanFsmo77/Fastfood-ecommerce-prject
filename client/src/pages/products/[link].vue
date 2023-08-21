<template>
  link
</template>

<script setup lang="ts">

definePageMeta({
  name:'PRODUCT_DETAIL',
  path:'/products/:link',
  layout:'pages',
  page_title:'Product detail',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Products',
      link:{name:'PRODUCT_LIST'},
      on:false
    }
  ]
});
</script>

<style scoped>

</style>