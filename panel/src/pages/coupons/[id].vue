<script setup lang="ts">
import {getDateDetail, submitForm} from "~/utils/functions";

definePageMeta({
  name:'COUPONS_DETAIL',
  page_title:'Coupon detail'
})
const route=useRoute()
const {data,pending}=await useFetch('/api/coupons',{
  method:'POST',
  query:{method:'GET',id:route.params.id}
})
const couponForm=ref<HTMLElement|null>(null)
const editCouponForm = () => submitForm(couponForm)

const {editCoupon,editCouponFlag,removeCoupon,couponData}=useCoupon(data)
</script>

<template>
  <v-row v-if="couponData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in couponData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <v-row  class="mb-1" v-if="!pending">
    <FormKit   id="couponForm" type="form" ref="couponForm"  @submit="editCoupon"  :actions="false" >
      <v-row >
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 !pl-0 mb-1">
          <FormKit
              type="custom_text"
              label="code"
              :value="data.code"
              :disabled="!editCouponFlag"
              id="code"
              name="code"
              validation="required"
              validation-label="code"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="percent"
              :disabled="!editCouponFlag"
              :value="data.percent"
              id="percent"
              name="percent"
              validation="required"
              validation-label="percent"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_date"
              label="expired at"
              :disabled="!editCouponFlag"
              :value="getDateDetail(data.expired_at)"
              id="expired_at"
              name="expired_at"
              validation="required"
              validation-label="expired at"
          />
        </v-column>
      </v-row>
    </FormKit>
  </v-row>





  <v-row>
    <v-column col="12" class="flex">
      <button @click="removeCoupon" class="btn btn-primary btn-sm mr-1">
        remove
      </button>
      <VBtnLoader v-if="editCouponFlag" :flag="couponData.flag"    @click="editCouponForm" class="btn btn-primary btn-sm ">
        confirm
      </VBtnLoader>
      <button v-else @click="editCouponFlag=true" class="btn btn-primary btn-sm ">
        edit
      </button>
    </v-column>
  </v-row>

</template>

<style scoped>

</style>