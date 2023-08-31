const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {responseHandler, addImageBase, pagination} = require("../../utils");


/////////// get all category
router.get('/:cat/:search',async (req,res)=>{
    const cat=req.params.cat;
    const search=req.params.search;
    const limit=req?.query?.limit || null;
    const page=Number(req.query?.page) || null;
    const per_page=Number(req.query?.per) || 6;
   if(cat==='product'){
       const searchProducts=await database('product').
       join('product_category','product_category.id','=','product.categoryID').
       select('product.*','product_category.name as category').
       whereILike(`title`,`${search.toLowerCase()}%`).
       orWhereILike('product_category.name',`${search.toLowerCase()}%`).
       orWhereILike('link',`${search.toLowerCase()}%`).limit(limit || 100);
        const addImage=addImageBase(searchProducts,'primary_image');
        const addPagination=pagination(addImage,page,per_page,req.originalUrl,'products');
        const result={...addPagination,meta:{...addPagination.meta,total_items:addImage.length}}
        if(page && per_page){
            res.status(200).send(responseHandler(false,null,result));
        }else{
            res.status(200).send(responseHandler(false,null,addImage));
        }

   }else if(cat==='blog'){
       const searchBlogs=await database('blog').
       join('blog_category','blog_category.id','=','blog.categoryID').
       select('blog.*','blog_category.name as category').
       whereILike(`title`,`%${search.toLowerCase()}%`).
       orWhereILike('blog_category.name',`%${search.toLowerCase()}%`).
       orWhereILike('link',`%${search.toLowerCase()}%`).limit(limit || 100);
       const addImage=addImageBase(searchBlogs,['image_xs','image_lg','image_sm']);
       const addPagination=pagination(addImage,page,per_page,req.originalUrl,'blogs');
       const result={...addPagination,meta:{...addPagination.meta,total_items:addImage.length}}
       if(page && per_page){
           res.status(200).send(responseHandler(false,null,result));
       }else{
           res.status(200).send(responseHandler(false,null,addImage));
       }
   }
})







module.exports=router
