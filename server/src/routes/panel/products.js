const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const mw=require('../../middleware/admin')
const {changeToBoolean, addImageBase, responseHandler, pagination} = require("../../utils");
const {body, validationResult, matchedData, param} = require("express-validator");
const upload = require("../../database/upload");
////// middleware
router.use(mw)
const addProductBodyValidation=()=>body(['categoryID','title','caption','price','description','brief','specification','link','quantity','status','off_percent','off','date_on_sale_from','date_on_sale_to']).notEmpty();
////////////

router.get('/',async (req,res)=>{
    const productID=req.query.productID;
    if(productID){
        const productTarget=await database('product').join('product_category','product.categoryID','=','product_category.id').join('product_specification','product.specification','=','product_specification.id').select('product.*','product_category.name as product_category','product_specification.color as specification_color','product_specification.size as specification_size').where({'product.id':productID});
        const productImages=await database('product_image').select('*').where({productID})
        const addImage=addImageBase(productTarget,'primary_image');
        const addBool=changeToBoolean(addImage,['status','off'])
        res.send({
            ...addBool[0],
           product_images: addImageBase(productImages,'image')
        })
    }else{
        const page=Number(req.query.page) || 1;
        const per_page=Number(req.query.per) || 6;
        const productList=await database('product').join('product_category','product.categoryID','=','product_category.id').select('product.title','product.primary_image','product.categoryID','product.price','product.quantity','product.status','product_category.name as product_category','product.off_percent','product.link','product.id','product.off');
        const changeToBool=changeToBoolean(productList,['status','off'])
        const result=addImageBase(changeToBool,'primary_image')
        res.status(200).send(responseHandler(false,null,pagination(result,page,per_page,req.originalUrl,'products')))
    }

})
const updateProductBodyValidation=()=>body(['categoryID','title','caption','price','description','brief','link','quantity','status','off_percent','off']).notEmpty();

const optionalBody=()=>body(['date_on_sale_from','date_on_sale_to']).optional()



router.post('/',upload.fields([{name:'primary_image',maxCount:1},{name:'image',maxCount:6}]),updateProductBodyValidation(),optionalBody(),async (req,res)=>{
    const primary_image=req?.files?.primary_image ? req?.files?.primary_image[0]?.filename : null;
    const extra_images=req?.files?.image || null;
    const result =await validationResult(req);
    if(result.isEmpty() && primary_image && extra_images && extra_images.length>0) {
        const data = matchedData(req);
        const body={
            categoryID:data.categoryID,
            title:data.title,
            caption:data.caption,
            price:data.price,
            description:data.description,
            brief:data.brief,
            specification:1,
            link:data.link,
            quantity:data.quantity,
            status:data.status,
            off_percent:data.off_percent,
            off:data.off,
            date_on_sale_from:data.date_on_sale_from || null,
            date_on_sale_to:data.date_on_sale_to || null,
            primary_image:primary_image
        }

        database('product').insert(body).then(async res=>{
            await Promise.all(extra_images.map((image,index)=>database('product_image').insert({image:image.filename,productID:res[0]})));
        });
        res.status(200).send(responseHandler(false,'product updated',null));
    }else{
        res.status(200).send(responseHandler(true,[...result.array(),{
            "type": "field",
            "msg": "At least one primary image and one extra image!",
            "path": "primary_image",
            "location": "body"
        }],null))
    }
})

router.delete('/',async (req,res)=>{
    const productID=req.query.productID
    if(productID){
        const deleteProductImage=await database('product_image').where({productID:productID}).del();
        const deleteProduct=await database('product').where({id:productID}).del();
        res.status(200).send(responseHandler(false,'product deleted',null))
    }else{
        res.status(200).send(responseHandler(true,'missing required query : productID',null))
    }

})





router.put('/:id',upload.fields([{name:'primary_image',maxCount:1},{name:'image',maxCount:6},{name:'add_image',maxCount:6}]),updateProductBodyValidation(),optionalBody(),body('delImage[*]').optional(),param('id').notEmpty(), async (req,res)=>{
    const primary_image=req?.files?.primary_image ? req?.files?.primary_image[0]?.filename : null;
    const extra_images=req?.files?.image || null;
    const add_images=req?.files?.add_image || null;
    const result =await validationResult(req);
    if(result.isEmpty()) {
        const data = matchedData(req);
        const body={
            categoryID:data.categoryID,
            title:data.title,
            caption:data.caption,
            price:data.price,
            description:data.description,
            brief:data.brief,
            specification:1,
            link:data.link,
            quantity:data.quantity,
            status:data.status,
            off_percent:data.off_percent,
            off:data.off,
            date_on_sale_from:data.date_on_sale_from || null,
            date_on_sale_to:data.date_on_sale_to || null,
            primary_image:primary_image
        }

        if(!primary_image){
            delete body.primary_image
        }
        await database('product').update(body).where({id:data.id});


        const imageIds=data.image && data.image.filter(item=>item && item.length>0);
        if(extra_images && imageIds && extra_images.length>0 && imageIds.length>0 && imageIds.length===extra_images.length){
            await Promise.all(imageIds.map((id,index)=>database('product_image').where({productID:data.id,id:Number(id)}).update({image:extra_images[index].filename})))
        }
        if(add_images && add_images.length>0){
            await Promise.all(add_images.map(item=> database('product_image').insert({image:item.filename,productID:data.id})))
        }

        const delImageIds=data.delImage && data.delImage.filter(item=>item && item.length>0);
        if(delImageIds && delImageIds.length>0){
            await Promise.all(delImageIds.map(id=> database('product_image').del().where({id:Number(id),productID:data.id})))
        }


        res.status(200).send(responseHandler(false,'product updated',null));
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})

module.exports=router