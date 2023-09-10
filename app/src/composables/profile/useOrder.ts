import {useModal} from "~/composables/useModal";


export const useOrder=()=>{
    const {openModal,modalOpenFlag}=useModal({
        outsideFade:true,
        modalClass:'modal-lg'
    });

    const productList=shallowReactive({
        data:[],
        flag:false
    })

    const showProducts =async (orderID:number) => {
        productList.flag=true
        productList.data=[]
        try {
            const req=await $fetch('/api/profile/order',{
                query:{
                    method:'POST',
                    orderID:orderID
                }
            })
            productList.data=req
            openModal()
        }catch (err) {
            console.log(err)
        }finally {
            productList.flag=false
        }


    }

    return{
        productList,showProducts,modalOpenFlag
    }
}