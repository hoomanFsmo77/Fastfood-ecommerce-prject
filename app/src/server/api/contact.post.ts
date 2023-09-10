
import {readBody} from "h3";
import {IResponse} from "~/utils/types";
import {serializeError,urlEncodeBody} from "~/utils/functions";

export default defineEventHandler(async ev=>{
    const body=await readBody(ev);
    const {api_base,access}=useRuntimeConfig();
    try {
        const request=await $fetch<IResponse<any>>(`/contact-us`,{
            method:'POST',
            baseURL:api_base,
            body:urlEncodeBody(body),
            headers:{
                access,
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        if(request.error){
            return {
                code:400,
                errors:serializeError(request.errors)
            }
        }else{
            return {
                code:200,
                errors:null,
            }
        }
    }catch (err) {
        sendNoContent(ev,400)
    }
})