<template>
  <div v-bind="$attrs" class="row flex flex-wrap"><slot/></div>
</template>

<script>
export default {
  name: "VRow",
  props:['colGap','rowGap'],
  data(){
    return{
      columnGaps:this.colGap || 0,
      rowGaps:this.rowGap || 0,
    }
  }
}
</script>

<style lang="scss" scoped>
@tailwind components;
@layer components {
  .row{
    column-gap: v-bind(columnGaps);
    row-gap: v-bind(rowGaps);
  }
  .row > * {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

</style>