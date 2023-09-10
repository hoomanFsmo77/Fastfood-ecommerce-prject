import {DirectiveBinding} from "vue";

export default {
    updated:function (el:HTMLElement, binding:DirectiveBinding) {
        if(binding.oldValue===binding.value){
            return;
        }
        if(binding.value){
            el.classList.remove('v-collapse')
            const height=window.getComputedStyle(el).height
            el.style.height='0'
            el.classList.add('collapsing')
            el.offsetHeight;
            el.style.height=height
            el.ontransitionend=()=>{
                el.classList.remove('collapsing')
                el.classList.add('v-collapse')
                el.classList.add('show');
                el.style.height = 'auto'
            }


        }else{
            el.classList.remove('v-collapse')
            el.classList.remove('show')
            el.style.height=window.getComputedStyle(el).height
            el.offsetHeight;
            el.classList.add('collapsing')
            el.style.height='0'
            el.ontransitionend=()=>{
                el.classList.remove('collapsing')
                el.classList.add('v-collapse')
                el.style.height='auto'
            }
        }

    }
}