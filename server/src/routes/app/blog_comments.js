const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {body, validationResult, matchedData, param, query} = require("express-validator");
const {responseHandler, addImageBase, changeToBoolean, pagination} = require("../../utils");




///////////// start add comment /////////////
const addCommentBodyValidation=()=>body(['userID','date','blogID','body']).notEmpty();
router.post('/',addCommentBodyValidation(),body(['isReply','replyID']).optional(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const body = matchedData(req);
        database('blog_comments').
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


/////////// start get comment by userID //////////
router.get('/user/:id',param('id').isNumeric(),query(['page','per']).optional(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const data = matchedData(req);
        const page=Number(data?.page) || null;
        const per_page=Number(data?.per) || 6;
        database('blog_comments').
        join('blog','blog_comments.blogID','=','blog.id').
        join('users','blog_comments.userID','=','users.id').
        select('blog_comments.*','blog.title as blog_title','blog.link as blog_link','blog.image_xs as blog_image','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username').
        where('blog_comments.userID','=',Number(data.id)).
        then(response=>{
            const imageFilter=addImageBase(response,'blog_image')
            const booleanFilter=changeToBoolean(imageFilter,['isAccept','isReply'])
            res.status(200).send(responseHandler(false,null,pagination(booleanFilter,page,per_page,req.originalUrl,'comments')))
        }).catch(err=>{
            console.log(err)
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

/////////// end get comment by userID //////////


///////////// start get comment /////////////
const commentQueryValidation=()=>query(['page','per']).optional();
router.get('/',commentQueryValidation(),async (req,res)=>{
    const page=Number(req.query?.page) || null;
    const per_page=Number(req.query?.per) || 6;
    const comments=await database('blog_comments')
        .join('blog','blog_comments.blogID','=','blog.id')
        .join('users','blog_comments.userID','=','users.id').
        where({isReply:0})
        .select('blog_comments.*','blog.title as blog_title','blog.image_sm as blog_image_sm','blog.image_xs as blog_image_xs','blog.image_lg as blog_image_lg','blog.link as blog_link','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username');
    const convertNumberToBoolean=changeToBoolean(comments,['isAccept','isReply','replyID'])
    const result=addImageBase(convertNumberToBoolean,['blog_image_xs','blog_image_sm','blog_image_lg'])
    res.status(200).send(responseHandler(false,null,pagination(result,page,per_page,req.originalUrl,'comments')));
})
///////////// end get comment /////////////


///////////// start approve comment /////////////
router.put('/change-status/:commentID/:status',param(['commentID','status']).isNumeric(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        database('blog_comments')
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

module.exports=router
