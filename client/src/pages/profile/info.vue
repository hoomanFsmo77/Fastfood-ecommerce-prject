<template>
  <v-row v-if="confirmationData.errors" class="mb-1">
    <v-column class="justify-center" col="12">
      <ul class="bg-secondary-light-2/80 p-1 rounded-4" >
        <li class="text-[#fff] capitalize" v-for="(item,index) in confirmationData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <v-row v-if="isLogin && userInformation">
    <FormKit   id="infoForm" type="form" ref="infoForm"  @submit="confirmEditData"  :actions="false" >
      <v-row >
        <v-column  col="4" class="pr-0.5">
          <FormKit
              type="custom_text"
              label="firstname"
              :value="userInformation.firstname"
              :disabled="editFlag"
              id="info_firstname"
              name="info_firstname"
              validation="required"
              validation-label="firstname"
          />
        </v-column>
        <v-column col="4" class="px-0.5">
          <FormKit
              type="custom_text"
              label="lastname"
              :disabled="editFlag"
              :value="userInformation.lastname"
              id="info_lastname"
              name="info_lastname"
              validation="required"
              validation-label="lastname"
          />
        </v-column>
        <v-column  col="4" class="pl-0.5">
          <FormKit
              type="custom_text"
              label="username"
              id="info_username"
              :disabled="editFlag"
              :value="userInformation.username"
              name="info_username"
              validation="required"
              validation-label="username"
          />
        </v-column>
      </v-row>
      <v-row class="my-2">
        <v-column  col="4" class="pr-0.5">
          <FormKit
              type="custom_text"
              label="email"
              :disabled="editFlag"
              :value="userInformation.email"
              id="info_email"
              name="info_email"
              validation="required|email"
              validation-label="email"
          />
        </v-column>
        <v-column col="4" class="pl-0.5">
          <FormKit
              type="custom_text"
              label="phone"
              :disabled="editFlag"
              :value="userInformation.phone"
              id="info_phone"
              name="info_phone"
              validation="required"
              validation-label="phone"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1">
        <v-column col="5" class="!block">
          <div v-show="imageData.show">
            <p class="label">profile image</p>
            <div class="relative" >
              <nuxt-img width="100" :src="imageData.src"/>
              <Icon @click="imageData.show=false" v-if="!editFlag" size="1.3rem" name="bi:x" class="text-gray-500 font-600 transition-all cursor-pointer absolute inset-0 "  />
            </div>
          </div>
          <FormKit
              v-show="!imageData.show"
              @input="profileImageChange($event)"
              outer-class="w-full"
              type="file"
              id="info_profile"
              name="info_profile"
              input-class="focus-visible:!border-[1px] focus-visible:!border-red-600"
              label="Please choose a profile picture..."
              accept=".jpg,.png,.jpeg,.webp"
              label-class="label !font-600 font-poppins"
          />

        </v-column>
      </v-row>

    </FormKit>
  </v-row>
  <v-row >
    <v-column col="12" class="!block">
      <button type="button" v-if="editFlag" @click="editFlag=false" class="btn btn-secondary btn-sm">
        edit
      </button>

      <VBtnLoader :flag="confirmationData.btnFlag" type="submit" v-else @click="submitInfoForm" class="btn btn-secondary btn-sm">
        confirm
      </VBtnLoader>
    </v-column>
  </v-row>


</template>

<script setup lang="ts">
definePageMeta({
  name:'PROFILE_INFO',
  path:'/profile/info',
  layout:'profile',
  middleware:'auth',
  page_title:'Profile Information',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Profile Information',
      link:{name:'PROFILE_INFO'},
      on:true
    }
  ]
});
const {editFlag,confirmEditData,confirmationData,imageData,profileImageChange, infoForm,submitInfoForm}=useInfo()

const {userInformation,isLogin}=useStates()



</script>

<style scoped>

</style>