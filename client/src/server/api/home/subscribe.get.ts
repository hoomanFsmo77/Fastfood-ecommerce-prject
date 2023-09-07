import {getQuery} from "h3";
import {urlEncodeBody} from "~/utils/functions";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev);
    const {api_base,access}=useRuntimeConfig()
    try {
        const request=await $fetch(api_base+'/newsletter',{
            headers:{access},
            method:'POST',
            body:urlEncodeBody({email:query.email})
        })
        return request
    }catch (err) {
        return err
    }
})