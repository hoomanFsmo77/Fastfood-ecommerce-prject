
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig()
    try {
        const request=await $fetch<IResponse<any>>(api_base+'/products/tab',{
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
            return Object.entries(request.data).map(item=>{
                return {
                    tab:item[0],
                    list:item[1]
                }
            })
        }
    }catch (err) {
        return err
    }
})