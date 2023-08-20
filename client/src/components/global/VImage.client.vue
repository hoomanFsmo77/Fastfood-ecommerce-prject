<script setup lang="ts">
defineProps<{
  src:string,
  loaderClass?:string,
  imageClass?:string
}>();
const flag=shallowRef<boolean>(false)
const loadImage = () => {
  flag.value=true
}
const loadMetaData = () => {
  flag.value=true
}
</script>

<template>
  <div class="flex justify-center h-full w-full">
    <nuxt-img  :alt="src"
               @load="loadImage"
               @loadedmetadata="loadMetaData"
               class="transition-all w-full"
               :class="[imageClass,{'opacity-100 visible !z-auto':flag,'hidden opacity-0 z-[-1]':!flag}]"
               :src="src"

    />
    <div :class="[loaderClass,{'hidden !z-[-1] opacity-0':flag}]" class="box-is-loading"></div>

  </div>
</template>

<style scoped>

</style>