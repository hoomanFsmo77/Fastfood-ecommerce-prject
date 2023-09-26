<script setup lang="ts">
import {reset} from "@formkit/core";

const props=defineProps<{
  show_image:boolean,
  profile_image?:string,
  editFlag:boolean,
  label:string,
  width:number,
  id:string,
  imageId:number,
  multiple:boolean
}>()
const emit=defineEmits<{
  (e:'fire',value:any):void
}>()

const imageData=reactive({
  show:props.show_image as boolean,
  singleSrc:props.profile_image ? props.profile_image : 'ff',
  multipleSrc:[] as string[],
})
const profileImageChange = (ev:Event) => {
  const fileReader=new FileReader();
  if(props.multiple){
    if(ev.length>0){
      ev.forEach(image=>{
        imageData.multipleSrc.push(URL.createObjectURL(image.file))
      })
      emit('fire',{
        mode:'POST',
        file:ev.map(item=>item.file)
      })
      imageData.show=true
    }
  }else{
    if(ev[0]){
      fileReader.readAsDataURL(ev[0].file)
      fileReader.onload=(data)=>{
        imageData.singleSrc=data.explicitOriginalTarget.result as string
        imageData.show=true
        emit('fire',{
          mode:'PUT',
          imageId:props.imageId,
          file:ev[0].file
        })
      }
    }
  }
}
const removeImage = () => {
  imageData.show=false
  reset(props.id)
  emit('fire',{
    mode:'DEL',
    imageId:props.imageId
  })
}

const removeMultiple = (index:number) => {
  imageData.multipleSrc.splice(index,1)
  if(imageData.multipleSrc.length===0){
    imageData.show=false
    reset(props.id)
  }
  emit('fire',{
    mode:'M_DEL',
    imageId:index
  })
}

</script>

<template>
  <template v-if="multiple">
    <div v-show="imageData.show">
      <p class="label">{{label}}</p>

      <template v-if="imageData.multipleSrc.length>0">
        <div class="flex flex-wrap gap-1 ">
          <div v-for="(src,index) in imageData.multipleSrc" class="relative " >
            <nuxt-img :width="width" height="100" :src="src"/>
            <Icon @click="removeMultiple(index)" v-if="editFlag" size="1.3rem" name="bi:x" class="text-gray-500 font-600 transition-all cursor-pointer  absolute inset-0 "  />
          </div>
        </div>

      </template>
    </div>
    <div v-show="!imageData.show">
      <p class="label">{{label}}</p>
      <FormKit
          @input="profileImageChange($event)"
          outer-class="w-full"
          type="file"
          :disabled="!editFlag"
          :id="id"
          :multiple="multiple"
          :name="id"
          input-class="focus-visible:!border-[1px] focus-visible:!border-red-600"
          accept=".jpg,.png,.jpeg,.webp"
          label-class="label !font-600 font-poppins"
      />
    </div>
  </template>


  <template v-else>
    <div v-show="imageData.show">
      <p class="label">{{label}}</p>
      <div class="relative" >
        <nuxt-img :width="width" height="100"  :src="imageData.singleSrc"/>
        <Icon @click="removeImage" v-if="editFlag" size="1.3rem" name="bi:x" class="text-gray-500 font-600 transition-all cursor-pointer  absolute inset-0 "  />
      </div>
    </div>
    <div v-show="!imageData.show">
      <p class="label">{{label}}</p>
      <FormKit
          @input="profileImageChange($event)"
          outer-class="w-full"
          type="file"
          :id="id"
          :multiple="multiple"
          :name="id"
          :disabled="!editFlag"
          input-class="focus-visible:!border-[1px] focus-visible:!border-red-600"
          accept=".jpg,.png,.jpeg,.webp"
          label-class="label !font-600 font-poppins"
      />
    </div>
  </template>


</template>

<style scoped>

</style>