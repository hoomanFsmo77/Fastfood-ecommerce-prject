<template>
  orders
</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_ORDERS',
  path:'/profile/orders',
  layout:'profile',
  middleware:'auth',
  page_title:'Orders',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Orders',
      link:{name:'PROFILE_ORDERS'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>