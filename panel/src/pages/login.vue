<script setup lang="ts">
definePageMeta({
  name:'LOGIN',
  page_title:'Login',
  layout:false,
  auth: false
})
const {  data, signIn } = useAuth()
const {public:{callback_login}}:any=useRuntimeConfig();
</script>

<template>
  <section class="flex justify-center items-center h-[100vh]">
    <button @click="signIn(undefined,{callbackUrl:callback_login})" class="btn btn-primary btn-lg">
      login
    </button>
  </section>

</template>

<style scoped>

</style>