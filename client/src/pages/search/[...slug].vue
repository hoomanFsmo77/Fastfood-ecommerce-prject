<template>

  search

  {{$route.params.slug}}
</template>
<script setup lang="ts">
definePageMeta({
  layout:'pages',
  name:'SEARCH',
  page_title:'Search',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },
    {
      name:'Search',
      link:{name:'SEARCH',params:{slug:['product']}},
      on:true
    },

  ]
})


</script>
<style lang="">
    
</style>