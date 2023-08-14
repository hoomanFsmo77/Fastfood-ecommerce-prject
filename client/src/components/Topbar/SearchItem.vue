<script setup lang="ts">
defineProps<{
  status:string
  link:string
  primary_image:string
  title:string
  category:string
  caption:string
  quantity:string
  off:string
  price:string
  off_percent:string,
  brief:string

}>();
const {$calculate_off_price}=useNuxtApp();



</script>

<template>
  <NuxtLink  class="search-item" :to="{name:'PRODUCT_DETAIL',params:{link:link}}">
    <div class="search-item-bg" >
      <nuxt-img  class="relative z-[-1] " width="210" :src="primary_image"/>
    </div>
    <div v-if="!status" class="badge-container">
      <span  class="triangle text-0.7"></span>
      <span class="badge-content">not <br/> available</span>
    </div>

    <div class="search-item-inside">
      <div class="flex items-center">
        <div class="flex flex-col justify-center items-center">
          <nuxt-img width="140" :src="primary_image" />
          <p class="rounded-full flex items-center justify-center w-2 h-2 bg-secondary-light-2 text-white mt-0.4">{{quantity}}</p>
        </div>
        <div class="ml-1">
          <h5 >{{title}}<p class="text-secondary-light-2 inline-block text-0.7 ml-0.5">{{category}}</p></h5>
          <p class="my-0.5">{{caption}}</p>
          <p class="my-0.5 text-gray-700 text-0.7">{{brief}}</p>
        </div>
      </div>
      <div class="flex items-center">
        <p v-if="off" class="h5" >
          {{$calculate_off_price(price,off_percent)}}$
          <span class="text-red-500 block">-{{off_percent}}%</span>
        </p>
        <p class="h6 ml-0.5" :class="{'line-through':off}"><span class="text-1.3">{{price}}</span>$</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style >
.triangle{
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 70px 70px 0;
  border-color: transparent #a41b13 transparent transparent;

}

</style>