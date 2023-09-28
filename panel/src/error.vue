<script setup lang="ts">
const error=useError()
const {  status } = useAuth()
onMounted(()=>{
  if(status.value==='unauthenticated'){
    navigateTo({name:'LOGIN'})
  }
})
</script>

<template>
  <p>
    {{status}}
  </p>
  <p>
    {{error}}
  </p>

</template>

<style scoped>

</style>