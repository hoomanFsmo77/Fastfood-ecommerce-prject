<script setup lang="ts">
import {useUser} from "~/composables/useUser";

definePageMeta({
  name:'USERS_DETAIL',
  page_title:'User detail',
  validate(route){
    return /\d+/.test(route.params.id as string)
  }
})

const route=useRoute()

const {data,pending}=await useFetch('/api/users',{
  method:'POST',
  query:{
    method:'GET',
    userID:route.params.id
  }
})

const {removeUser,editUser,editUserFlag,editUserData}=useUser(data)
</script>

<template>
  <p v-if="!pending">
    {{data}}
  </p>
  <v-row v-if="editUserData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in editUserData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="removeUser" class="btn btn-primary btn-sm">
    remove
  </button>
  <button v-if="editUserFlag" @click="editUser" class="btn btn-primary btn-sm">
    edit
  </button>
  <button v-else @click="editUserFlag=true" class="btn btn-primary btn-sm">
    edit
  </button>
</template>

<style scoped>

</style>