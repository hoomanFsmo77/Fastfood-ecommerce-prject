import {DirectiveBinding} from "vue/dist/vue";

let timeout:any=null
export default {
    mounted(el:HTMLElement,binding:DirectiveBinding){
        el.dataset.show='0'
        el.addEventListener('mouseenter',()=>{
            clearTimeout(timeout)
            timeout=setTimeout(()=>{
                if(el.dataset.show==='0'){
                    el.dataset.show='1'
                    binding.value()
                }

            },200)
        })
        el.addEventListener('mouseleave',()=>{
            clearTimeout(timeout)
            if(el.dataset.show==='1'){
                el.dataset.show='0'
                binding.value()
            }

        })
    }
}