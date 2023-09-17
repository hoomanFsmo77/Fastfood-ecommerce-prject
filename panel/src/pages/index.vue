<script setup lang="ts">
import {reviewChartSetup, saleChartSetup, visitorChartSetup} from "~/utils/data";


definePageMeta({
  name:'DASHBOARD',
  page_title:'Dashboard'
})
const {data:sales_data,pending:sales_data_pending}=await useFetch('/api/chart',{query:{type:'sales'}});
const {data:visitors_data,pending:visitor_data_pending}=await useFetch('/api/chart',{query:{type:'visitors'}})
/////////////////////////////////////////
const {data:total_data,pending:total_data_pending}=await useFetch('/api/statistic',{query:{type:'total'}});
const {data:orders_data,pending:orders_data_pending}=await useFetch('/api/statistic',{query:{type:'orders'}});
const {data:transactions_data,pending:transactions_data_pending}=await useFetch('/api/statistic',{query:{type:'transactions'}});


const salesChart=shallowRef<HTMLElement|null>(null)
const visitorChart=shallowRef<HTMLElement|null>(null)
const summaryChart=shallowRef<HTMLElement|null>(null)

onMounted(()=>{
  saleChartSetup(salesChart,sales_data)
  visitorChartSetup(visitorChart,visitors_data)
  reviewChartSetup(summaryChart,total_data)
})
</script>

<template>
  <v-row :no-p="true">
    <v-column v-if="!sales_data_pending" class="mb-2" col="12">
      <div  class="card ">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">Sales</h5>
        </div>

        <div  class="h-[400px]" ref="salesChart"></div>
      </div>
    </v-column>
    <v-column v-if="!visitor_data_pending" class="mb-2" col="12">
      <div  class="card">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">visitors</h5>
        </div>

        <div  class="h-[400px]" ref="visitorChart"></div>
      </div>
    </v-column>
    <v-column v-if="!total_data_pending" col="6" class="mb-2">
      <div  class="card">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">summary</h5>
        </div>
        <div  class="h-[200px]" ref="summaryChart"></div>
      </div>

    </v-column>
  </v-row>






</template>

<style scoped>

</style>