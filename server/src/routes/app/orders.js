const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const bodyParser=require('body-parser')
const {responseHandler, pagination, changeToBoolean, addImageBase} = require("../../utils");
const {query, validationResult, matchedData, body} = require("express-validator");
const mw=require('../../middleware/profile')
router.use(bodyParser.urlencoded({extended:true}))


///// middleware
router.use(mw)

/////// get orders
router.get('/',async (req,res)=>{
    const userID=req.headers.id
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 6;
    const userActiveOrder=await database('orders').join('order_status','orders.statusID','=','order_status.id').join('payment_status','orders.paymentStatusID','=','payment_status.id').join('coupons','orders.couponID','=','coupons.id').join('user_address','orders.addressID','=','user_address.id').where('orders.userID','=',userID).select('orders.*','order_status.status','payment_status.status as payment_status','coupons.code as coupons_code','coupons.percent as coupons_percent','user_address.title as address_title');
    res.status(200).send(responseHandler(false,null,pagination(userActiveOrder,page,per_page,req.originalUrl,'orders')))
})

///// get basket item in order
router.post('/',async (req,res)=>{
    const orderID=req.query.orderID
    const userID=req.headers.id
    if(orderID){
        const getReadyBasketIem=await database('basket').join('product','basket.productID','=','product.id').join('product_specification','product.specification','=','product_specification.id').select('basket.*','product.primary_image','product.title','product.quantity as product_quantity','product.off','product.off_percent','product.link','product_specification.color as color','product_specification.size as size').where({orderID:orderID,userID,type:'ready'});
        const getCustomBasketIem=await database('basket').select('basket.type','basket.id','basket.price','basket.quantity','basket.subtotal','basket.orderID','basket.description').where({orderID:orderID,userID,type:'custom'});

        const readyBasket=changeToBoolean(addImageBase(getReadyBasketIem,'primary_image'),'off')

        res.status(200).send(responseHandler(false,null,[...getCustomBasketIem,...readyBasket]))
    }else{
        res.status(200).send(responseHandler(true,'missing required query',null))
    }

})


//////// insert coupons for order
router.put('/register-coupon',query(['code','orderID']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        const userID=req.headers.id
        const queryCondition={id:query.orderID,couponID:7,statusID:2,paymentStatusID:3,userID:userID};
        const targetCoupon=await database('coupons').where({code:query.code}).select('id','percent');
        const targetOrder=await database('orders').where(queryCondition).select('total_amount');
        if(targetCoupon.length>0 ){
            if(targetOrder.length>0){
                const differentPrice=(Number(targetOrder[0].total_amount)*targetCoupon[0].percent)/100;
                database('orders').
                where(queryCondition).
                update({
                    couponID:targetCoupon[0].id,
                    payment_amount:Number(targetOrder[0].total_amount)-Number(differentPrice)
                }).
                then(response=>{
                    if(response===0){
                        res.status(200).send(responseHandler(true,'you already used another coupon!',null))
                    }else{
                        res.status(200).send(responseHandler(false,'coupon registered successfully!',null))
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                res.status(200).send(responseHandler(true,'you already used another coupon!',null))
            }
        }else{
            res.status(200).send(responseHandler(true,'coupon code does not exist!',null))
        }


    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));

    }

})


////// add address for payment
router.put('/address-payment',query(['addressID','orderID']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    const userID=req.headers.id

    if (result.isEmpty()) {
        const query = matchedData(req);
        database('orders').
        where({userID:userID,id:query.orderID}).
        update({addressID:query.addressID}).
        then(response=>{
            res.status(200).send(responseHandler(false,'address changed!',null));
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null));
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})






module.exports=router