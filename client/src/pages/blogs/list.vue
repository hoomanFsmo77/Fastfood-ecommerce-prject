<template>
  <section id="blogs-list" v-if="!pending">
    <v-container>
      <v-row>
        <v-column col="9" class="!block">
          <v-row class="mb-2" v-for="blog in data.blogs">
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
              />
            </v-column>
          </v-row>
        </v-column>
        <v-column col="3">

        </v-column>
      </v-row>
      <v-row class="mt-2">
        <v-column col="12" class="justify-center">

          <button class="pagination-btn mx-0.5" @click="prevPage">
            <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
          </button>
          <template v-for="(item,index) in data.meta.total">
            <button class="pagination-btn mx-0.5" :class="{'active':data.meta.current_page===index+1}" @click="goToPage(index+1)">
              {{index+1}}
            </button>
          </template>
          <button class="pagination-btn mx-0.5" @click="nextPage">
            <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
          </button>

        </v-column>
      </v-row>

    </v-container>
  </section>
</template>

<script setup lang="ts">
import {IBlogs, IProduct, Response_Meta} from "~/utils/types";

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
  per:4,
  page:1
})
watchEffect(()=>{
  paginationQuery.per=route.query.per ? Number(route.query.per) : 4;
  paginationQuery.page=route.query.page ? Number(route.query.page) :1;
  process.client && window.scrollTo(0,0)
})

const {data,pending,refresh}=await useFetch<{blogs:IBlogs[],meta:Response_Meta}>(`/api/blog/list`,{query:paginationQuery}
);

const goToPage = (page:number) => {
  navigateTo({
    name:'BLOG_LIST',
    query:{
      page:page,
      per:4
    },
  })
  refresh()
}

const nextPage = () => {
  if(data.value){
    navigateTo({
      name:'BLOG_LIST',
      query:{
        page:data.value.meta.nextPage,
        per:4
      }
    })
    refresh()
  }
}

const prevPage = () => {
  if(data.value){
    navigateTo({
      name:'BLOG_LIST',
      query:{
        page:data.value.meta.prevPage,
        per:4
      }
    })
    refresh()
  }
}
</script>

<style scoped>

</style>