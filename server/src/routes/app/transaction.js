const express=require('express');
const f=require('node-fetch')
const router=express.Router();
const database=require('../../database/database')
const bodyParser=require('body-parser')
const {query, validationResult, matchedData} = require("express-validator");
const {responseHandler, pagination} = require("../../utils");
const mw=require('../../middleware/profile')
////////// middleware
router.use(mw)


router.post('/',query(['tracking_number','orderID','status']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    const userID=req.headers.id
    if (result.isEmpty()) {
        const query = matchedData(req);
        const deactiveOrder=await database('orders').where({id:query.orderID}).update({statusID:1,paymentStatusID:query.status=='1' ? 1 : 2});
        database('transactions').join('orders','transactions.orderID','=','orders.id').where({'transactions.issueTracking':query.tracking_number,'orders.userID':userID}).select('transactions.*').then(response=>{
            res.status(200).send(responseHandler(false,null ,response[0]));
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db' ,null));
        })

    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})


router.get('/',(req,res)=>{
    const userID=req.headers.id
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 6;
    database('transactions').join('orders','transactions.orderID','=','orders.id').where({'orders.userID':userID}).select('transactions.*').then(response=>{
        res.status(200).send(responseHandler(false,null ,pagination(response,page,per_page,req.originalUrl,'transactions')));
    }).catch(err=>{
        res.status(200).send(responseHandler(true,'error in db' ,null));
    })

})





module.exports=router