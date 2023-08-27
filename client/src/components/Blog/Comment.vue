<script setup lang="ts">
defineProps<{
  image:string,
  name:string,
  date:string,
  content:string,
  reply:any[],
  commentId:number,
  blogId:number
}>()

const addReplyFlag=ref<boolean>(false)

const addReply = () => {
  addReplyFlag.value=!addReplyFlag.value
}
const replySubmit = () => {
  addReplyFlag.value=false
}
</script>

<template>
  <div class="blog-comment">
    <VImage image-class="product-comment-image" loader-class="w-3 h-3" class="!w-[60px] !h-auto" :src="image"/>
    <div class="pl-1">
      <h6 class="font-600 mb-0.7">{{name}}</h6>
      <p class="text-gray-500 leading-1.8 h6 mb-0.7 font-400">{{content}}</p>
      <p class="text-gray-500 mb-1 font-400">{{date}} <span class="mx-1">|</span>
        <button @click="addReply" class="text-secondary-light-2">reply</button>
      </p>
      <BlogReply
          @reply-submit="replySubmit"
          v-if="addReplyFlag"
          :commentId="commentId"
          :blog-id="blogId"
          :is-reply="true"
      />
      <template v-if="reply && reply.length>0">
        <BlogComment
            v-for="item in reply"
            :comment-id="item.id"
            :reply="item.reply"
            :name="`${item.author_firstname} ${item.author_lastname}`"
            :date="item.date"
            :content="item.body"
            :image="item.author_image"
            :blog-id="item.id"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>