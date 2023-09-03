
interface Props {
    type:'custom' | 'ready',
    cartId:number,
    image:string | null,
    title:string | null,
    description:string | null,
    price:number,
    quantity:number,
    subtotal:number,
    link:string|null
}

export const useCart=(props?:Props)=>{
    const {cartStore,getOrderID}=useCartStore()
    const {$toast}=useNuxtApp();
    const couponData=reactive({
        code:'' as string,
        btnFlag:false as boolean,
        message:null as null|string,
        errorFlag:false as boolean,
        init(){
            this.btnFlag=true
            this.message=null
            this.errorFlag=false
        }
    })


    const removeBasketItem =async () => {
      const basketID=props ? props.cartId : null
        try {
          const req=await $fetch('/api/profile/basket/update',{
              query:{
                  status:'delete',
                  id:basketID
              }
          })
            $toast('success').fire({
                text: 'basket item removed!',
                icon: 'success',
            })
        }catch (err) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
          await cartStore.fetchUserCartData()
        }
    }


    const increaseQuantity = async () => {
        const basketID=props ? props.cartId : null
        try {
            const req=await $fetch('/api/profile/basket/update',{
                query:{
                    status:'increase',
                    id:basketID
                }
            })
            $toast('success').fire({
                text: 'basket item updated!',
                icon: 'success',
            })
        }catch (err) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            await cartStore.fetchUserCartData()
        }
    }

    const decreaseQuantity =async () => {
        const basketID=props ? props.cartId : null
        try {
            const req=await $fetch('/api/profile/basket/update',{
                query:{
                    status:'decrease',
                    id:basketID
                }
            })
            $toast('success').fire({
                text: 'basket item updated!',
                icon: 'success',
            })
        }catch (err) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            await cartStore.fetchUserCartData()
        }
    }

    const submitCoupon = async () => {
      if(couponData.code.length>0){
          couponData.init()
            try {
              const req=await $fetch('/api/profile/order/coupon',{
                  query:{
                      code:couponData.code,
                      orderID:getOrderID.value
                  }
              })
                if(req.code===200){
                    couponData.errorFlag=false
                    couponData.message=req.message
                    couponData.code=''
                }else{
                    couponData.errorFlag=true
                    couponData.message=req.errors
                }
            }catch (err) {
                couponData.errorFlag=true
                couponData.message='error in connecting to server!'
            }finally {
                couponData.btnFlag=false
                await cartStore.fetchUserCartData()
            }

      }

    }

    return{
        removeBasketItem,increaseQuantity,decreaseQuantity,submitCoupon,couponData
    }
}