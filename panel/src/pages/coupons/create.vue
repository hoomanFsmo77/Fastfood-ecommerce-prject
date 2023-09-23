<script setup lang="ts">
definePageMeta({
  name:'COUPONS_CREATE',
  page_title:'Create coupon'
})
const {addCoupon,couponData}=useCoupon()

</script>

<template>
  <v-row v-if="couponData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in couponData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="addCoupon" class="btn btn-primary btn-sm">
    create
  </button>
</template>

<style scoped>

</style>