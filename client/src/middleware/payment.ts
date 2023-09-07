

export default defineNuxtRouteMiddleware((to,from)=>{
    if(process.server)return ;
    if(process.client){
        if(!to.query && !to.query.tracking_number){
            return createError({
                name:'unauthorized! you are not allowed to this page.',
                fatal:true,
                message:'unauthorized! you are not allowed to this page.',
                statusCode:400,
            })
        }
    }


})