<template>

  cart
</template>

<script lang="ts" setup>
definePageMeta({
  name:'SHOPPING_CART',
  path:'/shopping-cart',
  layout:'pages',
  page_title:'Shopping Card',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Shopping Card',
      link:{name:'SHOPPING_CART'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>