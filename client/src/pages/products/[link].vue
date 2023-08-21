<template>
  <section v-if="!pending" id="product-detail">
   <v-container>
     <v-row>
       <div class="grid grid-cols-2 gap-2">
         <div class="left-content">

           <carousel :wrapAround="true" :items-to-show="1">
             <slide v-for="slide in data.images" :key="slide.id">
               <nuxt-img class="w-full h-full rounded-4 object-cover" :src="slide.image"/>
             </slide>
             <slide :key="data.id">
               <nuxt-img class="w-full h-full rounded-4 object-cover" :src="data.primary_image"/>
             </slide>
             <template #addons>
               <navigation />
               <pagination />
             </template>
           </carousel>
         </div>
         <div class="right-content">
           <!--           //// title-->
           <h1 class="font-600">{{data.title}}<sub class="text-secondary-light-2 ml-0.5 text-1">{{data.category}}</sub></h1>
           <!--           ////-->
           <hr class="my-1.3">
           <!--           //// brief-->
           <p class="text-[#797979] font-400 leading-2.5 text-1 ">{{data.brief}}</p>
           <!--           ////-->

           <hr class="my-1.3">
           <!--           /// has off-->
           <div class="flex items-center" v-if="data.off">
             <p class="text-1.3">Price:</p>
             <div >
               <p class="text-1.5 ml-1.5 font-700 line-through">${{data.price.toFixed(2)}}</p>
               <p class="text-1.5 ml-1.5 text-secondary-light-2 font-700 text-center">{{data.off_percent}}% off</p>
             </div>
             <p class="text-2 ml-1.5 font-700 text-secondary-light-2">${{$calculate_off_price(data.price,data.off_percent).toFixed(2)}}</p>
           </div>
           <!--           ////-->

           <!--           //// no off-->
           <div v-else class="flex items-center">
             <p class="text-1.3">Price:</p>
             <p class="text-2 ml-1.5 font-700">${{data.price.toFixed(2)}}</p>
           </div>
           <!--           ////-->

           <!--           /// quantity-->
           <div class="flex my-1 items-center">
             <p class="text-1.3">Quantity:</p>
             <input @change="changeQuantity($event)" type="text"  v-model.number="quantity" class="number-input input-reset ml-1.5">

             <div class="flex flex-col">
               <button @click="plusQuantity" class="bg-[#f4f5f6]">
                 <Icon size="1.2rem" class="text-gray-700" name="ri:arrow-up-s-fill"/>
               </button>
               <button @click="minusQuantity" class="bg-[#f4f5f6]">
                 <Icon size="1.2rem" class="text-gray-700" name="ri:arrow-down-s-fill"/>
               </button>
             </div>
           </div>
           <!--           /// add to card-->
           <button class="btn btn-secondary mt-2 btn-light">
             add to card
           </button>

         </div>
       </div>
     </v-row>
     <v-row class="mt-5">
       <v-column col="12">
          <div class="product-tab">
            <ul class="flex gap-1">
              <li @click="tabIndex=0" :class="{'active':tabIndex===0}" class="product-tab-item ">
                Description
              </li>
              <li @click="tabIndex=1" :class="{'active':tabIndex===1}" class="product-tab-item">
                Specification
              </li>
              <li @click="tabIndex=2" :class="{'active':tabIndex===2}" class="product-tab-item">
                Review ({{data.comments.length}})
              </li>
            </ul>
            <div class="product-tab-content">
                <p class="text-1 text-[#555555] font-400 leading-2" v-if="tabIndex===0">
                  {{data.description}}
                </p>
              <p class="text-1 text-[#555555] font-400 leading-2" v-if="tabIndex===1">
                {{data.specification}}
              </p>
            </div>

          </div>
       </v-column>
     </v-row>

   </v-container>
  </section>
</template>

<script setup lang="ts">
import {IProduct} from "~/utils/types";

const route=useRoute();
definePageMeta({
  name:'PRODUCT_DETAIL',
  path:'/products/:link',
  layout:'pages',
  page_title:'Product detail',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Products',
      link:{name:'PRODUCT_LIST'},
      on:false
    }
  ]
});

const {data,pending}=await useFetch<IProduct>(`/api/products/${route.params.link}`);

const quantity=ref(1);
const tabIndex=ref(0)
const plusQuantity = () => {
  if(data.value && quantity.value!==data.value.quantity){
    quantity.value++
  }
}
const minusQuantity = () => {
  if(quantity.value>1){
    quantity.value--
  }
}

const changeQuantity = (ev:Event) => {
  const el=ev.target as HTMLInputElement;
  const value=Number(el.value)
  if(data.value && value>data.value.quantity){
    quantity.value=data.value.quantity
  }
}
</script>

<style scoped>

</style>