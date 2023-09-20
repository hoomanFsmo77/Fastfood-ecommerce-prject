<script setup lang="ts">
definePageMeta({
  name:'TRANSACTIONS',
  page_title:'Transactions'
})
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/transactions',{
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
      <VTable :head="['Trans. Num.','User','Status','Pay Amount','Tracking Num.','Create at']">
        <tr class="tr-hover " v-for="trans in data.transactions">
          <td>
            <p>{{trans.id}}</p>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <nuxt-img width="40" height="40" class="rounded-full h-[40px] object-cover w-[40px]" :src="trans.user_image" />
              <p :title="trans.order_firstname.concat(' '+trans.order_lastname)" class="">
                {{trans.order_firstname}} {{trans.order_lastname}}
              </p>
            </div>
          </td>
          <td>
            <p :class="{'text-green-600':trans.transaction_status==='success','text-red-600':trans.transaction_status==='failed'}">
              {{trans.transaction_status}}
            </p>
          </td>
          <td>
            <p>
              {{trans.amount}}$
            </p>
          </td>
          <td>
            <p>
              {{trans.issueTracking}}
            </p>
          </td>
          <td>
            <p>
              {{trans.date}}
            </p>
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