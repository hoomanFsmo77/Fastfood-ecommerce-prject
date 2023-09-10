<script setup lang="ts">
import {IBlogs} from "~/utils/types";
const {data:blog_categories,pending:blog_categories_pending}=await useFetch(`/api/blog/category`);
const {data:blog_latest,pending:blog_latest_pending}=await useFetch(`/api/home/news`,{
  transform(data:IBlogs[]){
    return data.filter(item=>item.image_sm.endsWith('jpeg'))
  }
});
const initSearch = (value:string) => {
  if(value.length>0){
    return navigateTo({
      name:'SEARCH',
      params:{
        slug:['blog',value]
      }
    })
  }
}
</script>

<template>
  <LayoutHeader>
    <section id="header-detail-content">
      <LayoutDetail />
    </section>
  </LayoutHeader>
  <div>
    <section id="blogs-list" class="[&_*]:font-robot">
      <v-container>
        <v-row class="items-start">
          <v-column  lg="9" col="12" class="!block">
            <v-row class="mb-2" v-if="$route.query.category && $route.query.category!=='all' && blog_categories">
              <v-column col="12">
                <h3 class="font-600 capitalize ">category: {{blog_categories.filter(item=>item.id==$route.query.category)[0].name}}</h3>
              </v-column>
            </v-row>
            <slot/>
          </v-column>
          <v-column lg="3" col="12" class="lg:sticky lg:mt-0 mt-3 lg:top-[120px]">
            <aside class="lg:pl-2 px-0.5">
              <VInput
                  @icon-fire="initSearch($event)"
                  icon="ri:search-2-line"
                  type="float"
                  id="search-input"
                  placeholder="enter search keywords"
              />
              <h4 class="mt-2 mb-1 font-600">Categories <span class="underline-active px-2 ml-1 before:h-[1px]"></span></h4>
              <ul  v-if="!blog_categories_pending">
                <li class="py-0.7 border-b-[1px] cursor-pointer"  >
                  <NuxtLink class="capitalize text-gray-500  font-600  hover:text-secondary-light-2 transition-all text-1 flex justify-between" :to="{name:'BLOG_LIST',query:{category:'all'}}">
                    all
                    <Icon size="1.2rem" class="ml-auto" name="ri:arrow-right-s-line"/>
                  </NuxtLink>
                </li>
                <li class="py-0.7 border-b-[1px] cursor-pointer" v-for="cat in blog_categories" >
                  <NuxtLink class="capitalize text-gray-500  font-600  hover:text-secondary-light-2 transition-all text-1 flex justify-between" :to="{name:'BLOG_LIST',query:{category:cat.id}}">
                    {{cat.name}}
                    <Icon size="1.2rem" class="ml-auto" name="ri:arrow-right-s-line"/>
                  </NuxtLink>
                </li>
              </ul>
              <h4 class="mt-2 mb-1 font-600">recent news <span class="underline-active px-2 ml-1 before:h-[1px]"></span></h4>
              <ul v-if="!blog_latest_pending">
                <li v-for="news in blog_latest" class="grid grid-cols-[80px_1fr] border-b-[1px]  py-1">
                  <VImage image-class="object-cover" loader-class="w-full" :src="news.image_sm"/>
                  <div class="pl-0.5 ">
                    <NuxtLink :to="{name:'BLOG_DETAIL',params:{link:news.link}}" class="font-600 hover:text-secondary-light-2 transition-all hover:underline">{{news.title}}</NuxtLink>
                    <p class="text-gray-500 mt-0.5">{{news.date}}</p>
                  </div>
                </li>
              </ul>
              <h4 class="mt-2 mb-1 font-600">tags <span class="underline-active px-2 ml-1 before:h-[1px]"></span></h4>

              <ul v-if="!blog_categories_pending" class="flex flex-wrap">
                <li v-for="cat in blog_categories" >
                  <NuxtLink :to="{name:'BLOG_LIST',query:{category:cat.id}}" class="border-[1px] block cursor-pointer font-500 m-0.5 p-0.5 text-0.8 hover:text-[#fff] text-gray-400 hover:bg-secondary-light-2 transition-all">
                    {{cat.name}}
                  </NuxtLink>
                </li>
              </ul>

            </aside>
          </v-column>
        </v-row>
      </v-container>
    </section>
  </div>
  <LayoutFooter />

</template>

<style scoped>

</style>