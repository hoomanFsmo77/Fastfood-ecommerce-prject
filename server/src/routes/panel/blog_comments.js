const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const { validationResult, matchedData, param, query} = require("express-validator");
const {responseHandler, addImageBase, changeToBoolean, pagination} = require("../../utils");
const mw=require('../../middleware/admin')
router.use(mw)





////  get comments
const commentQueryValidation=()=>query(['page','per']).optional();
router.get('/',commentQueryValidation(),async (req,res)=>{
    const page=Number(req.query?.page) || null;
    const per_page=Number(req.query?.per) || 6;
    const comments=await database('blog_comments')
        .join('blog','blog_comments.blogID','=','blog.id')
        .join('users','blog_comments.userID','=','users.id').
        where({isReply:0,isAccept:0})
        .select('blog_comments.*','blog.title as blog_title','blog.image_sm as blog_image_sm','blog.image_xs as blog_image_xs','blog.image_lg as blog_image_lg','blog.link as blog_link','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username','users.profile_image as author_image');
    const convertNumberToBoolean=changeToBoolean(comments,['isAccept','isReply'])
    const result=addImageBase(convertNumberToBoolean,['blog_image_xs','blog_image_sm','blog_image_lg','author_image'])
    res.status(200).send(responseHandler(false,null,pagination(result,page,per_page,req.originalUrl,'comments')));
})


///  approve comment
router.put('/change-status/:commentID',param(['commentID']).isNumeric(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        database('blog_comments')
            .where({id:param.commentID}).
        update({isAccept:1}).then(response=>{
            res.status(200).send(responseHandler(false,'comment accepted.',null))
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
        const deleteComment=await database('blog_comments').where({id}).del();
        res.status(200).send(responseHandler(false,'comment deleted',null))
    }else{
        res.status(200).send(responseHandler(true,'missing required query: id',null))
    }
})

module.exports=router
