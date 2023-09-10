<template>
  <NuxtLayout name="free">
    <template #main>
      <section class="!bg-[#fff] py-8">
        <v-container>
          <v-row  >
            <v-column md="6" col="12" class="!block">
              <h2 class="font-800">Some Words About Us & Our Fast Food</h2>
              <p class="txt-2">
                Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further.
              </p>
              <p class="txt-2">
                Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X
              </p>
              <NuxtLink :to="{name:'PRODUCT_LIST'}" class="btn btn-fav btn-md">
                order now
              </NuxtLink>
            </v-column>
            <v-column md="2" col="0"></v-column>
            <v-column  col="0" md="4">
              <div class="relative w-full">
                <nuxt-img width="270" class="absolute inset-0  m-3" src="/about/1.jpg"/>
                <nuxt-img width="270" class="absolute inset-0 " src="/about/2.jpg"/>
              </div>

            </v-column>
          </v-row>
        </v-container>
      </section>
      <section  class="py-5">
        <v-container>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div v-for="i in [3,4,5]" class="w-full relative ">
              <nuxt-img class="w-full" :src="`/about/${i}.jpg`"/>
              <div class="bg-[#fff] p-1">
                <h5 class="font-700 text-center mb-0.5">
                  Take Care of Quality
                </h5>
                <p class="text text-center">
                  Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs.
                </p>
              </div>
              <NuxtLink class="absolute inset-0 w-full h-full" :to="{name:'ABOUT_US'}"></NuxtLink>
            </div>
          </div>

        </v-container>

      </section>
      <section class="bg-[url(/about/6.jpg)] bg-no-repeat bg-cover bg-center   bg-fixed">
        <div class=" w-full h-full  bg-[rgba(0,0,0,0.3)] py-10 px-7">
          <h1 class="font-700 text-primary-light-1 text-4">
            Big Taste
          </h1>
          <div class="flex items-center">
            <p class="px-2 underline-active-top py-2"></p>
            <h1 class="font-700 text-primary-light-1 text-4 ml-0.5">
              Great Taste
            </h1>
          </div>
          <p class="txt-2 mt-2 text-primary-light-1">

            Nam sollicitudin tincidunt dolor. Nunc sed feugiat tortor. In auctor odio odio, ut auctor enim tempus.

          </p>

        </div>

      </section>
      <section class="py-6 bg-[#fff]">
        <v-container>
          <v-row>
            <v-column md="6" col="12" class="!block mx-auto">
              <h2 class="font-700 text-center">
                Our Chef
              </h2>
              <p class="text my-1 text-center">
                Override the digital divide with additional clickthroughs from immersionalong the information highway.
              </p>
            </v-column>
          </v-row>
          <div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-1.3 ">
            <div v-for="i in [7,8,9,10]" class="group">
              <nuxt-img class="w-full group-hover:translate-y-[-1rem] transition-all group-hover:border-primary-dark-3 radius-odd border-l-[8px] border-t-[8px] border-secondary-light-2" :src="`/about/${i}.jpg`" />
              <h4 class="text-center font-700 mt-2 mb-1">John michale</h4>
              <p class="text text-center mb-1">Burger Specilist </p>
              <div class="flex justify-center gap-1">
                <span class=" w-1.5 h-1.5 flex justify-center cursor-pointer items-center bg-primary-dark-3 rounded-full">
                  <Icon class="text-primary-light-1" name="ri:facebook-circle-fill"/>
                </span>
                <span class=" w-1.5 h-1.5 flex justify-center cursor-pointer items-center bg-primary-dark-3 rounded-full">
                  <Icon class="text-primary-light-1" name="ri:twitter-fill"/>
                </span>
                <span class=" w-1.5 h-1.5 flex justify-center cursor-pointer items-center bg-primary-dark-3 rounded-full">
                  <Icon class="text-primary-light-1 " name="ri:linkedin-box-fill"/>
                </span>

              </div>
            </div>
          </div>
        </v-container>

      </section>
      <section class="bg-[url(/about/11.jpg)] bg-no-repeat bg-cover py-5 bg-center  ">
        <v-container>
          <v-row>
            <v-column col="12" class="!block">
              <h1 class="text-center font-700 underline-active text-primary-light-1">What our Client Says</h1>
            </v-column>
          </v-row>
          <div class="my-2">
            <carousel ref="myCarousel" :wrapAround="false" :breakpoints="{768:{itemsToShow:3}}" :items-to-show="1">
              <slide v-for="(i,index) in [12,13,12,13,12]" :key="index">
                <div  class="flex justify-center flex-col items-center">
                  <nuxt-img width="250" :src="`/about/${i}.jpg`"/>
                  <p class="font-playFair text-center text-primary-light-3 text-1.2 mt-1.5 px-3 underline-active pb-2 before:!h-[1px] before:!bg-primary-light-5">
                    Lorem ipsum dolor sit amet, cons ectetur elit. Vestibulum nec odios Suspe ndisse cursus mal suada faci lisis.
                  </p>
                  <p class="text-secondary-light-2 font-600 mt-2 mb-0.5">
                    - Michale John
                  </p>
                  <p class="text-primary-light-1">
                    Director of Alfa
                  </p>
                </div>
              </slide>

              <template #addons="{ slidesCount,currentSlide}">
                <div class="mt-2 flex gap-1 items-center justify-center">
                  <span @click="myCarousel.slideTo(i)" :class="{'!bg-secondary-light-2':i===currentSlide}" v-for="i in [1,2,3]" class="block w-0.5 h-0.5 bg-primary-light-1 cursor-pointer">
                  </span>
                </div>
              </template>
            </carousel>
          </div>
        </v-container>
      </section>
      <section class="py-5 bg-[#fff]">
        <v-container>
          <div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-1.5">
            <div v-for="i in [1,2,3,4]" class="border-dotted shadow-md border-[1px] border-primary-dark-3/70 px-1 hover:shadow-2xl transition-all py-2 flex justify-center items-center flex-col">
              <nuxt-img width="100" :src="`/home/service-${i}.webp`"/>
              <h6 class="font-700 my-1">
                Free shipping on
                first order
              </h6>
              <p class="txt text-center">
                Sign up for latest updates and get free shipping and fast delivery.
              </p>

            </div>

          </div>
        </v-container>
      </section>
      <LazyHomeGallery />
    </template>
  </NuxtLayout>


</template>

<script setup lang="ts">
definePageMeta({
  name:'ABOUT_US',
  path:'/about-us',
  layout:false,
  page_title:'About us'
})
const myCarousel = ref(null)
</script>

<style scoped>

</style>