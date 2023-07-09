const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const mw=require('../../middleware/admin')
const {transferTransactionStatus,transferOrderStatus, transferPaymentStatus, pagination, responseHandler, addImageBase,
    changeToBoolean
}=require('../../utils')
const _ = require("lodash");
//////////////// middleware
router.use(mw)



router.get('/',async (req,res)=>{
    const id=req.query.id;
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 6;
    if(id){
        const transaction=await database('transactions').join('orders','transactions.orderID','=','orders.id').where({'transactions.id':id})
        const orderID=transaction[0].orderID;
        const products=await database('basket').where({orderID}).join('product','basket.productID','=','product.id').select('basket.*','product.title','product.primary_image','product.price','product.link','product.off','product.off_percent');
        const addImage=addImageBase((products),'primary_image');
        const result=changeToBoolean(addImage,'off')
        res.status(200).send(responseHandler(false,null,result));
    }else{
        const transactions=await database('transactions').join('orders','transactions.orderID','=','orders.id').join('users','orders.userID','=','users.id').select('transactions.*','transactions.status as transaction_status','orders.statusID as order_status','orders.paymentStatusID as payment_status','users.firstname as order_firstname','users.lastname as order_lastname','users.username as order_username');
        const transferTranStatus=transferTransactionStatus(transactions);
        const transferOrdStatus=transferOrderStatus(transferTranStatus)
        const transferPayStatus=transferPaymentStatus(transferOrdStatus)
        res.status(200).send(responseHandler(false,null,pagination(transferPayStatus,page,per_page,req.originalUrl,'transactions')))
    }
})









module.exports=router