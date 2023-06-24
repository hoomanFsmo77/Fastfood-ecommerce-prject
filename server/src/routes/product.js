const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}));
const database=require('../database/database');
const {responseHandler,changeToBoolean,sortByCategory,addImageBase}=require('../helper');
const _ = require('lodash');
const {body, validationResult, matchedData} = require("express-validator");
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



////// get product tab
router.get('/tab',async (req,res)=>{
    const products=await database('product').join('category','category.id','=','product.categoryID').select('product.id','product.categoryID','product.title','product.caption','product.price','product.primary_image','product.link','product.status','product.off','product.off_percent','category.name as category');
    const productsIds=_.map(products, (el) => el.id);
    const images = await database('product_image').select().whereIn('productID', productsIds)
    const groupedImages = _.groupBy(images, 'productID');
    const imagesEmbedded = _.map(products, (record) => {
        return {
            ...record,
            images: groupedImages[record.id] ,
        };
    });
    const changeNumberToBoolean=changeToBoolean(imagesEmbedded,['status','off']);
    const imageBase=process.env.IMAGE_PATH;
    const result=addImageBase(changeNumberToBoolean,'primary_image').map(item=>{
        if(item.images){
            return {
                ...item,
                images:item.images.map(sub_item=>{
                    return {...sub_item,image:imageBase+sub_item.image}
                })
            }
        }else{
            return item
        }
    })
    res.status(200).send(responseHandler(false,null,sortByCategory(result)))
})

////// add product tab
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









module.exports=router
