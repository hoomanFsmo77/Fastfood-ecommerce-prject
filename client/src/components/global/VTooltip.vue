<script setup lang="ts">
defineProps<{
  tooltip:string,
  direction:'bottom'|'top'
}>()
const dropdownFlag=shallowRef<boolean>(false);
const toggleDropDown = () => dropdownFlag.value=!dropdownFlag.value;
</script>

<template>
  <div v-drop="toggleDropDown" class="tooltip-wrapper">
    <div  class="tooltip-slot">
      <slot />
    </div>
    <Transition :name="direction==='bottom' ? 'tooltip_down' : null">
      <div  v-if="dropdownFlag" :class="{'top-[55px] !left-[-3rem]':direction==='bottom'}" class="tooltip-content">
        <p class="text-[#fff] text-center text-0.7 capitalize">{{tooltip}}</p>
        <span class="tooltip-triangle"></span>
      </div>
    </Transition>
  </div>



</template>

<style >
@tailwind components;
@layer components {
  .tooltip_down-enter-active,.tooltip_down-leave-active{
    @apply transition-all duration-500 ease-in-out
  }
  .tooltip_down-enter-from,.tooltip_down-leave-to{
    @apply opacity-0 invisible top-[65px]
  }
  .tooltip_down-enter-to,.tooltip_down-leave-from{
    @apply opacity-100 visible top-[55px]
  }
}

.tooltip-triangle{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 15px 10px;
  border-color: transparent transparent #333 transparent;
  position: absolute;
  top:-10px;
  right:42%
}
</style>