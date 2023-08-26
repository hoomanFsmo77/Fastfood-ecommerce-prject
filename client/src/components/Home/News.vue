<script setup lang="ts">
import {Blog} from "~/utils/types";

const {data,pending,error}=await useFetch<Blog[]>('/api/home/news')


</script>

<template>
  <section id="latest-news" v-if="!pending">
      <v-container>
        <v-row >
          <v-column col="12">
              <h1 class="text-primary-dark-2 underline-active-left pb-1 text-left font-700">Latest News</h1>
          </v-column>
        </v-row>
        <v-row class="items-start">
          <v-column col="8">
              <div class="grid mt-2  grid-cols-[repeat(2,1fr)] gap-2 w-full">
                <VBlogCard
                    v-for="blog in data.slice(0,4)"
                    :image="blog.image_xs"
                    :title="blog.title"
                    :date="blog.date"
                    :link="blog.link"
                    :brief="blog.brief"
                />
              </div>
          </v-column>
          <v-column col="4" class="px-1">
            <div class="bg-[#fff] rounded-2 px-1 py-2 mt-2 w-full shadow-md">
              <div class="mb-1 last:mb-0 border-b-[1px] last:border-0 pb-1 border-b-gray-200" v-for="blog in data.slice(3,6)">
                <NuxtLink class="h4 font-600 leading-1.1  transition-all hover:text-secondary-light-2" :to="{name:'BLOG_DETAIL',params:{link:blog.link}}">{{blog.title}}</NuxtLink>
                <p class="text-secondary-light-2 text-0.9 mt-1">{{blog.date}}</p>

              </div>
            </div>

          </v-column>
        </v-row>
      </v-container>
  </section>
</template>

<style scoped>

</style>