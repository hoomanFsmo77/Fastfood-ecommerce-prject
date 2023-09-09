<script setup lang="ts">
import {navbar} from "~/utils/data";

const {navbarMenuFlag,isLogin}=useStates()
const router=useRouter();
const {logoutHandler}=useLogout()
router.afterEach(()=>navbarMenuFlag.value=false)

</script>

<template>
  <teleport  to="body">
    <aside id="sidebar-menu"  :class="{'!left-0':navbarMenuFlag}">
      <nuxt-img width="140" class="mx-auto mt-3 " src="/logo-small-2.png"/>

      <ul class="mt-2">
        <NavbarMobileItem
            v-for="item in navbar"
            :title="item.title"
            :link="item.link"
            :hasSub="item.hasSub"
             :sub="item.sub || undefined"
            type="main"
        />
      </ul>
      <div class="mt-2"></div>
      <template v-if="isLogin">
        <client-only>
          <Icon name="ri:account-circle-fill" size="1.2rem" class="text-primary-light-3 font-500 text-left ml-1"/>
          <NuxtLink class="text-primary-light-3 text-1 transition-all hover:text-white font-500 text-left ml-0.5" :to="{name:'PROFILE_INFO'}">
            profile
          </NuxtLink>

          <Icon size="1.2rem" class="text-primary-light-3 font-500 text-left ml-1" name="ri:logout-circle-line"/>
          <button @click="logoutHandler" class="text-primary-light-3 text-1 transition-all hover:text-white font-500 text-left ml-0.5">
            logout
          </button>
        </client-only>
      </template>
      <template v-else >
        <client-only>
          <Icon size="1.2rem" class="text-primary-light-3 font-500 text-left ml-1" name="ri:login-circle-line"/>
          <NuxtLink class="text-primary-light-3 transition-all hover:text-white font-500 text-left ml-0.5 text-1" :to="{name:'AUTH'}">
            login
          </NuxtLink>
          <span class="text-0.9 text-primary-light-3 font-500 text-left mx-0.5">or</span>
          <NuxtLink class="text-primary-light-3 transition-all hover:text-white font-500 text-left text-1" :to="{name:'AUTH'}">
            sign in
          </NuxtLink>
        </client-only>
      </template>
      <div class="mt-1"></div>
      <TopbarBasketIcon drop-class="!w-20 !left-0" class="!absolute !top-0 !left-0 !m-1 !cursor-pointer"/>
      <TopbarSearch @fire="navbarMenuFlag=false" class="!absolute !top-0 !left-0 !mt-1  !ml-4 !cursor-pointer"/>

      <Icon @click="navbarMenuFlag=false" name="bi:x-lg" size="1.7rem" class="text-primary-light-1 absolute top-0 right-0 m-1 cursor-pointer" />
    </aside>
    <div @click="navbarMenuFlag=false" v-if="navbarMenuFlag" class="fixed inset-0 w-full h-full z-[999999998] bg-[rgba(0,0,0,0.2)]" ></div>
  </teleport>
</template>

<style scoped>

</style>