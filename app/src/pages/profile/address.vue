<template>

  <v-row class="mb-1.5">
    <v-column col="12" class="!block">
      <button @click="newAddressFlag=!newAddressFlag" class="btn btn-fav btn-sm mb-1">
        create new address
      </button>
      <div  v-collapse="newAddressFlag" class="border-[1px] v-collapse rounded-4 shadow-md hover:shadow-xl transition-all" >
        <ProfileAddress @create="newAddressFlag=false" type="create"/>
      </div>
    </v-column>
  </v-row>


  <div v-if="data.length>0" class="border-[1px] mb-1.5 p-1.5 rounded-4 shadow-md hover:shadow-xl transition-all" v-for="item in data">
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
  <div v-else class="border-[1px] mb-1.5 p-1.5 rounded-4">
    <p class="text-center">No Address founded!</p>
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

const newAddressFlag=ref<boolean>(false)

const {data,pending}=await useFetch('/api/profile/address',{
  method:'POST',query:{method:'GET'},key:'address_list'
})


</script>

<style >
@tailwind components;
@layer components {
  .v-collapse:not(.show) {
    @apply hidden;
  }

  .collapsing {
    @apply h-0 overflow-hidden transition-all duration-300 ease-in-out
  }

}
</style>