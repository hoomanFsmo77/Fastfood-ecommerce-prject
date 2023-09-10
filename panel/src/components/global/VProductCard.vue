<script setup lang="ts">
defineProps<{
  primary_image:string,
  title:string,
  caption:string,
  price:number,
  link:string,
  status:boolean,
  off:boolean
  off_percent:number,
  productId:number,
  isFavorite?:boolean
}>()

const {addToCart,productPageData,removeFav}=useProduct()

</script>

<template>
  <div class="product-card " :class="{'border-[1px]':isFavorite}">
    <div class="product-card-image">
      <VImage loader-class="lg:h-11 !w-14 !h-12  lg:w-11 rounded-full"  image-class="lg:object-cover lg:!w-full !w-14 !h-12 "  :src="primary_image"/>

    </div>
    <div class="product-card-content">
      <h5 class="product-card-title  ">{{title}}</h5>
      <p class="product-card-caption ">
        {{caption}}
      </p>
      <div v-if="off" class="flex justify-center items-center">
        <h3  class=" text-secondary-light-3 mr-1 text-center tracking-wider  font-800">
          ${{$calculate_off_price(price.toFixed(2),off_percent).toFixed(2)}}
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
      <NuxtLink class="btn btn-secondary !rounded-b-[0px]  z-[9999] btn-sm px-0.8 text-0.7" :to="{name:'PRODUCT_DETAIL',params:{link}}">
        see details
      </NuxtLink>
      <VBtnLoader :flag="productPageData.btnLoaderFlag" @click="addToCart(productId)" class="btn btn-secondary ml-0.5 !rounded-b-[0px]  z-[9999] btn-sm px-0.8 text-0.7" :class="{'!text-0.6 !px-0.5':productPageData.btnLoaderFlag}">
        order now
      </VBtnLoader>
    </div>
    <div v-if="!status" class="badge-container">
      <span  class="triangle text-0.7"></span>
      <span class="badge-content">not <br/> available</span>
    </div>
    <div v-if="off" class="badge-container">
      <span  class="triangle text-0.7"></span>
      <span class="badge-content !text-1 !translate-x-[-5px] !translate-y-[9px]">Sale</span>
    </div>
    <NuxtLink class="product-card-link" :to="{name:'PRODUCT_DETAIL',params:{link}}">
    </NuxtLink>

  </div>
  <div v-if="isFavorite" class="flex justify-center mt-2">
    <button @click="removeFav(productId)" class="btn btn-remove btn-sm">
      remove
    </button>
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