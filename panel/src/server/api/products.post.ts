import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import {nodeFormDataBody, serializeError} from "~/utils/functions";
import {readFiles} from "h3-formidable";
import * as fs from "fs";
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
            if(query.method==='PUT'){
                body= {
                    categoryID:fields.categoryID[0],
                    link:fields.link[0],
                    title:fields.title[0],
                    price:fields.price[0],
                    caption:fields.caption[0],
                    description:fields.description[0],
                    brief:fields.brief[0],
                    specification:fields.specification[0],
                    quantity:fields.quantity[0],
                    status:fields.status[0],
                    off:fields.off[0],
                    off_percent:fields.off_percent[0],
                    date_on_sale_from:fields.date_on_sale_from[0],
                    date_on_sale_to:fields.date_on_sale_to[0],
                    image1_id:fields.image1_id[0],
                    image2_id:fields.image2_id[0],
                    primary_image:fs.createReadStream(files.primary_image[0].filepath),
                    image_1:fs.createReadStream(files.image_1[0].filepath),
                    image_2:fs.createReadStream(files.image_2[0].filepath),
                }
            }else{
                body={
                    categoryID:fields.categoryID[0],
                    link:fields.link[0],
                    title:fields.title[0],
                    price:fields.price[0],
                    caption:fields.caption[0],
                    description:fields.description[0],
                    brief:fields.brief[0],
                    specification:fields.specification[0],
                    quantity:fields.quantity[0],
                    status:fields.status[0],
                    off:fields.off[0],
                    off_percent:fields.off_percent[0],
                    date_on_sale_from:fields.date_on_sale_from[0],
                    date_on_sale_to:fields.date_on_sale_to[0],
                    primary_image:fs.createReadStream(files.primary_image[0].filepath),
                    image_1:fs.createReadStream(files.image_1[0].filepath),
                    image_2:fs.createReadStream(files.image_2[0].filepath),
                }
            }

            const routeUrl=query.method==='PUT' ? `/products/${query.productID}` : `/products`
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