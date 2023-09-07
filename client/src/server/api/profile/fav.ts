import {getCookie} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    const query=await getQuery(ev);
    if(query.method==='GET'){
        try {
            const req=await $fetch<IResponse<any>>('/favorite',{
                baseURL:api_base,
                headers:{
                    access,
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
    }else if(query.method==='POST'){
        try {
            const req=await $fetch<IResponse<any>>('/favorite',{
                baseURL:api_base,
                method:'POST',
                query:{
                    productID:query.productID
                },
                headers:{
                    access,
                    token,
                    'Content-Type':'application/json'
                }
            })
            if(req.error){
                return {
                    code:400,
                    errors:req.errors,
                    message:null
                }
            }else{
                return   {
                    code:200,
                    errors:null,
                    message:'product added to you favorite list!'
                }
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }else if(query.method==='DELETE'){
        try {
            const req=await $fetch<IResponse<any>>('/favorite',{
                baseURL:api_base,
                method:'DELETE',
                query:{
                    favID:query.favID
                },
                headers:{
                    access,
                    token,
                    'Content-Type':'application/json'
                }
            })
            if(req.error){
                return {
                    code:400,
                    errors:req.errors,
                    message:null
                }
            }else{
                return   {
                    code:200,
                    errors:null,
                    message:'product removed from your favorite list!'
                }
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }


})