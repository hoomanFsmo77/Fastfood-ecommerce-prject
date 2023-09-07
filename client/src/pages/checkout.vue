<template>
  <section class="py-5 bg-[#fff]" id="checkout-section" v-if="cartListData.items && cartListData.items.length>0">
    <v-container>
      <v-row class="mb-1">
        <v-column col="12" class="!block">
          <h1 class="font-600 text-primary-dark-3 mb-1.5">Checkout detail</h1>
          <VTable :flag="chooseAddressFlag" :head="['product','price','quantity','subtotal']">
            <CartRow
                v-for="row in cartListData.items"
                :image="row?.primary_image || null"
                :type="row.type"
                :cart-id="row.id"
                :description="row?.description || null"
                :price="row.price"
                :quantity="row.quantity"
                :subtotal="row.subtotal"
                :title="row.title"
                :link="row?.link || null"
                :off="row?.off || null"
                :off_percent="row?.off_percent || null"
                :editable="false"
            />
          </VTable>

        </v-column>
      </v-row>
      <v-row class="items-end">
        <v-column col="3" class="">
          <VSelect :select-id="cartListData.order.addressID || undefined" @fire="chooseAddress" label="Address" id="choose-address" :data="user_address" />
        </v-column>
        <v-column col="4"></v-column>

        <v-column col="3" class=" ">
          <VInput v-model="couponData.code" input-class="input-sm placeholder:!text-[#333] !text-[#333]" id="coupon-code" type="text" placeholder="Coupon Code"/>

        </v-column>
        <v-column col="2" class="justify-end ">
          <VBtnLoader :flag="couponData.btnFlag" @click="submitCoupon" class="btn btn-secondary btn-sm ml-1">
            apply coupon
          </VBtnLoader>
        </v-column>
      </v-row>
      <v-row>
        <v-column col="12" class="justify-end">
          <p v-if="couponData.message" class="mt-0.5 font-400" :class="{'text-red-600':couponData.errorFlag,'text-green-600':!couponData.errorFlag}">
            {{couponData.message}}
          </p>
        </v-column>
      </v-row>
      <v-row class="my-2">
        <v-column col="12" class="!block">
          <h2 class="font-600 text-primary-dark-3 mb-2">Checkout totals</h2>
          <div class="py-1 flex justify-between border-y-2 border-[rgba(0,0,0,0.1)]">
            <p class="font-600 text-1">Subtotal</p>
            <p class="font-400 text-1">
              ${{Number(cartListData.order.total_amount).toFixed(2)}}
            </p>
          </div>
          <div v-if="cartListData.order.coupons_code" class="py-1 flex justify-between border-b-2 border-[rgba(0,0,0,0.1)]">
            <p class="font-600 text-1">Coupon</p>
            <p class="font-400 text-1">
              -{{cartListData.order.coupons_percent}}%
            </p>
          </div>
          <div class="py-1 flex justify-between border-b-2 border-[rgba(0,0,0,0.1)]">
            <p class="font-600 text-1">Total</p>
            <p class="font-400 text-1">
              ${{Number(cartListData.order.payment_amount).toFixed(2)}}
            </p>
          </div>


        </v-column>
      </v-row>
      <v-row class="pb-2 border-b-[1px] border-[rgba(0,0,0,0.1)]">
        <v-column col="12" class="justify-end">
          <VBtnLoader :flag="submitPaymentFlag" @click="submitPayment" class="btn btn-primary btn-light before:!rounded-[0px] !rounded-[0px]  btn-sm">
            Proceed to Payment
          </VBtnLoader>
        </v-column>
      </v-row>

    </v-container>

  </section>
</template>

<script lang="ts" setup>
import {useCheckout} from "~/composables/useCheckout";

definePageMeta({
  name:'CHECKOUT',
  path:'/checkout',
  middleware:'checkout',
  layout:'pages',
  page_title:'Checkout',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Checkout',
      link:{name:'CHECKOUT'},
      on:true
    }
  ]
});

const {cartListData,cartStore,getOrderID}=useCartStore();

const {data:user_address,pending:user_address_pending}=await useFetch('/api/profile/address',{method:'POST',query:{method:'GET',type:'checkout'}});
onMounted(async ()=>await cartStore.fetchUserCartData());

const {submitCoupon,couponData}=useCart(undefined);
const {chooseAddressFlag,chooseAddress,submitPaymentFlag,submitPayment}=useCheckout()
</script>

<style scoped>

</style>