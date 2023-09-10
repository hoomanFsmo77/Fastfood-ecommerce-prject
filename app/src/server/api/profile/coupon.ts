
import {getCookie, getQuery} from "h3";
import {IResponse} from "~/utils/types";


export default defineEventHandler(async ev=>{
    const query=await getQuery(ev);
    const {api_base,access}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>('/orders/register-coupon',{
            baseURL:api_base,
            method:'PUT',
            query,
            headers:{access, token,}
        })
        if(req.error){
            return {
                code:400,
                errors:req.errors,
                message:null
            }
        }else{
            return {
                code:200,
                errors:null,
                message:'Coupon code submitted successfully!'
            }
        }
    }catch (err) {
        sendNoContent(ev,400)
    }

})