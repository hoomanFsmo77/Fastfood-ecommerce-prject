import {getCookie, getQuery} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=> {
    const query = await getQuery(ev);
    const {api_base, access} = useRuntimeConfig();
    const token = getCookie(ev, 'x_wengdo_x');
    if(query.method==='POST'){
        try {
            const req=await $fetch<IResponse<any>>('/payment',{
                method:'POST',
                baseURL:api_base,
                query:{
                    orderID:query.orderID
                },
                headers:{access, token,}
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
                    data:req.data
                }
            }
        }catch (err) {
            sendNoContent(ev,400)
        }
    }


})
