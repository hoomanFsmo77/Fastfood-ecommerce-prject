<script setup lang="ts">
import InnerImageZoom from 'vue-inner-image-zoom';
import {useCustomProduct} from "~/composables/useCustomProduct";

definePageMeta({
  name:'PRODUCT_BUILD',
  path:'/products/build',
  layout:'pages',
  page_title:'Build your own product',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Products',
      link:{name:'PRODUCT_LIST'},
      on:false
    },{
      name:'Build product',
      link:{name:'PRODUCT_BUILD'},
      on:true
    }

  ]
});

const {isLogin}=useStates()
const {data,pending}=await useFetch<{templates:any[],sizes:any[],sauces:any[],cheese:any[],toppings:any[]}>('/api/profile/product-options');

const {customProductData,customPieceHandler,quantityHandler,customProductAddToCart}=useCustomProduct(data)
</script>

<template>
  <client-only>
    <section  id="build-product" v-if="!pending && isLogin">
     <v-container>
       <v-row>
         <v-column col="5">
           <inner-image-zoom :src="data.templates.filter(i=>i.id===customProductData.templateID)[0].image" :zoomSrc="data.templates.filter(i=>i.id===customProductData.templateID)[0].image"  />
         </v-column>
         <v-column col="3" class="flex-col">
            <div class="pl-1">
              <nuxt-img @click="customProductData.templateID=item.id" width="80" :class="{'!opacity-100':item.id===customProductData.templateID}" class="mb-1 opacity-50 cursor-pointer transition-all hover:opacity-100" v-for="item in data.templates" :src="item.image"/>
            </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div>
             <h1 class="font-700 text-primary-dark-3">Build your own Product</h1>
             <h3 class="text-secondary-light-2 my-1.5 font-600">${{data.templates.filter(i=>i.id===customProductData.templateID)[0].price.toFixed(2)}}</h3>
             <p class="font-400 text-primary-dark-3 text-1">
               Our flavors & ingredients to build best local burgers. Phasellus tincidunt odio eget ullamcorper efficitur. Cras placerat ut turpis pellentesque vulputate.             </p>
           </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div class="w-full p-1.5 border-[1px] border-primary-dark-3/20 bg-[rgba(0,0,0,0.1)]">
             <h5>sizes</h5>
             <p class="font-400 text-0.8">Please select your pizza size. Default size is Medium.</p>
              <div class="flex mt-1">
                <VTooltip v-for="item in data.sizes" direction="bottom" :tooltip="item.id===0 ? 'none':item.size+' +$'+item.price.toFixed(2)">
                  <div @click="customProductData.sizeID=item.id"
                       :class="{'!border-green-700 !border-[2px]':customProductData.sizeID===item.id}"
                       class="w-[42px] hover:border-[1px] hover:border-primary-dark-3 cursor-pointer bg-[#fff] mr-1 flex justify-center transition-all"
                       >
                    <nuxt-img   width="40" :src="item.image" />
                  </div>
                </VTooltip>


              </div>
           </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div class="w-full p-1.5 border-[1px] border-primary-dark-3/20 bg-[rgba(0,0,0,0.1)]">
             <h5>Sauces</h5>
             <p class="font-400 text-0.8">What kind of sauce do you like?</p>
             <div class="flex mt-1">
               <VTooltip v-for="item in data.sauces" direction="bottom" :tooltip="item.id===0 ? 'none':item.sauces+' +$'+item.price.toFixed(2)">
                 <div @click="customProductData.saucesID=item.id"
                      :class="{'!border-green-700 !border-[2px]':customProductData.saucesID===item.id}"
                      class="w-[42px] hover:border-[1px] hover:border-primary-dark-3 cursor-pointer bg-[#fff] mr-1 flex justify-center transition-all"
                 >
                   <nuxt-img   width="40" :src="item.image" />
                 </div>
               </VTooltip>


             </div>
           </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div class="w-full p-1.5 border-[1px] border-primary-dark-3/20 bg-[rgba(0,0,0,0.1)]">
             <h5>cheese</h5>
             <p class="font-400 text-0.8">Select the type of cheese you like.</p>
             <div class="flex mt-1">
               <VTooltip v-for="item in data.cheese" direction="bottom" :tooltip="item.id===0 ? 'none':item.cheese+' +$'+item.price.toFixed(2)">
                 <div @click="customProductData.cheeseID=item.id"
                      :class="{'!border-green-700 !border-[2px]':customProductData.cheeseID===item.id}"
                      class="w-[42px] hover:border-[1px] hover:border-primary-dark-3 cursor-pointer bg-[#fff] mr-1 flex justify-center transition-all"
                 >
                   <nuxt-img   width="40" :src="item.image" />
                 </div>
               </VTooltip>


             </div>
           </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div class="w-full p-1.5 border-[1px] border-primary-dark-3/20 bg-[rgba(0,0,0,0.1)]">
             <h5>toppings</h5>
             <p class="font-400 text-0.8">Select toppings for your pizza.</p>
             <div class="flex mt-1">
               <VTooltip v-for="item in data.toppings" direction="bottom" :tooltip="item.id===0 ? 'none':item.toppings+' +$'+item.price.toFixed(2)">
                 <div @click="customProductData.toppingID=item.id"
                      :class="{'!border-green-700 !border-[2px]':customProductData.toppingID===item.id}"
                      class="w-[42px] hover:border-[1px] hover:border-primary-dark-3 cursor-pointer bg-[#fff] mr-1 flex justify-center transition-all"
                 >
                   <nuxt-img   width="40" :src="item.image" />
                 </div>
               </VTooltip>


             </div>
           </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div class="w-full p-1.5 border-[1px] border-primary-dark-3/20 bg-[rgba(0,0,0,0.1)]">
             <h5>Custom pieces. </h5>
             <p class="font-400 text-0.8">By default, there are 8 pieces. Choose your special case if you want to.</p>
             <input type="number" @change="customPieceHandler" min="4" v-model="customProductData.custom_pieces" max="18" class="number-input input w-full mt-1" />

           </div>
         </v-column>
       </v-row>
       <v-row class="my-1">
         <v-column col="12">
           <div class="w-full p-1.5 border-[1px] border-primary-dark-3/20 bg-[rgba(0,0,0,0.1)]">
             <h5>Additional Info.</h5>
             <p class="font-400 text-0.8">If you want to provide any additional information regarding your order or request, please write here.</p>
             <textarea v-model="customProductData.additional_info" rows="3"   class="input input-primary mt-1" ></textarea>

           </div>
         </v-column>
       </v-row>
       <v-row class="mt-3">
         <v-column col="12" class="!block">
           <div class="flex justify-between items-center mb-0.7">
             <p class="font-600 ">
                Build your own Product
             </p>
             <p class=" text-1">
               ${{$filterCustomProduct(data.templates,customProductData.templateID).price.toFixed(2)}}
             </p>
           </div>
           <div class="flex justify-between items-center mb-0.7">
             <p class="font-600 ">
               Sizes - {{customProductData.sizeID===0 ? 'medium size' :$filterCustomProduct(data.sizes,customProductData.sizeID).size}}
             </p>
             <p class=" text-1">
               ${{customProductData.sizeID===0 ? $filterCustomProduct(data.sizes,2).price.toFixed(2) :$filterCustomProduct(data.sizes,customProductData.sizeID).price.toFixed(2)}}
             </p>
           </div>
           <div v-if="customProductData.saucesID!==0" class="flex justify-between items-center mb-0.7">
             <p class="font-600 ">
               Sauces  - {{$filterCustomProduct(data.sauces,customProductData.saucesID).sauces}}
             </p>
             <p class=" text-1">
               ${{$filterCustomProduct(data.sauces,customProductData.saucesID).price.toFixed(2)}}
             </p>
           </div>
           <div v-if="customProductData.cheeseID!==0" class="flex justify-between items-center mb-0.7">
             <p class="font-600 ">
               Cheese
             </p>
             <p class=" text-1">
               ${{$filterCustomProduct(data.cheese,customProductData.cheeseID).price.toFixed(2)}}
             </p>
           </div>
           <div v-if="customProductData.toppingID!==0" class="flex justify-between items-center mb-0.7">
             <p class="font-600 ">
               Toppings - {{$filterCustomProduct(data.toppings,customProductData.toppingID).toppings}}
             </p>
             <p class=" text-1">
               ${{$filterCustomProduct(data.toppings,customProductData.toppingID).price.toFixed(2)}}
             </p>
           </div>
           <div  class="flex justify-between items-center mb-0.7">
             <p class="font-600 ">
               Quantity
             </p>
             <p class=" text-1">
               x{{customProductData.quantity}}
             </p>
           </div>

           <div class="flex justify-between items-center">
             <p class="font-600 ">
               Custom pieces: {{customProductData.custom_pieces}}
             </p>
             <p class=" text-1">
               -
             </p>
           </div>
           <hr class="my-1">
           <div class="flex justify-end ">
             <h4 class="text-secondary-light-2 font-600">
               Subtotal ${{customProductData.subtotal.toFixed(2)}}
             </h4>
           </div>
           <hr class="my-1">
            <div class="flex mt-2 items-center">
              <VCounter @fire="quantityHandler" />
              <VBtnLoader :flag="customProductData.btnLoaderFlag" @click="customProductAddToCart" class="btn btn-primary btn-light btn-sm ml-1">
                Add to cart
              </VBtnLoader>

            </div>


         </v-column>
       </v-row>


     </v-container>
    </section>
    <section v-else id="not-login">
      <h5>You are not authenticated yet. <NuxtLink class="text-blue-600 h5" :to="{name:'AUTH'}">login</NuxtLink> or <NuxtLink class="text-blue-600 h5" :to="{name:'AUTH'}">sign in</NuxtLink></h5>
    </section>
  </client-only>

</template>

<style scoped>

</style>