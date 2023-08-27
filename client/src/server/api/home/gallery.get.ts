
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig()
    try {
        const request=await $fetch<IResponse<any>>(api_base+'/gallery',{
            headers:{access_key}
        });
        if(request.error){
            sendNoContent(ev,400)
        }else{
            return request.data
        }

    }catch (err) {
        return err
    }
})