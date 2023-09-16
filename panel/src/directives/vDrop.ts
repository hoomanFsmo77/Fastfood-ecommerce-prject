import {DirectiveBinding} from "vue/dist/vue";

let timeout:any=null
export default {
    mounted(el:HTMLElement,binding:DirectiveBinding){
        el.dataset.show='0'
        el.addEventListener('click',()=>{
            if(el.dataset.show==='0'){
                el.dataset.show='1'
                binding.value()
            }else if(el.dataset.show==='1'){
                el.dataset.show='0'
                binding.value()
            }
        })
    }
}