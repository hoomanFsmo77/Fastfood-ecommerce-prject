<template>
  transactions
</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_TRANSACTIONS',
  path:'/profile/transactions',
  layout:'profile',
  middleware:'auth',
  page_title:'Transactions',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Transactions',
      link:{name:'PROFILE_TRANSACTIONS'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>