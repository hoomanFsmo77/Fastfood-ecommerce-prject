import {DirectiveBinding} from "vue/dist/vue";


export default {
    mounted(el:HTMLElement,binding:DirectiveBinding){
        let dragged = false
        let oldX = 0;
        let direction  = '';
        el.addEventListener('mousedown',(ev:MouseEvent)=>{
            oldX = ev.pageX; dragged = false
        })

        el.addEventListener('mousemove',(ev:MouseEvent)=>{
            dragged = true
        })
        el.addEventListener('mouseup',(ev:MouseEvent)=>{
            if (dragged && ev.pageX <= oldX) {
                direction = "left"
                binding.value('left')
            } else if (dragged && ev.pageX >= oldX) {
                direction = "right"
                binding.value('right')
            }

            oldX = ev.pageX;
        })
    }
}