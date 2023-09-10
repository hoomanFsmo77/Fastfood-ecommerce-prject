
import { readFiles } from 'h3-formidable';
import {IResponse} from "~/utils/types";
import {serializeError,nodeFormDataBody} from "~/utils/functions";
import * as fs from "fs";
export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const { fields, files } = await readFiles(ev, {includeFields: true});
    try {
        const request=await $fetch<IResponse<any>>(api_base+'/auth/register',{
            method:'POST',
            headers:{access},
            body:nodeFormDataBody({
                username:fields.username[0],
                firstname:fields.firstname[0],
                lastname:fields.lastname[0],
                email:fields.email[0],
                phone:fields.phone[0],
                profile_image:fs.createReadStream(files.profile_image[0].filepath),
                password:fields.password[0],
            })
        });
        if(request.error){
            return {
                code:400,
                errors:serializeError(request.errors)
            }
        }else{
            return  {
                code:200,
                errors:null
            }
        }

    }catch (err) {
        return  err
    }

})