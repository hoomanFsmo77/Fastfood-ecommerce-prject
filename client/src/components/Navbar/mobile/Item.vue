<script setup lang="ts">
import {resolveComponent} from "@vue/runtime-core";
interface Props{
  title:string,
  link:{name:string,query?:any},
  hasSub:boolean,
  sub?:Props[],
  type:'sub' | 'main'
}
const props=defineProps<Props>()
const openFlag=ref(false)

const linkTag=resolveComponent('NuxtLink')
const divTag=resolveComponent('div')
</script>

<template>
  <li class="border-b-[1px] border-primary-light-5"  :class="{'!border-[0px] last:pb-1':type==='sub'}">

    <component :is="hasSub ? divTag : linkTag" @click="openFlag=!openFlag" :to="link" :class="{'!text-0.9 !py-0.5':type==='sub'}" class="px-1 cursor-pointer py-1 text-primary-light-1 transition-all hover:text-secondary-light-2 text-1 flex items-center">
      <Icon v-if="type==='sub'" class="mr-1 text-secondary-light-2" name="ri:square-fill" size="0.7rem"/>
      {{title}}
      <span v-if="hasSub" class=" w-1 h-1 border-primary-dark-1 ml-1 border-[1px] flex justify-center items-center hover:border-secondary-light-2 transition-all">
           <Icon name="ri:arrow-down-s-line" size="0.7rem" class="text-secondary-light-2" />
          </span>
    </component>



    <ul class="v-collapse ml-1" v-collapse="openFlag" v-if="hasSub">
      <NavbarMobileItem
          type="sub"
          v-for="item in sub"
          :title="item.title"
          :link="item.link"
          :hasSub="item.hasSub"
          :sub="item.sub || undefined"
      />

    </ul>
  </li>
</template>

<style >
@tailwind components;
@layer components {
  .v-collapse:not(.show) {
    @apply hidden;
  }

  .collapsing {
    @apply h-0 overflow-hidden transition-all duration-300 ease-in-out
  }

}
</style>