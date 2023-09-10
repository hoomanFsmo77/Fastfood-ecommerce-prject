


export const useCheckout=()=>{
    const {getOrderID}=useCartStore();
    const chooseAddressFlag=ref<boolean>(false)
    const submitPaymentFlag=ref<boolean>(false)
    const {$toast}:any=useNuxtApp();
    const chooseAddress = async (id:number) => {
        chooseAddressFlag.value=true
        try {
            const req=await $fetch('/api/profile/address',{
                method:'POST',
                query:{
                    method:'PUT',
                    type:"checkout",
                    addressID:id,
                    orderID:getOrderID.value
                }
            })
            if(req.code===200){
                $toast('success').fire({
                    text: 'address selected!',
                    icon: 'success',
                })
            }else{
                $toast('error').fire({
                    text: req.errors,
                    icon: 'error',
                })
            }
        }catch (err) {
            console.log(err)
        }finally {
            chooseAddressFlag.value=false
        }

    }


    const submitPayment =async () => {
        submitPaymentFlag.value=true
        try {
            const req=await $fetch('/api/profile/payment',{
                method:'POST',
                query:{
                    method:'POST',
                    orderID:getOrderID.value
                }
            })
            if(req.code===400){
                $toast('error').fire({
                    text: req.errors,
                    icon: 'error',
                })
            }else{
                return navigateTo(req.data.link,{
                    external:true
                })
            }

        }catch (err) {
            console.log(err)
        }finally {
            submitPaymentFlag.value=false
        }
    }




    return{
        chooseAddress,submitPayment,chooseAddressFlag,
        submitPaymentFlag
    }
}