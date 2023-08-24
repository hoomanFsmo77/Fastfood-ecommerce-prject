
import { IResponse} from "~/utils/types";
import {readBody,setCookie} from "h3";
import {urlEncodeBody,serializeError} from "~/utils/functions";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const body=await readBody(ev);
    try {
        const request=await $fetch<IResponse<any>>(api_base+'/auth/login',{
            method:'POST',
            headers:{
                access_key,
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:urlEncodeBody({
                email:body.login_email,
                password:body.login_password,
            })
        });
        if(request.error){
            return {
                code:400,
                errors:serializeError(request.errors)
            }
        }else{
            const {token,firstname,lastname,username,profile_image,phone,email}=request.data;
            setCookie(ev,'x_wengdo_x',token,{
                httpOnly:true,
                secure:true,
                path:'/',
                maxAge:5*24*60*60
            });
            return {
                code:200,
                errors:null,
                data:{
                    firstname, lastname, username, profile_image, email,phone
                }
            }
        }
    }catch (err) {
        return err
    }
})