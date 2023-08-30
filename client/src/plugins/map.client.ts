
import  L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.provide('leaflet',L)
})