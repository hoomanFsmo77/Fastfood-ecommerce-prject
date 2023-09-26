import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import {nodeFormDataBody, serializeError} from "~/utils/functions";
import {readFiles} from "h3-formidable";
import * as fs from "fs";
import Form from "form-data";
export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    const { fields, files } = await readFiles(event, {includeFields: true});
    if(token && token.jwt){
        if(query.method==='GET' && !query.productID){
            try {
                const req=await $fetch<IResponse<any>>('/products',{
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
        }else if(query.method==='GET' && query.productID){
            try {
                const req=await $fetch<IResponse<any>>('/products',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        productID:query.productID
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='PUT' || query.method==='POST'){
            let body=null
            const form=new Form();
            if(query.method==='PUT'){
                form.append('categoryID',fields.categoryID[0])
                form.append('link',fields.link[0])
                form.append('title',fields.title[0])
                form.append('price',fields.price[0])
                form.append('caption',fields.caption[0])
                form.append('description',fields.description[0])
                form.append('brief',fields.brief[0])
                form.append('quantity',fields.quantity[0])
                form.append('status',fields.status[0])
                form.append('off',fields.off[0])
                form.append('off_percent',fields.off_percent[0])
                fields.date_on_sale_from && form.append('date_on_sale_from',fields.date_on_sale_from[0]);
                fields.date_on_sale_to && form.append('date_on_sale_to',fields.date_on_sale_to[0]);
                files.primary_image && form.append('primary_image',fs.createReadStream(files.primary_image[0].filepath));
                if(files.image && files.image.length>0){
                    files.image.forEach(item=>{
                        form.append('image',fs.createReadStream(item.filepath));
                    })
                }
                if(files.add_image && files.add_image.length>0){
                    files.add_image.forEach(item=>{
                        form.append('add_image',fs.createReadStream(item.filepath));
                    })
                }

                const filterIds=Object.entries(fields).filter(item=>item[0].startsWith('delImage')|| item[0].startsWith('image['));
                if(filterIds.length>0){
                    filterIds.forEach(item=>{
                        form.append(item[0],item[1][0])
                    })
                }
            }else{
                form.append('categoryID',fields.categoryID[0])
                form.append('link',fields.link[0])
                form.append('title',fields.title[0])
                form.append('price',fields.price[0])
                form.append('caption',fields.caption[0])
                form.append('description',fields.description[0])
                form.append('brief',fields.brief[0])
                form.append('quantity',fields.quantity[0])
                form.append('status',fields.status[0])
                form.append('off',fields.off[0])
                form.append('off_percent',fields.off_percent[0])
                fields.date_on_sale_from && form.append('date_on_sale_from',fields.date_on_sale_from[0]);
                fields.date_on_sale_to && form.append('date_on_sale_to',fields.date_on_sale_to[0]);
                files.primary_image && form.append('primary_image',fs.createReadStream(files.primary_image[0].filepath));
                if(files.image && files.image.length>0){
                    files.image.forEach(item=>{
                        form.append('image',fs.createReadStream(item.filepath));
                    })
                }

            }

            const routeUrl=query.method==='PUT' ? `/products/${query.productID}` : `/products`
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
                console.log(err)
                return  err
            }
        }else if(query.method==='DELETE'){
            try {
                const req=await $fetch<IResponse<any>>(`/products`,{
                    method:'DELETE',
                    baseURL:api_base,
                    query:{
                        productID:query.productID
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