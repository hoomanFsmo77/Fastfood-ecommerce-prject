require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
// const database=require('./database/database')
const app=express()
app.use(bodyParser.json());
app.use(cors());

//// middleware
const mw=require('./middleware/auth')
app.use(mw)
//// storage route
const storageRoute=require('./routes/storage')
//// access route
const accessRoute=require('./routes/access')
//// banner route
const bannerRoute=require('./routes/banner')
//// product route
const productRoute=require('./routes/product')
//// category route
const categoryRoute=require('./routes/category')
//// menu route
const menuRoute=require('./routes/menu')
//// comments route
const commentsRoute=require('./routes/comments')
//// users route
const usersRoute=require('./routes/users')
//// blog route
const blogRoute=require('./routes/blog')
////
app.use('/storage/image',storageRoute)
app.use('/api/access',accessRoute)
app.use('/api/banner',bannerRoute)
app.use('/api/products',productRoute)
app.use('/api/category',categoryRoute)
app.use('/api/menu',menuRoute)
app.use('/api/comments',commentsRoute)
app.use('/api/users',usersRoute)
app.use('/api/blog',blogRoute)




app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
