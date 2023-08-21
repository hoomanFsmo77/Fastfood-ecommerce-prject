<template>
  <LayoutHeader>
    <section id="main-header-content">
      <HomeIntro />
    </section>
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