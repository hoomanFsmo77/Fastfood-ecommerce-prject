const database = require("../../database/database");
const express=require('express');
const router=express.Router();
const {responseHandler, addImageBase} = require("../../utils");
const mw=require('../../middleware/profile')

/////////// middleware
router.use(mw)


router.get('/options',async (req,res)=>{
    const sizes=await database('product_size').select('*');
    const sauces=await database('product_sauces').select('*');
    const cheese=await database('product_cheese').select('*');
    const toppings=await database('product_toppings').select('*');
    const templates=await database('product_templates').select('*');
    res.status(200).send(responseHandler(false,null,{
        sizes:addImageBase(sizes,'image'),
        sauces:addImageBase(sauces,'image'),
        cheese:addImageBase(cheese,'image'),
        toppings:addImageBase(toppings,'image'),
        templates:addImageBase(templates,'image'),
    }))

})

module.exports=router