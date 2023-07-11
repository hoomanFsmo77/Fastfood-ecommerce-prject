const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const mw=require('../../middleware/admin')
const {responseHandler} = require("../../utils");
router.use(mw)



router.get('/sales',async (req,res)=>{
    try {
        const salesData=await database('sales_chart').select('*')
        res.status(200).send(responseHandler(false,null,salesData))
    }catch (err) {
        res.status(503).send('error in db!')
    }
})


router.get('/visitors',async (req,res)=>{
    try {
        const salesData=await database('visitors_chart').select('*')
        res.status(200).send(responseHandler(false,null,salesData))
    }catch (err) {
        res.status(503).send('error in db!')
    }
})






module.exports=router
