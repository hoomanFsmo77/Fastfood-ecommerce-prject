const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const bodyParser=require('body-parser')
const {responseHandler,today, pagination, addImageBase}=require('../../utils')
const mw=require('../../middleware/admin')
const upload = require("../../database/upload");
const {validationResult, matchedData, body, param} = require("express-validator");
const {nanoid} = require("nanoid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.use(mw)


const requiredBodyValidation=()=>body(['username','firstname','lastname','phone']).notEmpty();
const emailValidation=()=>body(['email']).isEmail();
const passwordValidation=()=>body(['password']).isStrongPassword();
//////////////////////////////////////


//const adminID=req.headers.admin_id
router.get('/',(req,res)=>{
    const userID=req.query.userID;
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 6;
    if(userID){
        database('users').
        select(['email','firstname','lastname','username','phone','registered_at','id','profile_image']).
        where({id:userID}).
        then(response=>{
            res.status(200).send(responseHandler(false,null,addImageBase(response,'profile_image')[0]))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        database('users').
        select(['email','firstname','lastname','username','phone','registered_at','id','profile_image']).
        then(response=>{
            const addImage=addImageBase(response,'profile_image')
            res.status(200).send(responseHandler(false,null,pagination(addImage,page,per_page,req.originalUrl,'users')))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }
})

/// delete
router.delete('/:id',(req,res)=>{
    const userID=req.params.id;
    if(userID){
        database('users').
        where({id:userID}).
        del().
        then(response=>{
            res.status(200).send(responseHandler(false,'user deleted',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,'missing required id params',null))
    }

})

/// add
router.post('/',upload.single('profile_image'),requiredBodyValidation(),emailValidation(),passwordValidation(),async (req,res)=>{
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
                    registered_at:today,
                    profile_image:req?.file?.filename || '1688207258297.jpeg',
                    token:token
                }).
                then(response=>{
                    res.status(200).send(responseHandler(false,'user registered.',null))
                }).catch(err=>{
                    res.status(503).send('error in db')
                })
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})

// updated

const requiredUpdateBodyValidation=()=>body(['username','firstname','lastname','phone']).notEmpty();
router.put('/:id',upload.single('profile_image'),requiredUpdateBodyValidation(),emailValidation(),param('id').notEmpty(),async (req,res)=>{
    const result = await validationResult(req);
    if(result.isEmpty()) {
        const data = matchedData(req);
        database('users').where({id:data.id}).update(data).then(response=>{
            res.status(200).send(responseHandler(false,'user updated',null))
        }).catch(err=>{
            console.log(err)
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})


module.exports=router
