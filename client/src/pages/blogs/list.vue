<template>
  <section id="blogs-list" >
    <v-container>
      <v-row class="mb-2" v-if="$route.query.category && $route.query.category!=='all' && blog_categories">
        <v-column col="12">
          <h3 class="font-600 capitalize">category: {{blog_categories.filter(item=>item.id==$route.query.category)[0].name}}</h3>
        </v-column>
      </v-row>
      <v-row class="items-start">
        <v-column v-if="!blog_list_pending" col="9" class="!block">
          <v-row class="mb-2" v-for="blog in blog_list.blogs">
            <v-column col="12">
              <BlogCard
                  :image="blog.image_lg"
                  :date="blog.date"
                  :author_firstname="blog.author_firstname"
                  :author_lastname="blog.author_lastname"
                  :category="blog.category"
                  :title="blog.title"
                  :brief="blog.brief"
                  :link="blog.link"
                  :total_comments="blog.comments"
                  type="list"
              />
            </v-column>
          </v-row>
        </v-column>
        <v-column col="9" class="justify-center mb-4" v-else>
          <client-only>
            <half-circle-spinner
                :animation-duration="1000"
                :size="150"
                color="#a41a13"
            />
          </client-only>
        </v-column>
        <v-column col="3" class="sticky top-[150px]">
          <aside class="pl-2">
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
                <VImage image-class="object-cover" :src="news.image_sm"/>
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
      <v-row class="mt-2">
        <v-column col="12" class="justify-center">

          <NuxtLink :to="{name:'BLOG_LIST',query:{page:blog_list.meta.prevPage,per:4}}" class="pagination-btn mx-0.5">
            <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
          </NuxtLink>
          <template v-for="(item,index) in blog_list.meta.total">
            <NuxtLink :to="{name:'BLOG_LIST',query:{page:index+1,per:4}}" class="pagination-btn mx-0.5" :class="{'active':blog_list.meta.current_page===index+1}" >
              {{index+1}}
            </NuxtLink>
          </template>
          <NuxtLink :to="{name:'BLOG_LIST',query:{page:blog_list.meta.nextPage,per:4}}" class="pagination-btn mx-0.5" >
            <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
          </NuxtLink>

        </v-column>
      </v-row>

    </v-container>
  </section>
</template>

<script setup lang="ts">
import {IBlogs, IProduct, Response_Meta} from "~/utils/types";
import {HalfCircleSpinner} from "epic-spinners";

definePageMeta({
  name:'BLOG_LIST',
  path:'/blogs/list',
  layout:'pages',
  page_title:'Blogs list',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Blogs',
      link:{name:'BLOG_LIST'},
      on:true
    }
  ]
});

const route=useRoute();
const paginationQuery=reactive({
  per:4 as number,
  page:1 as number,
  category:'all' as string
})
watchEffect(()=>{
  paginationQuery.per=route.query.per ? Number(route.query.per) : 4;
  paginationQuery.page=route.query.page ? Number(route.query.page) :1;
  paginationQuery.category=route.query.category ? String(route.query.category):'all';
  process.client && window.scrollTo(0,0)
})

const {data:blog_list,pending:blog_list_pending}=await useFetch<{blogs:IBlogs[],meta:Response_Meta}>(`/api/blog/list`,{query:paginationQuery}
);
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

<style scoped>

</style>