
import {getQuery} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev);
    const {api_base,access}=useRuntimeConfig();
    try {
        const req=await $fetch<IResponse<any>>(api_base+`/products/comments/${query.productID}`,{
            headers:{
                access
            },
            query:{
                page:query.page,
                per:query.per
            }
        })
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req.data
        }
        return  req
    }catch (err) {
        return err
    }



})