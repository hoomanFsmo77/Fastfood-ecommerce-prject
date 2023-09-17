<script setup lang="ts">
const { data, signOut } = useAuth()
const {public:{callback_logout}}:any=useRuntimeConfig()
</script>

<template>
  <header id="header">
    <v-row :no-p="true">
      <v-column col="12" class="flex md:justify-end justify-center gap-1">
        <div class="relative">
          <input class="input input-primary" placeholder="search ..." type="text" />
          <span class="flex justify-center items-center p-0.3 rounded-2 right-0 cursor-pointer transition-all hover:bg-primary-light-1/50 bottom-[-8px] absolute bg-primary-light-1 m-1">
            <Icon name="ri:search-line" size="1.3rem" class="text-primary-light-4"/>
          </span>

        </div>
        <div title="log out" @click="signOut({callbackUrl:callback_logout})" class="logout-icon">
          <Icon name="ri:logout-box-r-line" size="1.4rem" class=""/>
        </div>
        <div class="h-full w-[1px] bg-primary-light-2/30"></div>

        <VDropdown :has-sub="false" direction="down">
          <template #top>
           <div class="relative">
             <nuxt-img width="40" class="rounded-full cursor-pointer" :src="data?.user?.image || '/cover.jpeg'"/>
             <span class="absolute right-0 bottom-0 w-0.7 h-0.7 rounded-full bg-green-600 "></span>
           </div>
          </template>
          <template #main>
            <div class="flex justify-between items-center px-1.5 py-1">
              <nuxt-img width="40" class="rounded-full cursor-pointer" :src="data?.user?.image || '/cover.jpeg'"/>
              <div class="ml-1">
                <p class="text-primary-light-4 font-600 capitalize mb-0.5">
                  {{data.user.name}}
                </p>
                <p :title="data.user.email" class="text-primary-light-4 font-400 text-hidden w-9">
                  {{data.user.email || 'test@gmail.com'}}
                </p>
              </div>
            </div>
          </template>
        </VDropdown>
      </v-column>
    </v-row>

  </header>
</template>

<style scoped>

</style>