<script setup lang="ts">
definePageMeta({
  name:'COUPONS',
  page_title:'Coupons'
})

const {data,pending}=await useFetch('/api/coupons',{
  method:'POST',
  query:{
    method:'GET',
  }
})

</script>

<template>
  <v-row v-if="!pending">
    <v-column col="12">
      <VTable :head="['Code','Percent','Expire at','']">
        <template v-if="data.length>0" v-for="coupon in data">
          <tr v-if="coupon.percent!==0" class="tr-hover " >
            <td>
              <p>
                {{coupon.code}}
              </p>
            </td>
            <td>
              <p>
                {{coupon.percent}}
              </p>
            </td>
            <td>
              <p>
                {{new Date(coupon.expired_at)}}
              </p>
            </td>
            <td>
              <NuxtLink :to="{name:'COUPONS_DETAIL',params:{id:coupon.id}}" class="btn btn-primary btn-sm">
                Show
              </NuxtLink>
            </td>
          </tr>
        </template>

        <tr v-else class="">
          <td colspan="5">
            <p class="text-center">
              No Data.
            </p>
          </td>
        </tr>
      </VTable>

    </v-column>
  </v-row>
  <VLoader :flag="pending" />
</template>

<style scoped>

</style>