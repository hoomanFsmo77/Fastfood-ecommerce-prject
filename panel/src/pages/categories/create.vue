<script setup lang="ts">
import {useCategory} from "~/composables/useCategory";

definePageMeta({
  name:'CATEGORIES_CREATE',
  page_title:'Create category'
})
const {categoryData,createCategory}=useCategory()

</script>

<template>
  <v-row v-if="categoryData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in categoryData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="createCategory('product')" class="btn btn-primary btn-sm">
    create pro
  </button>
  <button @click="createCategory('blog')" class="btn btn-primary btn-sm">
    create blog
  </button>
</template>

<style scoped>

</style>