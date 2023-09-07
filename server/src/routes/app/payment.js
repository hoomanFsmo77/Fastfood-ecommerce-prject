require('dotenv').config()
const express=require('express');
const f=require('node-fetch')
const router=express.Router();
const database=require('../../database/database')
const bodyParser=require('body-parser')
const {responseHandler, pagination, changeToBoolean, addImageBase} = require("../../utils");
const {query, validationResult, matchedData, body} = require("express-validator");
const mw=require('../../middleware/profile')
const dt=new Date()
router.use(bodyParser.urlencoded({extended:true}))
///// middleware
router.use(mw)


router.post('/',query(['orderID']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    const userID=req.headers.id
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('orders').
         join('users','orders.userID','=','users.id').
        where({'orders.id':query.orderID,'orders.userID':userID,'orders.statusID':2,'orders.paymentStatusID':3}).
        select('orders.*','users.firstname','users.lastname','users.firstname','users.phone','users.email').
        then(response=>{
            if(response[0].addressID){
                const body={
                    "order_id": `${response[0].id}`,
                    "amount": response[0].payment_amount*10000,
                    "name": `${response[0].firstname} ${response[0].lastname}`,
                    "phone": `${response[0].phone}`,
                    "mail": `${response[0].email}`,
                    "desc": "fake order",
                    "callback":process.env.CALL_BACK+`?userID=${userID}`
                }
                f(process.env.IDPAY,{
                    method:'POST',
                    headers:{
                        'X-API-KEY':process.env.IDPAY_API_KEY,
                        'X-SANDBOX':1,
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(body)
                }).then(respo=>respo.json()).then(data=>{
                    res.status(200).send(responseHandler(false,null ,data));
                }).catch(err=>{
                    res.status(200).send(responseHandler(true,'error in idp' ,null));
                })
            }else{
                res.status(200).send(responseHandler(true,'Address is required!' ,null));
            }
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }

})


router.post('/verify',(req,res)=>{
    const userID=req.query.userID
    const {order_id,id,amount,date,status}=req.body;
    if(order_id && id && amount && date && status){
        const transaction_date=`${dt.getUTCFullYear(date)}-${dt.getUTCMonth(date)}-${dt.getUTCDate(date)+1}`
        database('transactions').insert({
            amount:amount/10000,
            status:status==='1' ? 1 : 0,
            issueTracking:id,
            date:transaction_date,
            orderID:order_id
        }).then(async  response=>{
            await database('orders').where({id:order_id,userID:userID}).update({statusID:1,paymentStatusID:status=='1' ? 1 : 2});
            res.redirect(`${process.env.CLIENT_CALLBACK}?orderID=${order_id}&tracking_number=${id}&status=${status}`)
        }).catch(err=>{
            console.log(err)
        })
    }

})




module.exports=router