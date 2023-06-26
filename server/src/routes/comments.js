const express=require('express');
const router=express.Router();
const database=require('../database/database');
const {body, validationResult, matchedData, query, param} = require("express-validator");
const {responseHandler,changeToBoolean,addImageBase, pagination} = require("../utils");

///////////// start add comment /////////////
const addCommentBodyValidation=()=>body(['userID','date','productID','rating','body']).notEmpty();
router.post('/',addCommentBodyValidation(),body(['isReply','replyID']).optional(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const body = matchedData(req);
        database('comments').
        insert(body).
        then(response=>{
            res.status(200).send(responseHandler(true,'comment added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})
///////////// end add comment /////////////

///////////// start get comment /////////////
const commentQueryValidation=()=>query(['page','per']).optional();
router.get('/',commentQueryValidation(),async (req,res)=>{
    const page=Number(req.query?.page) || null;
    const per_page=Number(req.query?.per) || 6;
    const comments=await database('comments')
        .join('product','comments.productID','=','product.id')
        .join('users','comments.userID','=','users.id').
        where({isReply:0})
        .select('comments.*','product.title as product_title','product.primary_image as product_image','product.link as product_link','users.firstname as author_firstname','users.lastname as author_lastname');
    const convertNumberToBoolean=changeToBoolean(comments,['isAccept','isReply','replyID'])
    const result=addImageBase(convertNumberToBoolean,'product_image')
    res.status(200).send(responseHandler(false,null,pagination(result,page,per_page,req.originalUrl,'comments')));
})
///////////// end get comment /////////////

///////////// start approve comment /////////////
router.put('/change-status/:commentID/:status',param(['commentID','status']).isNumeric(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        database('comments')
        .where({id:param.commentID}).
        update({isAccept:param.status}).then(response=>{
            res.status(200).send(responseHandler(false,'comment updated',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})
///////////// start approve comment /////////////

/////////// start get comment by userID //////////
router.get('/user/:id',param('id').isNumeric(),query(['page','per']).optional(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const data = matchedData(req);
        const page=Number(data?.page) || null;
        const per_page=Number(data?.per) || 6;
        database('comments').
        join('product','comments.productID','=','product.id').
        select('comments.*','product.title as product_title','product.link as product_link','product.primary_image as product_image').
        where({userID:Number(data.id)}).
        then(response=>{
            const imageFilter=addImageBase(response,'product_image')
            const booleanFilter=changeToBoolean(imageFilter,['isAccept','isReply'])
            res.status(200).send(responseHandler(false,null,pagination(booleanFilter,page,per_page,req.originalUrl,'comments')))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

/////////// end get comment by userID //////////

module.exports=router
