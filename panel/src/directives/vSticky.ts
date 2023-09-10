import {DirectiveBinding} from "vue/dist/vue";


export default {
    mounted(el:HTMLElement,binding:DirectiveBinding){


        const implementTransition = () => {
            if(window.scrollY>230){
                el.style.zIndex='999999999'
                el.style.opacity='1'
                el.style.visibility='visible'
                el.classList.add('active')
            }else{
                el.style.zIndex='-99999999'
                el.style.opacity='0'
                el.style.visibility='hidden'
                el.classList.remove('active')
            }
        }
        window.addEventListener('scroll',()=>{
            implementTransition()
        })
        window.addEventListener('load',()=>{
            el.style.zIndex='-99999999'
            el.style.opacity='0'
            el.style.visibility='hidden'
            el.classList.remove('active')
            implementTransition()
        })

    }
}