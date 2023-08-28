<script setup lang="ts">

defineProps<{
  prevPage:number
  per:number,
  total:number,
  current_page:number,
  nextPage:number
}>()



</script>

<template>
  <v-row class="mt-2">
    <v-column col="12" class="justify-center">
      <NuxtLink :to="{path:$route.path,query:{page:prevPage,per}}" class="pagination-btn mx-0.5">
        <Icon size="1.5rem" name="ri:arrow-left-s-line"/>
      </NuxtLink>
      <template v-for="(item,index) in total">
        <NuxtLink :to="{path:$route.path,query:{page:index+1,per}}" class="pagination-btn mx-0.5" :class="{'active':current_page===index+1}" >
          {{index+1}}
        </NuxtLink>
      </template>
      <NuxtLink :to="{path:$route.path,query:{page:nextPage,per}}" class="pagination-btn mx-0.5" >
        <Icon size="1.5rem" name="ri:arrow-right-s-line"/>
      </NuxtLink>
    </v-column>
  </v-row>
</template>

<style scoped>

</style>