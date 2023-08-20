const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {responseHandler} = require("../../utils");


/////////// get all category
router.get('/',(req,res)=>{
    database('offer').select('*').then(response=>{
        res.status(200).send(responseHandler(false,null,response.length>0 ? response[0] : null))
    }).catch(err=>{
        res.status(503).send('error in db!')
    })
})







module.exports=router
