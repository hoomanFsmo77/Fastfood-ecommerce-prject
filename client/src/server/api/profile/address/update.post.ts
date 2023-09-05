
import {getCookie} from "h3";
import {IResponse} from "~/utils/types";
import {urlEncodeBody} from "~/utils/functions";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    const body=await readBody(ev)
    try {
        const req=await $fetch<IResponse<any>>('/profile/address',{
            method:'PUT',
            baseURL:api_base,
            body:urlEncodeBody(body),
            headers:{
                access_key,
                token,
                "Content-Type":"application/x-www-form-urlencoded"
            }
        });
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req
        }
    }catch (err) {
        sendNoContent(ev,400)
    }

})