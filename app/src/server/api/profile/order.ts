import {getCookie, getQuery} from "h3";
import {IResponse} from "~/utils/types";


export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    const query=await getQuery(ev);
    if(query.method==='GET'){
        try {
            const req=await $fetch<IResponse<any>>(api_base+`/orders`,{
                headers:{
                    access,
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
            const req=await $fetch<IResponse<any>>(api_base+`/orders`,{
                method:'POST',
                headers:{
                    access,
                    token
                },
                query:{
                    orderID:query.orderID
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