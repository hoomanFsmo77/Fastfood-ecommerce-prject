<script setup lang="ts">
import {services} from "~/utils/data";
import {IResponse} from "~/utils/types";
const subscribeData=reactive({
  email:'' as string,
  message:'' as string|null
})

const subscribeHandler =async () => {
  if(subscribeData.email.length>0){
    subscribeData.message=''
    try {
        const req=await $fetch<IResponse<any>>(`/api/subscribe?email=${subscribeData.email}`);
        if(req.error){
          if(typeof req.errors==='object' && req.errors){
            subscribeData.message=req.errors[0].msg
          }else{
            subscribeData.message=req.errors
          }
        }else{
          subscribeData.message=req.errors as string
          subscribeData.email=''
          reloadNuxtApp()
        }
    }catch (err) {
      console.log(err)
    }
  }
}
</script>

<template>
    <section id="services">
      <v-container>
        <v-row class="justify-center">
          <v-column v-for="item in services" col="3">
            <div class="py-1.5 px-2 flex flex-col justify-center w-full items-center">
              <nuxt-img width="120" :src="item.image"/>
              <h5 class="font-700 text-center my-1">{{item.title}}</h5>
              <p class="text-gray-500 text-center">{{item.desc}}</p>
            </div>
          </v-column>
        </v-row>
        <v-row class="my-3">
          <v-column col="12" class="bg-primary-light-5 p-3">
            <v-row class="w-full items-center">
              <v-column col="6" class="!block">
                <h2 class="text-primary-dark-2 font-800">Subscribe to newsletter</h2>
                <h6 class="italic">Get weekly offer and discounts</h6>
              </v-column>
              <v-column col="6" class="!block">
                <form @submit.prevent="subscribeHandler" class="w-full flex">
                  <input v-model="subscribeData.email" class="input" placeholder="enter your email address"/>
                  <button type="submit" class="btn btn-simple btn-sm !rounded-[0px]">
                    subscribe
                  </button>
                </form>
                <p class="text-1 capitalize text-secondary-light-3 mt-0.5">{{subscribeData.message}}</p>
              </v-column>
            </v-row>
          </v-column>
        </v-row>
      </v-container>

    </section>
</template>

<style scoped>

</style>