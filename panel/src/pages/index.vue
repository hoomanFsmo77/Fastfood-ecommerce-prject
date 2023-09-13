<script setup lang="ts">
definePageMeta({
  name:'DASHBOARD',
  page_title:'Dashboard'
})
// const { status, data, signIn, signOut } = useAuth()
// const {public:{callback_logout}}:any=useRuntimeConfig()
// const logoutHandler = () => {
//   signOut({callbackUrl:callback_logout})
// }
</script>

<template>

  <FormKit type="custom_text" label="email"/>

  <VPagination  :current_page="3" :prev-page="2" :next-page="4" :total="1"/>
</template>

<style scoped>

</style>