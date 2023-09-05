<template>
  favorite
</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_FAVORITE',
  path:'/profile/favorite',
  layout:'profile',
  middleware:'auth',
  page_title:'Favorites',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Favorites',
      link:{name:'PROFILE_FAVORITE'},
      on:true
    }
  ]
});
</script>

<style scoped>

</style>