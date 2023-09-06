<script setup lang="ts">
import {useAddress} from "~/composables";
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
const emit=defineEmits<{
  (e:'create'):void
}>()

const {changeCity,changeProvince,addressForm,deleteAddress,confirmAddressForm,submitAddressForm,addressData}=useAddress(props,emit)



</script>

<template>

  <v-row class="p-1.5">
    <FormKit   :id="props.type==='show' ? 'addressForm' : 'addressForm-create'" type="form" ref="addressForm"  @submit="confirmAddressForm"  :actions="false" >
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
    </FormKit>
    <v-row class="w-full" v-if="type==='show'">
      <v-column col="12" class="justify-between items-center">
        <VBtnLoader type="submit" :flag="addressData.editBtnFlag" @click="submitAddressForm" class="btn btn-secondary btn-sm">
          edit
        </VBtnLoader>
        <VBtnLoader @click="deleteAddress" :flag="addressData.deleteBtnFlag" class="btn btn-remove btn-sm">
          delete
        </VBtnLoader>

      </v-column>

    </v-row>
    <v-row v-else>
      <VBtnLoader type="submit" :flag="addressData.createBtnFlag" @click="submitAddressForm" class="btn btn-secondary btn-sm">
        create
      </VBtnLoader>
    </v-row>
  </v-row>


</template>

<style scoped>

</style>