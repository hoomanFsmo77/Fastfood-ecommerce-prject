
import {Banner, IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig()
    try {
        const request=await $fetch<IResponse<Banner[]>>(api_base+'/banner',{
            headers:{access}
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