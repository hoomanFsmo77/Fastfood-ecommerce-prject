const express=require('express')
const router=express.Router();
const {body ,validationResult,matchedData} = require('express-validator');
const bodyParser=require('body-parser');
const database=require('../database/database')
const {responseHandler,addImageBase} = require("../utils");
const upload=require('../database/upload')
router.use(bodyParser.urlencoded({
    extended:true
}));
////////////////////////////////////////////////////////

//// insert banner
const bodyValidation=()=>body(['caption','first_text','middle_text','last_text']).notEmpty();

router.post('/',upload.single('image'),bodyValidation(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() && req?.file?.filename){
        const body = matchedData(req);
        const bannerData={...body,image:req.file.filename}
        database('banner').
        insert(bannerData).
        then(response=>{
            res.status(200).send(responseHandler(false,'Item added!',null))
        }).catch(err=>{
            res.status(503).send(responseHandler(true,'error in db',null))
        })
    }else{
        if(result.array().length>0 && req?.file?.filename){
            res.status(200).send(responseHandler(true,result.array(),null))
        }else{
            res.status(200).send(responseHandler(true,[...result.array(),{
                "type": "field",
                "msg": "Invalid value",
                "path": "image",
                "location": "body"
            }],null))
        }

    }
})

//// get banner
router.get('/',(req,res)=>{
    database('banner').select('*').then(response=>{
        res.status(200).send(responseHandler(false,null,addImageBase(response,'image')))
    }).catch(err=>{
        res.status(503).send(responseHandler(true,'error in db',null))
    })
})



module.exports=router