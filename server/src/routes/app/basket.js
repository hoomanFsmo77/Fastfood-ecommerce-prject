const express=require('express');
const router=express.Router();
const database=require('../../database/database')
const {body ,validationResult,matchedData, param,query} = require('express-validator');
const {responseHandler,addImageBase,changeToBoolean,calculateSum,today,pagination} = require("../../utils");
const bodyParser = require("body-parser");
const mw=require('../../middleware/profile')
router.use(bodyParser.urlencoded({extended:true}));



/////////// middleware
router.use(mw)


//// get basket
router.get('/',async (req,res)=>{
    const userID=req.headers.id
    const userActiveOrder=await database('orders').join('order_status','orders.statusID','=','order_status.id').join('payment_status','orders.paymentStatusID','=','payment_status.id').join('coupons','orders.couponID','=','coupons.id').where('orders.userID','=',userID).where('orders.statusID','=',2).where('orders.paymentStatusID','=',3).select('orders.*','order_status.status','payment_status.status as payment_status','coupons.code as coupons_code','coupons.percent as coupons_percent');
    if(userActiveOrder.length>0){
        const activeOrderId=userActiveOrder[0].id
        const userActiveBasket=await database('basket').
        join('users','basket.userID','=','users.id').
        join('product','basket.productID','=','product.id').
        join('product_specification','product.specification','=','product_specification.id').
        select('basket.*','product.primary_image','product.title','product.quantity as product_quantity','product.off','product.off_percent','product.link','product_specification.color as color','product_specification.size as size').where({orderID:activeOrderId});
        res.status(200).send(responseHandler(false,null,{
            items:changeToBoolean(addImageBase(userActiveBasket,'primary_image'),'off'),
            order:userActiveOrder[0]
        }))
    }else{
        res.status(200).send(responseHandler(false,null,[]))
    }


})


////// add basket item
router.post('/',body(['productID','quantity']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const body = matchedData(req);
        const userID=req.headers.id;
        const userBasket=await database('basket').where({userID:userID}).select('*')
        const product=await database('product').where({id:body.productID}).select('price','off','off_percent');
        const userActiveOrders=await database('orders').join('coupons','orders.couponID','=','coupons.id').select('orders.*','coupons.percent as coupons_percent').where({paymentStatusID:3,statusID:2,userID:userID});
        const productPrice=Number(product[0].price)
        const subtotal=product[0].off===1 ? Math.floor(((productPrice*product[0].off_percent)/100))*Number(body.quantity) : productPrice*Number(body.quantity);
        if(userBasket.length===0 || userActiveOrders.length===0){
            const createOrder=await database('orders').insert({userID:userID,created_at:today,total_amount:subtotal,payment_amount:subtotal});
            const orderID=createOrder[0];
            const addToBasket=await database('basket').
            insert({
                userID:userID,
                productID:body.productID,
                price:productPrice,
                quantity:body.quantity,
                orderID:orderID,
                subtotal
            });
            res.status(200).send(responseHandler(false,'basket item added',null))
        }else{
            const previousTotalAmount=Number(userActiveOrders[0].total_amount)
            const orderID=userActiveOrders[0].id;
            const isExist=userBasket.some(item=>item.productID==body.productID && item.orderID==orderID)
            if(isExist){
                res.status(200).send(responseHandler(true,'product already exist',null))
            }else{
                const couponPercent=userActiveOrders[0].coupons_percent===0 ? 100 : userActiveOrders[0].coupons_percent;
                const addNewTotalAmountToOrder=await database('orders').where({id:orderID}).update({total_amount:previousTotalAmount+subtotal,payment_amount:userActiveOrders[0].payment_amount+((subtotal*couponPercent)/100)});
                const addToBasket=await database('basket').
                insert({
                    userID:userID,
                    productID:body.productID,
                    price:productPrice,
                    quantity:body.quantity,
                    orderID:orderID,
                    subtotal
                })
                res.status(200).send(responseHandler(false,'basket item added',null))
            }
        }

    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})

///// increase or decrease or delete
router.put('/',async (req,res)=>{
    const status=req.query.status
    const id=req.query.id
    const userID=req.headers.id;
    const basketItem=await database('basket').where({id:id}).select('quantity','price','orderID');
    const targetOrder=await database('orders').where({userID:userID,'orders.id':basketItem[0].orderID}).join('coupons','orders.couponID','=','coupons.id').select('coupons.percent as coupons_percent','orders.*')
    const coupon_percent=targetOrder[0].coupons_percent;
    const newBasketItems=await database('basket').select('subtotal').where({orderID:basketItem[0].orderID})
    if(status==='increase' || status==='decrease'){
        const previousQuantity= Number(basketItem[0].quantity);
        if(previousQuantity===1 && status==='decrease'){
            const deleteBasketItem=await database('basket').where({id:id,userID:userID}).del()
            const updateOrder=await database('orders').
            where({id:basketItem[0].orderID}).update({
                total_amount:calculateSum(newBasketItems,'subtotal'),
                payment_amount:(calculateSum(newBasketItems,'subtotal')*coupon_percent)/100
            })
            res.status(200).send(responseHandler(false,'basket item removed',null))
        }else{
            const increase=await database('basket').where({id:id,userID:userID}).update({
                quantity: status==='increase' ? previousQuantity+1 : previousQuantity-1,
                subtotal: status==='increase' ? (previousQuantity+1)*Number(basketItem[0].price) :  (previousQuantity-1)*Number(basketItem[0].price)
            });

            const updateOrder=await database('orders').
            where({id:basketItem[0].orderID}).update({
                total_amount:calculateSum(newBasketItems,'subtotal'),
                payment_amount:(calculateSum(newBasketItems,'subtotal')*coupon_percent)/100
            })
            res.status(200).send(responseHandler(false,'order item updated',null))
        }
    }else if(status==='delete'){
        const deleteBasket=await database('basket').where({id:id,userID:userID}).del()
        const newBasketItems=await database('basket').select('subtotal').where({orderID:basketItem[0].orderID})
        const updateOrder=await database('orders').
        where({id:basketItem[0].orderID}).update({
            total_amount:calculateSum(newBasketItems,'subtotal'),
            payment_amount:(calculateSum(newBasketItems,'subtotal')*coupon_percent)/100
        })

        res.status(200).send(responseHandler(false,'basket item removed',null))
    }else{
        res.status(200).send(responseHandler(true,'invalid query : decrease|increase|delete' ,null));
    }


})

///// delete all basket
router.delete('/',async (req,res)=>{
    const userID=req.headers.id;
    const userActiveOrder=await database('orders').where({paymentStatusID:3,statusID:2,userID:userID});
    const activeOrderId=userActiveOrder[0].id
    console.log(activeOrderId)
    const deleteActiveBasket=await database('basket').where({orderID:activeOrderId}).del()
    const deleteOrder=await database('orders').where({id:activeOrderId}).del()
    res.status(200).send(responseHandler(false,'basket item removed',null))
})





module.exports=router
