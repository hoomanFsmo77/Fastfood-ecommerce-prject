<script setup lang="ts">
import {useUser} from "~/composables/useUser";

definePageMeta({
  name:'USERS_CREATE',
  page_title:'Create user'
})
const {createUser,editUserData}=useUser()

</script>

<template>
  <v-row v-if="editUserData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in editUserData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="createUser" class="btn btn-primary btn-sm">
    create
  </button>
</template>

<style scoped>

</style>