<script setup lang="ts">

</script>

<template>
  <section id="delivery">
    <v-container>
      <v-row class="items-center">
        <v-column col="6">
            <nuxt-img class="w-full" src="/home/delivery.webp"/>
        </v-column>
        <v-column col="6" >
            <div >
              <h1 class="font-dance font-600 text-primary-light-1">We Guaranttee</h1>
              <h1 class="font-700 text-primary-light-1 text-3.5 relative z-10 ">30 Minute Delivery</h1>
              <p class="text-primary-light-1 text-1.1 my-1">
                If you’re having a meeting, working late at night and need an extra push.
              </p>
              <p class="text-1.1 text-primary-light-1">Let us know and we will be there</p>
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