const express=require('express')
const router=express.Router();
const database=require('../database/database')
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
const {responseHandler, addImageBase}=require('../utils')
const {query, validationResult, matchedData, body} = require("express-validator");

//////////////////////////////////////////////////////////////////
const multer  = require('multer')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/storage/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "svg") {
        cb(null, true);
    } else {
        cb("Not a jpeg|jpg|png|svg File!!", false);
    }
};
const upload = multer({storage: multerStorage, fileFilter: multerFilter})


/////////////////////////////////////////////////////
///// get all category
router.get('/category',(req,res)=>{
    database('blog_category').select('*').then(response=>{
        res.status(200).send(responseHandler(false,null,response))
    }).catch(err=>{
        res.status(503).send('error in db!')
    })
})
///// add new category
router.post('/category',query(['category']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('blog_category').
        insert({name:query.category}).
        then(response=>{
            res.status(200).send(responseHandler(false,'category added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})
////// update a category
router.put('/',query(['id','category']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('blog_category').
        where({id:query.id}).
        update({name:query.category}).
        then(response=>{
            res.status(200).send(responseHandler(false,'category updated',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})


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
router.get('/',(req,res)=>{
    const link=req?.query?.link?.toLowerCase() || '';
    database('blog').
    join('blog_category','blog.categoryID','=','blog_category.id').
    select('blog.*','blog_category.name as category').
    whereILike('blog.link',`${link}%`).
    then(response=>{
        res.status(200).send(responseHandler(false,null,addImageBase(response,['image_sm','image_xs','image_lg'])))
    }).catch(err=>{
        res.status(503).send('error in db')
    })

})
////////////////// start get blogs ////////////////////////


module.exports=router
