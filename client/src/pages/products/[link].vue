<template>
  <section v-if="!product_data_flag" id="product-detail">
   <v-container>
     <v-row>
       <div class="grid grid-cols-2 gap-2">
         <div class="left-content">

           <carousel :wrapAround="true" :items-to-show="1">
             <slide v-for="slide in product_data.images" :key="slide.id">
               <nuxt-img class="w-full h-full rounded-4 object-cover" :src="slide.image"/>
             </slide>
             <slide :key="product_data.id">
               <nuxt-img class="w-full h-full rounded-4 object-cover" :src="product_data.primary_image"/>
             </slide>
             <template #addons>
               <navigation />
               <pagination />
             </template>
           </carousel>
         </div>
         <div class="right-content">
           <!--           //// title-->
           <h1 class="font-600">{{product_data.title}}<sub class="text-secondary-light-2 ml-0.5 text-1">{{product_data.category}}</sub></h1>
           <!--           ////-->
           <hr class="my-1.3">
           <!--           //// brief-->
           <p class="text-[#797979] font-400 leading-2.5 text-1 ">{{product_data.brief}}</p>
           <!--           ////-->

           <hr class="my-1.3">
           <!--           /// has off-->
           <div class="flex items-center" v-if="product_data.off">
             <p class="text-1.3">Price:</p>
             <div >
               <p class="text-1.5 ml-1.5 font-700 line-through">${{product_data.price.toFixed(2)}}</p>
               <p class="text-1.5 ml-1.5 text-secondary-light-2 font-700 text-center">{{product_data.off_percent}}% off</p>
             </div>
             <p class="text-2 ml-1.5 font-700 text-secondary-light-2">${{$calculate_off_price(product_data.price,product_data.off_percent).toFixed(2)}}</p>
           </div>
           <!--           ////-->

           <!--           //// no off-->
           <div v-else class="flex items-center">
             <p class="text-1.3">Price:</p>
             <p class="text-2 ml-1.5 font-700">${{product_data.price.toFixed(2)}}</p>
           </div>
           <!--           ////-->

           <!--           /// quantity-->
           <div class="flex my-1 items-center">
             <p class="text-1.3">Quantity:</p>
             <input :disabled="!product_data.status" @change="changeQuantity($event)" type="text"  v-model.number="productPageData.quantity" class="number-input input-reset ml-1.5">

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
           <div class="flex items-center flex-wrap gap-1 mt-2">
             <VBtnLoader :flag="productPageData.btnLoaderFlag" :disabled="!product_data.status" @click="addToCart" class="btn btn-secondary btn-md btn-light">
               add to card
             </VBtnLoader>

             <template v-if="userFavoriteListFetchFlag && isLogin">
               <VBtnLoader  v-if="!isProductExistInFAV(product_data.id)" :flag="productPageData.FAVBtnLoaderFlag"  @click="addToFav" class="btn btn-fav btn-md">
                 add to favorite
               </VBtnLoader>
               <VBtnLoader  v-else :flag="productPageData.removeFAVBtnLoaderFlag"  @click="removeFav" class="btn btn-remove btn-md">
                 remove from favorites
               </VBtnLoader>
             </template>

             <p class="h5 text-red-500 ml-1" v-if="!product_data.status">
               Not Available Now!
             </p>
           </div>




         </div>
       </div>
     </v-row>
     <v-row class="mt-5">
       <v-column col="12">
          <div class="product-tab">
            <ul class="flex gap-1">
              <li @click="productPageData.tabIndex=0" :class="{'active':productPageData.tabIndex===0}" class="product-tab-item ">
                Description
              </li>
              <li @click="productPageData.tabIndex=1" :class="{'active':productPageData.tabIndex===1}" class="product-tab-item">
                Specification
              </li>
              <li @click="productPageData.tabIndex=2" :class="{'active':productPageData.tabIndex===2}" class="product-tab-item">
                Review ({{product_data.total_comments}})
              </li>
            </ul>
            <div class="product-tab-content">

              <p id="specification-tab" class="text-1 text-[#555555] font-400 leading-2" v-if="productPageData.tabIndex===0">
                {{product_data.description}}
              </p>


              <div v-if="productPageData.tabIndex===1">
                <h4 class="font-600">
                  Food Specification
                </h4>
                <div class="border-[2px] w-full mt-1  flex">
                  <div class=" w-[30%] py-0.5 px-1" >
                    <p class="text-[#555555] font-600 text-1">color</p>
                  </div>
                  <div class="w-full border-l-[2px] py-0.5 px-1" >
                    <p class="text-gray-600 font-400 text-1">{{product_data.color}}</p>
                  </div>
                </div>
                <div class="border-[2px] border-t-[0px] w-full  flex bg-gray-100">
                  <div class=" w-[30%] py-0.5 px-1" >
                    <p class="text-[#555555] font-600 text-1">size</p>
                  </div>
                  <div class="w-full border-l-[2px] py-0.5 px-1" >
                    <p class="text-gray-600 font-400 text-1">{{product_data.size}}</p>
                  </div>
                </div>
              </div>

              <div v-if="productPageData.tabIndex===2" id="comments-tab">
<!--      ////// start comments render here-->
                <template v-if="product_data.total_comments>0 && !product_comments_flag">
                  <h4 class="font-600">{{product_data.total_comments}} Reviews For {{product_data.title}}</h4>
                  <ProductComment
                      v-for="comment in product_comments.comments"
                      :image="comment.author_image"
                      :content="comment.body"
                      :star="comment.rating"
                      :date="comment.date"
                      :name="`${comment.author_firstname} ${comment.author_lastname}`"
                      :reply="comment.reply"
                      :comment-id="comment.id"
                      :productId="comment.productID"
                  />
                  <VPagination
                      :total="product_comments.meta.total"
                      :next-page="product_comments.meta.nextPage"
                      :prev-page="product_comments.meta.prevPage"
                      :current_page="product_comments.meta.current_page"
                  />
                </template>
<!--      ////// end  comments render here-->

<!--      //// start loader for comment-->
                <template v-else-if="product_comments_flag && product_data.total_comments>0">
                  <div class="flex justify-center">
                    <client-only>
                      <half-circle-spinner
                          :animation-duration="2000"
                          :size="150"
                          color="#a41a13"
                      />
                    </client-only>
                  </div>
                </template>
 <!--      //// end loader for comment-->
                <template v-else-if="product_data.total_comments===0">
                  <h5 class="font-600">No Review.</h5>
                </template>
<!--               ////-->
                <h4 class="font-playFair font-700 uppercase mt-2 pb-1 underline-active-left border-b-[1px]">add your Review</h4>
                <template v-if="isLogin">
                  <ProductReply
                      @reply-submit="replySubmit"
                      class="!border-0 !p-0"
                      :commentId="0"
                      :productId="product_data.id"
                      :is-reply="false"
                  />
                  <h6 v-if="productPageData.replyMessage" class="text-green-500 mt-1">{{productPageData.replyMessage}}</h6>
                </template>
                <template v-else>
                  <h6 class="font-400 mt-2">You are not authorized yet. <NuxtLink class="text-blue-600 h6" :to="{name:'AUTH'}">login</NuxtLink> or <NuxtLink class="text-blue-600 h6" :to="{name:'AUTH'}">sign in</NuxtLink> to add review or comments.</h6>
                </template>
              </div>
            </div>

          </div>
       </v-column>
     </v-row>

   </v-container>
  </section>
  <section v-if="!similar_product_flag" id="similar-products">
    <v-container>
      <v-row>
        <v-column col="12" class="!block">
          <h1 class="text-center w-full  font-700 underline-active pb-1 mx-auto">Similar Products</h1>
          <div class="grid mt-3 grid-cols-[repeat(4,1fr)] gap-2">
            <VProductCard
                v-for="product in similar_products.products"
                :primary_image="product.primary_image"
                :title="product.title"
                :caption="product.caption"
                :price="product.price"
                :link="product.link"
                :status="product.status"
                :off="product.off"
                :off_percent="product.off_percent"
                :product-id="product.id"
            />
          </div>
        </v-column>
      </v-row>
    </v-container>

  </section>
</template>

<script setup lang="ts">
import {IProduct} from "~/utils/types";
import {HalfCircleSpinner} from "epic-spinners";
import {useFavoriteStore} from "~/composables/useStates";
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

const {isProductExistInFAV,userFavoriteListFetchFlag}=useFavoriteStore()




//// product list
const {data:product_data,pending:product_data_flag}=await useFetch<IProduct>(`/api/products/${route.params.link}`);

/////////////////////////
const {isLogin}=useStates();
const {replySubmit,changeQuantity,minusQuantity,plusQuantity,addToCart,productPageData,addToFav,removeFav}=useProduct(product_data)
const {pageQuery}=usePagination()
//// comments
const {data:product_comments,pending:product_comments_flag}=await useFetch<IProduct>(`/api/products/comments?productID=${product_data.value && product_data.value.id}&per=3`,{
  query:{
    page:pageQuery
  }
});
//// similar products
const {data:similar_products,pending:similar_product_flag}=await useFetch<{products:IProduct[]}>(`/api/products/list`,{
  query:{
    category:product_data.value && product_data.value.category,
    page:1,
    per:4
  }
});
/////////////////////////////////////


</script>

<style scoped>

</style>