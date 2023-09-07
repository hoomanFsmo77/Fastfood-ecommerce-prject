
import { readFiles } from 'h3-formidable';
import {IResponse} from "~/utils/types";
import {serializeError,nodeFormDataBody} from "~/utils/functions";
import * as fs from "fs";
import {getCookie} from "h3";
export default defineEventHandler(async ev=>{
    const {api_base,access}=useRuntimeConfig();
    const { fields, files } = await readFiles(ev, {includeFields: true});
    const token=getCookie(ev,'x_wengdo_x');
    const body=(files.profile_image && files.profile_image[0] && files.profile_image[0].filepath) ? {
        username:fields.username[0],
        firstname:fields.firstname[0],
        lastname:fields.lastname[0],
        email:fields.email[0],
        phone:fields.phone[0],
        profile_image:fs.createReadStream(files.profile_image[0].filepath)
    }:{
          username:fields.username[0],
          firstname:fields.firstname[0],
          lastname:fields.lastname[0],
          email:fields.email[0],
          phone:fields.phone[0]
    };

    try {
        const request=await $fetch<IResponse<any>>(api_base+'/profile/info',{
            method:'POST',
            headers:{access,token},
            body:nodeFormDataBody(body)
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