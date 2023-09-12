<script setup lang="ts">
definePageMeta({
  name:'LOGIN',
  page_title:'Login',
  layout:false,
  auth: false
})
const { status, data, signIn, signOut } = useAuth()
const {public:{callback_login}}:any=useRuntimeConfig()
const loginHandler = () => {
  signIn(undefined,{callbackUrl:callback_login})
}
</script>

<template>

  <button @click="loginHandler">
    login github
  </button>
</template>

<style scoped>

</style>