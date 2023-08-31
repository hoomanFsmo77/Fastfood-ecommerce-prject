const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser')
const database=require('../../database/database');
const {responseHandler,getAllProductFilter,getProductByLinkFilter, addImageBase, changeToBoolean,removeDuplicate,
    pagination, getCommentsByLink
}=require('../../utils');
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
/// get all



router.get('/all',async (req,res)=>{
        const allProducts=await database('product').select('*').join('product_specification','product.specification','=','product_specification.id');
        const changeImage=addImageBase(allProducts,'primary_image');
        const changeToBool=changeToBoolean(changeImage,['status','off'])
        res.status(200).send(responseHandler(false,null,removeDuplicate(changeToBool,'title')))
})

///////////////// start get product by link //////////////////
router.get('/:link',param('link').notEmpty(),async (req,res)=>{
	
    const result = validationResult(req);
    if(result.isEmpty()) {
	try{
	    const param = matchedData(req);
            const target=await getProductByLinkFilter(param.link)
	    res.status(200).send(responseHandler(false,null,target))

	}catch(err){
            res.status(200).send(responseHandler(true,result.array(),null))
         }
        
        
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

///////////////// end get product by link //////////////////

//// get product comment by product link
router.get('/comments/:productID',async (req,res)=>{
    const productID=req.params.productID
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 3;
    const comments=await getCommentsByLink(productID);
    res.status(200).send(responseHandler(false,null,pagination(comments,page,per_page,req.originalUrl,'comments')))

})


module.exports=router
