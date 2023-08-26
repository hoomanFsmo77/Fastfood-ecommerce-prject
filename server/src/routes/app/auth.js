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

const emailRegex=/^([^\.\_])([\w\d\.\_]+)(\@)(\w{1,6})(\.)(\w{1,4})$/g
const phoneRegex=/^09\d{9}$/
const usernameRegex=/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g

router.post('/login',async (req,res)=>{
    const identity=req.body.identity.trim();
    const password=req.body.password.trim();
    if(identity && password){
        const getUser=await database('users').where({email:identity}).orWhere({phone:identity}).orWhere({username:identity})

        if(getUser.length>0){
            await bcrypt.compare(password, getUser[0].password, function(err, result) {
                if(result){
                    res.status(200).send(responseHandler(false,null,addImageBase(getUser,'profile_image')[0]))
                }else{
                    res.status(200).send(responseHandler(true,'password is incorrect.',null))
                }
            });
        }else{
            res.status(200).send(responseHandler(true,'username, email or phone number is invalid!',null))
        }

    }else{
        res.status(200).send(responseHandler(true,'identity and password are required!',null))
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
