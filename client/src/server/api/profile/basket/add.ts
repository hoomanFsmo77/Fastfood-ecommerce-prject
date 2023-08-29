
import {getCookie, getQuery} from "h3";
import {IResponse} from "~/utils/types";
import {urlEncodeBody} from "~/utils/functions";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev);
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>('/basket',{
            baseURL:api_base,
            method:'POST',
            body:urlEncodeBody(query),
            headers:{
                access_key,
                token,
                'Content-Type':'application/x-www-form-urlencoded'
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