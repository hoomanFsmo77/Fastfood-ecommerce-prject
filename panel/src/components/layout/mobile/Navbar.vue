<script setup lang="ts">
const openMenuFlag=ref<boolean>(false)
const router=useRouter()
router.afterEach(()=>openMenuFlag.value=false)
</script>

<template>
  <nav id="mobile-navbar">
    <v-row  class="items-center">
      <v-column col="6">
        <NuxtLink :to="{name:'DASHBOARD'}" class="flex items-center justify-center p-1">
          <nuxt-img width="70" src="/logo-small-2.png"/>
          <h4 class="text-primary-light-4 ml-1 uppercase font-600">Wengdo</h4>
        </NuxtLink>
      </v-column>
      <v-column col="6" class="flex justify-end">
        <Icon @click="openMenuFlag=!openMenuFlag" name="ri:align-justify" size="2rem" class="text-primary-light-2 cursor-pointer"/>
      </v-column>
    </v-row>
    <v-row :no-p="true" class="v-collapse" v-collapse="openMenuFlag">
      <v-column col="12">
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
      </v-column>
    </v-row>
  </nav>
</template>

<style scoped>

</style>