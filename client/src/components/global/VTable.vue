<script setup lang="ts">
defineProps<{
  head:string[],
  flag?:boolean
}>()
import { HalfCircleSpinner } from 'epic-spinners';

</script>

<template>

  <div class="table-responsive md:!overflow-visible">
    <table >
      <thead>
      <tr>
        <th :colspan="item.length===0 && 0" v-for="item in head">
          <p>{{item}}</p>
        </th>
      </tr>
      </thead>
      <tbody>
      <slot />
      </tbody>
    </table>
    <div class="table-loader" v-if="flag">
      <client-only>
        <half-circle-spinner
            :animation-duration="2000"
            :size="120"
            color="#a41a13"
        />
      </client-only>
    </div>

  </div>

</template>

<style scoped>

</style>