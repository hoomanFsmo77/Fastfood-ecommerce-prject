<script setup lang="ts">
const props=defineProps<{
  id:number,
  label:string
  data:{id:number,title:string}[],
  selectId?:number
}>();
const emit=defineEmits<{
  (e:'fire',value:number):void
}>()
const {$choice}:any=useNuxtApp();
const selectEl=shallowRef<HTMLElement|null>(null);
let choice:any=null;


watchEffect(()=>{
  if(selectEl.value && props.data.length>0){
    const selectData=props.data.map(item=>{
      return {
        value:item.title,
        id:item.id,
        disabled: false,
        selected:props.selectId ? item.id===props.selectId: false,
        customProperties:{
          id:item.id
        }
      }
    });
    selectData.unshift({
      value:`Choose ${props.label}`,
      id:0,
      selected:!props.selectId ,
      disabled: true,
      customProperties:{
        id:0
      }
    });
    choice && choice.destroy();
    choice=$choice(selectEl.value,{
      choices:selectData,
      allowHTML:true,
      searchChoices:false,
      searchEnabled:false
    });
  }


})
const choiceHandler = (ev:any) => {
  emit('fire',ev.detail.choice.customProperties.id)
}
</script>

<template>
  <div class="w-full">
    <label class="label" :for="id">{{label}}</label>
    <select @choice="choiceHandler"  class="w-full"  ref="selectEl" :name="id" :id="id"></select>
  </div>
</template>

<style >
@tailwind components;

@layer components {
  .choices__inner{
    @apply bg-[#fff]
  }
  .choices *{
    @apply !text-gray-500 !font-400 !text-1
  }
  .choices__list--dropdown, .choices__list[aria-expanded]{
    @apply !z-[999999]
  }

}

</style>