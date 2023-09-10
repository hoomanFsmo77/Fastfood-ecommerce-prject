
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig()
    try {
        const request=await $fetch<IResponse<any>>(api_base+'/products/tab',{
            headers:{access}
        });
        if(request.error){
            sendNoContent(ev,400)
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