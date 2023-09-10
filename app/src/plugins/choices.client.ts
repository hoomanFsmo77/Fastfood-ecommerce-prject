import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
export default defineNuxtPlugin(async nuxtApp=>{
    nuxtApp.provide('choice',(el:HTMLElement,options:any)=>{
       return  new Choices(el,options);
    })
})