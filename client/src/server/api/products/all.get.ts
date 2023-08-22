
import {IResponse} from "~/utils/types";
import {getQuery} from "h3";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const query=await getQuery(ev);
    const category:any=(query.category && query.category.length) ? query.category : null;
    if(category){
        try {
            const request=await $fetch<IResponse<any>>(api_base+'/menu',{
                headers:{access_key},
                query:{
                    page:1,
                    per:4,
                    category
                }
            });
            if(request.error){
                showError({
                    statusCode:400,
                    message:'Server bad request!',
                    fatal:true,
                    statusMessage:'Server bad request!'
                })
            }else{
                return request.data.products
            }
        }catch (err) {
            return err
        }


    }else{
        try {
            const request=await $fetch<IResponse<any>>(api_base+'/products/all',{
                headers:{access_key},
            });
            if(request.error){
                showError({
                    statusCode:400,
                    message:'Server bad request!',
                    fatal:true,
                    statusMessage:'Server bad request!'
                })
            }else{
                return request.data
            }
        }catch (err) {
            return err
        }
    }

})