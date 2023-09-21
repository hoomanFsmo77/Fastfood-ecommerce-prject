<script setup lang="ts">
import {useProduct} from "~/composables/useProduct";

definePageMeta({
  name:'PRODUCTS_DETAIL',
  page_title:'Product detail',
  validate(route){
    return /\d+/.test(route.params.id as string)
  }
})

const route=useRoute()

const {data,pending}=await useFetch('/api/products',{
  method:'POST',
  query:{
    method:'GET',
    productID:route.params.id
  }
})

const {removeProduct,editProduct,productData,editProductFlag}=useProduct(data)
</script>

<template>
  <p v-if="!pending">
    {{data}}
  </p>

  <v-row v-if="productData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in productData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="removeProduct" class="btn btn-primary btn-sm">
    remove
  </button>
  <button v-if="editProductFlag" @click="editProduct" class="btn btn-primary btn-sm">
    edit
  </button>
  <button v-else @click="editProductFlag=true" class="btn btn-primary btn-sm">
    edit
  </button>
</template>

<style scoped>

</style>