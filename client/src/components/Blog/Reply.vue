<script setup lang="ts">
import {months} from "~/utils/data";
const date=new Date();
const {userInformation,isLogin}=useStates();
const replyDate=`${months[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`

const props=defineProps<{
  commentId:number,
  blogId:number,
  isReply:boolean
}>();

const emit=defineEmits<{
  (e:'reply-submit',value:string):void
}>();

const replyData=reactive({
  body:'' as string,
  btnFlag:false as boolean,
  error:null as null|string,
  init(){
    this.error=null
    this.btnFlag=true
  },
  reset(){
    this.btnFlag=false
    this.body=''
  }
})
const submitReply = async () => {
  emit('reply-submit','')
  if(isLogin.value){
    if(replyData.body.length>0){
      replyData.init()
      try {
        const req=await $fetch('/api/profile/comment',{
          method:'POST',
          body:{
            date:replyDate,
            blogID:props.blogId,
            body:replyData.body,
            isReply:props.isReply ? 1 : 0,
            replyID:props.isReply ? props.commentId : 0,
            type:'blog'
          }
        })
        emit('reply-submit','Thanks for sharing your comment! after review you can see here.')
        if(process.client){
          setTimeout(()=>{
            reloadNuxtApp()
          },2000)
        }
      }catch (err) {
        emit('reply-submit','Error in connecting to server! please try later.')
      }finally {
        replyData.reset()
      }
    }else{
      replyData.error='comment body is required!'
    }

  }
}

</script>

<template>
  <div class="my-1 border-[1px] p-1 bg-gray-100 ">
    <form class="w-full [&_*]:font-robot" @submit.prevent="submitReply">
      <v-row class="mb-1">
        <v-column col="6">
          <VInput  type="text" v-model="userInformation.firstname" :disable="true" label="first name" :require="true" id="firstname"/>
        </v-column>
        <v-column col="6" class="pl-1">
          <VInput type="text" v-model="userInformation.lastname" :disable="true" label="last name" :require="true" id="lastname"/>
        </v-column>
      </v-row>
      <v-row class="mb-1">
        <v-column col="12" >
          <VInput type="text" v-model="userInformation.email" :disable="true" label="email" :require="true" id="email"/>
        </v-column>
      </v-row>
      <v-row class="mb-1">
        <v-column col="12" >
          <VInput type="area" v-model="replyData.body" label="Your Comments" :require="true" id="comments"/>
        </v-column>
      </v-row>
      <v-row class="mb-1 items-center">
        <VBtnLoader type="submit" class="btn btn-primary btn-sm btn-light" :flag="replyData.btnFlag">
          submit now
        </VBtnLoader>
        <h6 class="text-red-600 ml-1" v-if="replyData.error">
          {{replyData.error}}
        </h6>
      </v-row>
    </form>
  </div>
</template>

<style scoped>

</style>