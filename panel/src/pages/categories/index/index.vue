<script setup lang="ts">
definePageMeta({
  name:'CATEGORIES',
  page_title:'Categories'
})

const {data:blog_category,pending:blog_category_pending}=await useFetch('/api/blog-category',{
  method:'POST',
  query:{
    method:'GET',
  }
})
const {data:product_category,pending:product_category_pending}=await useFetch('/api/product-category',{
  method:'POST',
  query:{
    method:'GET',
  }
})
</script>

<template>
  <v-row v-if="!product_category_pending" class="mb-3">
    <v-column col="12">
      <h6 class="mb-1">Product Category</h6>
      <VTable :head="['Category','Description','']">
        <tr class="tr-hover " v-if="product_category.length>0" v-for="cat in product_category">
          <td>
            <p>{{cat.name}}</p>
          </td>
          <td>
            <p>
              {{cat.description}}
            </p>
          </td>
          <td>
            <NuxtLink :to="{name:'CATEGORIES_DETAIL',params:{slug:['product',cat.id]}}" class="btn btn-primary btn-sm">
              Show
            </NuxtLink>
          </td>
        </tr>
        <tr v-else class="">
          <td colspan="3">
            <p class="text-center">
              No Data.
            </p>
          </td>
        </tr>
      </VTable>
    </v-column>
  </v-row>
  <VLoader :flag="product_category_pending" />
  <v-row v-if="!blog_category_pending">
    <v-column col="12">
      <h6 class="mb-1">Blog Category</h6>
      <VTable :head="['Category','']">
        <tr class="tr-hover " v-if="blog_category.length>0" v-for="cat in blog_category">
          <td>
            <p>{{cat.name}}</p>
          </td>
          <td>
            <div class="flex justify-end">
              <NuxtLink :to="{name:'CATEGORIES_DETAIL',params:{slug:['blog',cat.id]}}" class="btn btn-primary btn-sm">
                Show
              </NuxtLink>
            </div>
          </td>
        </tr>

        <tr v-else class="">
          <td colspan="3">
            <p class="text-center">
              No Data.
            </p>
          </td>
        </tr>
      </VTable>
    </v-column>
  </v-row>
  <VLoader :flag="blog_category_pending" />
</template>

<style scoped>

</style>