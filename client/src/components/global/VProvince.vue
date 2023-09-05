<script setup lang="ts">
const props=defineProps<{
  provinceId?:number
}>();
const emit=defineEmits<{
  (e:'fire',value:number):void
}>()
const {$choice}:any=useNuxtApp();
const provinceEl=shallowRef<HTMLElement|null>(null);
let choice:any=null;
const {data,pending}=await useFetch('/api/loc/province')

watchEffect(()=>{

  if(provinceEl.value){
    if(!pending.value && data.value){
      const selectData=data.value.map(item=>{
        return {
          value:item.title,
          id:item.id,
          selected: props.provinceId?  item.id===props.provinceId : null,
          customProperties:{
            id:item.id,
          }
        }
      });
      props.provinceId || emit('fire',selectData[0].id);

      choice && choice.destroy();
      choice=$choice(provinceEl.value,{
        choices:selectData,
        allowHTML:true,
        searchChoices:false,
        searchEnabled:false
      });

    }else{
      const selectData=[
        {
          value:'fetching data...',
          label:`<p class="animate-pulse">fetching data...</p>`,
          id:0,
          selected:true,
          disabled: true
        }
      ]
      choice=$choice(provinceEl.value,{
        choices:selectData,
        allowHTML:true,
        searchChoices:false,
        searchEnabled:false
      });
    }
  }


})
const choiceHandler = (ev:any) => {
  emit('fire',ev.detail.choice.customProperties.id)
}
</script>

<template>
  <label class="label" for="selectEl-province">Province</label>
  <select @choice="choiceHandler"  class="w-full"  ref="provinceEl" name="selectEl-province" id="selectEl-province"></select>
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


}

</style>