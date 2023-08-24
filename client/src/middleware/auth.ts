

export default defineNuxtRouteMiddleware((to,from)=>{
    if(process.server)return ;
    if(process.client){
        const {isLogin}=useStates()
        if(!isLogin.value){
            return showError({
                name:'unauthorized!',
                fatal:false,
                message:'unauthorized!',
                statusCode:404,
            })
        }
    }

})