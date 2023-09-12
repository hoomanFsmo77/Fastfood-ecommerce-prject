<script setup lang="ts">
definePageMeta({
  name:'DASHBOARD',
  page_title:'Dashboard'
})
const { status, data, signIn, signOut } = useAuth()
const {public:{callback_logout}}:any=useRuntimeConfig()
const logoutHandler = () => {
  signOut({callbackUrl:callback_logout})
}
</script>

<template>
  {{data}}
  {{status}}
  dashboard
  <button @click="logoutHandler">
    sign out
  </button>
</template>

<style scoped>

</style>