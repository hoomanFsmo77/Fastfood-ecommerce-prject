<script setup lang="ts">
import {useUser} from "~/composables/useUser";
import {submitForm} from "~/utils/functions";

definePageMeta({
  name:'USERS_CREATE',
  page_title:'Create user'
})
const {createUser,editUserData,imageData,profileImageChange}=useUser(false)
const form=ref<HTMLElement|null>(null)
const createUserForm = () => submitForm(form)
</script>

<template>
  <v-row v-if="editUserData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in editUserData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <v-row class="mb-1" >
    <FormKit   id="form" type="form" ref="form"  @submit="createUser"  :actions="false" >
      <v-row >
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="firstname"
              id="firstname"
              name="firstname"
              validation="required"
              validation-label="firstname"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="lastname"
              id="lastname"
              name="lastname"
              validation="required"
              validation-label="lastname"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="username"
              id="username"
              name="username"
              validation="required"
              validation-label="username"
          />
        </v-column>
      </v-row>
      <v-row class="md:my-2">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="email"
              id="email"
              name="email"
              validation="required|email"
              validation-label="email"
          />
        </v-column>
        <v-column md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="phone"
              id="phone"
              name="phone"
              validation="required"
              validation-label="phone"
          />
        </v-column>
        <v-column md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_password"
              label="password"
              id="password"
              name="password"
              validation="required"
              validation-label="phone"
              suffix-icon="eyeClosed"
              @suffix-icon-click="$handleIconClick"
          />
        </v-column>

      </v-row>
      <v-row class="mb-1">
        <v-column md="5" col="12" class="!block">
          <div v-show="imageData.show">
            <p class="label">profile image</p>
            <div class="relative" >
              <nuxt-img width="100" v-if="imageData.src" :src="imageData.src"/>
              <Icon @click="imageData.show=false" size="1.3rem" name="bi:x" class="text-gray-500 font-600 transition-all cursor-pointer absolute inset-0 "  />
            </div>
          </div>
          <FormKit
              v-show="!imageData.show"
              @input="profileImageChange($event)"
              outer-class="w-full"
              type="file"
              id="profile_image"
              name="profile_image"
              input-class="focus-visible:!border-[1px] focus-visible:!border-red-600"
              label="Please choose a profile picture..."
              accept=".jpg,.png,.jpeg,.webp"
              label-class="label !font-600 font-poppins"
          />

        </v-column>
      </v-row>

    </FormKit>
  </v-row>




  <v-row>
    <v-column col="12" class="flex">
      <VBtnLoader :flag="editUserData.flag"    @click="createUserForm" class="btn btn-primary btn-sm ">
        create
      </VBtnLoader>
    </v-column>
  </v-row>
</template>

<style scoped>

</style>