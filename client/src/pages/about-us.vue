<template>
 about us
</template>

<script setup lang="ts">
definePageMeta({
  name:'ABOUT_US',
  path:'/about-us',
  layout:'pages',
  page_title:'About us',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'About us',
      link:{name:'ABOUT_US'},
      on:true
    }
  ]
})

</script>

<style scoped>

</style>