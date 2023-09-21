<script setup lang="ts">
import {useCategory} from "~/composables/useCategory";

definePageMeta({
  name:'CATEGORIES_DETAIL',
  page_title:'Category detail'
})
const route=useRoute()
const {data,pending}=await useFetch(route.params.slug[0]==='product' ? '/api/product-category' : '/api/blog-category',{
  method:'POST',
  query:{
    method:'GET',
    id:route.params.slug[1]
  }
})
const {editCategory,editCategoryFlag,removeCategory,categoryData}=useCategory(route.params.slug[0]==='product' ? 'product' : 'blog',data)

</script>

<template>
  <p v-if="!pending">
    {{data}}
  </p>

  <v-row v-if="categoryData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in categoryData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="removeCategory" class="btn btn-primary btn-sm">
    remove
  </button>
  <button v-if="editCategoryFlag" @click="editCategory" class="btn btn-primary btn-sm">
    edit
  </button>
  <button v-else @click="editCategoryFlag=true" class="btn btn-primary btn-sm">
    edit
  </button>
</template>

<style scoped>

</style>