<script setup lang="ts">
const props=defineProps<{
  cityId?:number,
  provinceId?:number
}>();
const emit=defineEmits<{
  (e:'fire',value:any):void
}>()
const {$choice}:any=useNuxtApp();
const cityEl=shallowRef<HTMLElement|null>(null);
const provinceID=ref<number|undefined>(props.provinceId || undefined)
let choice:any=null;
const {data,pending}=await useFetch('/api/loc',{
  query: {
    which:'city',
    provinceID: provinceID
  }
})

watch(
    ()=>props.provinceId,
    ()=>{
      provinceID.value=props.provinceId
    },{
      immediate:true
    }
)


watchEffect(()=>{

  if(cityEl.value){
    choice && choice.destroy();
    if(!pending.value && data.value){
      // console.log(data.value)
      const selectData=data.value.map(item=>{
        return {
          value:item.city,
          id:item.id,
          selected:props.cityId ? props.cityId ===item.id : data.value[0].id,
          customProperties:{
            id:item.id
          }
        }
      })
      props.cityId || emit('fire',data.value[0].id);
      choice=$choice(cityEl.value,{
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
      choice=$choice(cityEl.value,{
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
  <label class="label" for="selectEl-city">City</label>
  <select @choice="choiceHandler" class="w-full" ref="cityEl" name="selectEl-city" id="selectEl-city"></select>
</template>

<style >

</style>