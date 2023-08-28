<template>
  <template v-if="!blog_list_pending">
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

    <VPagination :per="4"
                 :current_page="blog_list.meta.current_page"
                 :prev-page="blog_list.meta.prevPage"
                 :next-page="blog_list.meta.nextPage"
                 :total="blog_list.meta.total"
    />
  </template>

  <v-row v-else>
    <v-column col="9" class="justify-center mb-4" >
      <client-only>
        <half-circle-spinner
            :animation-duration="1000"
            :size="150"
            color="#a41a13"
        />
      </client-only>
    </v-column>
  </v-row>
</template>

<script setup lang="ts">
import {IBlogs, IProduct, Response_Meta} from "~/utils/types";
import {HalfCircleSpinner} from "epic-spinners";

definePageMeta({
  name:'BLOG_LIST',
  path:'/blogs/list',
  layout:'blog',
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
})

const {data:blog_list,pending:blog_list_pending}=await useFetch<{blogs:IBlogs[],meta:Response_Meta}>(`/api/blog/list`,{query:paginationQuery}
);




</script>

<style scoped>

</style>