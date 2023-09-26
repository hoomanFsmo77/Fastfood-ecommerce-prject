const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {body, validationResult, matchedData, param} = require("express-validator");
const upload = require("../../database/upload");
const {responseHandler, getBlogByLinkFilter, getBlogByCategory, getAllBlogs, addImageBase, pagination,getToday} = require("../../utils");
const mw=require('../../middleware/admin')
router.use(mw)
////  add blog
const addBlogBodyValidation=()=>body(['categoryID','title','brief','link']).notEmpty();

router.post('/',upload.fields([{name:'image_sm'},{name:'image_xs'},{name:'image_lg'}]),addBlogBodyValidation(),(req,res)=>{
    const result = validationResult(req);
    const image_xs=req?.files?.image_xs ? req.files.image_xs[0].filename : null;
    const image_sm=req?.files?.image_sm ? req?.files?.image_sm[0]?.filename : null;
    const image_lg=req?.files?.image_lg ? req.files.image_lg[0].filename : null;
    if(result.isEmpty() && image_xs && image_sm && image_lg) {
        const body = matchedData(req);
        const adminID=req.headers.admin_id;
        database('blog').
        insert({
            ...body,
            date:getToday(),
            adminID,
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

////  get blogs
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

})


/// delete blog
router.delete('/',async (req,res)=>{
    const id=req.query.id;
    if(id){
        const deleteBlogContent=await database('blog_content').where({blogID:id}).del();
        const deleteBlog=await database('blog').where({id}).del();
        res.status(200).send(responseHandler(false,'blog deleted',null))
    }else{
        res.status(200).send(responseHandler(true,'missing required query: id',null))
    }
})


const updateBlogBodyValidation=()=>body(['categoryID','title','brief','link']).notEmpty();
/// update blog
router.put('/:id',upload.fields([{name:'image_sm'},{name:'image_xs'},{name:'image_lg'}]),updateBlogBodyValidation(),param('id').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    const image_xs=req?.files?.image_xs ? req.files.image_xs[0].filename : null;
    const image_sm=req?.files?.image_sm ? req?.files?.image_sm[0]?.filename : null;
    const image_lg=req?.files?.image_lg ? req.files.image_lg[0].filename : null;
    if(result.isEmpty()) {
        const body = matchedData(req);
        const updateBody={
            ...body,
            date:getToday(),
            image_xs, image_sm, image_lg
        };
        !updateBody.image_xs && delete updateBody.image_xs;
        !updateBody.image_sm && delete updateBody.image_sm;
        !updateBody.image_lg && delete updateBody.image_lg;

        database('blog').
        where({id:body.id}).
        update(updateBody).
        then(response=>{
            res.status(200).send(responseHandler(false,'blog updated',null))
        }).catch(err=>{
            console.log(err)
            res.status(503).send('error in db')
        });
    }else{
        res.status(200).send(responseHandler(true,result.array(),null));
    }
})

/// add content
router.post('/content',(req,res)=>{
    const id=req.query.id;
    const body=req.body;
    if(id && body){
        const filteredData=body.map(item=>{
            return {
                ...item,
                blogID:id
            }
        });
        database('blog_content').
        insert(filteredData).then(()=>{
            res.status(200).send(responseHandler(false,'blog content added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })

    }else{
        res.status(200).send(responseHandler(true,'missing required query: id',null))
    }

})



module.exports=router
