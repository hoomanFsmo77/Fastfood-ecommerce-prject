const express=require('express');
const router=express.Router();
const database=require('../../database/database')
const {responseHandler} = require("../../utils");
const {query,validationResult, param, matchedData} = require('express-validator');

router.get('/provinces',(req,res)=>{
    database('provinces').
    select('*').
    then(response=>{
        res.status(200).send(responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(responseHandler(true,'error in db',null))
    })
})

router.get('/city/:provinceID',param('provinceID'),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        database('cities').
        select('*').
        where({provinceID:param.provinceID}).
         then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})




module.exports=router
