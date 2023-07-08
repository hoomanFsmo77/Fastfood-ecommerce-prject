const express=require('express')
const fs = require("fs");
const path=require('path')
const router=express.Router()
const bodyParser=require('body-parser')
const upload=require('../../database/upload')
router.use(bodyParser.urlencoded({extended: true,}))
///////////////////////////////////////////////////////

router.get('/',(req,res)=>{
    res.status(200)
})

router.get('/:image',(req,res)=>{
    const imageName=req.params.image;
    const rootPath=path.join(__dirname,'../')
    const imagePath=rootPath+'/storage/'+imageName;
    fs.readFile(imagePath,{},(error,image)=>{
        if(error){
            res.status(404).end()
        }else{
            res.status(200).send(image)
        }
    })
})


router.post('/upload',upload.single('image'),(req,res)=>{
    res.status(200).send(JSON.stringify('file uploaded'))
})


module.exports=router