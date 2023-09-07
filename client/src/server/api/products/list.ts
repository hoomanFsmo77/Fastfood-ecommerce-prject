
import {getQuery} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev)
    const {api_base,access}=useRuntimeConfig();

    try {
        const req=await $fetch<IResponse<any>>(api_base+`/menu`,{
            headers:{
                access
            },
            query:{
                per:query.per,
                page:query.page,
                category:query?.category || ''
            }
        })
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req.data
        }

    }catch (err) {
        return err
    }



})