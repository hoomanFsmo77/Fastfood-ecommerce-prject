<script setup lang="ts">
import {months} from "~/utils/data";
const date=new Date();
const props=defineProps<{
  commentId:number,
  blogId:number,
  isReply:boolean
}>();

const emit=defineEmits<{
  (e:'reply-submit'):void
}>();

const {userInformation,isLogin}=useStates();

const replyData=reactive({
  body:'',
  date:`${months[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`
})
const submitReply = () => {
  if(isLogin.value){
    if(replyData.body.length>0){
      //// send request here
      console.log(replyData)
      console.log(props.blogId)
      /// reply id
      console.log(props.commentId)
      emit('reply-submit')
    }

  }
}

</script>

<template>
  <div class="my-1 border-[1px] p-1 bg-gray-100">
    <form class="w-full " @submit.prevent="submitReply">
      <v-row class="mb-1">
        <v-column col="6">
          <VInput type="text" v-model="userInformation.firstname" :disable="true" label="first name" :require="true" id="firstname"/>
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
      <v-row class="mb-1">
        <button type="submit" class="btn btn-primary btn-sm btn-light">
          submit now
        </button>
      </v-row>
    </form>
  </div>
</template>

<style scoped>

</style>