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
const storageRoute=require('./routes/app/storage')
//// access route
const accessRoute=require('./routes/app/access')
//// banner route
const bannerRoute=require('./routes/app/banner')
//// product route
const productRoute=require('./routes/app/product')
const productCategoryRoute=require('./routes/app/product_category')
const productCommentsRoute=require('./routes/app/product_comments')
//// menu route
const menuRoute=require('./routes/app/menu')
//// blog route
const blogRoute=require('./routes/app/blog')
const blogCategoryRoute=require('./routes/app/blog_category')
const blogCommentsRoute=require('./routes/app/blog_comments')
//// contact us
const contactUsRoute=require('./routes/app/contact_us')
//// gallery route
const galleryRoute=require('./routes/app/gallery')
//// auth route
const authRoute=require('./routes/app/auth')
//// profile route
const profileRoute=require('./routes/app/profile')
//// location route
const locationRoute=require('./routes/app/location')
//// coupons route
const couponRoute=require('./routes/app/coupons')
//// order route
const ordersRoute=require('./routes/app/orders')
//// basket route
const basketRoute=require('./routes/app/basket')
//// payment route
const paymentRoute=require('./routes/app/payment')
//// transaction route
const transactionRoute=require('./routes/app/transaction')
//// favorite route
const favoriteRoute=require('./routes/app/favorite')
//// panel routes
const panelAuthRoute=require('./routes/panel/auth')
const panelUsersRoute=require('./routes/panel/users')
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
app.use('/api/payment',paymentRoute)
app.use('/api/transaction',transactionRoute)
app.use('/api/favorite',favoriteRoute)
app.use('/panel/auth',panelAuthRoute)
app.use('/panel/users',panelUsersRoute)




app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
