const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const mw=require('../../middleware/admin')
const {changeToBoolean, addImageBase, responseHandler, pagination} = require("../../utils");
const {body, validationResult, matchedData, param} = require("express-validator");
const upload = require("../../database/upload");
////// middleware
router.use(mw)
const addOfferBodyValidation=()=>body(['title','price','specification_1','specification_2','specification_3','link']).notEmpty();
////////////

router.get('/',async (req,res)=>{
    const id=req.query.id;
    if(id){
        database('offer').where({id}).select('*').then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }else{
        database('offer').select('*').then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }

})


router.post('/',upload.single('image'),addOfferBodyValidation(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()  && req?.file?.filename) {
        const body = matchedData(req);
        database('offer').
        insert({
            ...body,
            image:req.file.filename
        }).
        then(async response=>{
            res.status(200).send(responseHandler(false,'offer added',null))
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
    const offerID=req.query.id
    if(offerID){
        await database('offer').where({id:offerID}).del();
        res.status(200).send(responseHandler(false,'offer deleted',null))
    }else{
        res.status(200).send(responseHandler(true,'missing required query : productID',null))
    }

})




router.put('/:id',upload.single('image'),addOfferBodyValidation(), async (req,res)=>{
    const result =await validationResult(req);
    if(result.isEmpty() && req?.file?.filename) {
        const data = matchedData(req);
        await database('offer').update({
            title:data.title,
            price:data.price,
            specification_2:data.specification_2,
            specification_1:data.specification_1,
            specification_3:data.specification_3,
            link:data.link,
            image:req.file.filename
        }).where({id:data.id});
        res.status(200).send(responseHandler(false,'offer updated',null));
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})

module.exports=router