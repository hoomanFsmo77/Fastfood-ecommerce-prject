<template>
  <section class="group" v-if="!blog_data_pending">
    <div class="blog-detail-image">
      <VImage :src="blog_data.image_lg" image-class="group-hover:scale-[1.2] transition-all duration-500" loader-class="!h-20 w-full"/>
      <div class="blog-detail-image-cover group-hover:opacity-100"></div>
    </div>
    <div class="blog-detail">
      <p class="text-secondary-light-2 font-robot h6 font-500">
        {{blog_data.date}}
      </p>
      <div class="flex items-center" >
        <p class="text-gray-600 font-500 font-robot capitalize mr-0.2">
          By :
        </p>
        <p class="font-500 capitalize font-robot text-secondary-light-2 text-0.9 md:text-1">
           {{blog_data.author_firstname}} {{blog_data.author_lastname}}
        </p>
        <span class="mx-0.5 text-gray-600">/</span>
        <p class="font-500 capitalize font-robot text-secondary-light-2 text-0.9 md:text-1">
          {{ blog_data.category }}
        </p>
        <span class="mx-0.5 text-gray-600">/</span>
        <p class="font-500 capitalize font-robot text-secondary-light-2 text-0.9 md:text-1">
          comments: {{ blog_data.total_comments }}
        </p>
      </div>
    </div>
    <hr class="mx-1"/>
    <div class="blog-detail-content">
      <v-row class="items-end">
        <v-column v-for="row in blog_data.content" col="12" :md="row.col || 12" class="!block mb-1.5">
          <h3 class="mb-1 font-600 text-primary-dark-3 font-robot" v-if="row.title">{{row.title}}</h3>
          <p class="text-primary-dark-3 font-robot  leading-2 h6 font-400">{{row.text}}</p>
        </v-column>
      </v-row>
    </div>
    <div class="blog-detail-comment">

<!--      ////// start comments render here-->
      <template v-if="!blog_comments_flag && blog_data.total_comments>0">
        <h3 class="mb-1 font-robot capitalize">comments {{blog_data.total_comments}}</h3>
        <BlogComment
            v-for="comment in blog_comments.comments"
            :comment-id="comment.id"
            :reply="comment.reply"
            :name="`${comment.author_firstname} ${comment.author_lastname}`"
            :date="comment.date"
            :content="comment.body"
            :image="comment.author_image"
            :blog-id="blog_data.id"
        />
        <VPagination
            :total="blog_comments.meta.total"
            :next-page="blog_comments.meta.nextPage"
            :prev-page="blog_comments.meta.prevPage"
            :current_page="blog_comments.meta.current_page"
        />
      </template>
<!--      ////// end  comments render here-->

<!--      //// start loader for comment-->
      <template v-else-if="blog_comments_flag && blog_data.total_comments>0">
        <div class="flex justify-center">
          <client-only>
            <half-circle-spinner
                :animation-duration="2000"
                :size="150"
                color="#a41a13"
            />
          </client-only>
        </div>
      </template>
<!--      //// end loader for comment-->

<!--      //// in case of no comments-->
      <h3 v-else-if="blog_data.total_comments===0" class="mb-1 capitalize font-robot">no comments.</h3>


    </div>
    <div class="mt-2">
      <h3 class="mb-1 font-robot">leave your comment</h3>
      <template v-if="isLogin">
        <BlogReply
            @reply-submit="replySubmit"
            :commentId="0"
            :blog-id="blog_data.id"
            :is-reply="false"
        />
        <h6 v-if="replyMessage" class="text-green-500 mt-1">{{replyMessage}}</h6>
      </template>
      <template v-else>
        <h6 class="font-400 mt-2">You are not authorized yet. <NuxtLink class="text-blue-600 h6" :to="{name:'AUTH'}">login</NuxtLink> or <NuxtLink class="text-blue-600 h6" :to="{name:'AUTH'}">sign in</NuxtLink> to add review or comments.</h6>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import {IBlogs, IProduct} from "~/utils/types";
import {HalfCircleSpinner} from "epic-spinners";
const {isLogin}=useStates();

definePageMeta({
  name:'BLOG_DETAIL',
  path:'/blogs/:link',
  layout:'blog',
  page_title:'Blog detail',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Blogs',
      link:{name:'BLOG_LIST'},
      on:false
    }
  ]
});

const route=useRoute();
const {pageQuery}=usePagination()
///// blog detail
const {data:blog_data,pending:blog_data_pending}=await useFetch<IBlogs>(`/api/blog/${route.params.link}`)

///// blog comments
const {data:blog_comments,pending:blog_comments_flag}=await useFetch<IProduct>(`/api/blog/comments?blogID=${blog_data.value && blog_data.value.id}&per=3`,{
  query:{
    page:pageQuery
  }
});

const replyMessage=ref<string|null>(null);
const replySubmit = (msg:string) => {
  replyMessage.value=msg
}

</script>

<style scoped>




</style>