<script setup lang="ts">


</script>

<template>
  <section id="recommendation">
    <v-container>
      <v-row >
        <v-column class="relative" col="6">
          <div class="content-img w-[60%] ml-auto">
              <h1 class="text-primary-light-1 font-600 text-left mt-2">Pizza Calabriz </h1>
              <h5 class="text-primary-light-1 italic mb-0.5 text-left"> Mascarpone · Nduja Spicy</h5>
            <NuxtLink class="btn btn-primary btn-sm" :to="{name:'PRODUCT_DETAIL',params:{link:'spicy-pepperoni'}}">
              Hot & Spicy
            </NuxtLink>
          </div>
          <VImage loader-class="w-full"  image-class="w-full  h-full" src="/home/pizza.webp"/>

        </v-column>
        <v-column col="3" >
          <div class="px-1 relative w-full h-full">
            <div class="content-img  w-[50%] ml-auto">
              <h3 class="uppercase font-800 leading-[8px] mt-1 text-primary-light-1">Iced  <span class="text-primary-dark-1 h3 uppercase font-800">Coffee</span></h3>
              <h4 class="uppercase font-300 text-primary-light-1 mb-0.7">Summer</h4>
              <NuxtLink class="text-secondary-light-2 underline" :to="{name:'PRODUCT_DETAIL',params:{link:'soft-drink'}}">
                Read More
              </NuxtLink>
            </div>
            <VImage loader-class="w-full"  image-class="w-full  h-full" src="/home/drink.webp"/>
          </div>
        </v-column>
        <v-column col="3" class="relative">
          <div class="content-img w-[50%] ml-auto">
            <h4 class="text-primary-light-1 font-300 mt-1">Get your</h4>
            <h3 class="text-primary-light-1 uppercase font-700 ">FREE</h3>
            <h4 class="text-primary-light-1 mb-1 italic font-playFair">French Fry</h4>
            <NuxtLink class="btn btn-primary btn-sm mt-1" :to="{name:'PRODUCT_DETAIL',params:{link:'potato'}}">
              Read More
            </NuxtLink>
          </div>
          <VImage loader-class="w-full h-15" image-class="w-full  h-full"   src="/home/chips.webp"/>
        </v-column>
      </v-row>
    </v-container>
  </section>

</template>

<style scoped>

</style>