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
      <VPagination
                   :current_page="data.meta.current_page"
                   :prev-page="data.meta.prevPage"
                   :next-page="data.meta.nextPage"
                   :total="data.meta.total"
      />
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
const pageQuery=ref<number>(1)


watchEffect(()=>{
  pageQuery.value=route.query.page ? Number(route.query.page) :1;
})

const {data,pending}=await useFetch<{blogs:IBlogs[],meta:Response_Meta}>(`/api/blog/list?per=6`,{query:{page:pageQuery}}
);
</script>

<style scoped>

</style>