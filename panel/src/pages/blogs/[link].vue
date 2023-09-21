<script setup lang="ts">
import {useBlog} from "~/composables/useBlog";

definePageMeta({
  name:'BLOGS_DETAIL',
  page_title:'Blog detail'
})
const route=useRoute()
const {data,pending}=await useFetch('/api/blogs',{
  method:'POST',
  query:{
    method:'GET',
    link:route.params.link
  }
})

const {editBlogFlag,blogData,editBlog,removeBlog}=useBlog(data)
</script>

<template>
  <p v-if="!pending">
    {{data}}
  </p>

  <v-row v-if="blogData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in blogData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="removeBlog" class="btn btn-primary btn-sm">
    remove
  </button>
  <button v-if="editBlogFlag" @click="editBlog" class="btn btn-primary btn-sm">
    edit
  </button>
  <button v-else @click="editBlogFlag=true" class="btn btn-primary btn-sm">
    edit
  </button>
</template>

<style scoped>

</style>