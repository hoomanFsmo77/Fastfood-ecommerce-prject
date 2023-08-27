<script setup lang="ts">
defineProps<{
  image:string,
  date:string,
  author_firstname:string,
  author_lastname:string,
  category:string,
  title:string,
  brief:string,
  link:string,
  total_comments:number,
  type:'grid'|'list'
}>()


</script>

<template>
  <div class="blog-list-card group">
    <div class="blog-list-card-image">
      <VImage loader-class="h-20 w-full"  image-class="object-cover transition-all duration-500 w-full group-hover:scale-[1.05]"  :src="image"/>
      <NuxtLink class="blog-card-image-cover group-hover:opacity-100" :to="{name:'BLOG_DETAIL',params:{link}}"></NuxtLink>
    </div>
    <div class="blog-list-card-desc">
      <p class="text-secondary-light-2 capitalize text-1 font-600">
        {{date}}
      </p>
      <div class="flex items-center" v-if="type==='list'">
        <p class="font-600 capitalize text-primary-light-3 text-1">
          By: {{author_firstname}} {{author_lastname}}
        </p>
        <span class="mx-0.5 text-primary-light-3">/</span>
        <p class="font-600 capitalize text-primary-light-3 text-1">
          {{ category }}
        </p>
        <span class="mx-0.5 text-primary-light-3">/</span>
        <p class="font-600 capitalize text-primary-light-3 text-1">
          comments: {{ total_comments }}
        </p>
      </div>

    </div>
    <hr>
    <div  class="mt-1.3">
      <NuxtLink class="font-600 h3 hover:text-secondary-light-2 transition-all cursor-pointer" :to="{name:'BLOG_DETAIL',params:{link}}">{{title}}</NuxtLink>
      <h6 class="leading-1.8 text-gray-500">
        {{brief}}
      </h6>
      <NuxtLink class="btn btn-primary btn-sm btn-light mt-2" :to="{name:'BLOG_DETAIL',params:{link}}">
        read more
      </NuxtLink>
    </div>
  </div>

</template>

<style scoped>

</style>