<script setup lang="ts">
const {isLogin}=useStates();
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
  <div class="product-comment">
    <div class="md:block flex ">
      <VImage image-class="product-comment-image" loader-class="w-3 h-3" class="!w-[60px] !h-auto" :src="image"/>
      <div class="md:hidden block md:ml-0 ml-1  w-full">
        <div class=" mb-1 flex justify-between items-center w-full">
          <h6 class=" md:font-600 font-500">
            {{name}}
          </h6>
          <div class="text-end">
            <Icon name="ri:star-fill" size="0.9rem" class="text-secondary-light-2 mx-0.1" v-for="i in star" />
          </div>
        </div>
        <h6 class=" md:font-600 font-500">
          {{date}}
          <span v-if="isLogin" class="mx-1">|</span>
          <button v-if="isLogin" @click="addReply" class="text-secondary-light-2">reply</button>
        </h6>
      </div>

    </div>

    <div class="product-comment-content">
      <div class=" justify-between  md:flex hidden items-center mb-1">
        <h6 class="font-600">{{name}} - {{date}} <span v-if="isLogin" class="mx-1">|</span>
          <button v-if="isLogin" @click="addReply" class="text-secondary-light-2">reply</button>
        </h6>
        <div class="">
          <Icon name="ri:star-fill" size="1.1rem" class="text-secondary-light-2 mx-0.1" v-for="i in star" />
        </div>
      </div>
      <p class="text ">
        {{content}}
      </p>
      <h6 v-if="replyData.message" class="text-green-500 mt-1">{{replyData.message}}</h6>
      <ProductReply
          @reply-submit="replySubmit"
          v-if="replyData.addFlag"
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