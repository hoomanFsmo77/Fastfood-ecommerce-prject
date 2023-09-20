<script setup lang="ts">
import {usePagination} from "~/composables/usePagination";

definePageMeta({
  name:'USERS',
  page_title:'Users'
})
const {pageQuery}=usePagination()
const {data,pending}=await useFetch('/api/users',{
  method:'POST',
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
      <VTable :head="['Full Name','Email','Phone','Registered at','']">
        <tr class="tr-hover " v-for="user in data.users">
          <td>
            <div class="flex items-center gap-1">
              <nuxt-img width="40" height="40" class="rounded-full h-[40px] object-cover w-[40px]" :src="user.profile_image" />
              <h6>
                {{user.firstname}} {{user.lastname}}
              </h6>
            </div>
          </td>
          <td>
            <p>
              {{user.email}}
            </p>
          </td>
          <td>
            <p>
              {{user.phone}}
            </p>
          </td>
          <td>
            <p>
              {{user.registered_at}}
            </p>
          </td>
          <td>

            <NuxtLink :to="{name:'USERS_DETAIL',params:{id:user.id}}" class="btn btn-primary btn-sm">
              Show
            </NuxtLink>
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