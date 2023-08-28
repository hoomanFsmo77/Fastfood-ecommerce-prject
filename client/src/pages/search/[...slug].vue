<template>
  <section v-if="!pending" id="search-section">
    <v-container>
      <h3 class="mb-1">Search result for "{{$route.params.slug[1]}}" in {{$route.params.slug[0]}}</h3>
      <h3 v-if="$route.params.slug[0]==='product'">found {{data.products.length}} items</h3>
      <h3 v-else-if="$route.params.slug[0]==='blog'">found {{data.blogs.length}} items</h3>
      <div v-if="$route.params.slug[0]==='product' && data.products && data.products.length>0" class="grid my-3 grid-cols-[repeat(4,1fr)] gap-2">
        <VProductCard
            v-for="tab_item in data.products"
            :primary_image="tab_item.primary_image"
            :title="tab_item.title"
            :caption="tab_item.caption"
            :price="tab_item.price"
            :link="tab_item.link"
            :status="tab_item.status"
            :off="tab_item.off"
            :off_percent="tab_item.off_percent"
        />
      </div>
      <div v-else-if="$route.params.slug[0]==='blog' && data.blogs && data.blogs.length>0" class="grid mt-2  grid-cols-[repeat(2,1fr)] gap-2 w-full">
        <VBlogCard
            v-for="blog in data.blogs"
            :image="blog.image_xs"
            :title="blog.title"
            :date="blog.date"
            :link="blog.link"
            :brief="blog.brief"
        />
      </div>

      <VPagination
                   :current_page="data.meta.current_page"
                   :prev-page="data.meta.prevPage"
                   :next-page="data.meta.nextPage"
                   :total="data.meta.total"
      />
    </v-container>
  </section>
  <section v-else class="loader-section">
    <client-only>
      <half-circle-spinner
          :animation-duration="2000"
          :size="150"
          color="#a41a13"
      />
    </client-only>
  </section>
</template>
<script setup lang="ts">
import {HalfCircleSpinner} from "epic-spinners";

definePageMeta({
  layout:'pages',
  name:'SEARCH',
  page_title:'Search',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },
    {
      name:'Search',
      link:{name:'SEARCH',params:{slug:['product']}},
      on:true
    },

  ]
})
const route=useRoute();
const paginationQuery=reactive({
  page:1,
  cat:'',
  search:''
})

watchEffect(()=>{
  paginationQuery.page=route.query.page ? Number(route.query.page) :1;
  paginationQuery.cat=route.params.slug[0] ? route.params.slug[0] :'product';
  paginationQuery.search=route.params.slug[1] ? route.params.slug[1] :'pizza';
})

const {data,pending}=await useFetch('/api/search?per=4',{
  query:paginationQuery
})


</script>
<style lang="">
    
</style>