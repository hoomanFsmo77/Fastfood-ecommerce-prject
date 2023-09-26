<script setup lang="ts">
import {useProduct} from "~/composables/useProduct";
import {submitForm} from "~/utils/functions";

definePageMeta({
  name:'PRODUCTS_CREATE',
  page_title:'Create product'
})
const {data:product_category,pending:product_category_pending}=await useFetch('/api/product-category',{
  method:'POST',
  query:{
    method:'GET',
  },
  transform(data){
    return data.map(item=>{
      return{
        id:item.id,
        title:item.name
      }
    })
  }
})
const date=new Date();
const form=ref<HTMLElement|null>(null)
const {createProduct,productData,selectData,extraImageHandler,offHandler,statusHandler,categoryHandler}=useProduct()
const createProductForm = () => submitForm(form)
</script>

<template>
  <v-row v-if="productData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in productData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <v-row class="mb-1" >
    <FormKit   id="form" type="form" ref="form"  @submit="createProduct"  :actions="false" >
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="title"
              id="title"
              name="title"
              validation="required"
              validation-label="title"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="link"
              id="link"
              name="link"
              validation="required"
              validation-label="link"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_number"
              label="price"
              id="price"
              name="price"
              validation="required"
              validation-label="price"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VSelect @fire="statusHandler" :disabled="false" label="Status"  :select-id="1" :data="[{id:1,title:'Available'},{id:2,title:'Unavailable'}]" />

        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VSelect @fire="categoryHandler" :disabled="false" label="Category" :select-id="1" v-if="!product_category_pending"  :data="product_category" />

        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_number"
              label="quantity"
              id="quantity"
              name="quantity"
              validation="required"
              validation-label="quantity"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VSelect @fire="offHandler" :disabled="false" label="Off"  :select-id="2" :data="[{id:1,title:'Enable'},{id:2,title:'Disable'}]" />

        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              v-if="selectData.off===1"
              type="custom_number"
              label="off percent"
              id="off_percent"
              min="1"
              value="1"
              max="99"
              name="off_percent"
              validation="required"
              validation-label="off percent"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              v-if="selectData.off===1"
              type="custom_date"
              label="sale from"
              id="date_on_sale_from"
              :value="`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`"
              name="date_on_sale_from"
              validation="required"
              validation-label="sale from"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              v-if="selectData.off===1"
              type="custom_date"
              label="sale to"
              id="date_on_sale_to"
              :value="`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`"
              name="date_on_sale_to"
              validation="required"
              validation-label="sale to"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="caption"
              id="caption"
              name="caption"
              validation="required"
              validation-label="caption"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="brief"
              id="brief"
              name="brief"
              validation="required"
              validation-label="brief"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="description"
              id="description"
              name="description"
              validation="required"
              validation-label="description"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5  mb-1">
          <VImage :width="150" :show_image="false"  :editFlag="true" :multiple="false" id="primary_image" label="Primary Image"/>
        </v-column>
      </v-row>
      <v-row class="mb-1.5" >
        <v-column  md="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VImage  @fire="extraImageHandler"  :width="150" :show_image="false"  :editFlag="true" :multiple="true" id="new_images" label="Add New Image"/>
        </v-column>
      </v-row>
    </FormKit>

  </v-row>

  <v-row>
    <v-column col="12" class="flex">
      <VBtnLoader  :flag="productData.flag"    @click="createProductForm" class="btn btn-primary btn-sm ">
        create
      </VBtnLoader>

    </v-column>
  </v-row>


</template>

<style scoped>

</style>