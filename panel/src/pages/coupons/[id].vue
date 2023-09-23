<script setup lang="ts">
definePageMeta({
  name:'COUPONS_DETAIL',
  page_title:'Coupon detail'
})
const route=useRoute()
const {data,pending}=await useFetch('/api/coupons',{
  method:'POST',
  query:{method:'GET',id:route.params.id}
})
const {editCoupon,editCouponFlag,removeCoupon,couponData}=useCoupon(data)
</script>

<template>
  <p v-if="!pending">
    {{data}}
  </p>

  <v-row v-if="couponData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in couponData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <button @click="removeCoupon" class="btn btn-primary btn-sm">
    remove
  </button>
  <button v-if="editCouponFlag" @click="editCoupon" class="btn btn-primary btn-sm">
    edit
  </button>
  <button v-else @click="editCouponFlag=true" class="btn btn-primary btn-sm">
    edit
  </button>



</template>

<style scoped>

</style>