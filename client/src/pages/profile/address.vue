<template>

<!--  <ProfileAddress type="create"/>-->
  <div class="border-[1px] mb-1.5 p-1.5 rounded-4 shadow-md hover:shadow-xl transition-all" v-for="item in data">
    <ProfileAddress
      :title="item.title"
      :phone="item.phone"
      :postal_code="item.postal_code"
      :province="item.province"
      :city="item.city"
      type="show"
      :province-id="item.provinceID"
      :city-id="item.cityID"
      :address-id="item.id"
      :address="item.address"
    />
  </div>









</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_ADDRESS',
  path:'/profile/address',
  layout:'profile',
  middleware:'auth',
  page_title:'Address',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Address',
      link:{name:'PROFILE_ADDRESS'},
      on:true
    }
  ]
});

const {data,pending}=await useFetch('/api/profile/address/list')


</script>

<style scoped>

</style>