const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser')
const database=require('../../database/database');
const {responseHandler,getAllProductFilter,getProductByLinkFilter}=require('../../utils');
const _ = require('lodash');
const {body, validationResult, matchedData,param,query} = require("express-validator");
const upload=require('../../database/upload')
router.use(bodyParser.urlencoded({extended:true}));

////////////////// start get product tab ////////////////////////
router.get('/tab',async (req,res)=>{
    const target=await getAllProductFilter()
    res.status(200).send(responseHandler(false,null,target))
})
////////////////// end get product tab ////////////////////////




////////////////// start add product image  ///////////////////////
router.post('/image',upload.single('image'),(req,res)=>{
    const filename=req?.file?.filename
    const productID=Number(req.body.productID)
    if(filename && productID){
        database('product_image').
        insert({productID:productID,image:filename}).
        then(response=>{
            res.status(200).send(responseHandler(false,'image added',null))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }else{
        res.status(200).send(responseHandler(true,'productID or file is not valid!',null))
    }
})
////////////////// end add product image  ///////////////////////


///////////////// start get product by link //////////////////
router.get('/:link',param('link').notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        const target=await getProductByLinkFilter(param.link)
        res.status(200).send(responseHandler(false,null,target))
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

///////////////// end get product by link //////////////////




module.exports=router
