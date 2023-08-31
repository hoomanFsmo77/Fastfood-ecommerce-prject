import {Ref} from "vue";
import {IProduct} from "~/utils/types";


export const useProduct=(product_data?:Ref<IProduct|null>)=>{
    const {favoriteStore}=useFavoriteStore()
    const productPageData=shallowReactive({
        quantity:1 as number,
        tabIndex:0 as number,
        replyMessage:null as string|null,
        btnLoaderFlag:false as boolean,
        FAVBtnLoaderFlag:false as boolean,
        removeFAVBtnLoaderFlag:false as boolean,
        reset(){
            this.btnLoaderFlag=false
            this.quantity=1
            this.FAVBtnLoaderFlag=false
            this.removeFAVBtnLoaderFlag=false
        }
    })
    const {$toast}=useNuxtApp()
    const {isLogin}=useStates();


    ///////////////////////////////////////////////
    const replySubmit = (msg:string) => {
        productPageData.replyMessage=msg
    }

    const plusQuantity = () => {
        if(product_data&&product_data.value && productPageData.quantity!==product_data.value.quantity && product_data.value.status){
            productPageData.quantity++
        }
    }
    const minusQuantity = () => {
        if(productPageData.quantity>1 && product_data&& product_data.value && product_data.value.status){
            productPageData.quantity--
        }
    }

    const changeQuantity = (ev:Event) => {
        const el=ev.target as HTMLInputElement;
        const value=Number(el.value)
        if(product_data&&product_data.value && value>product_data.value.quantity && product_data.value.status){
            productPageData.quantity=product_data.value.quantity
        }
    }



    const addToCart =async (productId?:number) => {

        if(isLogin.value){
           productPageData.btnLoaderFlag=true
            try {
               const req=await $fetch('/api/profile/basket/add',{
                   query:{
                       productID:product_data ? product_data.value?.id : productId,
                       quantity:product_data ? productPageData.quantity :1
                   }
               })
                $toast('success').fire({
                    text: 'product added to you basket!',
                    icon: 'success',
                })
                return navigateTo({name:'SHOPPING_CART'})
            }catch (e) {
                $toast('error').fire({
                    text: 'error in connecting to server!',
                    icon: 'error',
                })
            }finally {
                productPageData.reset()
            }

        }else{
            $toast('error').fire({
                text: 'you are not logged in yet!',
                icon: 'error',
            })
        }
    }


    const addToFav = async () => {
        productPageData.FAVBtnLoaderFlag=true
        try {
            const req=await $fetch('/api/profile/product/fav',{
                method:'POST',
                query:{
                    productID:product_data ? product_data.value?.id : 0,
                }
            })

            if(req.code===200){
                $toast('success').fire({
                    text: req.message,
                    icon: 'success',
                })
                return navigateTo({name:'PROFILE_FAVORITE'})
            }else{
                $toast('error').fire({
                    text: req.errors,
                    icon: 'error',
                })
            }
        }catch (e) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            await favoriteStore.fetchUserFavoriteList()
            productPageData.reset()
        }
    }

    const removeFav = async () => {
        const favID=favoriteStore.getFavID(product_data?.value?.id)
        productPageData.removeFAVBtnLoaderFlag=true
        try {
            const req=await $fetch('/api/profile/product/fav',{
                method:'DELETE',
                query:{
                    favID
                }
            })

            if(req.code===200){
                $toast('success').fire({
                    text: req.message,
                    icon: 'success',
                })
            }else{
                $toast('error').fire({
                    text: req.errors,
                    icon: 'error',
                })
            }
        }catch (e) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            await favoriteStore.fetchUserFavoriteList()
            productPageData.reset()
        }

    }

    return{
        addToCart,changeQuantity,minusQuantity,plusQuantity,replySubmit,productPageData,addToFav,removeFav
    }
}