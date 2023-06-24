const express=require('express')
const router=express.Router();
const database=require('../database/database')
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({
    extended:true
}));
const {responseHandler}=require('../helper')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {nanoid} = require('nanoid')
const {body ,validationResult,matchedData} = require('express-validator');

const emailValidator=()=>body('email').isEmail().withMessage('Enter a Valid Email Address!');
const passwordValidator=()=>body('password').isLength({min:6,max:12}).withMessage('Password must be between 6 and 12 characters!');

router.post('/',emailValidator(),passwordValidator(),async (req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const body = matchedData(req);
        const token=nanoid(48)
        const userData={
            token:token,
            email:body.email,
            password: await bcrypt.hash(body.password, saltRounds)
        };
        database('registered').where({email:userData.email}).then(response=>{
            if(response.length>0){
                res.status(200).send(responseHandler(false,'Your email address already exist!',
                    {
                        access_key:response[0].token,
                        expiresAt:`${response[0].expiresAt.getFullYear()}-${response[0].expiresAt.getMonth()+2}-${response[0].expiresAt.getDate()}`
                        }
                ));
            }else{
                database('registered').
                insert(userData).
                then(response=>{
                    const date=new Date()
                    res.status(200).send(responseHandler(false,null,
                        {
                            access_key:userData.token,
                            expiresAt:`${date.getFullYear()}-${date.getMonth()+2}-${date.getDate()}`
                        }
                    ))
                }).catch(err=>{
                    res.status(503).send('error in connecting to database')
                })
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null));
    }

})




module.exports=router

