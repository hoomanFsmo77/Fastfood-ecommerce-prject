import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import fs from "fs";
import {nodeFormDataBody, serializeError} from "~/utils/functions";
import {readFiles} from "h3-formidable";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    const { fields, files } = await readFiles(event, {includeFields: true});
    if(token && token.jwt){
        if(query.method==='GET' && !query.link){
            try {
                const req=await $fetch<IResponse<any>>('/blog',{
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
        }else if(query.method==='GET' && query.link){
            try {
                const req=await $fetch<IResponse<any>>('/blog',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        link:query.link
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
        }else  if(query.method==='PUT' || query.method==='POST'){
            let body={
                categoryID:fields.categoryID[0],
                title:fields.title[0],
                brief:fields.brief[0],
                link:fields.link[0],
                image_sm:files.image_sm && files.image_sm[0] ? fs.createReadStream(files.image_sm[0].filepath): null,
                image_xs:files.image_xs && files.image_xs[0] ? fs.createReadStream(files.image_xs[0].filepath): null,
                image_lg:files.image_lg && files.image_lg[0] ? fs.createReadStream(files.image_lg[0].filepath): null,
            }
            !body.image_sm  && delete  body.image_sm;
            !body.image_xs  && delete  body.image_xs;
            !body.image_lg  && delete  body.image_lg;

            const routeUrl=query.method==='PUT' ? `/blog/${query.blogID}` : `/blog`
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
                return  err
            }
        }else if(query.method==='DELETE'){
            try {
                const req=await $fetch<IResponse<any>>(`/blog`,{
                    method:'DELETE',
                    baseURL:api_base,
                    query:{
                        id:query.id
                    },
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
        }
    }

})