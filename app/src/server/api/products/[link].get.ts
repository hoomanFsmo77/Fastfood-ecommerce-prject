
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const link=ev.context.params ? ev.context.params.link : null;
    if(link){
        try {
            const request=await $fetch<IResponse<any>>(api_base+`/products/${link}`,{
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

    }else{
        sendNoContent(ev,400)
    }

})