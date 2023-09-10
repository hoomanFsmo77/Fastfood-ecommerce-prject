<template >
  <section id="auth">
    <v-container>
      <v-row class="items-start">
<!--        //// login-->
        <v-column col="12" md="6" class="md:pr-1 md:mb-0 mb-2">
          <div class="w-full relative bg-[#fff] rounded-4 py-2  transition-all shadow-md hover:shadow-lg">
              <div class="flex items-center justify-center">
                <nuxt-img width="80" src="/logo-small.webp"/>
                <h2 class="uppercase tracking-wider text-secondary-light-2 font-700">login</h2>
              </div>
            <v-row class="my-1">
              <v-column class="justify-center" col="12">
                <ul class="bg-secondary-light-2/80 p-1 rounded-4" v-if="loginProcessData.errors">
                  <li class="text-[#fff] capitalize" v-for="(item,index) in loginProcessData.errors">{{index+1}}) {{item}}</li>
                </ul>
              </v-column>
            </v-row>
              <FormKit   id="loginForm" type="form" ref="loginForm"  @submit="loginSubmit"  :actions="false" >
                <v-row class="my-1 justify-center">
                  <v-column class="justify-center" col="10" md="8">
                    <FormKit
                        type="custom_text"
                        label="email, phone or username*"
                        id="login_identity"
                        name="login_identity"
                        validation="required"
                        validation-label="email, phone or username"
                    />
                  </v-column>
                </v-row>
                <v-row class="my-1 justify-center ">
                  <v-column class="justify-center" col="10" md="8">
                    <FormKit
                        type="custom_password"
                        label="password*"
                        id="login_password"
                        name="login_password"
                        validation="required"
                        validation-label="password"
                        suffix-icon="eyeClosed"
                        @suffix-icon-click="$handleIconClick"
                    />
                  </v-column>
                </v-row>
              </FormKit>
              <v-row >
                <v-column  class="justify-center" col="12">
                  <VBtnLoader :flag="loginProcessData.buttonLoaderFlag" class="btn btn-secondary btn-sm btn-light mt-1" @click="submitLoginForm" type="submit">
                    login
                  </VBtnLoader>
                </v-column>
              </v-row>

          </div>

        </v-column>
<!--        //// sign up-->
        <v-column col="12" md="6" class="md:pl-1">

          <div class="w-full   bg-[#fff] rounded-4 py-2  transition-all shadow-md hover:shadow-lg">
            <div class="flex items-center justify-center">
              <nuxt-img width="80" src="/logo-small.webp"/>
              <h2 class="uppercase tracking-wider text-secondary-light-2 font-700">sign in</h2>
            </div>
            <v-row class="my-1">
              <v-column class="justify-center" col="12">
                <ul class="bg-secondary-light-2/80 p-1 rounded-4" v-if="signInData.errors">
                  <li class="text-[#fff] capitalize" v-for="(item,index) in signInData.errors">{{index+1}}) {{item}}</li>
                </ul>
              </v-column>
            </v-row>
            <FormKit @submit="signInSubmit" name="signInForm" id="signInForm" type="form" :actions="false">
              <FormKit :allow-incomplete="false" name="multi-signIn" id="multi-signIn" type="multi-step" tab-style="progress">
                <FormKit  stepNext-class="[&_.formkit-input]:btn [&_.formkit-input]:btn-sm [&_.formkit-input]:btn-secondary [&_.formkit-input]:btn-light [&_.formkit-input]:!font-poppins"  type="step" name="personalInfo">
                  <!--                /// step 1-->
                  <v-row class="my-1">
                    <v-column col="12" class="justify-center">
                      <FormKit
                          validation-label="firstname"
                          type="custom_text"
                          label="firstname*"
                          id="signup_firstname"
                          name="signup_firstname"
                          validation="required"
                      />
                    </v-column>
                  </v-row>
                  <v-row class="my-1">
                    <v-column col="12" class="justify-center">
                      <FormKit
                          type="custom_text"
                          label="lastname*"
                          id="signup_lastname"
                          validation-label="lastname"
                          name="signup_lastname"
                          validation="required"
                      />
                    </v-column>
                  </v-row>
                  <v-row class="my-1">
                    <v-column col="12" class="justify-center">
                      <FormKit
                          type="custom_text"
                          label="username*"
                          id="signup_username"
                          validation-label="username"
                          name="signup_username"
                          validation="required"
                      />
                    </v-column>
                  </v-row>
                  <v-row class="my-1">
                    <v-column col="12" class="justify-center">
                      <FormKit
                          type="custom_text"
                          label="phone*"
                          id="signup_phone"
                          name="signup_phone"
                          help="example: 09xxxxxxxxx"
                          validation-label="phone Number"
                          validation="required|matches:/^09\d{9}$/"
                      />
                    </v-column>
                  </v-row>
                  <v-row class="my-1">
                    <v-column col="12" class="justify-center">
                      <FormKit
                          type="custom_text"
                          label="email*"
                          id="signup_email"
                          name="signup_email"
                          help="example: test@gmail.com"
                          validation-label="email address"
                          validation="required|email"
                      />
                    </v-column>
                  </v-row>


                </FormKit>

                <FormKit stepNext-class="[&_.formkit-input]:!font-poppins [&_.formkit-input]:btn [&_.formkit-input]:btn-sm [&_.formkit-input]:btn-secondary [&_.formkit-input]:btn-light"  stepPrevious-class="[&_.formkit-input]:btn [&_.formkit-input]:btn-sm [&_.formkit-input]:btn-secondary [&_.formkit-input]:btn-light [&_.formkit-input]:!font-poppins" type="step" name="profile">
                  <!-- component for example brevity. -->
                  <!--                /// step 2-->
                  <v-row class="my-1">
                    <v-column col="12" class="flex-col">
                      <nuxt-img v-if="profileImageSrc" class="mb-1 mx-auto" width="200" height="300"  :src="profileImageSrc"/>
                      <FormKit
                          @input="profileImageChange($event)"
                          outer-class="w-full"
                          type="file"
                          id="signup_profile"
                          name="signup_profile"
                          input-class="focus-visible:!border-[1px] focus-visible:!border-red-600"
                          label="Please choose a profile picture..."
                          accept=".jpg,.png,.jpeg,.webp"
                          label-class="label !font-600 font-poppins"
                      />
                    </v-column>
                  </v-row>

                </FormKit>

                <FormKit  stepNext-class="[&_.formkit-input]:!font-poppins [&_.formkit-input]:btn [&_.formkit-input]:btn-sm [&_.formkit-input]:btn-secondary [&_.formkit-input]:btn-light"  stepPrevious-class="[&_.formkit-input]:btn [&_.formkit-input]:btn-sm [&_.formkit-input]:btn-secondary [&_.formkit-input]:btn-light [&_.formkit-input]:!font-poppins [&_.formkit-outer]:!mb-0 flex items-end"  type="step" name="security">
                  <!-- component for example brevity. -->
                  <!--                step 3-->
                  <Formkit type="group">
                    <v-row  class="my-1">
                      <v-column col="12">
                        <FormKit
                            type="custom_password"
                            label="password*"
                            name="password"
                            validation="required"
                            validation-label="password"
                            suffix-icon="eyeClosed"
                            @suffix-icon-click="$handleIconClick"
                        />
                      </v-column>
                    </v-row>
                    <v-row  class="my-1">
                      <v-column col="12">
                        <FormKit
                            type="custom_password"
                            name="password_confirm"
                            label="Confirm password*"
                            validation="required|confirm"
                            validation-label="Password confirmation"
                            suffix-icon="eyeClosed"
                            @suffix-icon-click="$handleIconClick"
                        />
                      </v-column>
                    </v-row>
                  </Formkit>

                  <!-- using step slot for submit button-->
                  <template #stepNext>
                    <VBtnLoader
                        :flag="signInData.loaderButtonFlag"  class="btn btn-secondary btn-sm btn-light mt-1"
                         type="submit">
                      confirm
                    </VBtnLoader>
                  </template>
                </FormKit>
              </FormKit>
            </FormKit>


          </div>





        </v-column>
      </v-row>
    </v-container>
  </section>


</template>

<script setup lang="ts">
definePageMeta({
  name:'AUTH',
  layout:'pages',
  page_title:'Authentication',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Authentication',
      link:{name:'AUTH'},
      on:true
    }
  ]
});

const loginForm=ref(null);
const submitLoginForm = () => {
  if(loginForm.value){
    const node = (loginForm.value as any).node
    node.submit()
  }
};


const {loginProcessData,loginSubmit}=useLogin()

const {signInSubmit,signInData,profileImageChange,profileImageSrc}=useRegister()

</script>

<style >
.formkit-form > .formkit-messages .formkit-message{
  text-align: center;
  margin: 0.5rem 0;
}
.formkit-step-actions{
  display: flex;
  justify-content: space-between;

}
.formkit-steps{
  width: 100% !important;
  border: none!important;
  box-shadow: none!important;
}
.formkit-outer{
  display: flex;
  justify-content: center;
}
.formkit-outer[data-type="multi-step"] > [data-tab-style="progress"] .formkit-tab[data-active="true"]::before{
  border-color: #a41a13 !important;
}

.formkit-outer[data-type="multi-step"] > [data-tab-style="progress"] > .formkit-tabs .formkit-tab[data-valid="true"][data-visited="true"]::after{
 background-color: #a41a13 !important;
}

.formkit-outer[data-type="multi-step"] .formkit-tab[data-valid="true"] .formkit-badge{
  background-color: #a41a13 !important;
}
.formkit-outer[data-type="multi-step"] .formkit-badge *{
  color:#fff !important;
}
.formkit-outer[data-type="multi-step"] .formkit-badge{
  background-color: #a41a13 !important;

}
.formkit-wrapper{
  width: 100% !important;
}
#signInForm .password-icon{
  top: 35px !important;
}
</style>