const express=require('express');
const router=express.Router();
const database=require('../database/database');
const bodyParser = require("body-parser");
const {body, validationResult, matchedData,param,query} = require("express-validator");
const multer  = require('multer')
const {responseHandler} = require("../utils");
router.use(bodyParser.urlencoded({extended:true}));

//////////////////// multer ////////////////////
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/storage/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "svg") {
        cb(null, true);
    } else {
        cb("Not a jpeg|jpg|png|svg File!!", false);
    }
};
const upload = multer({storage: multerStorage, fileFilter: multerFilter})

////////////////////// add user start ///////////////////////
const bodyValidation=()=>body(['username','firstname','lastname']).notEmpty();
router.post('/',upload.single('profile_image'),bodyValidation(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() && req?.file?.filename) {
        const body = matchedData(req);
        database('users').
        insert({...body,profile_image:req.file.filename}).
        then(response=>{
            res.status(200).send(responseHandler(false,'user added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        if(result.array().length>0 && req?.file?.filename){
            res.status(200).send(responseHandler(true,result.array(),null))
        }else{
            res.status(200).send(responseHandler(true,[...result.array(),{
                "type": "field",
                "msg": "Invalid value",
                "path": "profile_image",
                "location": "body"
            }],null));
        }
    }



})
////////////////////// add user end ///////////////////////


module.exports=router
