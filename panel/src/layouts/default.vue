<script setup lang="ts">

</script>

<template>
  <LayoutSidebar />
  <LayoutMobileNavbar />
  <div id="main-content">
    <LayoutHeader />
    <h2 class="mb-3 ">
      {{$route.meta.page_title}}
    </h2>
    <slot/>
  </div>
</template>

<style scoped>

</style>