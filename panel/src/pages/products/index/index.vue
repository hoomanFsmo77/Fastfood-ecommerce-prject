<script setup lang="ts">
import {usePagination} from "~/composables/usePagination";

definePageMeta({
  name:'PRODUCTS',
  page_title:'Products'
})
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/products',{
  method:'POST',
  query:{
    method:'GET',
    page:pageQuery,
    per:6
  }
})
const {public:{product_page}}=useRuntimeConfig()
</script>

<template>
  <v-row v-if="!pending">
    <v-column col="12">
      <VTable :head="['product','title','category','link','price','quantity','status','']">
        <tr class="tr-hover " v-for="product in data.products">
          <td>
            <nuxt-img width="70" :src="product.primary_image"/>
          </td>
          <td>
            <p>
              {{product.title}}
            </p>
          </td>
          <td>
            <p>
              {{product.product_category}}
            </p>
          </td>
          <td>
            <a target="_blank" class="text-0.8 text-blue-600 hover:underline" :href="product_page+product.link">
              {{product.link}}
            </a>
          </td>
          <td>
            <div class="flex gap-0.5" v-if="product.off">
              <div >
                <div class="flex items-center">
                  <p class="text-1.1 line-through">{{product.price}}</p><p>$</p>
                </div>
                <p class="text-red-600 text-1">-{{product.off_percent}}%</p>
              </div>
              <div  class="flex items-center">
                <p class="text-1.3 ">{{$calculate_off_price(product.price,product.off_percent)}}</p><p class="text-1.2 ">$</p>
              </div>
            </div>
            <div v-else class="flex items-center">
              <p class="text-1.2">{{product.price}}</p><p>$</p>
            </div>
          </td>
          <td>
            <p>
              {{product.quantity}}
            </p>
          </td>
          <td>
            <p class="text-green-600" v-if="product.status">
              Available
            </p>
            <p class="text-red-600" v-else>
              Unavailable
            </p>
          </td>
          <td>
            <NuxtLink :to="{name:'PRODUCTS_DETAIL',params:{id:product.id}}" class="btn btn-primary btn-sm">
              Show
            </NuxtLink>
          </td>
        </tr>

      </VTable>

      <VPagination
          :total="data.meta.total"
          :current_page="data.meta.current_page"
          :next-page="data.meta.nextPage"
          :prev-page="data.meta.prevPage"
      />

    </v-column>
  </v-row>
</template>

<style scoped>

</style>