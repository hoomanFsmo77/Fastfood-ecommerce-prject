import {getCookie, getQuery} from "h3";
import {IResponse} from "~/utils/types";


export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    const query=await getQuery(ev);
    if(query.method==='GET'){
        try {
            const req=await $fetch<IResponse<any>>(api_base+`/transaction`,{
                headers:{
                    access_key,
                    token
                },
                query:{
                    per:query.per,
                    page:query.page,
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
    }else if(query.method==='POST'){
        try {
            const req=await $fetch<IResponse<any>>(api_base+`/transaction`,{
                method:'POST',
                headers:{
                    access_key,
                    token
                },
                query:{
                    tracking_number:query.tracking_number,
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
    }

})