<script setup lang="ts">
definePageMeta({
  name:'ORDERS',
  page_title:'Orders'
})
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/orders',{
  query:{
    method:'GET',
    page:pageQuery,
    per:6
  }
})
</script>

<template>
  <v-row v-if="!pending">
    <v-column col="12">
      <VTable :head="['Order Num.','User','Status','Payment Status','Pay Amount','Create at','Products']">
        <tr class="tr-hover " v-for="order in data.orders">
          <td>
            <p>{{order.id}}</p>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <nuxt-img width="40" height="40" class="rounded-full h-[40px] object-cover w-[40px]" :src="order.user_image" />
              <p :title="order.user_firstname.concat(' '+order.user_lastname)" class="">
                {{order.user_firstname}} {{order.user_lastname}}
              </p>
            </div>
          </td>
          <td>
            <p>
              {{order.status}}
            </p>
          </td>
          <td>
            <p :class="{'text-green-600':order.payment_status==='success','text-red-600':order.payment_status==='failed'}">
              {{order.payment_status}}
            </p>
          </td>
          <td>
            <p>
              {{order.payment_amount}}$
            </p>
          </td>
          <td>
            <p>
              {{order.created_at}}
            </p>
          </td>
          <td>
            <button class="btn btn-primary btn-sm">
              Show
            </button>
          </td>
        </tr>
      </VTable>

      <VPagination
          :total="data.meta.total"
          :current_page="data.meta.current_page"
          :next-page="data.meta.nextPage"
          :prev-page="data.meta.prevPage"
      />

    </v-column>
  </v-row>
</template>

<style scoped>

</style>