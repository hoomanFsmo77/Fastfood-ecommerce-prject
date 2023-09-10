<script setup lang="ts">

</script>

<template>
  <footer id="footer">
    <v-container class="relative z-10">
      <v-row class=" items-start mb-4">
        <v-column lg="3" md="6" col="12" class="md:order-1 order-2 md:mb-0 my-2">
            <div>
              <h5 class="underline-active-left pb-0.5 text-[#fff] before:!h-[2px]">Contact Info</h5>
              <a class="block h4 font-600 my-1.5 cursor-pointer text-primary-light-1" href="tel:1234-567-8974">(1234) 567 8974</a>
              <a class="text-primary-light-3  transition-all hover:text-[#fff]" href="mailto:hoomanmousavi77@gmail.com">hoomanmousavi77@gmail.com</a>
              <br>
              <a class="text-primary-light-3 transition-all hover:text-[#fff]" href="mailto:hoomanmousavi15@gmail.com">hoomanmousavi15@gmail.com</a>
            </div>
        </v-column>
        <v-column lg="6" col="12" class="justify-center md:order-1 order-1 items-center flex-col">
          <NuxtLink :to="{name:'HOME'}">
            <nuxt-img width="130" src="/footer-logo.webp" />
          </NuxtLink>
          <p class="text-center text-1 text-primary-light-3 mt-1.5">
            Just Burgers
            <br>
            256, baker Street, Suit Building
            <br>
            New Youk, 5245
          </p>
        </v-column>
        <v-column lg="3" md="6" col="12" class="order-2 md:order-1">
          <div class="w-full">
            <h5 class="underline-active-left pb-0.5 text-[#fff] before:!h-[2px] mb-2">Opening Hour</h5>
            <div class="flex justify-between  items-center ">
              <p class="text-primary-light-3 text-1">Tuesday- Saturday </p>
              <p class="text-primary-light-3 text-1">8 AM – 5 PM</p>
            </div>
            <div class="flex justify-between  items-center my-0.5">
              <p class="text-primary-light-3 text-1">Sunday </p>
              <p class="text-primary-light-3 text-1">12 AM – 8 PM</p>
            </div>
            <div class="flex justify-between  items-center ">
              <p class="text-primary-light-3 text-1">Monday  </p>
              <p class="text-primary-light-3 text-1">Off</p>
            </div>
          </div>

        </v-column>
      </v-row>
      <div class="bg-[#767676] w-full h-[1px]"></div>
      <v-row class="py-1">
        <v-column md="6" col="12" class="md:justify-start justify-center">
          <p class="text-[#767676] md:text-1 text-0.8 md:text-left text-center">
            © Copyright 2023 just Hooman. All right reserved.
          </p>
        </v-column>
        <v-column md="6" col="0"></v-column>
      </v-row>
    </v-container>
  </footer>
</template>

<style scoped>

</style>