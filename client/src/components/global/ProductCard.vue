<script setup lang="ts">
defineProps<{
  primary_image:string,
  title:string,
  caption:string,
  price:number,
  link:string,
  status:boolean,
  off:boolean
  off_percent:number
}>()


</script>

<template>
  <div class="product-card ">
    <div class="product-card-image">
      <nuxt-img class="object-cover w-full"   :src="primary_image"/>
    </div>
    <div class="product-card-content">
        <h5 class="product-card-title  ">{{title}}</h5>
      <p class="product-card-caption ">
        {{caption}}
      </p>
      <div v-if="off" class="flex justify-center items-center">
        <h3  class=" text-secondary-light-3 mr-1 text-center tracking-wider  font-800">
          ${{$calculate_off_price(price.toFixed(2),off_percent)}}
        </h3>
        <div>
          <h4  class=" text-primary-dark-2 line-through text-center tracking-wider  font-800">
            ${{price.toFixed(2)}}
          </h4>
          <h6 class="text-secondary-light-3 text-center tracking font-800">-{{off_percent}}%</h6>

        </div>

      </div>
      <h4 v-else class="text-secondary-light-3 text-center tracking-wider  font-800">
        ${{price.toFixed(2)}}
      </h4>
    </div>
    <div class="product-card-lower">
        <NuxtLink class="btn btn-secondary !rounded-b-[0px]  z-[9999] btn-sm" :to="{name:'PRODUCT_DETAIL',params:{link}}">
          order now
        </NuxtLink>
    </div>
    <div v-if="!status" class="badge-container">
      <span  class="triangle text-0.7"></span>
      <span class="badge-content">not <br/> available</span>
    </div>
    <NuxtLink class="product-card-link" :to="{name:'PRODUCT_DETAIL',params:{link}}">
    </NuxtLink>
  </div>
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