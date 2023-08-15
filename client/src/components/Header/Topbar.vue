<template>
  <nav v-sticky id="navbar-sticky">
    <v-row>
      <v-column col="5" >
        <NuxtLink  :to="{name:'HOME'}" class="p-1 block w-full h-full">
          <nuxt-img  src="/logo-small.webp" class="block h-full"/>
        </NuxtLink>
      </v-column>
      <v-column col="7">
        <ul class="navbar-items-container " >
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
                <v-column col="12" lg="6" md="8" class="sm:flex-row sm:justify-start flex-col justify-center items-center">
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
                </v-column>
                <v-column col="0" lg="6" md="4"  class=" justify-end">
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


</script>

<style scoped>

</style>

