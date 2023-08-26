<script setup lang="ts">
import {Banner} from "~/utils/types";
import {useCarousel} from "~/composables/useCarousel";
const {data:banner_data,pending}=await useFetch<Banner[]>('/api/home/intro');
const {prevSlide,prevImageSrc,nextImageSrc,imageClasses, nextSlide,changeSlideHandler,textClasses,rowClass}= useCarousel(banner_data);
</script>

<template>

  <v-container v-if="!pending" class="relative h-full !m-0 !ml-auto ">
    <v-row  v-for="(slide,index) in banner_data" :key="slide.id" v-bind="rowClass(index)">
      <v-column col="7" class="flex-col items-start">
        <div class="relative">
          <p  v-bind="textClasses(index)"
              class=" text-secondary-light-1 italic text-2 font-600"
          >
            {{slide.caption}}
          </p>

          <h1 v-bind="textClasses(index)" class="text-4.5 text-primary-light-1 font-600 mb-0.5 ">
            {{slide.first_text}}
          </h1>

          <h3 v-bind="textClasses(index)" class="text-primary-light-1 mb-1  ">
            {{slide.middle_text}}
          </h3>

          <h5 v-bind="textClasses(index)" class="text-primary-light-1 mb-2.5 italic">{{slide.last_text}}</h5>
          <div v-carousel="changeSlideHandler" class="carousel-cover"></div>
        </div>
        <NuxtLink :to="{name:'PRODUCT_DETAIL',params:{link:slide.link}}" v-bind="textClasses(index)"  class="btn btn-primary !font-poppins">
          order now
        </NuxtLink>

      </v-column>

      <v-column  col="5" class="flex justify-end relative">
        <nuxt-img v-bind="imageClasses(index)"  width="500" :src="slide.image"/>
        <div v-carousel="changeSlideHandler" class="carousel-cover"></div>
      </v-column>


    </v-row>

  </v-container>



  <v-container class="absolute left-0 right-0 top-[50%] flex justify-between items-center ">
    <button class=" carousel-btn " @click="prevSlide">
      <Icon name="ri:arrow-left-s-line" size="2.2rem" class="text-primary-light-1"/>
      <nuxt-img class="carousel-btn-image" :src="prevImageSrc"/>
    </button>
    <button class=" carousel-btn" @click="nextSlide">
      <Icon name="ri:arrow-right-s-line" size="2.2rem" class="text-primary-light-1"/>
      <nuxt-img class="carousel-btn-image" :src="nextImageSrc"/>
    </button>

  </v-container>


</template>

<style scoped>

</style>