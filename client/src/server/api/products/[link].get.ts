
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const link=ev.context.params ? ev.context.params.link : null;
    if(link){
        try {
            const request=await $fetch<IResponse<any>>(api_base+`/products/${link}`,{
                headers:{access_key}
            });
            if(request.error){
                showError({
                    statusCode:400,
                    message:'Server bad request!',
                    fatal:true,
                    statusMessage:'Server bad request!'
                })
            }else{
                return request.data
            }
        }catch (err) {
            return err
        }

    }else{
        showError({
            statusCode:400,
            message:'Server bad request!',
            fatal:true,
            statusMessage:'Server bad request!'
        })
    }

})