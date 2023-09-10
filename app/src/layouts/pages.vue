<template>
  <LayoutHeader>
    <section id="header-detail-content">
      <LayoutDetail />
    </section>
  </LayoutHeader>
  <div><slot/></div>
  <LayoutFooter />
</template>

<script>
export default {
  name: "pages"
}
</script>

<style scoped>

</style>