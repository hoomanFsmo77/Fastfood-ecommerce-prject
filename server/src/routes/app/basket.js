const express=require('express');
const router=express.Router();
const database=require('../../database/database')
const {body ,validationResult,matchedData, param,query} = require('express-validator');
const {responseHandler,addImageBase,changeToBoolean,calculateSum,today,pagination,calculateTotalPrice,getCustomProductDescription} = require("../../utils");
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
        const userReadyActiveBasket=await database('basket').
        join('users','basket.userID','=','users.id').
        join('product','basket.productID','=','product.id').
        join('product_specification','product.specification','=','product_specification.id').
        select('basket.type','basket.id','basket.price','basket.quantity','basket.subtotal','basket.orderID','product.primary_image','product.title','product.quantity as product_quantity','product.off','product.off_percent','product.link','product_specification.color as color','product_specification.size as size','users.id as userID').where({orderID:activeOrderId,type:'ready'});

        const userReadyBasket=changeToBoolean(addImageBase(userReadyActiveBasket,'primary_image'),'off')

        const userCustomActiveBasket=await database('basket').
        join('users','basket.userID','=','users.id').
        select('basket.type','basket.id','basket.price','basket.quantity','basket.subtotal','basket.orderID','basket.description').where({orderID:activeOrderId,type:'custom'});

        res.status(200).send(responseHandler(false,null,{
            items:[...userReadyBasket,...userCustomActiveBasket],
            order:userActiveOrder[0]
        }))
    }else{
        res.status(200).send(responseHandler(false,null,[]))
    }


})


////// add basket item
router.post('/',async (req,res)=>{
    const body=req.body
    const userID=req.headers.id;
    //// get user data
    const userBasket=await database('basket').where({userID:userID}).select('*')
    const userActiveOrders=await database('orders').join('coupons','orders.couponID','=','coupons.id').select('orders.*','coupons.percent as coupons_percent').where({paymentStatusID:3,statusID:2,userID:userID});

    ///////
    if(body.productID && body.type==='ready' && body.quantity){
        /// type ready
        const product=await database('product').where({id:body.productID}).select('price','off','off_percent');
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
            const previousTotalAmount=Number(userActiveOrders[0].total_amount);
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

////////////////////////////////////////////
    }else if(body.type==='custom' && body.toppingID && body.cheeseID && body.saucesID && body.sizeID && body.templateID && body.quantity && body.custom_pieces){
        /// type custom
        const {toppingID,cheeseID,saucesID,sizeID,templateID,quantity,additional_info,custom_pieces}=body;
        //// topping
        const topping=toppingID===0 ? null :await database('product_toppings').select('*').where({id:toppingID});
        //// cheese
        const cheese=cheeseID===0 ? null :await database('product_cheese').select('*').where({id:cheeseID});
        //// sauces
        const sauces=saucesID===0 ? null : await database('product_sauces').select('*').where({id:saucesID});
        /// size
        const size=await database('product_size').select('*').where({id:sizeID})
        const template=await database('product_templates').select('*').where({id:templateID})

        //// total price
        const totalPrice=calculateTotalPrice(topping[0]?.price || 0, cheese[0]?.price || 0,sauces[0]?.price || 0, size[0].price, template[0].price)

        const subtotal=Number(totalPrice)*Number(quantity)

        //// description
        const description=getCustomProductDescription(topping,cheese,sauces,size,template,additional_info,custom_pieces)


        if(userBasket.length===0 || userActiveOrders.length===0){
            const createOrder=await database('orders').insert({userID:userID,created_at:today,total_amount:subtotal,payment_amount:subtotal});
            const orderID=createOrder[0];
            await database('basket').
            insert({
                userID:userID,
                productID:10,
                price:totalPrice,
                quantity:quantity,
                description,
                type:'custom',
                orderID:orderID,
                subtotal
            })
            res.status(200).send(responseHandler(false,'basket item added',null))
        }else{
            const previousTotalAmount=Number(userActiveOrders[0].total_amount);
            const orderID=userActiveOrders[0].id;
            const couponPercent=userActiveOrders[0].coupons_percent===0 ? 100 : userActiveOrders[0].coupons_percent;
            const addNewTotalAmountToOrder=await database('orders').where({id:orderID}).update({total_amount:previousTotalAmount+subtotal,payment_amount:userActiveOrders[0].payment_amount+((subtotal*couponPercent)/100)});
            await database('basket').
            insert({
                userID:userID,
                productID:10,
                price:totalPrice,
                quantity:quantity,
                description,
                type:'custom',
                orderID:orderID,
                subtotal
            })
            res.status(200).send(responseHandler(false,'basket item added',null))
        }
    }else{
        res.status(200).send(responseHandler(true,'request body params does not match!',null))
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
            const deleteBasketItem=await database('basket').where({id:id,userID:userID}).del();

            const newTotalPrice=Number(calculateSum(newBasketItems,'subtotal'));
            const differentPrice=Number((newTotalPrice*coupon_percent)/100);

            const updateOrder=await database('orders').
            where({id:basketItem[0].orderID}).update({
                total_amount:newTotalPrice,
                payment_amount:coupon_percent===0 ?newTotalPrice :newTotalPrice-differentPrice
            })
            res.status(200).send(responseHandler(false,'basket item removed',null))
        }else{
            const increase=await database('basket').where({id:id,userID:userID}).update({
                quantity: status==='increase' ? previousQuantity+1 : previousQuantity-1,
                subtotal: status==='increase' ? (previousQuantity+1)*Number(basketItem[0].price) :  (previousQuantity-1)*Number(basketItem[0].price)
            });

            const newBasketItemUpdated=await database('basket').select('subtotal').where({orderID:basketItem[0].orderID});
            const newTotalPrice=Number(calculateSum(newBasketItemUpdated,'subtotal'));

            const differentPrice=Number((newTotalPrice*coupon_percent)/100);

            const updateOrder=await database('orders').
            where({id:basketItem[0].orderID}).update({
                total_amount:newTotalPrice,
                payment_amount:coupon_percent===0 ? newTotalPrice:newTotalPrice-differentPrice
            })
            res.status(200).send(responseHandler(false,'order item updated',null))
        }
    }else if(status==='delete'){

        const deleteBasket=await database('basket').where({id:id,userID:userID}).del()
        const newBasketItems=await database('basket').select('subtotal').where({orderID:basketItem[0].orderID});
        if(newBasketItems.length===0){
            await database('orders').where({id:basketItem[0].orderID}).del()
        }else{
            await database('orders').
            where({id:basketItem[0].orderID}).update({
                total_amount:calculateSum(newBasketItems,'subtotal'),
                payment_amount:(calculateSum(newBasketItems,'subtotal')*coupon_percent)/100
            })
        }

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
