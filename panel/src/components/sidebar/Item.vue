<script setup lang="ts">

const props=defineProps<{
  title:string,
  link:{name:string},
  icon:string,
  hasSub:boolean,
  sub?:any[]
}>()
const openItemFlag=ref<boolean>(false)
const route=useRoute()


watch(
    ()=>route.name,
    ()=>{
      openItemFlag.value = (route.name as string).includes(props.link.name);
    },{ immediate:true}
)
</script>

<template>
  <li>
    <NuxtLink :class="{'active':(route.name as string).includes(props.link.name)}" exact-active-class="active" active-class="active" class="sidebar-link" :to="link" >
      <Icon size="1.2rem" :name="icon"/>
      {{title}}
      <Icon v-if="hasSub" size="1.3rem" :name="openItemFlag ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'"  class="block ml-auto mr-1"/>
    </NuxtLink>
    <ul v-if="hasSub" v-collapse="openItemFlag" :class="{'v-collapse':!(route.name as string).includes(props.link.name)}" class=" transition-all pl-4.5 ">
      <li v-for="(subItem,index) in sub" class="first:pt-1 ">
        <NuxtLink exact-active-class="active" :to="subItem.link" :class="{'after:!hidden':sub?.length===index+1}" class="sidebar-link-sub">
          <Icon size="0.9rem" class="mr-0.5" :name="subItem.icon"/>
          {{subItem.title}}
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<style scoped>

@tailwind components;
@layer components {
  .v-collapse:not(.show) {
    @apply hidden;
  }

  .collapsing {
    @apply h-0 overflow-hidden transition-all duration-300 ease-in-out
  }

}

</style>