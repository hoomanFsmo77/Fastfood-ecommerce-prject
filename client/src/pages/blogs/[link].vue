<template>
  <section class="group" v-if="!pending">
    <div class="blog-detail-image">
      <VImage :src="data.image_lg" image-class="group-hover:scale-[1.2] transition-all duration-500" loader-class="!h-20 w-full"/>
      <div class="blog-detail-image-cover group-hover:opacity-100"></div>
    </div>
    <div class="blog-detail">
      <p class="text-secondary-light-2 h5 font-500">
        {{data.date}}
      </p>
      <div class="flex items-center" >
        <p class="font-500 capitalize text-primary-light-3 text-1">
          By: {{data.author_firstname}} {{data.author_lastname}}
        </p>
        <span class="mx-0.5 text-primary-light-3">/</span>
        <p class="font-500 capitalize text-primary-light-3 text-1">
          {{ data.category }}
        </p>
        <span class="mx-0.5 text-primary-light-3">/</span>
        <p class="font-500 capitalize text-primary-light-3 text-1">
          comments: {{ data.comments.length }}
        </p>
      </div>

    </div>
    <div class="blog-detail-content">
      <v-row class="items-end">
        <v-column v-for="row in data.content" :col="row.col || 12" class="!block mb-1.5">
          <h3 class="mb-1" v-if="row.title">{{row.title}}</h3>
          <p class="text-gray-500 leading-2 h6 font-400">{{row.text}}</p>
        </v-column>
      </v-row>
    </div>
    <div class="blog-detail-comment">
      <h3 v-if="data.comments.length===0" class="mb-1 capitalize">no comments.</h3>
      <template v-else>
        <h3 class="mb-1 capitalize">comments {{data.comments.length}}</h3>
        <BlogComment
            v-for="comment in data.comments"
            :comment-id="comment.id"
            :reply="comment.reply"
            :name="`${comment.author_firstname} ${comment.author_lastname}`"
            :date="comment.date"
            :content="comment.body"
            :image="comment.author_image"
            :blog-id="data.id"
        />
      </template>
    </div>
    <div class="mt-2">
      <h3 class="mb-1">leave your comment</h3>
      <template v-if="isLogin">
        <BlogReply
            @reply-submit="replySubmit"
            :commentId="0"
            :blog-id="data.id"
            :is-reply="false"
        />
      </template>
      <template v-else>
        <h6 class="font-400 mt-2">You are not authorized yet. <NuxtLink class="text-blue-600 h6" :to="{name:'AUTH'}">login</NuxtLink> or <NuxtLink class="text-blue-600 h6" :to="{name:'AUTH'}">sign in</NuxtLink> to add review or comments.</h6>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import {IBlogs} from "~/utils/types";
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

const route=useRoute()
const {data,pending}=await useFetch<IBlogs>(`/api/blog/${route.params.link}`)

const replySubmit = () => {
  console.log('submit')
}

</script>

<style scoped>




</style>