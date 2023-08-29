<script setup lang="ts">
defineProps<{
  options: { id:number,name:string }[],
  modelValue:number,
  name:string,
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:number):void,
  (e:'fire',value:number):void,
}>();

const radioAction = (id:number) => {
  emit('update:modelValue',id)
  emit('fire',id)
}

</script>

<template>
  <ul class="radio-options">
    <li v-for="item in options" class="radio-option">
      <input
          :id="name+item.id"
          :name="name"
          @change="radioAction(item.id)"
          :checked="modelValue===item.id"
          :value="item.id"
          type="checkbox"
          class="input-radio cursor-pointer"
      />
      <label @click="radioAction(item.id)" class="cursor-pointer text-0.9">{{item.name}}</label>
    </li>
  </ul>
</template>

<style scoped>

</style>