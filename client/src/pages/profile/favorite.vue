<template>

  <div v-if="userFavoriteListFetchFlag" class="grid  grid-cols-[repeat(3,1fr)] gap-2">
    <VProductCard
        class="border-[1px]"
        v-for="item in userFavoriteList"
        :primary_image="item.primary_image"
        :title="item.title"
        :caption="item.caption"
        :price="item.price"
        :link="item.link"
        :status="item.status"
        :off="item.off"
        :off_percent="item.off_percent"
        :product-id="item.id"
    />
  </div>
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

const {userFavoriteList,userFavoriteListFetchFlag}=useFavoriteStore()
</script>

<style scoped>

</style>