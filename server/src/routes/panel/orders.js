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
    if(id){
        const order=await database('orders').
        join('order_status','orders.statusID','=','order_status.id').
        join('users','orders.userID','=','users.id').
        join('payment_status','orders.paymentStatusID','=','payment_status.id').
        join('coupons','orders.couponID','=','coupons.id').
        select('orders.*','order_status.status','payment_status.status as payment_status','coupons.code as coupons_code','coupons.percent as coupons_percent','users.firstname as user_firstname','users.lastname as user_lastname','users.username as user_username').where({'orders.id':id});

        const getReadyBasketIem=await database('basket').join('product','basket.productID','=','product.id').join('product_specification','product.specification','=','product_specification.id').select('basket.*','product.primary_image','product.title','product.quantity as product_quantity','product.off','product.off_percent','product.link','product_specification.color as color','product_specification.size as size').where({orderID:id,type:'ready'});
        const getCustomBasketIem=await database('basket').select('basket.type','basket.id','basket.price','basket.quantity','basket.subtotal','basket.orderID','basket.description').where({orderID:id,type:'custom'});

        const readyBasket=changeToBoolean(addImageBase(getReadyBasketIem,'primary_image'),'off')
        res.status(200).send(responseHandler(false,null,{
            order:order[0],
            products:[...getCustomBasketIem,...readyBasket]
        }))
    }else{
        const page=Number(req.query.page) || 1;
        const per_page=Number(req.query.per) || 6;
        const userActiveOrder=await database('orders').
        join('order_status','orders.statusID','=','order_status.id').
        join('users','orders.userID','=','users.id').
        join('payment_status','orders.paymentStatusID','=','payment_status.id').
        join('coupons','orders.couponID','=','coupons.id').
        select('orders.*','order_status.status','payment_status.status as payment_status','coupons.code as coupons_code','coupons.percent as coupons_percent','users.firstname as user_firstname','users.lastname as user_lastname','users.username as user_username');
        res.status(200).send(responseHandler(false,null,pagination(userActiveOrder,page,per_page,req.originalUrl,'orders')))
    }

})









module.exports=router