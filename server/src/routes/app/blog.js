const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const bodyParser = require("body-parser");
const {responseHandler, addImageBase, getBlogByLinkFilter,getAllBlogs, pagination,getBlogByCategory, getCommentsByLink,getBlogCommentsByBlogId}=require('../../utils')
router.use(bodyParser.urlencoded({extended:true}));



////////////////// start get news ////////////////////////
router.get('/news',(req,res)=>{
    database('blog').
    join('blog_category','blog.categoryID','=','blog_category.id').
    where({isLatest:1}).
    select('blog.*','blog_category.name as category').
     then(response=>{
        res.status(200).send(responseHandler(false,null,addImageBase(response,['image_sm','image_xs','image_lg'])))
    }).catch(err=>{
        res.status(503).send('error in db')
    })
})
////////////////// start get news ////////////////////////

////////////////// start get blogs ////////////////////////
router.get('/',async (req,res)=>{
    const categoryID=req.query.categoryID;
    const link=req?.query?.link?.toLowerCase() || '';
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 6;
    if(link){
        const target=await getBlogByLinkFilter(link)
        res.status(200).send(responseHandler(false,null,target))
    }else if(categoryID){
        if(categoryID==='all'){
            const allBlogs=await getAllBlogs();
            const target=addImageBase(allBlogs,['image_sm','image_xs','image_lg']);
            res.status(200).send(responseHandler(false,null,pagination(target,page,per_page,req.originalUrl,'blogs')))
        }else{
            const target=await getBlogByCategory(categoryID)
            res.status(200).send(responseHandler(false,null,pagination(target,page,per_page,req.originalUrl,'blogs')))
        }

    }else{
        const allBlogs=await getAllBlogs();
        const target=addImageBase(allBlogs,['image_sm','image_xs','image_lg']);
        res.status(200).send(responseHandler(false,null,pagination(target,page,per_page,req.originalUrl,'blogs')))
    }

})
////////////////// start get blogs ////////////////////////

//// get comments

router.get('/comments/:blogID',async (req,res)=>{
    const blogID=req.params.blogID
    const page=Number(req.query.page) || 1;
    const per_page=Number(req.query.per) || 3;
    const comments=await getBlogCommentsByBlogId(blogID);
    res.status(200).send(responseHandler(false,null,pagination(comments,page,per_page,req.originalUrl,'comments')))
})


module.exports=router
