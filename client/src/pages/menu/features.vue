<template>
  <section class="my-6">
      <v-container>
        <v-row class="items-start">
          <v-column col="9" class="!block">
            <template v-if="!menu_products_pending && menu_products.products.length>0">
              <div  class="grid  grid-cols-[repeat(3,1fr)] gap-1.5 pr-1">
                <VProductCard
                    v-for="tab_item in menu_products.products"
                    :primary_image="tab_item.primary_image"
                    :title="tab_item.title"
                    :caption="tab_item.caption"
                    :price="tab_item.price"
                    :link="tab_item.link"
                    :status="tab_item.status"
                    :off="tab_item.off"
                    :off_percent="tab_item.off_percent"
                />
              </div>
              <VPagination
                  class="justify-center"
                  :current_page="menu_products.meta.current_page"
                  :prev-page="menu_products.meta.prevPage"
                  :next-page="menu_products.meta.nextPage"
                  :total="menu_products.meta.total"
              />
            </template>
            <template v-else-if="!menu_products_pending && menu_products.products.length===0">
                <h4 class="text-center font-600 mb-3">No result found!</h4>
            </template>
            <div v-else class="w-full h-[300px] items-center flex justify-center">
              <client-only>
                 <half-circle-spinner
                    :animation-duration="1000"
                    :size="150"
                    color="#a41a13"
                />
              </client-only>
            </div>

          </v-column>
          <v-column col="3" class="sticky top-[120px]">
            <aside class="p-2 bg-[#fff] ">
              <VInput
                  input-class="placeholder:!text-0.9"
                  @icon-fire="initialSearch"
                  icon="ri:search-2-line"
                  type="float"
                  id="search-input"
                  placeholder="enter search keywords"
              />
              <hr class="my-2"/>
              <h4 class="mb-1 font-600">Categories <span class="underline-active px-2 ml-1 before:h-[1px]"></span></h4>
              <ul v-if="!product_category_pending">
                <li
                    @click="selectCategory(cat.name)"
                    class=" py-0.5 border-b-[1px] text-gray-600 transition-all hover:text-secondary-light-2 cursor-pointer"
                    v-for="cat in product_categories"
                    :class="{'text-secondary-light-2':cat.name===menuData.category}"
                >
                  <Icon name="teenyicons:double-caret-right-small-outline"/>
                  {{cat.name}}
                </li>
              </ul>
              <h4 class="my-1.5 font-600">Sort by <span class="underline-active px-2 ml-1 before:h-[1px]"></span>
              </h4>

              <VRadio  name="sort_by"
                       @fire="selectSortBy"
                       :options="sortByOption"
                       v-model="menuData.sortBy"
              />


            </aside>
          </v-column>
        </v-row>
      </v-container>
  </section>
</template>

<script setup lang="ts">
import {sortByOption} from "~/utils/data";
import {HalfCircleSpinner} from "epic-spinners";

definePageMeta({
  name:'FEATURE_MENU',
  path:'/menu/features',
  layout:'pages',
  page_title:'Feature menu',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Menu',
      link:{name:'FEATURE_MENU'},
      on:true
    }
  ]
});

const {menuData,initialSearch,selectCategory,selectSortBy}=useMenu()
const route=useRoute()



watchEffect(()=>{
  menuData.page=route.query.page ? Number(route.query.page) :1;
})

const {data:product_categories,pending:product_category_pending}=await useFetch('/api/products/category');

const {data:menu_products,pending:menu_products_pending}=await useFetch('/api/products/menu',{query:menuData})

</script>

<style scoped>

</style>