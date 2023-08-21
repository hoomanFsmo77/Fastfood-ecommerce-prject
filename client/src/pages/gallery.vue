<template>

  gallery
</template>

<script setup lang="ts">
definePageMeta({
  name:'GALLERY',
  path:'/gallery',
  layout:'pages',
  page_title:'Gallery',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Gallery',
      link:{name:'GALLERY'},
      on:true
    }
  ]
});


</script>

<style scoped>

</style>