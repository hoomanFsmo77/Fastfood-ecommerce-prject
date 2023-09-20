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
  <v-row class="my-2 justify-center">
    <v-column col="12" >
      <div class="rounded-4 flex justify-center">
        <NuxtLink :to="calculateRootPath(prevPage)" class="pagination-btn rounded-l-8 border-r-[1px] border-primary-dark-1">
          <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
        </NuxtLink>
        <template v-for="(item,index) in total">

          <NuxtLink :to="calculateRootPath(index+1)" class="pagination-btn  border-r-[1px] border-primary-dark-1" :class="{'active':current_page===index+1}" >
            {{index+1}}
          </NuxtLink>
        </template>
        <NuxtLink :to="calculateRootPath(nextPage)" class="pagination-btn rounded-r-8" >
          <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
        </NuxtLink>
      </div>
    </v-column>
  </v-row>
</template>

<style scoped>

</style>