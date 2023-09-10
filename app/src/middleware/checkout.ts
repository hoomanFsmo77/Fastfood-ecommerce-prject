

export default defineNuxtRouteMiddleware((to,from)=>{
    if(process.server)return ;
    if(process.client){
        const {cartListData}=useCartStore();
        const {isLogin}=useStates()
        if(!cartListData.value.items && !cartListData.value.order && !isLogin.value){
            return createError({
                name:'unauthorized! you are not allowed to this page.',
                fatal:true,
                message:'unauthorized! you are not allowed to this page.',
                statusCode:400,
            })
        }
    }


})