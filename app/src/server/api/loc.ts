

import {IResponse} from "~/utils/types";


export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(ev);
    if(query.which==='province'){
        try {
            const req=await $fetch<IResponse<any>>('/loc/provinces',{
                baseURL:api_base,
                headers:{access}
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req.data
            }
        }catch (err) {
            sendNoContent(ev,400)
        }

    }else if(query.which==='city'){
        try {
            const req=await $fetch<IResponse<any>>(`/loc/city/${query.provinceID}`,{
                baseURL:api_base,
                headers:{access}
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req.data
            }
        }catch (err) {
            sendNoContent(ev,400)
        }

    }

})