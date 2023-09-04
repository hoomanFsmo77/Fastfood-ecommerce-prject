
import {getCookie} from "h3";
import {IResponse} from "~/utils/types";


export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>('/basket',{
            baseURL:api_base,
            method:'DELETE',
            headers:{
                access_key,
                token,

            }
        })
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req
        }
    }catch (err) {
        sendNoContent(ev,400)
    }

})