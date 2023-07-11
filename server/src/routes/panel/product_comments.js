const express=require('express');
const router=express.Router();
const database=require('../../database/database');
const {body, validationResult, matchedData, query, param} = require("express-validator");
const {responseHandler,changeToBoolean,addImageBase, pagination} = require("../../utils");
const mw=require('../../middleware/admin')
router.use(mw)


///  get comments
const commentQueryValidation=()=>query(['page','per']).optional();
router.get('/',commentQueryValidation(),async (req,res)=>{
    const page=Number(req.query?.page) || null;
    const per_page=Number(req.query?.per) || 6;
    const comments=await database('product_comments')
        .join('product','product_comments.productID','=','product.id')
        .join('users','product_comments.userID','=','users.id').
        where({isReply:0,isAccept:0})
        .select('product_comments.*','product.title as product_title','product.primary_image as product_image','product.link as product_link','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username');
    const convertNumberToBoolean=changeToBoolean(comments,['isAccept','isReply','replyID'])
    const result=addImageBase(convertNumberToBoolean,'product_image')
    res.status(200).send(responseHandler(false,null,pagination(result,page,per_page,req.originalUrl,'comments')));
})


//// start approve comment
router.put('/change-status/:commentID',param(['commentID']).isNumeric(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        database('product_comments')
        .where({id:param.commentID}).
        update({isAccept:1}).then(response=>{
            res.status(200).send(responseHandler(false,'comment accepted!',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})

/// delete comment
router.delete('/',async (req,res)=>{
    const id=req.query.id;
    if(id){
        const deleteComment=await database('product_comments').where({id}).del();
        res.status(200).send(responseHandler(false,'comment deleted',null))
    }else{
        res.status(200).send(responseHandler(true,'missing required query: id',null))
    }
})

module.exports=router
