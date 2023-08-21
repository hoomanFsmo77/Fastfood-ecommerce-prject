<template>
  <section id="products-list" v-if="!pending">
    <v-container>
      <v-row>
        <v-column col="12" class="!block">
            <h1 class="text-center font-700 underline-active pb-1 mx-auto">Our Products</h1>
          <div class="grid mt-3 grid-cols-[repeat(4,1fr)] gap-2">
            <VProductCard
                v-for="tab_item in paginationData.current_page_data"
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
          <template v-for="(item,index) in paginationData.pages">
            <button class="pagination-btn mx-0.5" :class="{'active':paginationData.current_page===index+1}" @click="goToPage(index+1)">
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
</template>

<script setup lang="ts">
import {IProduct} from "~/utils/types";
import {usePagination} from "~/composables/usePagination";
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

const {data,pending,execute,refresh}=await useFetch<IProduct[]>(`/api/products/all`)
const {paginationData,prevPage,nextPage,goToPage}=usePagination<IProduct>(data,8);

</script>

<style scoped>

</style>