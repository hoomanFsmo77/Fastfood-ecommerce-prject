import VContainer from '../components/grid/VContainer.vue'
import VRow from '../components/grid/VRow.vue'
import VFContainer from '../components/grid/VFContainer.vue'
import VColumn from '../components/grid/VColumn.vue'

export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.vueApp.component('v-container',VContainer)
    nuxtApp.vueApp.component('v-row',VRow)
    nuxtApp.vueApp.component('v-container-full',VFContainer)
    nuxtApp.vueApp.component('v-column',VColumn)
})