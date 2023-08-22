<template >
    {{$route.params.slug}}

</template>

<script setup lang="ts">
definePageMeta({
  name:'AUTH',
  layout:'pages',
  page_title:'Authentication',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Authentication',
      link:{name:'AUTH',params:{slug:['login']}},
      on:true
    }
  ]
});




</script>

<style scoped>

</style>