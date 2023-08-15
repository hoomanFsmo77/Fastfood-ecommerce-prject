<script setup lang="ts">
const props=defineProps<{
  hasSub:boolean,
  direction:'down' | 'right'
}>()
const dropdownFlag=shallowRef<boolean>(false);
const toggleDropDown = () => dropdownFlag.value=!dropdownFlag.value
</script>

<template>
  <div v-drop="toggleDropDown"  class="dropdown-wrapper">
    <div class="dropdown-top">
      <slot name="top"/>
    </div>
    <Transition :name="direction==='down' ? 'drop_down': 'drop_right'">
      <div class="dropdown-main" :class="{'top-[90px] left-0':direction==='down','right-[-100%] top-0':direction==='right'}" v-if="dropdownFlag">
        <ul :class="{'!border-t-0':!hasSub}">
          <slot name="main"/>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style >
@tailwind components;
@layer components {
  .drop_down-enter-active,.drop_down-leave-active{
    @apply transition-all duration-500 ease-in-out
  }
  .drop_down-enter-from,.drop_down-leave-to{
    @apply opacity-0 invisible top-[100px]
  }
  .drop_down-enter-to,.drop_down-leave-from{
    @apply opacity-100 visible top-[90px]
  }


  .drop_right-enter-active,.drop_right-leave-active{
    @apply transition-all duration-500 ease-in-out
  }
  .drop_right-enter-from,.drop_dright-leave-to{
    @apply opacity-0 invisible top-[-10px]
  }
  .drop_right-enter-to,.drop_right-leave-from{
    @apply opacity-100 visible top-0
  }
}


</style>