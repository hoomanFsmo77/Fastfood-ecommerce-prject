const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}));
const database=require('../database/database');
const {responseHandler,getAllProductFilter,getProductByLinkFilter}=require('../utils');
const _ = require('lodash');
const {body, validationResult, matchedData,param,query} = require("express-validator");





/////////////
const multer  = require('multer')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/storage/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "svg") {
        cb(null, true);
    } else {
        cb("Not a jpeg|jpg|png|svg File!!", false);
    }
};
const upload = multer({storage: multerStorage, fileFilter: multerFilter})
///////////////////////////

////////////////// start get product tab ////////////////////////
router.get('/tab',async (req,res)=>{
    const target=await getAllProductFilter()
    res.status(200).send(responseHandler(false,null,target))
})
////////////////// end get product tab ////////////////////////

////////////////// start add product tab ////////////////////////
const addProductBodyValidation=()=>body(['categoryID','title','caption','price','description','brief','specification','link','quantity']).notEmpty();

router.post('/',upload.single('primary_image'),addProductBodyValidation(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() && req?.file?.filename) {
        const body = matchedData(req);
        database('product').
        insert({
            ...body,
            primary_image:req.file.filename
        }).
        then(response=>{
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
////////////////// end add product tab ////////////////////////


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
