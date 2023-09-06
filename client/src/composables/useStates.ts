import {User_Information} from "~/utils/types";
import {Favorite} from "~/store/Favorite";
import {Cart} from "~/store/Cart";
import {storeToRefs} from "pinia";

export const useStates=()=>{
    const isLogin=useState<boolean>('isLogin',()=>false)
    const userInformation=useState<User_Information|null>('userInformation',()=>{
        return{
            firstname:'',
            lastname:'',
            username:'',
            profile_image:'',
            email:'',
            phone:''
        }
    })


    return{
        isLogin,userInformation
    }
}


export const useFavoriteStore=()=>{
    const favoriteStore=Favorite()
    const {userFavoriteListFetchFlag,isProductExistInFAV,userFavoriteList}=storeToRefs(favoriteStore)


    return{
        favoriteStore,isProductExistInFAV,userFavoriteListFetchFlag,userFavoriteList
    }
}


export const useCartStore=()=>{
    const cartStore=Cart()
    const {getCartListLength,cartListFetchFlag, cartListData, getOrderID}=storeToRefs(cartStore)



    return{
        cartStore,getCartListLength,cartListFetchFlag,cartListData,getOrderID
    }
}