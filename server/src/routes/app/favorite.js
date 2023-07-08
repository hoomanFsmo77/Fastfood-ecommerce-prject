const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {responseHandler, addImageBase, changeToBoolean, pagination} = require("../../utils");
const {query, validationResult, matchedData} = require("express-validator");
const mw=require('../../middleware/profile')

///// middleware
router.use(mw)


router.post('/',async (req,res)=>{
    const userID=req.headers.id;
    const productID=req.query.productID;
    if(productID){
        const isExist=await database('favorite').where({userID,productID});
        if(isExist.length>0){
            res.status(200).send(responseHandler(true,'favorite item already exist!',null))
        }else{
            database('favorite').
            insert({userID,productID}).
            then(response=>{
                res.status(200).send(responseHandler(false,'favorite item added.',null))
            }).catch(err=>{
                res.status(503).send('error in db')
            })
        }

    }else{
        res.status(200).send(responseHandler(false,'missing required query : productID',null))
    }
})


router.delete('/',(req,res)=>{
    const userID=req.headers.id;
    const favID=req.query.favID;
    if(favID){
        database('favorite').
        where({userID,id:favID}).
        del().
        then(response=>{
            res.status(200).send(responseHandler(false,null,'favorite item removed.'))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(false,'missing required query : favID',null));
    }
})


router.get('/',async (req,res)=>{
    const userID=req.headers.id;
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 6;
    const favoriteItems=await database('favorite').where({'favorite.userID':userID}).join('product','favorite.userID','=','product.id').join('product_category','product.categoryID','=','product_category.id').select('product.*','product_category.name as product_category')
    const addImage=addImageBase(favoriteItems,'primary_image');
    const changeBoolean=changeToBoolean(addImage,['status','off'])
    res.status(200).send(responseHandler(false,null,pagination(changeBoolean,page,per_page,req.originalUrl,'items')))


})


module.exports=router