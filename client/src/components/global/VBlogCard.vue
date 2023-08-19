<script setup lang="ts">
defineProps<{
  image:string,
  date:string,
  title:string,
  brief:string,
  link:string
}>()

</script>

<template>
  <div class="blog-card">
      <div class="blog-card-image-wrapper">
        <NuxtLink class="blog-card-image-content peer" :to="{name:'BLOG_DETAIL',params:{link}}">
          <div class="blog-card-date">
            <p class="text-1.1 text-primary-light-1 font-700">{{date}}</p>
          </div>
        </NuxtLink>
        <VImage
            class="peer-hover:scale-[1.05] blog-card-image  h-full overflow-hidden"
            loader-class="w-full h-15  rounded-2"  :src="image"/>
      </div>
    <div class="blog-content">
      <NuxtLink :to="{name:'BLOG_DETAIL',params:{link}}" class="text-primary-dark-2 block h5 font-600 mb-1 transition-all hover:text-secondary-light-2 cursor-pointer">{{title}}</NuxtLink>
      <p class="text-gray-500 text-1 mb-1">
        {{brief}}
      </p>
      <NuxtLink class="text-secondary-light-2 underline-offset-4 text-1.1 font-600 underline" :to="{name:'BLOG_DETAIL',params:{link}}">
        Read More
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>

</style>