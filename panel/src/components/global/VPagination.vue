<script setup lang="ts">
import {querySerialize} from "~/utils/functions";

const props=defineProps<{
  prevPage:number
  total:number,
  current_page:number,
  nextPage:number,
  queryKey?:string
}>()
const route=useRoute()

const calculateRootPath = (page:number)=>{
  const key=props.queryKey ? props.queryKey : 'page';
  const routeQueryKeys=Object.keys(route.query)
  if(routeQueryKeys.length>0){
    const query=querySerialize({...route.query,[key]:page})
    return `${route.path}?`+query
  }else{
    const query=querySerialize({[key]:page})
    /// no query
    return `${route.path}?`+query
  }

}

</script>

<template>
  <v-row class="mt-2">
    <v-column col="12" class="justify-center">
      <NuxtLink :to="calculateRootPath(prevPage)" class="pagination-btn mx-0.5">
        <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
      </NuxtLink>
      <template v-for="(item,index) in total">

        <NuxtLink :to="calculateRootPath(index+1)" class="pagination-btn mx-0.5" :class="{'active':current_page===index+1}" >
          {{index+1}}
        </NuxtLink>
      </template>
      <NuxtLink :to="calculateRootPath(nextPage)" class="pagination-btn mx-0.5" >
        <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
      </NuxtLink>
    </v-column>
  </v-row>
</template>

<style scoped>

</style>