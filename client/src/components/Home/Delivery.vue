<script setup lang="ts">

</script>

<template>
  <section id="delivery">
    <v-container>
      <v-row class="items-center">
        <v-column md="6" col="0">
            <nuxt-img class="w-full" src="/home/delivery.webp"/>
        </v-column>
        <v-column md="6" col="12" >
            <div >
              <h1 class="font-dance font-600 text-primary-light-1 md:h1 h2">We Guaranttee</h1>
              <h1 class="font-700 text-primary-light-1 md:text-3.5 text-2 relative  z-10 ">30 Minute Delivery</h1>
              <p class="text-primary-light-1 md:text-1.1 text-0.9 my-1">
                If you’re having a meeting, working late at night and need an extra push.
              </p>
              <p class="md:text-1.1 text-0.9  text-primary-light-1">Let us know and we will be there</p>
              <NuxtLink class="btn btn-primary mt-2" :to="{name:'PRODUCT_LIST'}">
                order now
              </NuxtLink>
            </div>

        </v-column>

      </v-row>
    </v-container>
    <nuxt-img class="absolute right-0 bottom-0  h-[90%]" src="/home/app.webp"/>
  </section>
</template>

<style scoped>

</style>