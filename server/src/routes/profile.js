const express=require('express');
const router=express.Router();
const database=require('../database/database')
const {body ,validationResult,matchedData, param,query} = require('express-validator');
const {responseHandler,addImageBase,changeToBoolean,calculateSum,today} = require("../utils");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));


///////////////////////////////// middleware
router.use((req,res,next)=>{
    const token=req.headers.token
    if(token){
        database('users').select(['token','id']).where({token}).then(response=>{
            if(response.length>0){
                req.headers.id=response[0].id
                next()
            }else{
                res.status(200).send(responseHandler(true,'Unauthenticated',null))
            }
        })
    }else{
        res.status(200).send(responseHandler(true,'Unauthenticated',null))
    }
})
///////////////////////////
router.get('/info',(req,res)=>{
    const token=req.headers.token
    database('users').
    select('firstname','lastname','username','profile_image','phone','email','isAdmin').
    where({token}).
    then(response=>{
        const result=changeToBoolean(addImageBase(response,'profile_image'),'isAdmin')
        res.status(200).send(responseHandler(false,null,result[0]))
    })
})

router.post('/info',body(['firstname','lastname','username','phone']).notEmpty(),body('email').isEmail(),(req,res)=>{
    const token=req.headers.token
    const result = validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('users').
        update(body).
        where({token}).
        then(response=>{
            res.status(200).send(responseHandler(false,'user data updated',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

router.post('/address',body(['title','address','provinceID','cityID','postal_code','phone']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        const userID=req.headers.id
        database('user_address').
        insert({...body,userID}).
        then(response=>{
            res.status(200).send(responseHandler(false,'new address added.',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

router.get('/address',query('id').optional(), (req,res)=>{
    const id=Number(req.query.id)
    const userID=req.headers.id
    if(id){
        database('user_address').
        join('provinces','user_address.provinceID','=','provinces.id').
        join('cities','user_address.cityID','=','cities.id').
        select('user_address.*','provinces.title as province','cities.city as city').
        where('user_address.id','=',id).
        where('user_address.userID','=',userID).
        then(response=>{
            res.status(200).send(responseHandler(false,null,response[0]))
        }).catch(err=>{
            console.log(err)
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        database('user_address').
        join('provinces','user_address.provinceID','=','provinces.id').
        join('cities','user_address.cityID','=','cities.id').
        select('user_address.*','provinces.title as province','cities.city as city').
        where({userID}).
        then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            console.log(err)
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }
})

router.put('/address',body(['title','address','provinceID','cityID','postal_code','phone','addressID']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const data = matchedData(req);
        const userID=req.headers.id;
        database('user_address').
        where({id:data.addressID,userID}).
        update({
            title:data.title,
            address:data.address,
            provinceID:data.provinceID,
            cityID:data.cityID,
            postal_code:data.postal_code,
            phone:data.phone
        }).
        then(response=>{
            res.status(200).send(responseHandler(false,'address updated.',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

router.delete('/address/:addressID',param('addressID').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        const userID=req.headers.id;
        database('user_address').
        where({id:param.addressID,userID}).
        del().
        then(response=>{
            res.status(200).send(responseHandler(false,'address deleted.',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

//// get basket
router.get('/basket',async (req,res)=>{
    const userID=req.headers.id
    const userActiveOrder=await database('orders').join('order_status','orders.statusID','=','order_status.id').join('payment_status','orders.paymentStatusID','=','payment_status.id').join('coupons','orders.couponID','=','coupons.id').join('user_address','orders.addressID','=','user_address.id').where('orders.userID','=',userID).where('orders.statusID','=',2).where('orders.paymentStatusID','=',3).select('orders.*','order_status.status','payment_status.status as payment_status','coupons.code as coupons_code','coupons.percent as coupons_percent','user_address.title as address_title');
    if(userActiveOrder.length>0){
        const activeOrderId=userActiveOrder[0].id
        const userActiveBasket=await database('basket').
        join('users','basket.userID','=','users.id').
        join('product','basket.productID','=','product.id').
        select('basket.*','product.primary_image','product.title','product.quantity as product_quantity','product.off','product.off_percent','product.link').where({orderID:activeOrderId});
        res.status(200).send(responseHandler(false,null,{
            items:changeToBoolean(addImageBase(userActiveBasket,'primary_image'),'off'),
             order:userActiveOrder[0]
        }))
    }else{
        res.status(200).send(responseHandler(false,null,[]))
    }


})


////// add basket item
router.post('/basket',body(['productID','quantity']).notEmpty(),async (req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const body = matchedData(req);
        const userID=req.headers.id;
        const userBasket=await database('basket').where({userID:userID}).select('*')
        const product=await database('product').where({id:body.productID}).select('price','off','off_percent');
        const userActiveOrders=await database('orders').where({paymentStatusID:3,statusID:2,userID:userID});
        const productPrice=Number(product[0].price)
        const subtotal=product[0].off===1 ? Math.floor(((productPrice*product[0].off_percent)/100))*Number(body.quantity) : productPrice*Number(body.quantity);
        if(userBasket.length===0 || userActiveOrders.length===0){
            const createOrder=await database('orders').insert({userID:userID,created_at:today,total_amount:subtotal})
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
                const addNewTotalAmountToOrder=await database('orders').where({id:orderID}).update({total_amount:previousTotalAmount+subtotal});
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
router.put('/basket',async (req,res)=>{
    const status=req.query.status
    const id=req.query.id
    const userID=req.headers.id;
    const basketItem=await database('basket').where({id:id}).select('quantity','price','orderID');
    if(status==='increase' || status==='decrease'){
        const previousQuantity= Number(basketItem[0].quantity);
        if(previousQuantity===1 && status==='decrease'){
            const deleteBasketItem=await database('basket').where({id:id,userID:userID}).del()
            res.status(200).send(responseHandler(false,'basket item removed',null))

        }else{
            const increase=await database('basket').where({id:id,userID:userID}).update({
                quantity: status==='increase' ? previousQuantity+1 : previousQuantity-1,
                subtotal: status==='increase' ? (previousQuantity+1)*Number(basketItem[0].price) :  (previousQuantity-1)*Number(basketItem[0].price)
            });
            const newBasketItems=await database('basket').select('subtotal').where({orderID:basketItem[0].orderID})
            const updateOrder=await database('orders').
            where({id:basketItem[0].orderID}).update({
                total_amount:calculateSum(newBasketItems,'subtotal')
            })
            res.status(200).send(responseHandler(false,'order item updated',null))
        }
    }else if(status==='delete'){
        const deleteBasket=await database('basket').where({id:id,userID:userID}).del()
        const newBasketItems=await database('basket').select('subtotal').where({orderID:basketItem[0].orderID})
        const updateOrder=await database('orders').
        where({id:basketItem[0].orderID}).update({
            total_amount:calculateSum(newBasketItems,'subtotal')
        })

        res.status(200).send(responseHandler(false,'basket item removed',null))
    }else{
        res.status(200).send(responseHandler(true,'invalid query : decrease|increase|delete' ,null));
    }


})

///// delete all basket
router.delete('/basket',async (req,res)=>{
    const userID=req.headers.id;

    const userActiveOrder=await database('orders').where({paymentStatusID:3,statusID:2,userID:userID});
    const activeOrderId=userActiveOrder[0].id
    console.log(activeOrderId)
    const deleteActiveBasket=await database('basket').where({orderID:activeOrderId}).del()
    const deleteOrder=await database('orders').where({id:activeOrderId}).del()
    res.status(200).send(responseHandler(false,'basket item removed',null))
})


/////// get orders

router.get('/orders',async (req,res)=>{
    const userID=req.headers.id
    const userActiveOrder=await database('orders').join('order_status','orders.statusID','=','order_status.id').join('payment_status','orders.paymentStatusID','=','payment_status.id').join('coupons','orders.couponID','=','coupons.id').join('user_address','orders.addressID','=','user_address.id').where('orders.userID','=',userID).select('orders.*','order_status.status','payment_status.status as payment_status','coupons.code as coupons_code','coupons.percent as coupons_percent','user_address.title as address_title');
    res.status(200).send(responseHandler(false,null,userActiveOrder))
})

///// get basket item in order
router.post('/orders',async (req,res)=>{
    const orderID=req.query.orderID
    const userID=req.headers.id
    if(orderID){
        const getBasketIem=await database('basket').join('product','basket.productID','=','product.id').select('basket.*','product.primary_image','product.title','product.quantity as product_quantity','product.off','product.off_percent','product.link').where({orderID:orderID,userID});
        res.status(200).send(responseHandler(false,null,changeToBoolean(addImageBase(getBasketIem,'primary_image'),'off')))
    }else{
        res.status(200).send(responseHandler(true,'missing required query',null))
    }

})

module.exports=router
