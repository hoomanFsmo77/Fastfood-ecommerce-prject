<script setup lang="ts">

</script>

<template>
  <section id="offer">
    <v-row>
      <v-column col="5"></v-column>
      <v-column col="7" >
        <div >
          <div class="w-full items-end  flex">
            <h4 class="capitalize   font-playFair text-primary-light-1 italic">
              exclusive offer
            </h4>
            <span class="inline-block ml-1 w-8 h-[1px] bg-primary-light-1"></span>
          </div>
          <p class="text-primary-light-1 text-5 mt-1 font-700 ">Veggi Fun Pizza</p>
          <div class="flex items-center">
              <div>
                <p class="text-6 leading-1 text-primary-light-1 font-600"> <sup class="text-2 text-primary-light-1">$</sup>21</p>
                <p class="text-primary-light-1 text-1.5 uppercase text-center font-300">Each</p>
              </div>
            <ul class="ml-1.5">
              <li class="text-secondary-light-4 text-1.2 font-600">- Chicken Hallon</li>
              <li class="text-secondary-light-4 text-1.2 font-600 my-0.5">- Summer Pizza</li>
              <li class="text-secondary-light-4 text-1.2 font-600">- Vegge Lover</li>
            </ul>
          </div>
          <NuxtLink class="btn btn-primary mt-2" :to="{name:'PRODUCT_DETAIL',params:{link:'spicy-pepperoni'}}">
            order now
          </NuxtLink>
        </div>
      </v-column>
    </v-row>
  </section>
</template>

<style scoped>

</style>