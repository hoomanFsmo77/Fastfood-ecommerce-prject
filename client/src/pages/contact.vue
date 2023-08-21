<template>

  contact us
</template>

<script setup lang="ts">
definePageMeta({
  name:'CONTACT_US',
  path:'/contact-us',
  layout:'pages',
  page_title:'Contact us',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Contact us',
      link:{name:'CONTACT_US'},
      on:true
    }
    ]
});


</script>

<style scoped>

</style>