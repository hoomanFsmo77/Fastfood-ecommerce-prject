<template>
  <nav id="header-navbar">
    <v-container>
      <v-row>
        <v-column col="3" class="relative">
          <nuxt-img width="150" class="logo" src="/logo.webp"/>
        </v-column>

        <v-column col="9">

            <ul class="navbar-items-container" v-for="item in navbar">
              <NavbarItem
                :title="item.title"
                :link="item.link"
                :hasSub="item.hasSub"
                :sub="item.sub"
              />
            </ul>


        </v-column>
      </v-row>
    </v-container>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>