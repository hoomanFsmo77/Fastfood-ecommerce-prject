import {getQuery} from "h3";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev)
    const {api_base,access_key}=useRuntimeConfig()
    try {
        const request=await $fetch(api_base+'/menu',{
            query:{category:query.context},
            headers:{access_key}
        })
        return request
    }catch (err) {
        return err
    }
})