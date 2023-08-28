import {readBody,getCookie} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const body=await readBody(ev)
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>('/blog-comments',{
            baseURL:api_base,
            method:'POST',
            body,
            headers:{
                access_key,
                token,
                'Content-Type':'application/json'
            }
        })
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req
        }

    }catch (err) {
        return err
    }


})