<script setup lang="ts">
definePageMeta({
  name:'DASHBOARD',
  page_title:'Dashboard'
})
const {data:sales_data}=await useFetch('/api/chart',{query:{type:'sales'}})
const {data:visitors_data}=await useFetch('/api/chart',{query:{type:'visitors'}})

</script>

<template>
  {{sales_data}}
  {{visitors_data}}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at consectetur dignissimos distinctio earum illum, impedit ipsum officiis optio provident, quaerat sunt tempora, tenetur veniam voluptates. Beatae eius error nam.
  </p>

</template>

<style scoped>

</style>