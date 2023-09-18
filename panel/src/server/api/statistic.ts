import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    if(token && token.jwt){
        if(query.type==='total'){
            try {
                const req=await $fetch<IResponse<any>>('/statistic/total',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt}
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }


        }else if(query.type==='orders'){
            try {
                const req=await $fetch<IResponse<any>>('/statistic/orders',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt}
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.type==='transactions'){
            try {
                const req=await $fetch<IResponse<any>>('/statistic/transactions',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt}
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.type==='popular'){
            try {
                const req=await $fetch<IResponse<any>>('/statistic/popular',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt}
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