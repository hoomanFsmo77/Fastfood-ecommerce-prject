<script setup lang="ts">
const props=defineProps<{
  counter:number
}>()

const emit=defineEmits<{
  (e:'fire',val:number):void
}>()
const counter=ref<number>(props?.counter || 1)
const plus = () => {
  counter.value++
  emit('fire',counter.value)
}

const minus = () => {
  if(counter.value>1){
    counter.value--
    emit('fire',counter.value)
  }
}

const inputHandler = (value:any) => {
  if(typeof value==='string'){
    counter.value=1
  }else{
    counter.value=value
  }
  emit('fire',counter.value)
}

</script>

<template>
  <div class="flex items-stretch !h-2.5">
    <button @click="minus" class="w-2  bg-secondary-light-1 flex justify-center items-center transition-all hover:bg-primary-dark-2 group h-full">
      <Icon class="group-hover:text-[#fff] transition-all" name="ri:subtract-fill"/>
    </button>
    <input :value="counter" @change="inputHandler($event.target.value)"  type="text" class="input number-input !w-3 !h-2.5 !px-0.5 text-center">
    <button @click="plus" class="w-2  bg-secondary-light-1 flex justify-center items-center transition-all hover:bg-primary-dark-2 group h-full">
      <Icon class="group-hover:text-[#fff] transition-all" name="ri:add-fill"/>
    </button>
  </div>
</template>

<style scoped>

</style>