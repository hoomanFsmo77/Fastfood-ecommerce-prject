/* eslint-disable no-use-before-define */
import {DirectiveBinding} from "vue";


export default {
    beforeMount(el:any,binding:DirectiveBinding){
        el.clickOutsideEvent = (event:Event) => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: (el:any) => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
}