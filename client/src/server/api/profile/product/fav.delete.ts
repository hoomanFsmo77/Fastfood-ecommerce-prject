import {getQuery,getCookie} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev)
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>('/favorite',{
            baseURL:api_base,
            method:'DELETE',
            query:{
                favID:query.favID
            },
            headers:{
                access_key,
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


})