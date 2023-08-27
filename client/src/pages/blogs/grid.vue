<template>
  <section v-if="!pending" id="blog-grid">
    <v-container>
      <div class="grid grid-cols-2 gap-2">
        <BlogCard
            v-for="blog in data.blogs"
            :image="blog.image_lg"
            :date="blog.date"
            :author_firstname="blog.author_firstname"
            :author_lastname="blog.author_lastname"
            :category="blog.category"
            :title="blog.title"
            :brief="blog.brief"
            :link="blog.link"
            :total_comments="blog.comments"
            type="grid"
        />
      </div>
      <v-row class="mt-2">
        <v-column col="12" class="justify-center">

          <NuxtLink :to="{name:'BLOG_GRID',query:{page:data.meta.prevPage,per:4}}" class="pagination-btn mx-0.5">
            <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
          </NuxtLink>
          <template v-for="(item,index) in data.meta.total">
            <NuxtLink :to="{name:'BLOG_GRID',query:{page:index+1,per:4}}" class="pagination-btn mx-0.5" :class="{'active':data.meta.current_page===index+1}" >
              {{index+1}}
            </NuxtLink>
          </template>
          <NuxtLink :to="{name:'BLOG_GRID',query:{page:data.meta.nextPage,per:4}}" class="pagination-btn mx-0.5" >
            <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
          </NuxtLink>

        </v-column>
      </v-row>
    </v-container>
  </section>
  <section v-else class="loader-section">
    <client-only>
      <half-circle-spinner
          :animation-duration="1000"
          :size="150"
          color="#a41a13"
      />
    </client-only>
  </section>
</template>

<script setup lang="ts">
import {IBlogs, Response_Meta} from "~/utils/types";
import {HalfCircleSpinner} from "epic-spinners";

definePageMeta({
  name:'BLOG_GRID',
  path:'/blogs/grid',
  layout:'pages',
  page_title:'Blogs grid',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Blogs',
      link:{name:'BLOG_GRID'},
      on:true
    }
  ]
});
const route=useRoute();
const paginationQuery=reactive({
  per:6,
  page:1
})
watchEffect(()=>{
  paginationQuery.per=route.query.per ? Number(route.query.per) : 6;
  paginationQuery.page=route.query.page ? Number(route.query.page) :1;
  process.client && window.scrollTo(0,0)
})

const {data,pending}=await useFetch<{blogs:IBlogs[],meta:Response_Meta}>(`/api/blog/list`,{query:paginationQuery}
);
</script>

<style scoped>

</style>