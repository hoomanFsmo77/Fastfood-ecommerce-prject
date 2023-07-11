const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const mw=require('../../middleware/admin')
const {responseHandler, getProductByLinkFilter, addImageBase, changeToBoolean} = require("../../utils");
router.use(mw)


router.get('/total',async (req,res)=>{
    try {
        const productNumberQuery=await database('product').count('id as CNT')
        const userNumberQuery=await database('users').count('id as CNT')
        const blogNumberQuery=await database('blog').count('id as CNT')
        const orderNumberQuery=await database('orders').count('id as CNT')
        const transactionNumberQuery=await database('transactions').count('id as CNT')
        const blogCommentNumberQuery=await database('blog_comments').count('id as CNT')
        const productCommentNumberQuery=await database('product_comments').count('id as CNT')
        const product_amount=productNumberQuery[0].CNT;
        const user_amount=userNumberQuery[0].CNT;
        const blog_amount=blogNumberQuery[0].CNT;
        const order_amount=orderNumberQuery[0].CNT;
        const transaction_amount=transactionNumberQuery[0].CNT;
        const blog_comments_amount=blogCommentNumberQuery[0].CNT;
        const product_comments_amount=productCommentNumberQuery[0].CNT;
        res.status(200).send(responseHandler(false,null,{
            products:product_amount,
            product_comments:product_comments_amount,
            users:user_amount,
            blogs:blog_amount,
            blog_comments:blog_comments_amount,
            orders:order_amount,
            transactions:transaction_amount,
        }))

    }catch (err) {
        res.status(503).send('error in db')
    }
})


router.get('/orders',async (req,res)=>{
    try {
        const successful_orders=await   database('orders').where({paymentStatusId:1}).count('id as CNT');
        const failed_orders=await   database('orders').where({paymentStatusId:2}).count('id as CNT');
        const unpaid_orders=await   database('orders').where({paymentStatusId:3}).count('id as CNT');
        const processing_orders=await   database('orders').where({statusID:1}).count('id as CNT');
        const awaiting_payment_orders=await   database('orders').where({statusID:0}).count('id as CNT');
        res.status(200).send(responseHandler(false,null,{
            successful_orders:successful_orders[0].CNT,
            failed_orders:failed_orders[0].CNT,
            unpaid_orders:unpaid_orders[0].CNT,
            processing_orders:processing_orders[0].CNT,
            awaiting_payment_orders:awaiting_payment_orders[0].CNT,
        }))

    }catch (err) {
        res.status(503).send('error in db')
    }
})


router.get('/transactions',async (req,res)=>{
    try {
        const successful_transactions=await   database('transactions').where({status:1}).count('id as CNT');
        const failed_transactions=await   database('transactions').where({status:0}).count('id as CNT');
        res.status(200).send(responseHandler(false,null,{
            successful_transactions:successful_transactions[0].CNT,
            failed_transactions:failed_transactions[0].CNT,
        }))

    }catch (err) {
        res.status(503).send('error in db')
    }
})
router.get('/popular',async (req,res)=>{
    try {
        const popular_product=await database('basket').select('productID').count('productID').groupBy('productID').orderByRaw('productID DESC').limit(3);
        const product_ids=popular_product.map((item)=>{
            return item.productID
        })
        const products_data=await database('product').select('title','link','primary_image','caption','price','status','off','off_percent').whereIn('id',product_ids);
        const add_image_base=addImageBase(products_data,'primary_image')
       res.status(200).send(responseHandler(false,null,changeToBoolean(add_image_base,['off','status'])));

    }catch (err) {
        console.log(err)
        res.status(503).send('error in db')
    }
})



module.exports=router
