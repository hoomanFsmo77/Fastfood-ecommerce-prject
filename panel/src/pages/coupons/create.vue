<script setup lang="ts">
import {getDateDetail, submitForm} from "~/utils/functions";
import {da} from "@formkit/i18n";

definePageMeta({
  name:'COUPONS_CREATE',
  page_title:'Create coupon'
})
const {addCoupon,couponData}=useCoupon()
const couponForm=ref<HTMLElement|null>(null)
const createCouponForm = () => submitForm(couponForm)
const date=new Date()
</script>

<template>
  <v-row v-if="couponData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in couponData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>


  <v-row  class="mb-1" >
    <FormKit   id="couponForm" type="form" ref="couponForm"  @submit="addCoupon"  :actions="false" >
      <v-row >
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 !pl-0 mb-1">
          <FormKit
              type="custom_text"
              label="code"
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
              :value="getDateDetail(date.toISOString())"
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
      <VBtnLoader :flag="couponData.flag"    @click="createCouponForm" class="btn btn-primary btn-sm ">
        create
      </VBtnLoader>
    </v-column>
  </v-row>




</template>

<style scoped>

</style>