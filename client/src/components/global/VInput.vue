<script setup lang="ts">
defineProps<{
  modelValue:string,
  placeholder?:string,
  label:string,
  id:string,
  require:boolean,
  disable:boolean,
  type:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:string):void
}>()


</script>

<template>
  <template v-if="type==='text'">
    <div class="w-full">
      <label class="text-0.9 text-[#848484] capitalize block mb-0.5" :for="id">{{label}}
        <template v-if="require">*</template></label>
      <input :type="type" :disabled="disable" :value="modelValue" @input="emit('update:modelValue',$event.target.value)" :id="id" class="input input-primary" />
    </div>
  </template>
  <template v-if="type==='area'">
    <div class="w-full">
      <label class="text-0.9 text-[#848484] capitalize block mb-0.5" :for="id">{{label}}
        <template v-if="require">*</template></label>
      <textarea rows="3"  :disabled="disable" :value="modelValue" @input="emit('update:modelValue',$event.target.value)" :id="id" class="input input-primary" ></textarea>
    </div>
  </template>

</template>

<style scoped>

</style>