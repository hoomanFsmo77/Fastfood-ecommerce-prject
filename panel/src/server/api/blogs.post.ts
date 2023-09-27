import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import fs from "fs";
import {nodeFormDataBody, serializeError} from "~/utils/functions";
import {readFiles} from "h3-formidable";
import Form from "form-data";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    const { fields, files } = await readFiles(event, {includeFields: true});
    const entriesField=Object.entries(fields)
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
            const form=new Form();
            form.append('categoryID',fields.categoryID[0])
            form.append('title',fields.title[0])
            form.append('brief',fields.brief[0])
            form.append('link',fields.link[0])
            files.image_sm && files.image_sm[0] && form.append('image_sm',fs.createReadStream(files.image_sm[0].filepath));
            files.image_xs && files.image_xs[0] && form.append('image_xs',fs.createReadStream(files.image_xs[0].filepath));
            files.image_lg && files.image_lg[0] && form.append('image_lg',fs.createReadStream(files.image_lg[0].filepath));
            if(query.method==='PUT'){
                const filterEditedContent=entriesField.filter(item=>item[0].startsWith('content_') || item[0].startsWith('title_'));
                const filterAddContent=entriesField.filter(item=>item[0].startsWith('add_content_') || item[0].startsWith('add_title_'));
                const filterDelContent=entriesField.filter(item=>item[0].startsWith('delContent[') );
                if(filterEditedContent.length>0){
                    filterEditedContent.forEach(item=>{
                        form.append(item[0],item[1][0])
                    })
                }
                if(filterAddContent.length>0){
                    filterAddContent.forEach((item,index)=>{
                        form.append(item[0],item[1][0])
                    })
                }
                if(filterDelContent.length>0){
                    filterDelContent.forEach((item,index)=>{
                        form.append(`delContent[${item[1][0]}]`,item[1][0])
                    })
                }
            }else{
                const filterAddContent=entriesField.filter(item=>item[0].startsWith('add_content_') || item[0].startsWith('add_title_'));
                if(filterAddContent.length>0){
                    filterAddContent.forEach((item,index)=>{
                        form.append(item[0],item[1][0])
                    })
                }

            }


            const routeUrl=query.method==='PUT' ? `/blog/${query.blogID}` : `/blog`
            try {
                const request=await $fetch<IResponse<any>>(routeUrl,{
                    method:query.method,
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    body:form
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