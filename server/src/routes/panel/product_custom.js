const express=require('express');
const router=express.Router();
const database=require('../../database/database');
const {body, validationResult, matchedData, query, param} = require("express-validator");
const {responseHandler,changeToBoolean,addImageBase, pagination} = require("../../utils");
const mw=require('../../middleware/admin')
const upload = require("../../database/upload");
const bodyParser = require("body-parser");
router.use(mw)

router.get('/sizes',async (req,res)=>{
    const result=await database('product_size').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})


router.post('/sizes',upload.single('image'),body(['size','price']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    const image=req?.file?.filename
    if(result.isEmpty() && image) {
        const body = matchedData(req);
        await database('product_size').insert({
            price:body.price,
            size:body.size,
            image:image
        })
        res.status(200).send(responseHandler(false,'size added',null))
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})


router.get('/sauces',async (req,res)=>{
    const result=await database('product_sauces').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})


router.post('/sauces',upload.single('image'),body(['sauces','price']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    const image=req?.file?.filename
    if(result.isEmpty() && image) {
        const body = matchedData(req);
        await database('product_sauces').insert({
            price:body.price,
            sauces:body.sauces,
            image:image
        })
        res.status(200).send(responseHandler(false,'sauces added',null))
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})


router.get('/cheese',async (req,res)=>{
    const result=await database('product_cheese').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})


router.post('/cheese',upload.single('image'),body(['cheese','price']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    const image=req?.file?.filename
    if(result.isEmpty() && image) {
        const body = matchedData(req);
        await database('product_cheese').insert({
            price:body.price,
            cheese:body.cheese,
            image:image
        })
        res.status(200).send(responseHandler(false,'cheese added',null))
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})


router.get('/toppings',async (req,res)=>{
    const result=await database('product_toppings').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})


router.post('/toppings',upload.single('image'),body(['toppings','price']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    const image=req?.file?.filename
    if(result.isEmpty() && image) {
        const body = matchedData(req);
        await database('product_toppings').insert({
            price:body.price,
            toppings:body.toppings,
            image:image
        })
        res.status(200).send(responseHandler(false,'toppings added',null))
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})



router.get('/templates',async (req,res)=>{
    const result=await database('product_templates').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})


router.post('/templates',upload.single('image'),body(['price']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    const image=req?.file?.filename
    if(result.isEmpty() && image) {
        const body = matchedData(req);
        await database('product_templates').insert({
            price:body.price,
            image:image
        })
        res.status(200).send(responseHandler(false,'template added',null))
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})


module.exports=router