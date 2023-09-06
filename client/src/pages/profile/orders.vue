<template>


  <template v-if="!pending && data.orders && data.orders.length>0">
    <VTable :flag="productList.flag" class="[&_th_p]:!text-center" :head="['Order id','Address','Status','Payment status','Pay amount','date','']">
      <tr class="[&_p]:!font-400 [&_p]:!text-center" v-for="item in data.orders">
        <td>
          <p >{{item.id}}</p>
        </td>
        <td>
          <p >{{item.addressTitle}}</p>
        </td>
        <td>
          <p >{{item.status}}</p>
        </td>
        <td>
          <p :class="{'text-green-500':item.payment_status==='success','text-red-500':item.payment_status==='failed','text-yellow-500':item.payment_status==='unpaid'}">{{item.payment_status}}</p>
        </td>
        <td>
          <p >${{Number(item.payment_amount).toFixed(2)}}</p>
        </td>
        <td>
          <p >{{item.created_at}}</p>
        </td>
        <td>
          <button @click="showProducts(item.id)" class="btn btn-primary-2  btn-sm">
            products
          </button>
        </td>
      </tr>

    </VTable>

    <VPagination
        :current_page="data.meta.current_page"
        :prev-page="data.meta.prevPage"
        :next-page="data.meta.nextPage"
        :total="data.meta.total"
    />
  </template>



  <teleport v-if="modalOpenFlag && !productList.flag" to=".modal-body">
    <h5 class="font-500 mb-1.5">
      Products for order number {{productList.data[0].orderID}}
    </h5>
    <VTable  :head="['product','price','quantity','subtotal']">
      <CartRow
          v-for="row in productList.data"
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

<script setup lang="ts">

definePageMeta({
  name:'PROFILE_ORDERS',
  path:'/profile/orders',
  layout:'profile',
  middleware:'auth',
  page_title:'Orders',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Orders',
      link:{name:'PROFILE_ORDERS'},
      on:true
    }
  ]
});
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/profile/order',{query:{method:'GET',per:6,page:pageQuery}});

const {showProducts,productList,modalOpenFlag}=useOrder()

</script>

<style scoped>

</style>