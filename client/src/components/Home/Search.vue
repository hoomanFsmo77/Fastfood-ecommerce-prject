<template>
    <div @click="toggleSearchBox" class="topbar-icon mr-0">
        <Icon name="bi:search" size="1.1rem"/>
    </div>
    <teleport to='body' >
        <transition name="search">
            <div @click.self="toggleSearchBox" v-if="openSearchBoxFlag" class="search-popup">
                <div @click="toggleSearchBox" class="close-button">
                  <Icon name="icon-park-solid:big-x" size="1.1rem"/>
                </div>

              <div class="search-box">
                <div class="search-box-inner relative">
                  <input placeholder="Search here..." v-model="searchContext" class="search-input" />
                  <button  @click="initSearch" class="search-button">
                    search now!
                  </button>
                  <div v-if="showResultFlag" @click="closeBox" class="absolute bg-white rounded-full right-[155px] flex justify-end bottom-[-53px] p-0.5 z-20">
                    <Icon  name="bi:x-lg" class="z-20 relative cursor-pointer" size="1.3rem"/>
                  </div>
                </div>

                <div  v-fade:30="showResultFlag" class="search-result-box">
                  <div v-if="loaderFlag" class="flex justify-center">
                    <half-circle-spinner
                        :animation-duration="1300"
                        :size="50"
                        color="#a41a13"
                    />
                  </div>
                  <p v-else-if="!loaderFlag && searchResult.length===0" class="text-center h6 relative bottom-[-13px]">
                    no search result found!
                  </p>
                  <template v-else>
                    <div v-for="item in searchResult" >
                      <NuxtLink :class="{'hover:bg-gray-100':item.status,'bg-gray-100':!item.status}" class="py-1.5 px-1 cursor-pointer relative flex justify-between items-center   transition-all" :to="{name:'PRODUCT_DETAIL',params:{link:item.link}}">
                        <div class="flex items-center">
                          <nuxt-img width="140" :src="item.primary_image" />
                          <div class="ml-1">
                            <h6 >{{item.title}}<p class="text-secondary-light-2 inline-block text-0.7 ml-0.5">{{item.category}}</p></h6>
                            <p class="my-0.5">{{item.caption}}</p>
                            <p class="text-secondary-light-2 mb-0.5">{{item.quantity}} items left</p>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <p v-if="item.off" class="h5" >
                            {{calculate_off_price(item.price,item.off_percent)}}$
                            <span class="text-red-500 block">-{{item.off_percent}}%</span>
                          </p>
                          <p class="h6 ml-0.5" :class="{'line-through':item.off}">{{item.price}}$</p>
                        </div>
                        <div v-if="!item.status" class="absolute rotate-[12deg] w-full h-[2px] bg-gray-400 left-0 top-[50%]"></div>
                        <div v-if="!item.status" class="absolute rotate-[-12deg] w-full h-[2px] bg-gray-400 left-0 top-[50%]"></div>
                      </NuxtLink>
                    </div>
                  </template>
                </div>
              </div>
              <div class="keywords mt-2 ">
                <p class="font-playFair text-center h3 text-white">
                  Recent Search Keywords
                </p>
                <ul class="flex flex-row mt-2 justify-center">
                  <li v-for="item in recentKeyWord" class="">
                    <NuxtLink :to="{name:'PRODUCT_LIST',query:{category:item.toLowerCase()}}" class="text-white block mr-1 p-1  border-[1px] border-white cursor-pointer transition-all hover:text-secondary-light-2 hover:border-secondary-light-2">
                      {{item}}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { HalfCircleSpinner } from 'epic-spinners'
import {useSearch} from "~/composables/useSearch";
const {openSearchBoxFlag,toggleSearchBox,initSearch,searchContext,searchResult,showResultFlag,loaderFlag,calculate_off_price,closeBox}=useSearch()
</script>

<style lang="scss">
@tailwind components;
@layer components{
    .search-enter-active ,.search-leave-active{
        @apply transition-all duration-500 ease-in-out
    }

    .search-enter-from ,.search-leave-to{
        @apply top-[-100%] invisible
    }
    .search-enter-to ,.search-leave-from{
        @apply top-0 visible
    }
}


</style>
