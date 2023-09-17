import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import  * as am5percent from '@amcharts/amcharts5/percent'
export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.provide('am5',am5)
    nuxtApp.provide('am5xy',am5xy)
    nuxtApp.provide('am5themes_Animated',am5themes_Animated)
    nuxtApp.provide('am5percent',am5percent)
})