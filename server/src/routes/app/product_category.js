const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {responseHandler}=require('../../utils')


///// get all category
router.get('/',(req,res)=>{
    database('product_category').select('*').then(response=>{
        res.status(200).send(responseHandler(false,null,response))
    }).catch(err=>{
        res.status(503).send('error in db!')
    })
})


module.exports=router
