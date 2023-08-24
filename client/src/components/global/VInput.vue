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

</template>

<style scoped>

</style>