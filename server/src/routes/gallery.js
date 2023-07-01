const express=require('express');
const router=express.Router();
const database=require('../database/database')
const bodyParser = require("body-parser");
const {body,query ,validationResult,matchedData} = require('express-validator');
const {responseHandler,addImageBase} = require("../utils");
const upload=require('../database/upload')
router.use(bodyParser.urlencoded({extended:true}))
/////////////////////////////////////////////////////////////////

router.post('/',upload.single('image'),body('title').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() && req?.file?.filename) {
        const body = matchedData(req);
        database('gallery').
        insert({
            title:body.title,
            image:req.file.filename
        }).then(response=>{
            res.status(200).send(responseHandler(false,'gallery added',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
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
            }],null));
        }
    }


})

router.get('/',(req,res)=>{
    database('gallery').
    select('*').
    then(response=>{
        res.status(200).send(responseHandler(false,null,addImageBase(response,'image')))
    }).catch(err=>{
        res.status(200).send(responseHandler(true,'error in db',null))
    })
})


module.exports=router
