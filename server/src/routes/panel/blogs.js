const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {body, validationResult, matchedData, param} = require("express-validator");
const upload = require("../../database/upload");
const {responseHandler, getBlogByLinkFilter, getBlogByCategory, getAllBlogs, addImageBase, pagination,getToday} = require("../../utils");
const mw=require('../../middleware/admin')
const _ = require("lodash");
router.use(mw)
////  add blog


router.post('/',upload.fields([{name:'image_sm'},{name:'image_xs'},{name:'image_lg'}]),async (req,res)=>{
    const body=req.body;
    const adminID=req.headers.admin_id
    const bodyEntries=Object.entries(body);
    const image_xs=req?.files?.image_xs ? req.files.image_xs[0].filename : null;
    const image_sm=req?.files?.image_sm ? req?.files?.image_sm[0]?.filename : null;
    const image_lg=req?.files?.image_lg ? req.files.image_lg[0].filename : null;
    if(body.categoryID && image_xs && image_sm && image_lg && body.title.length>0 && body.brief.length>0 && body.link.length>0){

        const updateBody={
            categoryID:body.categoryID,
            title:body.title,
            brief:body.brief,
            link:body.link,
            date:getToday(),
            image_xs, image_sm, image_lg,
            adminID
        };

        const filterAddContent=bodyEntries.filter(item=>item[0].startsWith('add_content_') || item[0].startsWith('add_title_')).map(item=>{
            return [item[0].split('_')[2],item[1]];
        });

        database('blog').
        insert(updateBody).
        then(async response=>{
            if(filterAddContent.length>0){
                const addContent=Object.entries(_.groupBy(filterAddContent,'[0]'));
                await Promise.all(addContent.map(item=>database('blog_content').insert({blogID:response[0],title:item[1][0][1],text:item[1][1][1],col:12})))
            }
            res.status(200).send(responseHandler(false,'blog updated',null))
        }).catch(err=>{
            console.log(err)
            res.status(503).send('error in db')
        });

    }else{
        res.status(200).send(responseHandler(true,'All fields are required!',null));
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



/// update blog
router.put('/:id',upload.fields([{name:'image_sm'},{name:'image_xs'},{name:'image_lg'}]),async (req,res)=>{
    const body=req.body;
    const blogID=req.params.id;
    const bodyEntries=Object.entries(body);
    if(body.categoryID && body.title.length>0 && body.brief.length>0 && body.link.length>0){
        const image_xs=req?.files?.image_xs ? req.files.image_xs[0].filename : null;
        const image_sm=req?.files?.image_sm ? req?.files?.image_sm[0]?.filename : null;
        const image_lg=req?.files?.image_lg ? req.files.image_lg[0].filename : null;
        const updateBody={
            categoryID:body.categoryID,
            title:body.title,
            brief:body.brief,
            link:body.link,
            date:getToday(),
            image_xs, image_sm, image_lg
        };

        !updateBody.image_xs && delete updateBody.image_xs;
        !updateBody.image_sm && delete updateBody.image_sm;
        !updateBody.image_lg && delete updateBody.image_lg;
        const filterEditedContent=bodyEntries.filter(item=>item[0].startsWith('content_') || item[0].startsWith('title_')).map(item=>{
            return [item[0].split('_')[1],item[1]]});
        const filterAddContent=bodyEntries.filter(item=>item[0].startsWith('add_content_') || item[0].startsWith('add_title_')).map(item=>{
            return [item[0].split('_')[2],item[1]];
        });
        const filterDelContent=body.delContent.filter(item=>item  && item.length>0)
        if(filterEditedContent.length>0){
            const editedContent=Object.entries(_.groupBy(filterAddContent,'[0]'));
            await Promise.all(editedContent.map(item=>database('blog_content').update({blogID,title:item[1][0][1],text:item[1][1][1]}).where({id:item[0]})));
        }
        if(filterAddContent.length>0){
            const addContent=Object.entries(_.groupBy(filterAddContent,'[0]'));
            await Promise.all(addContent.map(item=>database('blog_content').insert({blogID,title:item[1][0][1],text:item[1][1][1],col:12})))
        }

        if(filterDelContent.length>0){
            await Promise.all(filterDelContent.map(id=>database('blog_content').where({id,blogID }).del()));
        }

        database('blog').
        where({id:blogID}).
        update(updateBody).
        then(response=>{
            res.status(200).send(responseHandler(false,'blog updated',null))
        }).catch(err=>{
            console.log(err)
            res.status(503).send('error in db')
        });

    }else{
        res.status(200).send(responseHandler(true,'All fields are required!',null));
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
