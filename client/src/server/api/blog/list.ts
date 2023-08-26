
import {getQuery} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev)
    const {api_base,access_key}=useRuntimeConfig();
    try {
        const req=await $fetch<IResponse<any>>(api_base+`/blog`,{
            headers:{
                access_key
            },
            query:{
                per:query.per,
                page:query.page,
            }
        })
        if(req.error){
            showError({
                statusCode:400,
                message:'Server bad request!',
                fatal:true,
                statusMessage:'Server bad request!'
            })
        }else{
            return req.data
        }

    }catch (err) {
        return err
    }



})