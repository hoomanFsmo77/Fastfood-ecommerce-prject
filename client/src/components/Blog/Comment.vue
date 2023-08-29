<script setup lang="ts">
const {isLogin}=useStates()
defineProps<{
  image:string,
  name:string,
  date:string,
  content:string,
  reply?:any[],
  commentId:number,
  blogId:number
}>()
const replyData=reactive({
  addFlag:false as boolean,
  message:null as string|null
})


const addReply = () => {
  replyData.message=null
  replyData.addFlag=!replyData.addFlag
}
const replySubmit = (msg:string) => {
  if(msg.length>0){
    replyData.addFlag=false
    replyData.message=msg
  }else{
    replyData.message=null
  }

}

</script>

<template>
  <div class="blog-comment">
    <VImage image-class="product-comment-image" loader-class="w-3 h-3" class="!w-[60px] !h-auto" :src="image"/>
    <div class="pl-1 w-full">
      <h6 class="font-600 mb-0.7 font-robot">{{name}}</h6>
      <p class="text-gray-500 leading-1.8 font-robot h6 mb-0.7 font-400">{{content}}</p>
      <p class="text-gray-500 mb-1 font-robot font-400">{{date}} <span v-if="isLogin" class="mx-1">|</span>
        <button @click="addReply" v-if="isLogin" class="text-secondary-light-2 font-robot">reply</button>
      </p>
      <h6 v-if="replyData.message" class="text-green-500 my-1">{{replyData.message}}</h6>

      <BlogReply
          @reply-submit="replySubmit"
          v-if="replyData.addFlag"
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