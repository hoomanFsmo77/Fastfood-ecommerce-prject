<template>
    <div v-bind="$attrs" @click="searchData.toggleSearchBox()" class="topbar-icon mr-0">
        <Icon name="bi:search" size="1.1rem"/>
    </div>
    <teleport to='body' >
        <transition name="search">
<!--            main content-->
            <div @click.self="searchData.toggleSearchBox()" v-if="searchData.openSearchBoxFlag" class="search-popup">


<!--               close button-->
                <div @click="searchData.toggleSearchBox()" class="close-button">
                  <Icon name="icon-park-solid:big-x" size="1.1rem"/>
                </div>

<!--              search box input-->
              <div class="search-box">
                <div class="search-box-inner relative">
                  <input placeholder="Search here..." v-model="searchData.searchContext" class="search-input" />
                  <button  @click="initSearch" class="search-button">
                    search now!
                  </button>

<!--                  close search box button-->
                  <div v-if="searchData.showResultFlag" @click="searchData.closeBox()" class="close-box-btn">
                    <Icon  name="bi:x-lg" class="z-20 relative cursor-pointer" size="1.3rem"/>
                  </div>

                </div>

<!--                search box result-->
                <div  v-fade:30="searchData.showResultFlag" class="search-result-box scroller">

<!--                  loader-->
                  <div v-if="searchData.loaderFlag" class="flex justify-center absolute inset-0 w-full h-full items-center">
                    <circles-to-rhombuses-spinner
                        :animation-duration="1300"
                        :circles-num="5"
                        :circle-size="18"
                        color="#a41a13"
                    />

                  </div>

<!--                  no result-->
                  <p v-else-if="!searchData.loaderFlag && searchData.searchResult &&searchData.searchResult.length===0" class="text-center h6 relative bottom-[-13px]">
                    no search result found!
                  </p>
                  <template v-else>
<!--                    search result-->
                    <div v-for="item in searchData.searchResult" >
                        <TopbarSearchItem
                           :status="item.status"
                           :link="item.link"
                           :primary_image="item.primary_image"
                           :title="item.title"
                           :category="item.category"
                           :caption="item.caption"
                           :quantity="item.quantity"
                           :off="item.off"
                           :off_percent="item.off_percent"
                           :price="item.price"
                           :brief="item.brief"
                        />
                    </div>
                    <div>
                      <NuxtLink class="block btn btn-primary !rounded-[0px] before:!rounded-[0px] text-center" :to="{name:'SEARCH',params:{slug:['product',searchData.searchContext]}}">
                        see more
                      </NuxtLink>
                    </div>
                  </template>
                </div>

              </div>

<!--              key word section-->
              <div class="keywords mt-2 ">
                <p class="font-playFair text-center h3 text-white">
                  Recent Search Keywords
                </p>
                <ul v-if="!pending" class="flex flex-row mt-2 justify-center">
                  <li v-for="item in data" class="">
                    <NuxtLink :to="{name:'SEARCH',params:{slug:['product',item.name]}}" class="text-white block mr-1 p-1  border-[1px] border-white cursor-pointer transition-all hover:text-secondary-light-2 hover:border-secondary-light-2">
                      {{item.name}}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { CirclesToRhombusesSpinner } from 'epic-spinners'
import {useSearch} from "~/composables/useSearch";
const emit=defineEmits<{
  (e:'fire'):void
}>()
const {initSearch,searchData}=useSearch(emit);
const {data,pending}=await useFetch('/api/products/category')
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
