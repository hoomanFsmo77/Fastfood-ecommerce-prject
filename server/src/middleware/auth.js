const database=require('../database/database')
const {responseHandler}=require('../utils')

module.exports=(req,res,next)=>{
    if(!req.originalUrl.includes('/app/access') && !req.originalUrl.includes('/app/payment/verify') && !req.originalUrl.includes('/storage/image')){
        const access_key=req.headers.access;
        database('registered').where({token:access_key}).then(response=>{
            if(response.length>0){
                next()
            }else{
                res.status(200).send(responseHandler(true,'Invalid or expired API KEY!',null))
            }
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'Invalid or expired API KEY!',null))
        })
    }else{
        next()
    }
}