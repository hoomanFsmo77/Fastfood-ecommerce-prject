
import {getCookie} from "h3";
import {IResponse} from "~/utils/types";


export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    try {
        const req=await $fetch<IResponse<any>>('/loc/provinces',{
            baseURL:api_base,
            headers:{access_key}
        })
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req.data
        }
    }catch (err) {
        sendNoContent(ev,400)
    }

})