import vClickOutside from '../directives/vClickOutside'
import vFade from '../directives/vFade'
import vCollapsible from '../directives/vCollapsible'
import vDrop from '../directives/vDrop'
import vSticky from '../directives/vSticky'
import vCarousel from '../directives/vCarousel'

export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.vueApp.directive('click-out',vClickOutside)
    nuxtApp.vueApp.directive('fade',vFade)
    nuxtApp.vueApp.directive('collapse',vCollapsible)
    nuxtApp.vueApp.directive('drop',vDrop)
    nuxtApp.vueApp.directive('sticky',vSticky)
    nuxtApp.vueApp.directive('carousel',vCarousel)
})