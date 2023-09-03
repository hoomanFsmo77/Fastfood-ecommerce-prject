import {User_Information} from "~/utils/types";


export default defineNuxtPlugin(async ()=>{
    const {favoriteStore}=useFavoriteStore()
    const {cartStore}=useCartStore()
    const {isLogin,userInformation}=useStates()
    try {
        const req=await $fetch<User_Information>('/api/auth/me');
        isLogin.value=true
        userInformation.value=req
        await favoriteStore.fetchUserFavoriteList();
        await cartStore.fetchUserCartData()
    }catch (err) {
        isLogin.value=false
        userInformation.value=null
    }
})