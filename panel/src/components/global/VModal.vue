<template>
  <teleport to="body">
    <div class="modal-wrapper"  @click.self="close" :class="modelValue ? '!z-[9999999999] opacity-100 visible':'!z-[-1] opacity-0 invisible'">
      <Transition name="translate">
        <div v-if="modelValue" v-bind="$attrs" class="modal " :class="modalClass">
          <div  class="modal-header">
            <div class="flex gap-1 items-center">
              <nuxt-img   src="/logo-small.webp"/>
              <h5 class="text-primary-light-4 " > WENGDO</h5>
            </div>
            <Icon @click="closeByIcon" size="2rem" name="bi:x"  class="text-primary-light-4   cursor-pointer"  />
          </div>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </Transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">

const props=defineProps<{
  modelValue:boolean,
  fadeOutside?:boolean,
  modalClass?:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void,
  (e:'close'):void,
  (e:'open'):void,
}>();
const close = () => {
  if(props.fadeOutside){
    emit('update:modelValue',false)
    emit('close')
  }
}

const closeByIcon = () => {
  emit('update:modelValue',false)
  emit('close')
}
watchEffect(()=>{
  props.modelValue && emit('open')
})


</script>

<style >

.translate-enter-active,.translate-leave-active{
  transition: all 250ms linear;
}
.translate-enter-from,.translate-leave-to{
  top: 0 !important;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.96) ;
}
.translate-enter-to,.translate-leave-from {
  top: 60px !important;
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}
</style>