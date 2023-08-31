import {getQuery,getCookie} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev)
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>('/favorite',{
            baseURL:api_base,
            method:'POST',
            query:{
                productID:query.productID
            },
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