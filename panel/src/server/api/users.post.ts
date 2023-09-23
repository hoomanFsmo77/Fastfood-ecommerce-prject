import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import { readFiles } from 'h3-formidable';
import {nodeFormDataBody,serializeError} from "~/utils/functions";
import * as fs from "fs";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    const { fields, files } = await readFiles(event, {includeFields: true});



    if(token && token.jwt){
        if(query.method==='GET' && !query.userID){
            try {
                const req=await $fetch<IResponse<any>>('/users',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        page:query.page || 1,
                        per:query.per || 6
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='GET' && query.userID){
            try {
                const req=await $fetch<IResponse<any>>('/users',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        userID:query.userID
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='DELETE'){
            try {
                const req=await $fetch<IResponse<any>>(`/users/${query.userID}`,{
                    method:'DELETE',
                    baseURL:api_base,
                    headers:{access,token:token.jwt}
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    sendNoContent(event,200)
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='PUT' || query.method==='POST'){
            let body=null
            if(query.method==='PUT'){
                body=(files.profile_image && files.profile_image[0] && files.profile_image[0].filepath) ? {
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
            }else{
                body=(files.profile_image && files.profile_image[0] && files.profile_image[0].filepath) ? {
                    username:fields.username[0],
                    firstname:fields.firstname[0],
                    lastname:fields.lastname[0],
                    email:fields.email[0],
                    phone:fields.phone[0],
                    password:fields.password[0],
                    profile_image:fs.createReadStream(files.profile_image[0].filepath)
                }:{
                    username:fields.username[0],
                    firstname:fields.firstname[0],
                    lastname:fields.lastname[0],
                    email:fields.email[0],
                    password:fields.password[0],
                    phone:fields.phone[0]
                };
            }

            const routeUrl=query.method==='PUT' ? `/users/${query.userID}` : `/users`
            try {
                const request=await $fetch<IResponse<any>>(routeUrl,{
                    method:query.method,
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
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
                console.log(err)
                return  err
            }
        }
    }

})