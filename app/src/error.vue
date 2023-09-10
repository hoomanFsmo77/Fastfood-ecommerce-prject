<script setup lang="ts">
definePageMeta({
  layout:false,
  page_title:'404',
})
const error=useError()
onMounted(()=>{
  const el=document.querySelector('.preloader') as HTMLElement;
  el!.style.opacity='0'
  el!.style.visibility='hidden'
  el!.style.zIndex='-1'
})

const backHome = () => {
  clearError({
    redirect:'/home'
  })
}
</script>

<template>

  <NuxtLayout name="free">
    <template #main>
      <section class="pt-7 pb-3 !bg-[#fff]">
        <v-container>
          <v-row>
            <v-column col="=12">
              <h2 class="font-500">{{error.message}}</h2>
              <div class="mt-1.5">
                <button class="btn btn-secondary btn-sm" @click="backHome">
                  back home
                </button>
              </div>

            </v-column>
          </v-row>
        </v-container>


      </section>
    </template>
  </NuxtLayout>


</template>

<style scoped>

</style>