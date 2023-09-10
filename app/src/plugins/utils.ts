import {urlEncodeBody, formDataBody, calculate_off_price, handleIconClick,serializeError,filterCustomProduct} from "~/utils/functions";

export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.provide('urlEncodeBody',urlEncodeBody)
    nuxtApp.provide('formDataBody',formDataBody)
    nuxtApp.provide('calculate_off_price',calculate_off_price)
    nuxtApp.provide('handleIconClick',handleIconClick)
    nuxtApp.provide('serializeError',serializeError)
    nuxtApp.provide('filterCustomProduct',filterCustomProduct)
})