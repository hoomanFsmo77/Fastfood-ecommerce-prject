<template>
  <section id="products-list" v-if="!pending">
    <v-container>
      <v-row>
        <v-column col="12" class="!block">
            <h1 class="text-center font-700 underline-active pb-1 mx-auto">Our Products</h1>
          <div class="grid mt-3 grid-cols-[repeat(4,1fr)] gap-2">
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
        </v-column>
      </v-row>
      <v-row class="mt-2">
        <v-column col="12" class="justify-center">

          <button class="pagination-btn mx-0.5" @click="prevPage">
            <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
          </button>
          <template v-for="(item,index) in data.meta.total">
            <button class="pagination-btn mx-0.5" :class="{'active':data.meta.current_page===index+1}" @click="goToPage(index+1)">
              {{index+1}}
            </button>
          </template>
          <button class="pagination-btn mx-0.5" @click="nextPage">
            <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
          </button>

        </v-column>
      </v-row>
    </v-container>
  </section>
  <section v-else class="loader-section">
    <client-only>
      <half-circle-spinner
          :animation-duration="1000"
          :size="150"
          color="#a41a13"
      />
    </client-only>
  </section>
</template>

<script setup lang="ts">
import {IProduct, Response_Meta} from "~/utils/types";
import { HalfCircleSpinner } from 'epic-spinners';

definePageMeta({
  name:'PRODUCT_LIST',
  path:'/products/list',
  layout:'pages',
  page_title:'Products list',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Products',
      link:{name:'PRODUCT_LIST'},
      on:true
    }

  ]
});
const route=useRoute();
const paginationQuery=reactive({
  per:8,
  page:1
})
watchEffect(()=>{
  paginationQuery.per=route.query.per ? Number(route.query.per) : 8;
  paginationQuery.page=route.query.page ? Number(route.query.page) :1;
  process.client && window.scrollTo(0,0)
})

const {data,pending,refresh}=await useFetch<{products:IProduct[],meta:Response_Meta}>(`/api/products/list`,{query:paginationQuery}
);
const goToPage = (page:number) => {
   navigateTo({
    name:'PRODUCT_LIST',
    query:{
      page:page,
      per:8
    },
  })
  refresh()
}

const nextPage = () => {
  if(data.value){
     navigateTo({
       name:'PRODUCT_LIST',
      query:{
        page:data.value.meta.nextPage,
        per:8
      }
    })
    refresh()
  }
}

const prevPage = () => {
  if(data.value){
     navigateTo({
       name:'PRODUCT_LIST',
      query:{
        page:data.value.meta.prevPage,
        per:8
      }
    })
    refresh()
  }
}

</script>

<style scoped>

</style>