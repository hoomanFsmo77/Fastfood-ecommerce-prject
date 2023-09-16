const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {body,header, validationResult, matchedData} = require("express-validator");
const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const {responseHandler} = require("../../utils");
const saltRounds = 10;
router.use(bodyParser.urlencoded({extended:true}))

////////////////////
const requiredBodyValidation=()=>body(['username','firstname','lastname']).notEmpty();
const emailValidation=()=>body(['email']).isEmail();
const passwordValidation=()=>body(['password']).isStrongPassword();

//// register
router.post('/register',requiredBodyValidation(),emailValidation(),passwordValidation(),async (req,res)=>{
    const result = await validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('admins').
        select(['*']).
        where({email:body.email,username:body.username}).
        then( async response=>{
            if(response.length>0){
                res.status(200).send(responseHandler(true,'email or username already exist!',{
                    token:response[0].token
                }))
            }else{
                const token=nanoid(48);
                database('admins').
                insert({
                    username:body.username,
                    firstname:body.firstname,
                    lastname:body.lastname,
                    password:await bcrypt.hash(body.password, saltRounds),
                    email:body.email,
                    token:token
                }).
                then(response=>{
                    res.status(200).send(responseHandler(false,'you are registered.', {token:token}))
                }).catch(err=>{
                    res.status(503).send('error in db')
                })
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})
//// login
router.post('/login',body('email').isEmail(),body('password').notEmpty(),async (req,res)=>{
    const result = await validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('admins').
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
//// me
router.get('/me',header('token').notEmpty(),(req,res)=>{
    const result =  validationResult(req);
    if(result.isEmpty()) {
        const header = matchedData(req);
        database('admins').
        select(['firstname','lastname','username','email','id']).
        where({token:header.token}).
        then(response=>{
            if(response.length>0){
                res.status(200).send(responseHandler(false,null,response[0]));
            }else{
                res.status(200).send(responseHandler(true,'admin not found!',null))
            }
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})


module.exports=router
