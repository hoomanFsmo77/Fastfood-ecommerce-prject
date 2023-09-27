<script setup lang="ts">
import {useCategory} from "~/composables/useCategory";
import {submitForm} from "~/utils/functions";

definePageMeta({
  name:'CATEGORIES_CREATE',
  page_title:'Create category'
})
const {categoryData,createProductCategory,createBlogCategory}=useCategory()
const productCategoryForm=ref<HTMLElement|null>(null)
const blogCategoryForm=ref<HTMLElement|null>(null)
const createProductCategoryForm = () => submitForm(productCategoryForm)
const createBlogCategoryForm = () => submitForm(blogCategoryForm)
</script>

<template>
  <v-row v-if="categoryData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in categoryData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <v-row  class="mb-2">
    <v-column col="12" class="!pl-0">
      <h5 class="mb-1">Create Product Category</h5>
      <FormKit   id="productCategoryForm" type="form" ref="productCategoryForm"  @submit="createProductCategory"  :actions="false" >
        <v-row >
          <v-column  md="6" col="12" class="md:pr-0.5 md:mb-0 !pl-0 mb-1">
            <FormKit
                type="custom_text"
                label="category"
                id="category"
                name="category"
                validation="required"
                validation-label="category"
            />
          </v-column>
          <v-column md="6" col="12" class="md:px-0.5 md:mb-0 mb-1">
            <FormKit
                type="custom_text"
                label="description"
                id="description"
                name="description"
                validation="required"
                validation-label="description"
            />
          </v-column>
        </v-row>
      </FormKit>
      <v-row class="mt-1.5">
        <v-column col="12">
          <button @click="createProductCategoryForm"  class="btn btn-primary btn-sm ">
            create
          </button>
        </v-column>
      </v-row>
    </v-column>
  </v-row>
  <v-row :no-p="true" class="mb-2">
    <v-column col="12">
      <h5  class="mb-1">Create Blog Category</h5>
      <FormKit   id="blogCategoryForm" type="form" class="!pl-0 " ref="blogCategoryForm"  @submit="createBlogCategory"  :actions="false" >
        <v-row >
          <v-column   col="6" class="md:pr-0.5 md:mb-0 !pl-0 mb-1">
            <FormKit
                type="custom_text"
                label="category"
                id="category"
                name="category"
                validation="required"
                validation-label="category"
            />
          </v-column>
        </v-row>
      </FormKit>
      <v-row :no-p="true" class="mt-1.5">
        <v-column col="12">
          <button @click="createBlogCategoryForm"  class="btn btn-primary btn-sm ">
            create
          </button>
        </v-column>
      </v-row>
    </v-column>
  </v-row>

</template>

<style scoped>

</style>