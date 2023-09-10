<script setup lang="ts">
const {data,pending}=await useFetch('/api/home/gallery')

const carouselBreakpoints={
  1200:{
    itemsToShow:5
  },
  768:{
    itemsToShow:3
  },
}
</script>

<template>
  <section v-if="!pending" id="gallery">
    <photo-provider>
      <carousel :wrapAround="true" :breakpoints="carouselBreakpoints" :items-to-show="2">
        <slide v-for="slide in data" :key="slide">
          <photo-consumer :intro="slide.title" :key="slide.id" :src="slide.image">
            <div class="w-full h-full">
              <nuxt-img :src="slide.image" class="view-box" />
              <div class="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center group">
                <div class="opacity-0 cursor-pointer hover:bg-secondary-light-2  group-hover:visible group-hover:opacity-100 invisible transition-all w-3 h-3 bg-primary-light-5 flex justify-center items-center">
                  <Icon size="1.5rem" class="text-[#fff]" name="ri:fullscreen-exit-fill" />
                </div>
              </div>
            </div>
          </photo-consumer>
        </slide>
      </carousel>
    </photo-provider>
  </section>
</template>

<style >
.PhotoSlider__Wrapper{
  z-index: 99999999999999;
}
.PhotoSlider__Wrapper .PhotoSlider__ArrowLeft svg, .PhotoSlider__Wrapper .PhotoSlider__ArrowRight svg{
  width:3rem !important;
  height: 3rem !important;
}
</style>