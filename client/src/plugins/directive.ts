import vClickOutside from '../directives/vClickOutside'
import vFade from '../directives/vFade'
import vCollapsible from '../directives/vCollapsible'

export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.vueApp.directive('click-out',vClickOutside)
    nuxtApp.vueApp.directive('fade',vFade)
    nuxtApp.vueApp.directive('collapse',vCollapsible)
})