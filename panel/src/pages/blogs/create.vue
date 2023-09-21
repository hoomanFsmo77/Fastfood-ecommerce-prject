<script setup lang="ts">
definePageMeta({
  name:'BLOGS_CREATE',
  page_title:'Create blog'
})
const {blogData,createBlog}=useBlog()

</script>

<template>
  <v-row v-if="blogData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in blogData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="createBlog" class="btn btn-primary btn-sm">
    create
  </button>
</template>

<style scoped>

</style>