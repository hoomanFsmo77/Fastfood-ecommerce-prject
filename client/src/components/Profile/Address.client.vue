<script setup lang="ts">
import {submitForm} from "~/utils/functions";

const props=defineProps<{
  title?:string,
  phone?:string,
  postal_code?:number,
  province?:string,
  city?:string,
  provinceId?:number,
  cityId?:number,
  address?:string,
  addressId?:number,
  type:'create' | 'show'
}>();

const {$toast}=useNuxtApp()
const addressForm=ref<HTMLElement|null>(null);
const submitAddressForm=()=>submitForm(addressForm);

const editAddress =async (formData:any) => {
  addressData.editBtnFlag=true
  try {
    const req=await $fetch('/api/profile/address/update',{
      method:'POST',
      body:{
        title:formData.address_title,
        address:formData.address_body,
        provinceID:addressData.provinceID,
        cityID:addressData.cityID,
        postal_code:formData.address_post,
        phone:formData.address_phone,
        addressID:props.addressId
      }
    })
    $toast('success').fire({
      text: 'address updated!',
      icon: 'success',
    })
    await reloadNuxtApp()
  }catch (err) {
    $toast('error').fire({
      text: 'error in connecting to server!',
      icon: 'error',
    })
  }finally {
    addressData.editBtnFlag=false
  }
}


const confirmAddressForm =async (formData:any) => {
  if(props.type==='show'){
    await editAddress(formData)
  }else if(props.type==='create'){

  }
}

const addressData=reactive({
  provinceID:props.provinceId|| undefined as number | undefined,
  cityID:props.cityId || undefined as number | undefined,
  editBtnFlag:false as boolean
})

const changeProvince = (provinceID:number) =>{
  addressData.provinceID=provinceID
  addressData.cityID=undefined
};
const changeCity = (cityID:number) => {
  addressData.cityID=cityID
};

</script>

<template>
  <v-row >
    <FormKit   id="addressForm" type="form" ref="addressForm"  @submit="confirmAddressForm"  :actions="false" >
      <v-row >
        <v-column  col="4" class="pr-0.5">
          <FormKit
              type="custom_text"
              label="title"
              :value="title || ''"
              id="address_title"
              name="address_title"
              validation="required"
              validation-label="title"
          />
        </v-column>
        <v-column col="4" class="px-0.5">
          <FormKit
              type="custom_text"
              label="phone"
              :value="phone || ''"
              id="address_phone"
              name="address_phone"
              validation="required"
              validation-label="phone"
          />
        </v-column>
        <v-column  col="4" class="pl-0.5">
          <FormKit
              type="custom_text"
              label="Postal Code"
              id="address_post"
              :value="postal_code || ''"
              name="address_post"
              validation="required"
              validation-label="Postal Code"
          />
        </v-column>
      </v-row>
      <v-row class="my-2">
        <v-column  col="4" class="pr-0.5 !block">
          <VProvince @fire="changeProvince" :province-id="addressData.provinceID"  />
        </v-column>
        <v-column col="4" class="pl-0.5 !block">
          <VCity @fire="changeCity" :city-id="addressData.cityID" :province-id="addressData.provinceID"/>
        </v-column>
      </v-row>
      <v-row class="mb-1">
        <v-column col="12" class="!block">
          <FormKit
              rows="5"
              type="custom_area"
              label="Address"
              id="address_body"
              :value="address || ''"
              name="address_body"
              validation="required"
              validation-label="Address"
          />
        </v-column>
      </v-row>
      <v-row v-if="type==='show'">
        <v-column col="12" class="justify-between items-center">
          <VBtnLoader :flag="addressData.editBtnFlag" @click="submitAddressForm" class="btn btn-secondary btn-sm">
            edit
          </VBtnLoader>
          <VBtnLoader class="btn btn-remove btn-sm">
            delete
          </VBtnLoader>

        </v-column>

      </v-row>
      <v-row v-else>

      </v-row>

    </FormKit>
  </v-row>


</template>

<style scoped>

</style>