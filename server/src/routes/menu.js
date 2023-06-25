const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser')
router.use(bodyParser.urlencoded({extended:true}));
const {responseHandler,getProductByCondition,getRandomProduct,pagination}=require('../utils');
const {query} = require("express-validator");


//////////////// start menu route ///////////////////
const queryValidation=()=>query(['search','sortBy','category','page','per']).optional();
router.get('/',queryValidation(),async (req,res)=>{
    const query=req.query
    if(query.search || query.sortBy || query.category || query.page){
        const search=query?.search || '';
        const categoryID=query?.category || null;
        const sortBy=Number(query?.sortBy) || null;
        const page=Number(query?.page) || 1;
        const per_page=Number(query?.per) || 6;
        if(sortBy===3){
            const randomProduct=await getRandomProduct(6)
            res.status(200).send(responseHandler(false,null,randomProduct))
        }else{
            const target=await getProductByCondition(search,categoryID,sortBy);
            res.status(200).send(responseHandler(false,null,pagination(target,page,per_page,req.originalUrl)))
        }
    }else{
        const randomProduct=await getRandomProduct(6)
        res.status(200).send(responseHandler(false,null,randomProduct))
    }

})
//////////////// end menu route  ///////////////////

module.exports=router
