<template>

  <NuxtLayout name="free">
    <template #header>
      <section id="contact-header">
        <v-container>
          <v-row>
            <v-column col="12">
              <h1 class="font-700 text-[#fff] text-4">
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
            <v-column col="8">
              <div class="contact-form">
                <div class="mb-2">
                  <h3 class="text-primary-dark-3 font-600 mb-1">We Love To Hear From You</h3>
                  <p class="text-gray-600 text-1 leading-1.8 font-400">
                    If it’s not too much trouble informed us regarding whether you have an inquiry, need to leave a remark, or might want additional data about Wengdo.
                  </p>
                </div>
                <form class="w-full" @submit.prevent="submitContact">
                  <v-row class="mb-1.5">
                    <v-column col="12">
                      <VInput  type="text" v-model="contactData.email"  label="email" :require="true" id="email"/>
                    </v-column>
                  </v-row>
                  <v-row class="mb-1.5">
                    <v-column col="12" >
                      <VInput type="text" v-model="contactData.subject"  label="subject" :require="true" id="subject"/>
                    </v-column>
                  </v-row>
                  <v-row class="mb-1">
                    <v-column col="12" >
                      <VInput type="area" v-model="contactData.message" label="message" :require="true" id="comments"/>
                    </v-column>
                  </v-row>
                </form>
              </div>
            </v-column>
            <v-column col="4">

            </v-column>
          </v-row>

        </v-container>
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
const contactData=reactive({
  email:'' as string,
  subject:'' as string,
  message:'' as string,
  btnFlag:false as boolean,
  error:null as null|string,
  init(){
    this.error=null
    this.btnFlag=true
  },
  reset(){
    this.btnFlag=false
    this.body=''
  }
})
const submitContact = () => {

}
</script>

<style scoped>

</style>