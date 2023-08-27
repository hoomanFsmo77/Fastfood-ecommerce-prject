<script setup lang="ts">
const props=defineProps<{
  image:string,
  name:string,
  date:string,
  content:string,
  star:number,
  reply:any[],
  commentId:number,
  productId:number
}>();

const addReplyFlag=ref<boolean>(false)

const addReply = () => {
  addReplyFlag.value=!addReplyFlag.value
}
const replySubmit = () => {
  addReplyFlag.value=false
}

</script>

<template>
  <div class="product-comment">
    <VImage image-class="product-comment-image" loader-class="w-3 h-3" class="!w-[60px] !h-auto" :src="image"/>
    <div class="product-comment-content">
      <div class="flex justify-between items-center mb-1">
        <h6 class="font-600">{{name}} - {{date}} <span class="mx-1">|</span>
          <button @click="addReply" class="text-secondary-light-2">reply</button>
        </h6>
        <div>
          <Icon name="ri:star-fill" size="1.1rem" class="text-secondary-light-2 mx-0.1" v-for="i in star" />
        </div>
      </div>
      <p class="text">
        {{content}}
      </p>
      <ProductReply
          @reply-submit="replySubmit"
          v-if="addReplyFlag"
          :commentId="commentId"
          :productId="productId"
          :is-reply="true"
      />
      <template v-if="reply && reply.length>0">
        <ProductComment
            v-for="item in reply"
            :image="item.author_image"
            :content="item.body"
            :star="item.rating"
            :date="item.date"
            :name="`${item.author_firstname} ${item.author_lastname}`"
            :reply="item.reply"
            :comment-id="item.id"
            :productId="productId"
        />
      </template>




    </div>

  </div>
</template>

<style scoped>

</style>