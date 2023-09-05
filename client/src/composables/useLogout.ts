

export const useLogout=()=>{
    const {isLogin,userInformation}=useStates()
    const {favoriteStore}=useFavoriteStore()
    const {cartStore}=useCartStore()
    const logoutHandler = async () => {
        try {
            await $fetch('/api/auth/logout')
            isLogin.value=false
            userInformation.value=null
            favoriteStore.$reset()
            cartStore.$reset()
            return navigateTo({name:'HOME'})
        }catch (err) {
            console.log(err)
        }
    }


    return{
        logoutHandler
    }
}