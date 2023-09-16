<script setup lang="ts">

</script>

<template>
  <aside id="sidebar">
      <NuxtLink :to="{name:'DASHBOARD'}" class="flex items-center justify-center px-1 py-2">
        <nuxt-img width="70" src="/logo-small-2.png"/>
        <h4 class="text-primary-light-4 ml-1 uppercase font-600">Wengdo</h4>
      </NuxtLink>

    <ul class="my-1 mr-3">
      <SidebarItem
        v-for="item in sidebar_items"
       :title="item.title"
       :link="item.link"
       :icon="item.icon"
       :hasSub="item.hasSub"
       :sub="item?.sub || undefined"
      />
    </ul>
  </aside>
</template>

<style scoped>

</style>