<script setup lang="ts">
import {profileSideBarList} from "~/utils/data";
import {useLogout} from "~/composables/useLogout";
const {logoutHandler}=useLogout()

</script>

<template>
  <LayoutHeader>
    <section id="header-detail-content">
      <LayoutDetail />
    </section>
  </LayoutHeader>
  <section id="profile">
    <v-container>
      <div class="grid grid-cols-[1fr_3fr] gap-2">
        <aside class="sticky top-[120px] ">
          <ul class="flex flex-col bg-primary-dark-1 rounded-4 overflow-hidden">
            <li v-for="item in profileSideBarList" class="w-full  ">
              <NuxtLink class="text-primary-light-1 transition-all  duration-500 hover:bg-secondary-light-2  border-b-primary-light-3/40 border-[1px] px-1 py-0.7 flex justify-between items-center text-1 capitalize" exact-active-class="!bg-secondary-light-2" :to="{name:item.link}">
                {{item.title}}
                <Icon size="1.9rem" name="ri:arrow-drop-right-line"/>
              </NuxtLink>
            </li>
            <li @click="logoutHandler" class="w-full  ">
              <button class="text-primary-light-1 transition-all w-full text-left duration-500 hover:bg-secondary-light-2  border-b-primary-light-3/40 border-[1px] px-1 py-0.7 flex justify-between text-1 items-center capitalize" >
                logout
                <Icon size="1.9rem" name="ri:arrow-drop-right-line"/>
              </button>
            </li>

          </ul>
        </aside>
        <main>
          <slot />
        </main>
      </div>
    </v-container>
  </section>
  <LayoutFooter />
</template>

<style scoped>

</style>