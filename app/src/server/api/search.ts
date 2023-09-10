import {getQuery} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const query=await getQuery(ev);
    const {api_base,access}=useRuntimeConfig();
    const reqQueries=query.limit ? {limit:query.limit} : {per:query.per,page:query.page};
    try {
        const request=await $fetch<IResponse<any>>(api_base+`/search/${query?.cat}/${query?.search}`,{
            query:reqQueries,
            headers:{access}
        })
        if(request.error){
            sendNoContent(ev,400)
        }else{
            return request.data

        }
    }catch (err) {
        return err
    }
})