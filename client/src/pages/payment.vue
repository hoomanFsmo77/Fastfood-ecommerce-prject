<template>
  <section class="py-5 bg-[#fff]">
    <v-container>
      <v-row class="justify-center">
        <v-column col="10" md="4">
          <div class="p-1.5 border-[1px] w-full rounded-4 shadow-md ">
            <span :class="data.status==='1' ? 'bg-green-600' : 'bg-red-600'" class="w-2.5 h-2.5 flex justify-center items-center mx-auto rounded-full ">
              <Icon :name=" data.status==='1' ? 'ri:check-fill' :'bi:x' " size="2rem" class="text-primary-light-1" />
            </span>
            <p :class="data.status==='1' ? 'text-green-600' : 'text-red-600'" class="text-center my-1 h5">
              {{data.status==='1' ? 'your payment was successful!':'your payment was unsuccessful!'}}
            </p>
            <p class="text-center">
              Tracking Number:
              {{data.issueTracking}}
            </p>
            <div class="flex justify-between mt-1">
              <NuxtLink :to="{name:'HOME'}" class="btn btn-primary-2 btn-sm">
                back home
              </NuxtLink>
              <NuxtLink :to="{name:'PROFILE_ORDERS'}" class="btn btn-fav btn-sm">
                see order
              </NuxtLink>
            </div>
          </div>
        </v-column>
      </v-row>
    </v-container>

  </section>




</template>

<script lang="ts" setup>
definePageMeta({
  name:'PAYMENT_VERIFY',
  path:'/payment/verify',
  layout:'pages',
  page_title:'Payment verify',
  middleware:'payment',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Payment',
      link:{name:'PAYMENT_VERIFY'},
      on:true
    }
  ]
});
const {cartStore}=useCartStore();
const route=useRoute()
onMounted(async ()=>await cartStore.fetchUserCartData());

const {data,pending}=await useFetch('/api/profile/transaction',{
  query:{
    method:'POST',
    tracking_number:route.query.tracking_number || ''
  }
})

</script>

<style scoped>

</style>