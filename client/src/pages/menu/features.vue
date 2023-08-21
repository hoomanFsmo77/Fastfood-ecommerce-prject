<template>
  Features
</template>

<script setup lang="ts">
definePageMeta({
  name:'FEATURE_MENU',
  path:'/menu/features',
  layout:'pages',
  page_title:'Feature menu',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Menu',
      link:{name:'FEATURE_MENU'},
      on:true
    }
  ]
});

</script>

<style scoped>

</style>