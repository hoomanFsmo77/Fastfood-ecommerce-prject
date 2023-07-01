const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const database=require('../database/database')
router.use(bodyParser.urlencoded({extended:true}))
const {body ,validationResult,matchedData} = require('express-validator');
const {responseHandler} = require("../utils");


router.post('/',body('email').isEmail(),body(['name','subject','message']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const body = matchedData(req);
        database('contact_us').
        insert(body).
        then(response=>{
            res.status(200).send(responseHandler(false,'message has been sent!',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})













module.exports=router
