<template>
  <template v-if="!pending && data.transactions && data.transactions.length>0">
    <VTable  class="[&_th_p]:!text-center" :head="['transaction id','Pay amount','Status','issue tracking','date']">
      <tr class="[&_p]:!font-400 tr-hover [&_p]:!text-center" v-for="item in data.transactions">
        <td>
          <p >{{item.id}}</p>
        </td>
        <td>
          <p >${{Number(item.amount).toFixed(2)}}</p>
        </td>
        <td>
          <p :class="{'text-green-500':item.status==='1','text-red-500':item.status==='0'}">{{item.status==='1' ?  'success': 'failed'}}</p>
        </td>
        <td>
          <p>
            {{item.issueTracking}}
          </p>
        </td>
        <td>
          <p >{{item.date}}</p>
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
  <div v-else class="border-[1px] mb-1.5 p-1.5 rounded-4">
    <p class="text-center">No Transaction founded!</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_TRANSACTIONS',
  path:'/profile/transactions',
  layout:'profile',
  middleware:'auth',
  page_title:'Transactions',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Transactions',
      link:{name:'PROFILE_TRANSACTIONS'},
      on:true
    }
  ]
});


const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/profile/transaction',{query:{method:'GET',per:6,page:pageQuery}});
</script>

<style scoped>

</style>