<template>
  <nav id="header-navbar">
    <v-container>
      <v-row>
        <v-column col="3" class="relative">
          <nuxt-img srcset="/logo.png 316w, /logo.png 238w" width="150" class="logo" src="/logo.png"/>
        </v-column>

        <v-column col="9" class="py-0.5 lg:!flex !hidden">

            <ul class="navbar-items-container ml-auto" >
              <NavbarItem
                v-for="item in navbar"
                :title="item.title"
                :link="item.link"
                :hasSub="item.hasSub"
                :sub="item.sub"
              />
            </ul>
            <div class="horizontal-line mx-1 xlg:block hidden"></div>
            <div class=" justify-center flex-col  xlg:flex hidden">
              <h5 class="text-secondary-light-1">
                Order Now
              </h5>
              <a class="  text-1.3 font-600 xlg:block hidden transition-all hover:text-secondary-light-1 mt-0.7 text-primary-light-1" href="tel:1234-456-7890">1234 456 7890</a>
            </div>

        </v-column>
        <v-column col="9" class="py-0.5 lg:!hidden !flex justify-end">
          <button  @click="navbarMenuFlag=!navbarMenuFlag" class="py-1.5">
            <Icon size="2rem" class="text-primary-light-1 cursor-pointer" name="ri:menu-fill"/>
          </button>
          <NavbarMobileSidebar />
        </v-column>
      </v-row>
    </v-container>
  </nav>

</template>

<script setup lang="ts">


const {navbarMenuFlag}=useStates()

</script>

<style scoped>

</style>