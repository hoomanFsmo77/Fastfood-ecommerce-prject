import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    if(token && token.jwt){
        if(query.method==='GET'){
            try {
                const req=await $fetch<IResponse<any>>('/product-category',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }
    }

})