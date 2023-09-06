

import {IResponse} from "~/utils/types";
import {getCookie} from "h3";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    try {
        const req=await $fetch<IResponse<any>>(api_base+`/custom-product/options`,{
            headers:{access_key,token},

        });
        if(req.error){
            sendNoContent(ev,400)
        }else{
            const addNoImage=Object.entries(req.data);
            addNoImage.forEach(p1=>{
                if(p1[0]!=='templates'){
                    p1[1].unshift({
                        id:0,
                        image:'/no-image.png'
                    })
                }

            })

            return Object.fromEntries(addNoImage)
        }

    }catch (err) {
        return err
    }



})