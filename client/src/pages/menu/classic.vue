<template>
  classic
</template>

<script setup lang="ts">
definePageMeta({
  name:'CLASSIC_MENU',
  path:'/menu/classic',
  layout:'pages',
  page_title:'Classic menu',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Menu',
      link:{name:'CLASSIC_MENU'},
      on:true
    }
  ]
});

</script>

<style scoped>

</style>