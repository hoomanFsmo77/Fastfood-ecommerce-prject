<script setup lang="ts">
import {usePagination} from "~/composables/usePagination";

definePageMeta({
  name:'BLOGS',
  page_title:'Blogs'
})
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/blogs',{
  method:'POST',
  query:{
    method:'GET',
    page:pageQuery,
    per:6
  }
})
const {public:{blog_page}}=useRuntimeConfig()
</script>

<template>
  <v-row v-if="!pending">
    <v-column col="12">
      <VTable :head="['blog','title','category','link','Author','Date','Comments','']">
        <tr class="tr-hover " v-if="data.blogs.length>0" v-for="blog in data.blogs">
          <td>
            <nuxt-img width="70" :src="blog.image_xs"/>
          </td>
          <td>
            <p>
              {{blog.title}}
            </p>
          </td>
          <td>
            <p>
              {{blog.category}}
            </p>
          </td>
          <td>
            <a target="_blank" class="text-0.8 text-blue-600 block w-6 text-hidden hover:underline" :href="blog_page+blog.link">
              {{blog.link}}
            </a>
          </td>
          <td>
            <p>
              {{blog.author_firstname}} {{blog.author_lastname}}
            </p>
          </td>
          <td>
            <p>
              {{blog.date}}
            </p>
          </td>
          <td>
            <p>
              {{blog.comments}}
            </p>
          </td>
          <td>
            <NuxtLink :to="{name:'BLOGS_DETAIL',params:{link:blog.link}}" class="btn btn-primary btn-sm">
              Show
            </NuxtLink>
          </td>
        </tr>
        <tr v-else class="">
          <td colspan="5">
            <p class="text-center">
              No Data.
            </p>
          </td>
        </tr>
      </VTable>

      <VPagination
          v-if="data.blogs.length>0"
          :total="data.meta.total"
          :current_page="data.meta.current_page"
          :next-page="data.meta.nextPage"
          :prev-page="data.meta.prevPage"
      />

    </v-column>
  </v-row>
  <VLoader :flag="pending" />
</template>

<style scoped>

</style>