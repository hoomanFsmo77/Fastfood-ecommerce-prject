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

const {showOrderProduct,orderData,modalOpenFlag}=useOrder()
</script>

<template>
  <v-row v-if="!pending">
    <v-column col="12">
      <VTable :head="['Order Num.','User','Status','Payment Status','Pay Amount','Create at','Products']">
        <tr class="tr-hover " v-if="data.orders.length>0" v-for="order in data.orders">
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
            <button @click="showOrderProduct(order.id)" class="btn btn-primary btn-sm">
              Show
            </button>
          </td>
        </tr>
        <tr v-else class="">
          <td colspan="5">
            <p class="text-center">
              No Data.
            </p>
          </td>
        </tr>
      </VTable>

      <VPagination
          v-if="data.orders.length>0"
          :total="data.meta.total"
          :current_page="data.meta.current_page"
          :next-page="data.meta.nextPage"
          :prev-page="data.meta.prevPage"
      />

    </v-column>
  </v-row>
  <VLoader :flag="pending" />

  <teleport v-if="modalOpenFlag && !orderData.flag" to=".modal-body">
    <h5 class="font-500 mb-1.5">
      Products for order number {{orderData.products[0].orderID}}
    </h5>
    <VTable  :head="['product','price','quantity','subtotal']">
      <VCartRow
          v-for="row in orderData.products"
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

  </teleport>
</template>

<style scoped>

</style>