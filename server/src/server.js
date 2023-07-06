require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
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
const productCategoryRoute=require('./routes/product_category')
const productCommentsRoute=require('./routes/product_comments')
//// menu route
const menuRoute=require('./routes/menu')
//// blog route
const blogRoute=require('./routes/blog')
const blogCategoryRoute=require('./routes/blog_category')
const blogCommentsRoute=require('./routes/blog_comments')
//// contact us
const contactUsRoute=require('./routes/contact_us')
//// gallery route
const galleryRoute=require('./routes/gallery')
//// auth route
const authRoute=require('./routes/auth')
//// profile route
const profileRoute=require('./routes/profile')
//// location route
const locationRoute=require('./routes/location')
//// coupons route
const couponRoute=require('./routes/coupons')
//// order route
const ordersRoute=require('./routes/orders')
//// basket route
const basketRoute=require('./routes/basket')
////
app.use('/storage/image',storageRoute)
app.use('/api/access',accessRoute)
app.use('/api/banner',bannerRoute)
app.use('/api/products',productRoute)
app.use('/api/product-category',productCategoryRoute)
app.use('/api/menu',menuRoute)
app.use('/api/product-comments',productCommentsRoute)
app.use('/api/blog',blogRoute)
app.use('/api/blog-category',blogCategoryRoute)
app.use('/api/blog-comments',blogCommentsRoute)
app.use('/api/contact-us',contactUsRoute)
app.use('/api/gallery',galleryRoute)
app.use('/api/auth',authRoute)
app.use('/api/profile',profileRoute)
app.use('/api/loc',locationRoute)
app.use('/api/coupons',couponRoute)
app.use('/api/orders',ordersRoute)
app.use('/api/basket',basketRoute)




app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
