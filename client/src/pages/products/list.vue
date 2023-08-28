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
const pageQuery=ref<number>(1)


watchEffect(()=>{
  pageQuery.value=route.query.page ? Number(route.query.page) :1;
})

const {data,pending,refresh}=await useFetch<{products:IProduct[],meta:Response_Meta}>(`/api/products/list?per=8`,{query:{page:pageQuery}}
);

</script>

<style scoped>

</style>