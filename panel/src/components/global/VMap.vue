<script setup lang="ts">
const {$leaflet}=useNuxtApp()
onMounted(()=>{
  let map = $leaflet.map('map').setView([51.505, -0.09], 13);

  $leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  $leaflet.marker([51.5, -0.09],{
    icon: $leaflet.icon({
      popupAnchor: [12, 6],
      iconUrl: '/map/marker-icon.png',
      shadowUrl: '/map/marker-shadow.png'
    })
  }).addTo(map)
      .bindPopup('<b>Hello world!</b><br />I am a popup')
      .openPopup();
})

</script>

<template>
  <div id="map" class="h-[400px] w-full"></div>
</template>

<style scoped>

</style>