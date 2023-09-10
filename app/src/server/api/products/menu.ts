

import {getQuery} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev);
    const {api_base,access}=useRuntimeConfig();

    try {
        const req=await $fetch<IResponse<any>>('/menu',{
            baseURL:api_base,
            headers:{
                access
            },
            query
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