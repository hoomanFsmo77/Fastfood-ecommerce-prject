<script setup lang="ts">
import {useProduct} from "~/composables/useProduct";

definePageMeta({
  name:'PRODUCTS_CREATE',
  page_title:'Create product'
})

const {createProduct,productData}=useProduct()

</script>

<template>
  <v-row v-if="productData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in productData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="createProduct" class="btn btn-primary btn-sm">
    create
  </button>
</template>

<style scoped>

</style>