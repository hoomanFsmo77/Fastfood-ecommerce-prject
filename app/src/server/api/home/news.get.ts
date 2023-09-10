
import { Blog, IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig()
    try {
        const request=await $fetch<IResponse<Blog[]>>(api_base+'/blog/news',{
            headers:{access}
        });
        if(request.error){
            sendNoContent(ev,400)
        }else{
            return request.data
        }

    }catch (err) {
        return err
    }
})