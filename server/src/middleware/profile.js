const database = require("../database/database");
const {responseHandler} = require("../utils");
module.exports=(req,res,next)=>{
    const token=req.headers.token
    if(token){
        database('users').select(['token','id']).where({token}).then(response=>{
            if(response.length>0){
                req.headers.id=response[0].id
                next()
            }else{
                res.status(200).send(responseHandler(true,'Unauthenticated',null))
            }
        })
    }else{
        res.status(200).send(responseHandler(true,'Unauthenticated',null))
    }
}