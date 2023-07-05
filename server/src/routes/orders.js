const express=require('express')
const router=express.Router();
const database=require('../database/database')
const bodyParser=require('body-parser')
const {responseHandler} = require("../utils");
const {query, validationResult, matchedData, body} = require("express-validator");
router.use(bodyParser.urlencoded({extended:true}))









module.exports=router