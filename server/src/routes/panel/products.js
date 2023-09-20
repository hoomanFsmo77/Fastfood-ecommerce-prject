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
        const productTarget=await database('product').join('product_category','product.categoryID','=','product_category.id').select('product.*','product_category.name as product_category').where({'product.id':productID});
        const productImages=await database('product_image').select('*').where({productID})
        const result=addImageBase(productTarget,'primary_image')
        res.send({
            ...result[0],
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

router.post('/',upload.fields([{name:'primary_image'},{name:'image_1'},{name:'image_2'}]),addProductBodyValidation(),(req,res)=>{
    const primary_image=req?.files.primary_image[0].filename
    const image_1=req?.files.image_1[0].filename
    const image_2=req?.files.image_2[0].filename
    const result = validationResult(req);
    if(result.isEmpty() && primary_image && image_1 && image_2) {
        const body = matchedData(req);
        database('product').
        insert({
            ...body,
            primary_image:primary_image
        }).
        then(async response=>{
            const productID=response[0];
            const addImage1=await database('product_image').insert({productID:productID,image:image_1});
            const addImage2=await database('product_image').insert({productID:productID,image:image_2});
            res.status(200).send(responseHandler(false,'product added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        });
    }else{
        if(result.array().length>0 && req?.file?.filename){
            res.status(200).send(responseHandler(true,result.array(),null))
        }else{
            res.status(200).send(responseHandler(true,[...result.array(),{
                "type": "field",
                "msg": "Invalid value",
                "path": "primary_image",
                "location": "body"
            }],null));
        }
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


const updateProductBodyValidation=()=>body(['categoryID','title','caption','price','description','brief','specification','link','quantity','status','off_percent','off','date_on_sale_from','date_on_sale_to','image1_id','image2_id']).notEmpty();

router.put('/:id',upload.fields([{name:'primary_image'},{name:'image_1'},{name:'image_2'}]),updateProductBodyValidation(),param('id').notEmpty(), async (req,res)=>{
    const primary_image=req?.files.primary_image[0].filename;
    const image_1=req?.files.image_1[0].filename;
    const image_2=req?.files.image_2[0].filename;
    const result =await validationResult(req);
    if(result.isEmpty() && primary_image && image_1 && image_2) {
        const data = matchedData(req);
        const updateProductData=await database('product').update({
            categoryID:data.categoryID,
            title:data.title,
            caption:data.caption,
            price:data.price,
            description:data.description,
            brief:data.brief,
            specification:data.specification,
            link:data.link,
            quantity:data.quantity,
            status:data.status,
            off_percent:data.off_percent,
            off:data.off,
            date_on_sale_from:data.date_on_sale_from,
            date_on_sale_to:data.date_on_sale_to,
            primary_image:primary_image
        }).where({id:data.id});
        const updateImage1=await database('product_image').where({productID:data.id,id:data.image1_id}).update({image:image_1});
        const updateImage2=await database('product_image').where({productID:data.id,id:data.image2_id}).update({image:image_2});
        res.status(200).send(responseHandler(false,'product updated',null));
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})

module.exports=router