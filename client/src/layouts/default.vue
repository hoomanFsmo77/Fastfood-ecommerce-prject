<template>
  <LayoutHeader>
    <HomeIntro />
  </LayoutHeader>
  <div><slot/></div>
  <LayoutFooter />
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>