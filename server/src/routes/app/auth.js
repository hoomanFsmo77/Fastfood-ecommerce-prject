const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {body,header, validationResult, matchedData} = require("express-validator");
const {responseHandler,addImageBase,changeToBoolean, today} = require("../../utils");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const upload = require("../../database/upload");
const {nanoid} = require("nanoid");
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
                        res.status(200).send(responseHandler(false,null,addImageBase(response,'profile_image')[0]))
                    }else{
                        res.status(200).send(responseHandler(true,'password is incorrect.',null))
                    }
                });
            }else{
                res.status(200).send(responseHandler(true,'email address is invalid!',null))
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
                res.status(200).send(responseHandler(false,null,changeToBoolean(addImageBase(response,'profile_image'),'isAdmin')[0]))
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

//// register
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
                    password:await bcrypt.hash(body.password, 10),
                    phone:body.phone,
                    email:body.email,
                    registered_at:today,
                    profile_image:req?.file?.filename || '1688207258297.jpeg',
                    token:token
                }).
                then(response=>{
                    res.status(200).send(responseHandler(false,'user registered.',{
                        token:token
                    }))
                }).catch(err=>{
                    res.status(503).send('error in db')
                })
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})


module.exports=router
