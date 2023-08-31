const database = require("../../database/database");
const express=require('express');
const router=express.Router();
const {responseHandler, addImageBase} = require("../../utils");
const mw=require('../../middleware/profile')

/////////// middleware
router.use(mw)


router.get('/sizes',async (req,res)=>{
    const result=await database('product_size').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})



router.get('/sauces',async (req,res)=>{
    const result=await database('product_sauces').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})

router.get('/cheese',async (req,res)=>{
    const result=await database('product_cheese').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})

router.get('/toppings',async (req,res)=>{
    const result=await database('product_toppings').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})

router.get('/templates',async (req,res)=>{
    const result=await database('product_templates').select('*');
    res.status(200).send(responseHandler(false,null,addImageBase(result,'image')))
})

module.exports=router