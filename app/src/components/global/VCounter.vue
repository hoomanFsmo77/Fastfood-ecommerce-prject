<script setup lang="ts">
const {counter=1,disable=false}=defineProps<{
  counter:number,
  disable?:boolean
}>()

const emit=defineEmits<{
  (e:'fire',val:number):void
  (e:'increase',val:number):void
  (e:'decrease',val:number):void
}>()
const counterRef=ref<number>(counter || 1)
const plus = () => {
  counterRef.value++
  emit('fire',counterRef.value)
  emit('increase',counterRef.value)
}

const minus = () => {
  if(counterRef.value>1){
    counterRef.value--
    emit('fire',counterRef.value)
    emit('decrease',counterRef.value)
  }
}

const inputHandler = (value:any) => {
  if(typeof value==='string'){
    counterRef.value=1
  }else{
    counterRef.value=value
  }
  emit('fire',counterRef.value)
}

</script>

<template>
  <div class="flex items-stretch !h-2.5">
    <button @click="minus" class="w-2  bg-secondary-light-1 flex justify-center items-center transition-all hover:bg-primary-dark-2 group h-full">
      <Icon class="group-hover:text-[#fff] transition-all" name="ri:subtract-fill"/>
    </button>
    <input :disabled="disable" :value="counterRef" @change="inputHandler($event.target.value)"  type="text" class="input number-input !w-3 !h-2.5 !px-0.5 text-center">
    <button @click="plus" class="w-2  bg-secondary-light-1 flex justify-center items-center transition-all hover:bg-primary-dark-2 group h-full">
      <Icon class="group-hover:text-[#fff] transition-all" name="ri:add-fill"/>
    </button>
  </div>
</template>

<style scoped>

</style>