const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {responseHandler}=require('../../utils')
const {validationResult,matchedData,query} = require('express-validator');
const mw=require('../../middleware/admin')

router.use(mw)
///// get all category
router.get('/',(req,res)=>{
    const id=req.query.id;
    if(id){
        database('product_category').select('*').where({id}).then(response=>{
            res.status(200).send(responseHandler(false,null,response[0]))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }else{
        database('product_category').select('*').then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }

})
///// add new category
router.post('/',query(['category','description']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('product_category').
        insert({name:query.category,description:query.description}).
        then(response=>{
            res.status(200).send(responseHandler(false,'category added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})
///// delete category
router.delete('/',query('id').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('product_category').
         where({id:query.id}).
        del().
        then(response=>{
            res.status(200).send(responseHandler(false,'category deleted',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})
////// update a category
router.put('/',query(['id','category','description']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('product_category').
        where({id:query.id}).
        update({name:query.category,description:query.description}).
        then(response=>{
            res.status(200).send(responseHandler(false,'category updated',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})


module.exports=router
