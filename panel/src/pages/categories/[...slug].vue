<script setup lang="ts">
import {useCategory} from "~/composables/useCategory";
import {submitForm} from "~/utils/functions";

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
const {editCategory,editCategoryFlag,removeCategory,categoryData}=useCategory(route.params.slug[0]==='product' ? 'product' : 'blog',data);
const productCategoryForm=ref<HTMLElement|null>(null)
const blogCategoryForm=ref<HTMLElement|null>(null)
const editProductCategoryForm = () => submitForm(productCategoryForm)
const editBlogCategoryForm = () => submitForm(blogCategoryForm)
</script>

<template>
  <v-row v-if="categoryData.errors" class="mb-1">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in categoryData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>


  <template v-if="$route.params.slug[0]==='product'">
    <v-row  class="mb-1" v-if="!pending">
      <FormKit   id="productCategoryForm" type="form" ref="productCategoryForm"  @submit="editCategory"  :actions="false" >
        <v-row >
          <v-column  md="6" col="12" class="md:pr-0.5 md:mb-0 !pl-0 mb-1">
            <FormKit
                type="custom_text"
                label="category"
                :value="data.name"
                :disabled="!editCategoryFlag"
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
                :disabled="!editCategoryFlag"
                :value="data.description"
                id="description"
                name="description"
                validation="required"
                validation-label="description"
            />
          </v-column>
        </v-row>
      </FormKit>
    </v-row>
  </template>
  <template v-else>
    <v-row  class="mb-1" v-if="!pending">
      <FormKit   id="blogCategoryForm" type="form" ref="blogCategoryForm"  @submit="editCategory"  :actions="false" >
        <v-row >
          <v-column  col="12" class="md:pr-0.5 md:mb-0 !pl-0 mb-1">
            <FormKit
                type="custom_text"
                label="category"
                :value="data.name"
                :disabled="!editCategoryFlag"
                id="category"
                name="category"
                validation="required"
                validation-label="category"
            />
          </v-column>
        </v-row>
      </FormKit>
    </v-row>
  </template>



  <v-row >
    <v-column col="12" class="flex">
      <button @click="removeCategory" class="btn btn-primary btn-sm mr-1">
        remove
      </button>
      <template v-if="route.params.slug[0]==='product'">
        <VBtnLoader v-if="editCategoryFlag" :flag="categoryData.flag" @click="editProductCategoryForm" class="btn btn-primary btn-sm ">
          confirm
        </VBtnLoader>
        <button v-else @click="editCategoryFlag=true" class="btn btn-primary btn-sm">
          edit
        </button>
      </template>
      <template v-else>
        <VBtnLoader v-if="editCategoryFlag" :flag="categoryData.flag" @click="editBlogCategoryForm" class="btn btn-primary btn-sm ">
          confirm
        </VBtnLoader>
        <button v-else @click="editCategoryFlag=true" class="btn btn-primary btn-sm">
          edit
        </button>
      </template>

    </v-column>
  </v-row>
</template>

<style scoped>

</style>