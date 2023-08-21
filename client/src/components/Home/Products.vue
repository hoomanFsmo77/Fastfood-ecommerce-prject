<script setup lang="ts">
import {Product_menu} from "~/utils/types";
interface IMenuResponse {
  tab:string,
  list:Product_menu[]
}
const {data,pending,error}=await useFetch<IMenuResponse[]>('/api/tab-products')
const currentTabIndex=ref<number>(0)
</script>

<template>
 <section v-if="!pending" id="products">
    <v-container>
      <v-row>
        <v-column col="12">
          <h1 class="text-center text-primary-dark-1 pb-1 font-700 w-full underline-active">Our Products</h1>
        </v-column>
      </v-row>
      <v-row class="mt-3">
        <v-column col="12" >
          <ul class="products-tab">
            <li v-for="(item,index) in data" @click="currentTabIndex=index" class="products-tab-item " >
                <span :class="{'active':currentTabIndex===index}" class="underline-active-hover products-tab-inside ">
                  {{item.tab}}
                </span>
            </li>
          </ul>
        </v-column>
      </v-row>
      <div class="grid mt-3 grid-cols-[repeat(4,1fr)] gap-2">
        <VProductCard
            v-for="tab_item in data[currentTabIndex].list"
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
    </v-container>
 </section>


</template>

<style scoped>

</style>