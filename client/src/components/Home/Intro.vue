<script setup lang="ts">
import {IResponse,Banner} from "~/utils/types";
const {data:banner_data,pending}=await useFetch<IResponse<Banner[]>>('/api/intro')
const myCarousel = ref<any>(null)
const next = () => {
  myCarousel.value.next()
}
const prev = () => {
  myCarousel.value.prev()
}

const nextImageSrc = computed(()=>{
  if(banner_data.value && myCarousel.value && myCarousel.value.data){
    if(myCarousel.value.data.currentSlide.value +1 === banner_data.value.data.length ){
      return banner_data.value.data[0].image
    }else if(myCarousel.value.data.currentSlide.value < banner_data.value.data.length){
      return  banner_data.value.data[myCarousel.value.data.currentSlide.value+1].image
    }else{
      return  banner_data.value.data[1].image
    }
  }
  return  'nok'
})

const prevImageSrc = computed(()=>{
  if(banner_data.value && myCarousel.value && myCarousel.value.data){
    if(myCarousel.value.data.currentSlide.value-1  < 0 ){
      return banner_data.value.data[banner_data.value.data.length-1].image
    }else if(myCarousel.value.data.currentSlide.value < banner_data.value.data.length){
      return  banner_data.value.data[myCarousel.value.data.currentSlide.value-1].image
    }else{
      return  banner_data.value.data[1].image
    }
  }
  return  'nok'
})

</script>

<template>
  <div v-if="!pending" id="intro-slider">
    <carousel ref="myCarousel" :items-to-show="1" :wrapAround="true" :autoplay="10000"  >
      <slide v-for="slide in banner_data.data" :key="slide.id">
        <v-row class="items-center">
          <v-column col="6">
            <div class="pl-6">
              <h1 class="font-playFair capitalize italic text-secondary-light-1 text-left">{{slide.caption}}</h1>
              <h1 class="font-playFair capitalize mb-0.5 text-3.5 text-primary-light-1 text-left">{{slide.first_text}}</h1>
              <h3 class="font-playFair capitalize text-primary-light-1 text-left">{{slide.middle_text}}</h3>
              <h5 class="font-playFair mt-0.5 capitalize italic text-primary-light-1 text-left">{{slide.last_text}}</h5>
            </div>
          </v-column>

          <v-column col="6">
            <nuxt-img width="550" :src="slide.image"/>

          </v-column>
        </v-row>

      </slide>
      <template #addons>
        <button class="carousel__next carousel-btn" @click="next">
          <Icon name="ri:arrow-right-s-line" size="2.2rem" class="text-primary-light-1"/>
          <nuxt-img class="carousel-btn-image" :src="nextImageSrc"/>
        </button>
        <button class="carousel__prev carousel-btn " @click="prev">
          <Icon name="ri:arrow-left-s-line" size="2.2rem" class="text-primary-light-1"/>
          <nuxt-img class="carousel-btn-image" :src="prevImageSrc"/>
        </button>

      </template>
    </carousel>
  </div>
</template>

<style scoped>

</style>