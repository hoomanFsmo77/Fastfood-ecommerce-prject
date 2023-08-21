<template>
  checkout
</template>

<script lang="ts" setup>
definePageMeta({
  name:'CHECKOUT',
  path:'/checkout',
  layout:'pages',
  page_title:'Checkout',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Checkout',
      link:{name:'CHECKOUT'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>