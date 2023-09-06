

interface Options {
    modalClass:string,
    outsideFade?:boolean
}


export const useModal=(options?:Options)=>{
    const modalOpenFlag=useState<boolean>('modalOpenFlag',()=>false)
    const modalOptions=useState<Options>('modalOptions',()=>{
        return{
            modalClass:options?.modalClass || 'md:w-[35vw]',
            outsideFade:options?.outsideFade || false
        }
    })

    const openModal = () => {
      modalOptions.value=options ? options : {modalClass:'md:w-[35vw]',outsideFade:false};
      modalOpenFlag.value=true
    }

    const closeModal = () => {
        modalOpenFlag.value=false
        modalOptions.value= {modalClass:'md:w-[35vw]',outsideFade:false}
    }
    const toggleModal = () => {
        if(modalOpenFlag.value){
            modalOptions.value=options ? options : {modalClass:'md:w-[35vw]',outsideFade:false};
            modalOpenFlag.value=false
        }else{
            modalOpenFlag.value=true
            modalOptions.value= {modalClass:'md:w-[35vw]',outsideFade:false}
        }
    }

    return{
        modalOpenFlag,closeModal,toggleModal,openModal,modalOptions
    }
}