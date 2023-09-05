<template>
  address
</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_ADDRESS',
  path:'/profile/address',
  layout:'profile',
  middleware:'auth',
  page_title:'Addresses',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Addresses',
      link:{name:'PROFILE_ADDRESS'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>