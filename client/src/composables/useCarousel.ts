import {Banner, IResponse} from "~/utils/types";



export const useCarousel=(banner_data:Ref<Banner[]|null>)=>{
    const currentSlide=ref(0)
    let interval:any;

    interval=setInterval(()=>{
        if(banner_data.value && currentSlide.value+1===banner_data.value.length){
            currentSlide.value=0
            return;
        }
        currentSlide.value++
    },15000);


    const nextSlide =  () => {
        clearInterval(interval);
        if(banner_data.value && currentSlide.value+1===banner_data.value.length){
            currentSlide.value=0
            return;
        }
        currentSlide.value++
    }
    const prevSlide = () => {
        clearInterval(interval);
        if(currentSlide.value===0 && banner_data.value){
            currentSlide.value=banner_data.value.length-1
            return;
        }
        currentSlide.value--

    }


    const nextImageSrc = computed<string>(()=>{
        if(banner_data.value){
            if(currentSlide.value+1===banner_data.value.length){
                return banner_data.value[0].image
            }else{
                return banner_data.value[currentSlide.value+1].image
            }
        }else{
            return 'nok'
        }
    })

    const prevImageSrc = computed<string>(()=>{
        if(banner_data.value){
            if(currentSlide.value===0){
                return banner_data.value[banner_data.value.length-1].image
            }else{
                return banner_data.value[currentSlide.value-1].image
            }
        }else{
            return 'nok'
        }
    })




    const rowClass=(index:number|string)=>{
        return {
            class:[
                {'animate__fadeOut ':currentSlide.value!==index,'animate__fadeIn !z-[9]':currentSlide.value===index},
                'absolute items-center inset-0 w-full animate__animated  animate__delay-1s animate__slow'
            ]
        }
    }
    const textClasses = (index:number|string) => {
        return {
            class:[
                {'animate__fadeOutDown':currentSlide.value!==index,'animate__fadeInDown animate__slow':currentSlide.value===index},
                'font-playFair capitalize   text-left animate__animated  animate__delay-1s'
            ]
        }
    }
    const imageClasses = (index:string|number) => {
        return {
            class:[
                {'animate__fadeOut':currentSlide.value!==index,'animate__jackInTheBox animate__slow':currentSlide.value===index},
                'animate__animated animate__delay-1s  '
            ]
        }
    }






    const changeSlideHandler = (direction:'right'|'left') => {
        if(direction==='right'){
            nextSlide()
        }else{
            prevSlide()
        }
    }



    return{
        currentSlide,nextSlide,prevSlide,prevImageSrc,nextImageSrc,imageClasses,changeSlideHandler,textClasses,rowClass
    }
}