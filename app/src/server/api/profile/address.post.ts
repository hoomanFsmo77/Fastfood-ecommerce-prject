
import {getCookie} from "h3";
import {IResponse} from "~/utils/types";
import {urlEncodeBody} from "~/utils/functions";


export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(ev);
    const body=await readBody(ev);
    const token=getCookie(ev,'x_wengdo_x');
    if(query.method==='GET' && query.type!=='checkout'){
        try {
            const req=await $fetch<IResponse<any>>('/profile/address',{
                baseURL:api_base,
                headers:{access, token}
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req.data
            }
        }catch (err) {
            sendNoContent(ev,400)
        }

    }else if(query.method==='PUT'  && query.type!=='checkout'){
        try {
            const req=await $fetch<IResponse<any>>('/profile/address',{
                method:'PUT',
                baseURL:api_base,
                body:urlEncodeBody(body),
                headers:{
                    access,
                    token,
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            });
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req
            }
        }catch (err) {
            sendNoContent(ev,400)
        }

    }else if(query.method==='DELETE'){
        try {
            const req=await $fetch<IResponse<any>>(`/profile/address/${query.addressID}`,{
                method:'DELETE',
                baseURL:api_base,
                headers:{access, token}
            });
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }else if( query.method==='POST'){
        try {
            const req=await $fetch<IResponse<any>>('/profile/address',{
                method:'POST',
                baseURL:api_base,
                body:urlEncodeBody(body),
                headers:{
                    access,
                    token,
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            });
            if(req.error){
                return {
                    code:400,
                    errors:req.errors,
                }
            }else{
                return   {
                    code:200,
                    errors:null,
                }
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }else if(query.method==='GET' && query.type==='checkout'){
        try {
            const req=await $fetch<IResponse<any>>('/orders/address',{
                baseURL:api_base,
                headers:{access, token}
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req.data
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }else if(query.method==='PUT'  && query.type==='checkout'){
        try {
            const req=await $fetch<IResponse<any>>('/orders/address-payment',{
                method:'PUT',
                baseURL:api_base,
                query:{
                    addressID:query.addressID,
                    orderID:query.orderID
                },
                headers:{
                    access,
                    token,
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            });
            if(req.error){
                return {
                    code:400,
                    errors:req.errors,
                }
            }else{
                return   {
                    code:200,
                    errors:null,
                }
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }

})