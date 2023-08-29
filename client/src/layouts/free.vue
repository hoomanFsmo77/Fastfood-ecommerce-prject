<script setup lang="ts">

</script>

<template>
  <LayoutHeader>
    <slot name="header"/>
  </LayoutHeader>
  <div><slot name="main"/></div>
  <LayoutFooter />
</template>

<style scoped>

</style>