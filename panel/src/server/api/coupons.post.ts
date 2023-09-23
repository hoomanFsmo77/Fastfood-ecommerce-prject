import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import {serializeError} from "~/utils/functions";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    if(token && token.jwt){
        if(query.method==='GET' && !query.id){
            try {
                const req=await $fetch<IResponse<any>>('/coupons',{
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
        }else if(query.method==='GET' && query.id){
            try {
                const req=await $fetch<IResponse<any>>('/coupons',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        id:query.id
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='POST' || query.method==='PUT'){
            const routeUrl=query.method==='POST' ? '/coupons' : `/coupons/${query.couponID}`;
            try {
                const req=await $fetch<IResponse<any>>(routeUrl,{
                    method:query.method,
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        code:query.code,
                        percent:query.percent,
                        expired_at:query.expired_at,
                    }
                })
                if(req.error){
                    return {
                        code:400,
                        errors:serializeError(req.errors)
                    }
                }else{
                    return  {
                        code:200,
                        errors:null
                    }
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='DELETE'){
            try {
                const req=await $fetch<IResponse<any>>('/coupons',{
                    method:'DELETE',
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        id:query.id
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    sendNoContent(event,200)
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }
    }

})