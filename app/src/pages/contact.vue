<template>

  <NuxtLayout name="free">
    <template #header>
      <section id="contact-header">
        <v-container>
          <v-row>
            <v-column col="12">
              <h1 class="font-700 text-[#fff] md:text-4 text-3">
                We are available
                <br>
                in your city with tasty food
              </h1>
            </v-column>
          </v-row>
        </v-container>
      </section>
    </template>
    <template #main>
      <section id="contact-content">
        <v-container>
          <v-row>
            <v-column md="8" col="12">
              <div class="contact-form">
                <div class="mb-2">
                  <h3 class="text-primary-dark-3 font-600 mb-1">We Love To Hear From You</h3>
                  <p class="text-gray-600 text-1 leading-1.8 font-400">
                    If it’s not too much trouble informed us regarding whether you have an inquiry, need to leave a remark, or might want additional data about Wengdo.
                  </p>
                </div>
                <v-row class="my-1">
                  <v-column class="justify-center" col="12">
                    <ul class="bg-secondary-light-2/80 p-1 rounded-4" v-if="contactFormData.errors">
                      <li class="text-[#fff] capitalize" v-for="(item,index) in contactFormData.errors">{{index+1}}) {{item}}</li>
                    </ul>
                  </v-column>
                </v-row>
                <FormKit   id="contactForm" class="w-full" type="form" ref="contactForm"  @submit="submitContact"  :actions="false" >
                  <v-row class="my-1 w-full">
                    <v-column class="justify-center md:mb-0 mb-1" md="6" col="12">
                      <FormKit
                          type="custom_text"
                          label="email*"
                          id="contact_email"
                          name="contact_email"
                          validation="required"
                          validation-label="email"
                      />
                    </v-column>
                    <v-column class="justify-center md:pl-1" md="6" col="12">
                      <FormKit
                          type="custom_text"
                          label="name*"
                          id="contact_name"
                          name="contact_name"
                          validation="required"
                          validation-label="name"
                      />
                    </v-column>
                  </v-row>
                  <v-row class="my-1  ">
                    <v-column class="justify-center" col="12">
                      <FormKit
                          type="custom_text"
                          label="subject*"
                          id="contact_subject"
                          name="contact_subject"
                          validation="required"
                          validation-label="subject"
                      />
                    </v-column>
                  </v-row>
                  <v-row class="my-1  ">
                    <v-column class="justify-center" col="12">
                      <FormKit
                          type="custom_area"
                          label="message*"
                          id="contact_message"
                          name="contact_message"
                          validation="required"
                          validation-label="message"
                      />
                    </v-column>
                  </v-row>
                </FormKit>
                <v-row class="my-1">
                  <v-column col="12" class="items-center">
                    <VBtnLoader
                        @click="submitContactForm"
                        :flag="contactFormData.btnLoader"
                        class="btn btn-secondary btn-sm btn-light "
                        type="submit">
                      send message
                    </VBtnLoader>
                    <p v-if="contactFormData.success" class="text-green-600 ml-1 text-1">
                      Thanks for sharing your thoughts!
                    </p>
                  </v-column>
                </v-row>

              </div>
            </v-column>
            <v-column md="4" col="12" class="mt-4 md:mb-0 mb-2">
              <div class="md:pl-2">
                <h4 class="text-primary-dark-3 font-600 before:bg-primary-dark-3 before:h-[2px] underline-active-left pb-1">
                  Our Office Address
                </h4>
                <div class="md:pl-2 pl-1">
                  <h5 class="text-primary-dark-3 font-600 mt-1.5">Main Restaurant </h5>
                  <p class="font-400 text-gray-600 mt-1">
                    587, Dartmouthi Street, Boston, Massachusetts 0658, PO Box 16122 United States
                  </p>

                  <h5 class="text-primary-dark-3 font-600 mt-1.5">Branch, Raurance Road:  </h5>
                  <p class="font-400 text-gray-600 mt-1">
                    357, West Victoria, Darbaians, Collinsicious 0658, PO Box 16578 London
                  </p>

                  <h5 class="text-primary-dark-3 font-600 mt-1.5">Questions </h5>
                  <p class="font-400 text-gray-600 mt-1">
                    Call us on : (1800) 456 7890
                  </p>
                </div>
              </div>
            </v-column>
          </v-row>
        </v-container>
        <VMap />
      </section>
    </template>
  </NuxtLayout>


</template>

<script setup lang="ts">
definePageMeta({
  name:'CONTACT_US',
  path:'/contact-us',
  layout:false,
  page_title:'Contact us',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Contact us',
      link:{name:'CONTACT_US'},
      on:true
    }
    ]
});

const {submitContact,submitContactForm,contactFormData,contactForm}=useContact()
</script>

<style >
.formkit-wrapper{
  width: 100%;
  max-width:100% !important;
}
</style>