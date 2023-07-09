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

//// app routes
const accessRoute=require('./routes/app/access')
const bannerRoute=require('./routes/app/banner')
const productRoute=require('./routes/app/product')
const productCategoryRoute=require('./routes/app/product_category')
const productCommentsRoute=require('./routes/app/product_comments')
const menuRoute=require('./routes/app/menu')
const blogRoute=require('./routes/app/blog')
const blogCategoryRoute=require('./routes/app/blog_category')
const blogCommentsRoute=require('./routes/app/blog_comments')
const contactUsRoute=require('./routes/app/contact_us')
const galleryRoute=require('./routes/app/gallery')
const authRoute=require('./routes/app/auth')
const profileRoute=require('./routes/app/profile')
const locationRoute=require('./routes/app/location')
const couponRoute=require('./routes/app/coupons')
const ordersRoute=require('./routes/app/orders')
const basketRoute=require('./routes/app/basket')
const paymentRoute=require('./routes/app/payment')
const transactionRoute=require('./routes/app/transaction')
const favoriteRoute=require('./routes/app/favorite')


//// panel routes
const panelAuthRoute=require('./routes/panel/auth')
const panelUsersRoute=require('./routes/panel/users')
const productsRoute=require('./routes/panel/products')
const productsCategoryRoute=require('./routes/panel/product_category')
const blogsCategoryRoute=require('./routes/panel/blog_category')

//// app routes
app.use('/storage/image',storageRoute)
app.use('/app/access',accessRoute)
app.use('/app/banner',bannerRoute)
app.use('/app/products',productRoute)
app.use('/app/product-category',productCategoryRoute)
app.use('/app/menu',menuRoute)
app.use('/app/product-comments',productCommentsRoute)
app.use('/app/blog',blogRoute)
app.use('/app/blog-category',blogCategoryRoute)
app.use('/app/blog-comments',blogCommentsRoute)
app.use('/app/contact-us',contactUsRoute)
app.use('/app/gallery',galleryRoute)
app.use('/app/auth',authRoute)
app.use('/app/profile',profileRoute)
app.use('/app/loc',locationRoute)
app.use('/app/coupons',couponRoute)
app.use('/app/orders',ordersRoute)
app.use('/app/basket',basketRoute)
app.use('/app/payment',paymentRoute)
app.use('/app/transaction',transactionRoute)
app.use('/app/favorite',favoriteRoute)

//// panel routes
app.use('/panel/auth',panelAuthRoute)
app.use('/panel/users',panelUsersRoute)
app.use('/panel/products',productsRoute)
app.use('/panel/product-category',productsCategoryRoute)
app.use('/panel/blog-category',blogsCategoryRoute)




app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
