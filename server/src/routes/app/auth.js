const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {body,header, validationResult, matchedData} = require("express-validator");
const {responseHandler,addImageBase,changeToBoolean} = require("../../utils");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}))


router.post('/login',body('email').isEmail(),body('password').notEmpty(),async (req,res)=>{
    const result = await validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('users').
        select('*').
        where({email:body.email}).
        then(response=>{
            if(response.length>0){
                bcrypt.compare(body.password, response[0].password, function(err, result) {
                    if(result){
                        res.status(200).send(responseHandler(false,null,response[0]))
                    }else{
                        res.status(200).send(responseHandler(true,'password is incorrect.',null))
                    }
                });
            }else{
                res.status(200).send(responseHandler(true,'email is not found!',null))
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }


})

router.get('/me',header('token').notEmpty(),(req,res)=>{
    const result =  validationResult(req);
    if(result.isEmpty()) {
        const header = matchedData(req);
        database('users').
        select(['firstname','lastname','username','profile_image','phone','email','isAdmin','id']).
        where({token:header.token}).
        then(response=>{
            if(response.length>0){
                res.status(200).send(responseHandler(false,null,changeToBoolean(addImageBase(response,'profile_image'),'isAdmin')))
            }else{
                res.status(200).send(responseHandler(true,'user not found!',null))
            }
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})



module.exports=router
