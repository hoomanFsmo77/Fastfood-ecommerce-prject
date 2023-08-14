import {urlEncodeBody,formDataBody,calculate_off_price} from "~/utils/functions";

export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.provide('urlEncodeBody',urlEncodeBody)
    nuxtApp.provide('formDataBody',formDataBody)
    nuxtApp.provide('calculate_off_price',calculate_off_price)
})