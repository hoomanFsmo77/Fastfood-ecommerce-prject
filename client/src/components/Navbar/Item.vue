<script setup lang="ts">
interface Props{
  title:string,
  link:{name:string,query?:any},
  hasSub:boolean,
  sub?:Props[]
}
defineProps<Props>()

</script>

<template>
  <li class="navbar-item">
<!--    //// first sub-->
    <VDropdown direction="down"  :hasSub="hasSub">
      <template #top>
        <NuxtLink class="navbar-item-link" active-class="navbar-active" exact-active-class="navbar-active"  :to="link">
          {{title}}
        </NuxtLink>
      </template>
      <template #main>
<!--        //// second sub-->
        <li v-for="sub1 in sub" class="dropdown-sub-hover">
          <VDropdown direction="right"  :hasSub="sub1.hasSub">
            <template #top>
              <NuxtLink :to="sub1.link">
                {{sub1.title}}
                <Icon size="1.1rem" v-if="sub1.hasSub" name="ri:arrow-right-fill"/>
              </NuxtLink>
            </template>
            <template #main>
              <li v-for="sub2 in sub1.sub" class="dropdown-sub-hover">
                <NuxtLink :to="sub2.link">
                  {{sub2.title}}

                </NuxtLink>
              </li>
            </template>
          </VDropdown>
        </li>
      </template>
    </VDropdown>
  </li>
</template>

<style scoped>

</style>