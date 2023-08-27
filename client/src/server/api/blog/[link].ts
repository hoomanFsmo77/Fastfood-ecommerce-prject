
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const link=ev.context.params.link
    const {api_base,access_key}=useRuntimeConfig();
    try {
        const req=await $fetch<IResponse<any>>(api_base+`/blog`,{
            headers:{
                access_key
            },
            query:{
                link
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