<script setup lang="ts">
import {pieChartChartSetup, reviewChartSetup, saleChartSetup, visitorChartSetup} from "~/utils/data";


definePageMeta({
  name:'DASHBOARD',
  page_title:'Dashboard'
})
const {public:{product_page}}=useRuntimeConfig()
const {data:sales_data,pending:sales_data_pending}=await useFetch('/api/chart',{query:{type:'sales'}});
const {data:visitors_data,pending:visitor_data_pending}=await useFetch('/api/chart',{query:{type:'visitors'}})
/////////////////////////////////////////
const {data:total_data,pending:total_data_pending}=await useFetch('/api/statistic',{query:{type:'total'}});
const {data:orders_data,pending:orders_data_pending}=await useFetch('/api/statistic',{query:{type:'orders'}});
const {data:transactions_data,pending:transactions_data_pending}=await useFetch('/api/statistic',{query:{type:'transactions'}});
const {data:popular_data,pending:popular_data_pending}=await useFetch('/api/statistic',{query:{type:'popular'}});


const salesChart=shallowRef<HTMLElement|null>(null)
const visitorChart=shallowRef<HTMLElement|null>(null)
const transactionChart=shallowRef<HTMLElement|null>(null)
const orderChart=shallowRef<HTMLElement|null>(null)

onMounted(()=>{
  saleChartSetup(salesChart,sales_data)
  visitorChartSetup(visitorChart,visitors_data)
  pieChartChartSetup(transactionChart,transactions_data)
  pieChartChartSetup(orderChart,orders_data)
})
</script>

<template>
  <v-row class="mb-2" :no-p="true">
    <v-column v-if="!sales_data_pending"  col="12">
      <div  class="card ">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">Sales</h5>
        </div>

        <div  class="h-[400px]" ref="salesChart"></div>
      </div>
    </v-column>
  </v-row>
  <v-row class="mb-2" :no-p="true">
    <v-column v-if="!visitor_data_pending"  col="12">
      <div  class="card">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">visitors</h5>
        </div>

        <div  class="h-[400px]" ref="visitorChart"></div>
      </div>
    </v-column>
  </v-row>
  <v-row class="mb-2">
    <v-column v-if="!transactions_data_pending" col="6" class="!pl-0">
      <div  class="card">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">transactions : {{total_data.transactions}}</h5>
        </div>
        <div  class="h-[200px]" ref="transactionChart"></div>
      </div>
    </v-column>
    <v-column v-if="!orders_data_pending" col="6" class="!pr-0">
      <div  class="card">
        <div class="mb-1.5 ml-1.3">
          <h5 class="uppercase font-600">orders : {{total_data.orders}}</h5>
        </div>
        <div  class="h-[200px]" ref="orderChart"></div>
      </div>
    </v-column>
  </v-row>
  <v-row class="mb-2" v-if="!total_data_pending" :no-p="true" col-gap="1rem">
    <v-column col="3" >
      <div class="card">
        <div class="flex justify-between items-center mb-0.5">
          <div>
            <h6>Products</h6>
            <p class="text-1.7 text-green-600">
              {{total_data.products}}
            </p>
          </div>
          <span class="flex w-3 h-3 justify-center items-center rounded-full bg-green-200">
          <Icon name="ri:shopping-cart-2-line" class="text-green-600" size="2rem"/>
       </span>
        </div>

        <p class="text-0.8">
          May 23 - June 01 (2018)
        </p>
      </div>
    </v-column>
    <v-column col="4">
      <div class="card ">
        <div class="flex justify-between items-center mb-0.5">
          <div>
            <h6>Product comments</h6>
            <p class="text-1.7 text-green-600">
              {{total_data.product_comments}}
            </p>
          </div>
          <span class="flex w-3 h-3 justify-center items-center rounded-full bg-green-200">
          <Icon name="ri:shopping-cart-2-line" class="text-green-600" size="2rem"/>
       </span>
        </div>

        <p class="text-0.8">
          May 23 - June 01 (2018)
        </p>
      </div>
    </v-column>
    <v-column col="3" >
      <div class="card ">
        <div class="flex justify-between items-center mb-0.5">
          <div>
            <h6>Users</h6>
            <p class="text-1.7 text-blue-600">
              {{total_data.users}}
            </p>
          </div>
          <span class="flex w-3 h-3 justify-center items-center rounded-full bg-blue-200">
          <Icon name="ri:account-pin-circle-fill" class="text-blue-600" size="2rem"/>
       </span>
        </div>

        <p class="text-0.8">
          May 23 - June 01 (2018)
        </p>
      </div>
    </v-column>
  </v-row>
  <v-row class="mb-2" v-if="!total_data_pending" :no-p="true" col-gap="1rem">
    <v-column col="3" >
      <div class="card">
        <div class="flex justify-between items-center mb-0.5">
          <div>
            <h6>Blogs</h6>
            <p class="text-1.7 text-red-600">
              {{total_data.blogs}}
            </p>
          </div>
          <span class="flex w-3 h-3 justify-center items-center rounded-full bg-red-200">
          <Icon name="ri:book-open-line" class="text-red-600" size="2rem"/>
       </span>
        </div>

        <p class="text-0.8">
          May 23 - June 01 (2018)
        </p>
      </div>
    </v-column>
    <v-column col="4" >
      <div class="card ">
        <div class="flex justify-between items-center mb-0.5">
          <div>
            <h6>Blog comments</h6>
            <p class="text-1.7 text-red-600">
              {{total_data.blog_comments}}
            </p>
          </div>
          <span class="flex w-3 h-3 justify-center items-center rounded-full bg-red-200">
          <Icon name="ri:book-open-line" class="text-red-600" size="2rem"/>
       </span>
        </div>

        <p class="text-0.8">
          May 23 - June 01 (2018)
        </p>
      </div>
    </v-column>
  </v-row>
  <v-row class="mb-2" :no-p="true" v-if="!popular_data_pending">
    <v-column col="12">
      <div  class="card !px-0 !pb-0">
        <div class="mb-1.5 ml-1">
          <h5 class=" font-600">Popular products</h5>
        </div>
        <VTable :head="['product','link','price','status']">
          <tr class="tr-hover " v-for="product in popular_data">
            <td>
              <div class="flex gap-1.5 items-center">
                <nuxt-img width="70" :src="product.primary_image"/>
                <p>
                  {{product.caption}}
                </p>
              </div>
            </td>
            <td>
              <a target="_blank" class="text-0.8 text-blue-600 hover:underline" :href="product_page+product.link">
                {{product.link}}
              </a>
            </td>
            <td>
              <div class="flex gap-0.5" v-if="product.off">
                <div >
                  <div class="flex items-center">
                    <p class="text-1.1 line-through">{{product.price}}</p><p>$</p>
                  </div>
                  <p class="text-red-600 text-1">-{{product.off_percent}}%</p>
                </div>
                <div  class="flex items-center">
                  <p class="text-1.3 ">{{$calculate_off_price(product.price,product.off_percent)}}</p><p class="text-1.2 ">$</p>
                </div>
              </div>
              <div v-else class="flex items-center">
                <p class="text-1.2">{{product.price}}</p><p>$</p>
              </div>
            </td>
            <td>
              <p class="text-green-600" v-if="product.status">
                Available
              </p>
              <p class="text-red-600" v-else>
                Unavailable
              </p>
            </td>
          </tr>

        </VTable>
      </div>
    </v-column>
  </v-row>



</template>

<style scoped>

</style>