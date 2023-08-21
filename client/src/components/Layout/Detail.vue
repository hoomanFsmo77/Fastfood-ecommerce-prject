<template>
  <h1 class="text-center font-playFair text-[#fff] font-700 text-4 mb-1.5">
    {{$route.meta.page_title}}
  </h1>
  <div class="m-auto w-full flex justify-center items-center">
    <template v-for="(item,index) in $route.meta.breadcrumb">
      <p :class="{'!text-[#fff]':item.on}" class="text-[#de9692]  text-1 mx-1" v-if="index!==0">/</p>
      <NuxtLink :to="item.link" :class="{'!text-[#fff]':item.on}" class="text-[#de9692] transition-all hover:text-[#fff] text-1 capitalize cursor-pointer" >
        {{item.name}}
      </NuxtLink>
    </template>
    <template v-if="$route.params.link && $route.params&&$route.params.link.length>0">
      <p class="text-[#fff]  text-1 mx-1" >/</p>
      <NuxtLink :to="{name:$route.name,params:{link:$route.params.link}}" class="text-[#fff] transition-all hover:text-[#fff] text-1 capitalize cursor-pointer" >
        {{$route.params.link.split('-').join(' ')}}
      </NuxtLink>
    </template>
  </div>
</template>

<script>
export default {
  name: "Detail"
}
</script>

<style scoped>

</style>