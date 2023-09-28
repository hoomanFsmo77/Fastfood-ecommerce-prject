import {useModal} from "~/composables/useModal";


export const useOrder=()=>{
    const {openModal,modalOpenFlag}=useModal({outsideFade:true,modalClass:'modal-lg'})
    const orderData=reactive({
        products:[] as any[],
        flag:false as boolean
    })

    const showOrderProduct =async (orderID:number) => {
        orderData.flag=true
        orderData.products=[]
        try {
            const req=await $fetch('/api/orders',{
                query:{
                    method:'GET',
                    id:orderID
                }
            })
            orderData.products=req.products
            openModal()
        }catch (err) {
            console.log(err)
        }finally {
            orderData.flag=false
        }
    }


    return{
        showOrderProduct,orderData,modalOpenFlag
    }
}