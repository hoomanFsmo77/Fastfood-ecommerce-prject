<template>

  payment
</template>

<script lang="ts" setup>
definePageMeta({
  name:'PAYMENT_VERIFY',
  path:'/payment/verify',
  layout:'pages',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Payment',
      link:{name:'PAYMENT_VERIFY'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>