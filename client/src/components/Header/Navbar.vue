<template>
  <nav id="header-navbar">
    <v-container>
      <v-row>
        <v-column col="3" class="relative">
          <nuxt-img width="150" class="logo" src="/logo.webp"/>
        </v-column>

        <v-column col="9" class="py-0.5">

            <ul class="navbar-items-container" >
              <NavbarItem
                v-for="item in navbar"
                :title="item.title"
                :link="item.link"
                :hasSub="item.hasSub"
                :sub="item.sub"
              />
            </ul>
            <div class="horizontal-line mx-1"></div>
            <div class="flex justify-center flex-col ">
              <h5 class="text-secondary-light-1">
                Order Now
              </h5>
              <a class=" block text-1.5 font-600 transition-all hover:text-secondary-light-1 mt-0.7 text-primary-light-1" href="tel:1234-456-7890">1234 456 7890</a>
            </div>

        </v-column>
      </v-row>
    </v-container>
  </nav>

</template>

<script setup lang="ts">

</script>

<style scoped>

</style>