<template>

  <template v-if="!pending && data.items.length>0">
    <div  class="grid  grid-cols-[repeat(3,1fr)] gap-2">
      <VProductCard
          class="border-[1px]"
          v-for="item in data.items"
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
    <VPagination
        :current_page="data.meta.current_page"
        :prev-page="data.meta.prevPage"
        :next-page="data.meta.nextPage"
        :total="data.meta.total"
    />
  </template>
  <div v-else class="border-[1px] mb-1.5 p-1.5 rounded-4">
    <p class="text-center">No favorite founded!</p>
  </div>
</template>

<script setup lang="ts">
import {usePagination} from "~/composables/usePagination";

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
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/profile/fav',{
  query:{
    method:'GET',
    type:'pagination',
    page:pageQuery,
    per:6
  }
})

</script>

<style scoped>

</style>