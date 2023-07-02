const express=require('express')
const router=express.Router();
const database=require('../database/database')
const {body,header, validationResult, matchedData} = require("express-validator");
const upload = require("../database/upload");
const {responseHandler,addImageBase,changeToBoolean} = require("../utils");
const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const saltRounds = 10;
router.use(bodyParser.urlencoded({extended:true}))

////////////////////// add user start ///////////////////////
const requiredBodyValidation=()=>body(['username','firstname','lastname','phone']).notEmpty();
const emailValidation=()=>body(['email']).isEmail();
const passwordValidation=()=>body(['password']).isStrongPassword();

router.post('/register',upload.single('profile_image'),requiredBodyValidation(),emailValidation(),passwordValidation(),async (req,res)=>{
    const result = await validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('users').
        select(['*']).
        where({email:body.email}).
        orWhere({phone:body.phone}).
        orWhere({username:body.username}).
        then(async response=>{
            if(response.length>0){
                res.status(200).send(responseHandler(true,'email, phone number or username already exist!',null))
            }else{
                const token=nanoid(48);
                database('users').
                insert({
                    username:body.username,
                    firstname:body.firstname,
                    lastname:body.lastname,
                    password:await bcrypt.hash(body.password, saltRounds),
                    phone:body.phone,
                    email:body.email,
                    profile_image:req?.file?.filename || '1688207258297.jpeg',
                    token:token
                }).
                then(response=>{
                    res.status(200).send(responseHandler(false,'you are registered.',null))
                }).catch(err=>{
                    res.status(503).send('error in db')
                })
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})
////////////////////// add user end ///////////////////////

router.post('/login',body('email').isEmail(),body('password').notEmpty(),async (req,res)=>{
    const result = await validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('users').
        select(['password','token']).
        where({email:body.email}).
        then(response=>{
            if(response.length>0){
                bcrypt.compare(body.password, response[0].password, function(err, result) {
                    if(result){
                        res.status(200).send(responseHandler(false,null,{
                            token:response[0].token
                        }))
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
        select(['firstname','lastname','username','profile_image','phone','email','isAdmin']).
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
