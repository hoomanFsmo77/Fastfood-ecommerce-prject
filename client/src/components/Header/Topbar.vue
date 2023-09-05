<template>
  <nav v-sticky id="navbar-sticky">
    <v-row>
      <v-column col="5" >
        <NuxtLink  :to="{name:'HOME'}" class="p-1 block w-full h-full">
          <nuxt-img  src="/logo-small.webp" class="block h-full"/>
        </NuxtLink>
      </v-column>
      <v-column col="7" >
        <ul class="navbar-items-container ml-auto" >
          <NavbarItem
              v-for="item in navbar"
              :title="item.title"
              :link="item.link"
              :hasSub="item.hasSub"
              :sub="item.sub"
          />
        </ul>
      </v-column>
    </v-row>
  </nav>
    <div id="header-topbar">
        <v-container >
            <v-row>
                <v-column col="12" lg="7" md="8" class="sm:flex-row sm:justify-start flex-col justify-center items-center">
                    <NuxtLink :to="{name:'HOME'}">
                      <h6
                          class="text-primary-light-3 font-500 text-left">
                        Serving to whole New York
                      </h6>
                    </NuxtLink>
                   <a 
                   href="mailto:hoomanmousavi77@gmail.com"
                   class="text-primary-light-3 transition-all hover:text-white font-500 text-left ml-1.5">
                    <Icon name="bi:envelope" class="mr-0.6"/>
                    info@wengdo.com
                   </a>
                  <template v-if="isLogin">
                    <client-only>
                      <Icon name="ri:account-circle-fill" size="1.2rem" class="text-primary-light-3 font-500 text-left ml-1.5"/>
                      <NuxtLink class="text-primary-light-3 text-0.9 transition-all hover:text-white font-500 text-left ml-0.5" :to="{name:'PROFILE_INFO'}">
                        profile
                      </NuxtLink>

                      <Icon size="1.2rem" class="text-primary-light-3 font-500 text-left ml-1.5" name="ri:logout-circle-line"/>
                      <button @click="logoutHandler" class="text-primary-light-3 text-0.9 transition-all hover:text-white font-500 text-left ml-0.5">
                        logout
                      </button>
                    </client-only>
                  </template>
                  <template v-else >
                    <Icon size="1.2rem" class="text-primary-light-3 font-500 text-left ml-1.5" name="ri:login-circle-line"/>
                    <NuxtLink class="text-primary-light-3 transition-all hover:text-white font-500 text-left ml-0.5 text-0.9" :to="{name:'AUTH'}">
                      login
                    </NuxtLink>
                    <span class="text-0.9 text-primary-light-3 font-500 text-left mx-0.5">or</span>
                    <NuxtLink class="text-primary-light-3 transition-all hover:text-white font-500 text-left text-0.9" :to="{name:'AUTH'}">
                      sign in
                    </NuxtLink>
                  </template>

                </v-column>
                <v-column col="0" lg="5" md="4"  class=" justify-end">
                    <a class="topbar-icon" href="#">
                        <Icon name="bi:facebook"/>
                    </a>
                    <a class="topbar-icon" href="#">
                             <Icon name="bi:twitter"/>
                    </a>
                    <a class="topbar-icon" href="#">
                             <Icon name="bi:google"/>
                    </a>
                    <a class="topbar-icon" href="#">
                             <Icon name="bi:linkedin"/>
                    </a>
                    <TopbarBasketIcon />
                    <TopbarSearch />
                </v-column>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
const {logoutHandler}=useLogout()
const {isLogin}=useStates()


</script>

<style scoped>

</style>

