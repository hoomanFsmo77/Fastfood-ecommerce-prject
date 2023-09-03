import {filterCustomProduct} from "~/utils/functions";
import {Ref} from "vue";


export const useCustomProduct=(data:Ref)=>{
    const {$toast}=useNuxtApp()
    const customProductData=reactive({
        templateID:1,
        sizeID:0,
        saucesID:0,
        cheeseID:0,
        toppingID:0,
        custom_pieces:8,
        quantity:1,
        additional_info:'',
        subtotal:0,
        btnLoaderFlag:false
    })

    const customPieceHandler = () => {
        if(customProductData.custom_pieces>18 ){
            customProductData.custom_pieces=18
        }else if(customProductData.custom_pieces<4){
            customProductData.custom_pieces=4
        }
    }

    watchEffect(()=>{
        if(data && data.value){
            const templates=filterCustomProduct(data.value.templates,customProductData.templateID);
            const sizes=filterCustomProduct(data.value.sizes,customProductData.sizeID===0 ? 2 :customProductData.sizeID);
            const sauces=filterCustomProduct(data.value.sauces,customProductData.saucesID);
            const cheese=filterCustomProduct(data.value.cheese,customProductData.cheeseID);
            const toppings=filterCustomProduct(data.value.toppings,customProductData.toppingID);
            customProductData.subtotal=(templates.price+sizes.price+(sauces?.price || 0)+(cheese?.price || 0)+(toppings?.price || 0))*customProductData.quantity
        }

    })


    const quantityHandler = (val:number) => {
        customProductData.quantity=val
    }

    const customProductAddToCart = async () => {
        customProductData.btnLoaderFlag=true
      try {
            const req=await $fetch('/api/profile/basket/add',{
                query:{
                    type:'custom',
                    toppingID:customProductData.toppingID,
                    cheeseID:customProductData.cheeseID,
                    saucesID:customProductData.saucesID,
                    sizeID:customProductData.sizeID===0 ? 2 :customProductData.sizeID,
                    templateID:customProductData.templateID,
                    quantity:customProductData.quantity,
                    additional_info:customProductData.additional_info,
                    custom_pieces:customProductData.custom_pieces
                }
            })
          $toast('success').fire({
              text: 'product added to you basket!',
              icon: 'success',
          })
          return navigateTo({name:'SHOPPING_CART'})

      }catch (err) {
          $toast('error').fire({
              text: 'error in connecting to server!',
              icon: 'error',
          })
      }finally {
          customProductData.btnLoaderFlag=false
      }
    }


    return{
        customProductData,customPieceHandler,quantityHandler,customProductAddToCart
    }
}