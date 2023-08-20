const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const bodyParser=require('body-parser')
const {responseHandler} = require("../../utils");
const {body, validationResult, matchedData} = require("express-validator");
router.use(bodyParser.urlencoded({extended:true}));


/////////// get all category
router.post('/',body('email').isEmail(),async (req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const body = matchedData(req);
        const isEmailUnique=await database('newsletter').where({email:body.email});
        if(isEmailUnique.length>0){
            res.status(200).send(responseHandler(true,'email address already exist!',null))
        }else{
            await database('newsletter').insert({email:body.email});
            res.status(200).send(responseHandler(false,'email added',null))
        }
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})







module.exports=router
