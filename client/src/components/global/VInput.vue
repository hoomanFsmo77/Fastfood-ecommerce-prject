<script setup lang="ts">
defineProps<{
  modelValue?:string,
  placeholder?:string,
  label?:string,
  id:string,
  require?:boolean,
  disable?:boolean,
  type:'text' |'area' |'float',
  icon?:string,
  inputClass?:string
}>();
const iconInput=ref<string>('')
const emit=defineEmits<{
  (e:'update:modelValue',value:string):void,
  (e:'icon-fire',value:string):void,
}>()


</script>

<template>
  <template v-if="type==='text'">
    <div class="input-wrapper">
      <label class="label" :for="id">{{label}}
        <template v-if="require">*</template></label>
      <input :type="type" :disabled="disable" :value="modelValue" @input="emit('update:modelValue',$event.target.value)" :id="id" class="input input-primary" />
    </div>
  </template>
  <template v-if="type==='area'">
    <div class="input-wrapper">
      <label class="label" :for="id">{{label}}
        <template v-if="require">*</template></label>
      <textarea rows="3"  :disabled="disable" :value="modelValue" @input="emit('update:modelValue',$event.target.value)" :id="id" class="input input-primary" ></textarea>
    </div>
  </template>
  <template v-if="type==='float'">
    <div class="input-wrapper relative">
      <label class="label" :for="id">{{label}}
        <template v-if="require">*</template></label>
      <input :class="inputClass" @keydown.enter="emit('icon-fire',iconInput)"  v-model="iconInput" type="text" :placeholder="placeholder"  :id="id" class="input input-primary" />
      <Icon @click="emit('icon-fire',iconInput)" :name="icon" size="1.3rem" class="absolute right-[10px] top-[30%] cursor-pointer text-gray-500"/>
    </div>
  </template>

</template>

<style scoped>

</style>