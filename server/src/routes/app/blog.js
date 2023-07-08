const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const bodyParser = require("body-parser");
const upload=require('../../database/upload')
const {responseHandler, addImageBase, getBlogByLinkFilter,getAllBlogs, pagination,getBlogByCategory}=require('../../utils')
const {query, validationResult, matchedData, body} = require("express-validator");
router.use(bodyParser.urlencoded({extended:true}));


////////////////// start add blog ////////////////////////
const addBlogBodyValidation=()=>body(['categoryID','title','date','brief','link','userID']).notEmpty();

router.post('/',upload.fields([{name:'image_sm'},{name:'image_xs'},{name:'image_lg'}]),addBlogBodyValidation(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty() && req?.files?.image_xs && req?.files?.image_lg) {
        const body = matchedData(req);
        const image_xs=req.files.image_xs[0].filename;
        const image_sm=req?.files?.image_sm ? req?.files?.image_sm[0]?.filename : '';
        const image_lg=req.files.image_lg[0].filename;
        database('blog').
        insert({
            ...body,
            image_xs, image_sm, image_lg
        }).
        then(response=>{
            res.status(200).send(responseHandler(false,'blog added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        });
    }else{
        if(result.array().length>0 && req?.file?.filename){
            res.status(200).send(responseHandler(true,result.array(),null))
        }else{
            res.status(200).send(responseHandler(true,[...result.array(),{
                "type": "field",
                "msg": "Invalid value",
                "path": "image_xs",
                "location": "body"
            },
                {
                    "type": "field",
                    "msg": "Invalid value",
                    "path": "image_lg",
                    "location": "body"
                }
            ],null));
        }
    }
})
////////////////// end add blog ////////////////////////

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
        const target=await getBlogByCategory(categoryID)
        res.status(200).send(responseHandler(false,null,target))
    }else{
        const allBlogs=await getAllBlogs();
        const target=addImageBase(allBlogs,['image_sm','image_xs','image_lg']);
        res.status(200).send(responseHandler(false,null,pagination(target,page,per_page,req.originalUrl,'blogs')))
    }


    // if(categoryID){
    //     database('blog').
    //     join('blog_category','blog.categoryID','=','blog_category.id').
    //     join('users','blog.userID','=','users.id').
    //     where({'blog.categoryID':categoryID}).
    //     select('blog.*','blog_category.name as category_name','').
    //       then(response=>{
    //         res.status(200).send(responseHandler(false,null,response))
    //     }).catch(err=>{
    //         res.status(200).send(responseHandler(false,'error in db',null))
    //     })
    // }else{
    //
    // }
})
////////////////// start get blogs ////////////////////////



module.exports=router
