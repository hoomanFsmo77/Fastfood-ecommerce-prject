const database = require("./database/database");
const _ = require("lodash");
const imageBase=process.env.IMAGE_PATH;
const apiBase=process.env.API_BASE
const pageRegx=/page=\d+/g
////////////////////////////////////////////////////
const querySerialize = (obj) => {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}
const getToday = () => {
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const date=new Date()


    return `${date.getDate()} ${months[date.getMonth()]}.${date.getFullYear()}`
}
const  removeDuplicate = (arr,key) => {
    const uniqueItems = [];
    return arr.filter(element => {
        const isDuplicate = uniqueItems.includes(element[key]);

        if (!isDuplicate) {
            uniqueItems.push(element[key]);

            return true;
        }

        return false;
    });
}

const responseHandler = (error,msg,data) => {
    return {
        error:error,
        errors:msg,
        data:data
    }
}

const changeToBoolean = (source,key) => {
    if(typeof key==='string'){
        return source.map(item=>{
            return {
                ...item,
                [key]:item[key] === 1
            }
        })
    }else{
        let result=[...source];
        key.forEach(k=>{
            result= result.map(item=>{
                return {
                    ...item,
                    [k]:item[k] === 1
                }
            })
        });
        return result;
    }

}
const sortByCategory = (arr) => {
    return arr.reduce((p1,p2)=>{
        if(!p1[p2.category]) {
            return {
                ...p1,
                [p2.category]: [{...p2}]
            }
        }else{
            return  {...p1,...p1[p2.category].push(p2)}
        }
    },{})
}

const addImageBase = (source,key) => {
    const imageBase=process.env.IMAGE_PATH
    if(typeof key==='object'){
        let result=[...source];
        key.forEach(k=>{
            result= result.map(item=>{
                return {
                    ...item,
                    [k]:imageBase+item[k]
                }
            })
        });
        return result;
    }else{
        return source.map(item=>{
            return {...item,[key]:imageBase+item[key]}
        })
    }
}

const getAllProductFilter = async () => {
    const products=await database('product').join('product_category','product_category.id','=','product.categoryID').select('product.*','product_category.name as category');
    const result= await transferProductToReadable(products)
    return sortByCategory(result)
}

const getProductByLinkFilter = async (link) => {
    const product=await database('product').join('product_category','product_category.id','=','product.categoryID').select('product.*','product_category.name as category','product_specification.color as color','product_specification.size as size').join('product_specification','product.specification','=','product_specification.id').where({link:link});
    const comments = await database('product_comments').where({productID:product[0].id,isAccept:1,isReply:0} );

    const images = await database('product_image').select().where({productID:product[0].id} );
    const changeNumberToBoolean=changeToBoolean([{...product[0],images,total_comments:comments.length}],['status','off']);
    const result=addImageBase(changeNumberToBoolean,'primary_image').map(item=>{
        if(item.images){
            return {
                ...item,
                images:item.images.map(sub_item=>{
                    return {...sub_item,image:imageBase+sub_item.image}
                }),
            }
        }else{
            return item
        }
    })
    return result[0]
}

const getCommentsByLink = async (productID) => {
    let target=[]
    const comments = await database('product_comments').join('users','product_comments.userID','=','users.id').select('product_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.profile_image as author_image').where({productID:productID,isAccept:1,isReply:0} );
    const replies=await database('product_comments').join('users','product_comments.userID','=','users.id').select('product_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.profile_image as author_image').where({productID:productID,isAccept:1,isReply:1} );
    if(comments.length>0){
        if(replies.length>0){
            target=groupReplies([...replies,...comments])
        }else{
            target=groupReplies(comments)
        }
    }else{
        target=[]
    }
    return target
}

const groupReplies = (data) => {
    const roots = [];
    const byId = new Map();
    const replies=addImageBase(data,'author_image')

    for(const reply of replies){
        byId.set(reply.id, reply);
    }

    for(const reply of replies) {
        const {replyID} = reply;
        if(replyID) {
            const parent = byId.get(replyID);
            if(parent){
                (parent.reply || (parent.reply = [])).push(reply);
            }else{
                roots.push(reply);
            }
        } else {
            roots.push(reply);
        }
    }
    return roots
}


const getBlogByLinkFilter = async (link) => {
    const blog=await database('blog').join('blog_category','blog_category.id','=','blog.categoryID').join('admins','blog.adminID','=','admins.id').select('blog.*','blog_category.name as category','admins.lastname as author_lastname','admins.username as author_username','admins.firstname as author_firstname').where({link:link});
    const comments = await database('blog_comments').where({blogID:blog[0].id,isAccept:1,isReply:0} );
    const content = await database('blog').join('blog_content','blog_content.blogID','=','blog.id').select('blog_content.*').where({blogID:blog[0].id} );

    const result=addImageBase([{...blog[0],content,total_comments:comments.length}],['image_sm','image_xs','image_lg']);
    return result[0]
}

const getBlogCommentsByBlogId =async (blogId) => {
    let target=[];
    const comments = await database('blog_comments').join('users','blog_comments.userID','=','users.id').select('blog_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username','users.profile_image as author_image').where({blogID:blogId,isAccept:1,isReply:0} );
    const replies=await database('blog_comments').join('users','blog_comments.userID','=','users.id').select('blog_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username','users.profile_image as author_image').where({blogID:blogId,isAccept:1,isReply:1} );
    if(comments.length>0){
        if(replies.length>0){
            target=groupReplies([...replies,...comments])
        }else{
            target=groupReplies(comments)
        }
    }else{
        target=[]
    }
    return target

}

const getAllBlogs =async () => {
    const allBlogs=await database('blog').join('blog_category', 'blog_category.id', '=', 'blog.categoryID').join('admins', 'blog.adminID', '=', 'admins.id').select('blog.*', 'blog_category.name as category', 'admins.lastname as author_lastname', 'admins.username as author_username', 'admins.firstname as author_firstname');
    const blogIds=_.map(allBlogs, (el) => el.id);
    const comments = await database('blog_comments').select().whereIn('blogID', blogIds).where({isReply:0});
    const groupComments=_.groupBy(comments,'blogID')
    return  _.map(allBlogs, (record) => {
        return {
            ...record,
            comments:groupComments[record.id] ?  groupComments[record.id].length : 0,
        };
    });
}

const getBlogByCategory =async (id) => {
    const target=await database('blog').join('blog_category', 'blog_category.id', '=', 'blog.categoryID').join('admins', 'blog.adminID', '=', 'admins.id').select('blog.*', 'blog_category.name as category', 'admins.lastname as author_lastname', 'admins.username as author_username', 'admins.firstname as author_firstname').where({'blog.categoryID':id});
    const addImage=addImageBase(target,['image_sm','image_xs','image_lg'])
    const blogIds=_.map(addImage, (el) => el.id);
    const comments = await database('blog_comments').select().whereIn('blogID', blogIds).where({isReply:0});
    const groupComments=_.groupBy(comments,'blogID')

    return  _.map(addImage, (record) => {
        return {
            ...record,
            comments:groupComments[record.id] ?  groupComments[record.id].length : 0,
        };
    });
}

const transferProductToReadable = async (products) => {
    const productsIds=_.map(products, (el) => el.id);
    const images = await database('product_image').select().whereIn('productID', productsIds);
    const groupedImages = _.groupBy(images, 'productID');
    const imagesEmbedded = _.map(products, (record) => {
        return {
            ...record,
            images: groupedImages[record.id] ,
        };
    });
    const changeNumberToBoolean=changeToBoolean(imagesEmbedded,['status','off']);
    return addImageBase(changeNumberToBoolean,'primary_image').map(item=>{
        if(item.images){
            return {
                ...item,
                images:item.images.map(sub_item=>{
                    return {...sub_item,image:imageBase+sub_item.image}
                })
            }
        }else{
            return item
        }
    })
}
/// 1 => most expensive
/// 2 => less expensive
/// 3 => best sellers
/// 4 => with off

const getProductByCondition = async (search,categoryName,sortBy) => {
    let products;
    if(!categoryName && sortBy!==4 && typeof sortBy==='number'){
         products=await database('product').
         join('product_category','product_category.id','=','product.categoryID').
         select('product.*','product_category.name as category').
         whereILike(`title`,`%${search.toLowerCase()}%`).
         orderByRaw(sortBy===1 ? 'price DESC' : sortBy===2 ? 'price ASC' : sortBy===3 ? ''  : null);
    }else if(sortBy===4 && !categoryName){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`%${search.toLowerCase()}%`).
        where({off:1})
    }else if(categoryName && sortBy!==4 && typeof sortBy==='number'){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`%${search.toLowerCase()}%`).
        whereILike('product_category.name',`%${categoryName.toLowerCase()}%`).
        orderByRaw(sortBy===1 ? 'price DESC' : sortBy===2 ? 'price ASC' : sortBy===3 ? ''  : null);
    }else if(categoryName && sortBy===4){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`%${search.toLowerCase()}%`).
        whereILike('product_category.name',`%${categoryName.toLowerCase()}%`).
        where({off:1})
    }else if (!sortBy && categoryName){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`%${search.toLowerCase()}%`).
        whereILike('product_category.name',`%${categoryName.toLowerCase()}%`)
    }else if(!sortBy && !categoryName){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`%${search.toLowerCase()}%`)
    }

    return await transferProductToReadable(products)

}

const getRandomProduct =async (limit) => {
  const product=await database('product').select('*').orderByRaw('RAND()').limit(limit)
    return transferProductToReadable(product)
}

const pagination = (source,page,per_page,originalUrl,key) => {
    const url=page ? originalUrl : originalUrl.includes('?') ? originalUrl+'&page=1' : originalUrl+'?page=1';
    const validPage=page || 1;
    const totalPage=Math.ceil(source.length/per_page)
    const startIdx=(validPage*per_page)-per_page
    const endIdx=startIdx+per_page
    return {
        [key]:source.slice(startIdx,endIdx),
        meta:{
            current_page:validPage,
            total:totalPage,
            nextPage:validPage>=totalPage ? 1 : validPage+1,
            prevPage:validPage>1 ? validPage-1 : totalPage
        },
        links:{
            "first":apiBase+ url.replace(pageRegx,'page='+'1') ,
            "last": apiBase+url.replace(pageRegx,'page='+totalPage),
            "prev": validPage>1 ? `${apiBase}${url.replace(pageRegx,'page='+(validPage-1))}` : `${apiBase}${url.replace(pageRegx,'page='+totalPage)}`,
            "next":validPage>=totalPage ? apiBase+url.replace(pageRegx,'page='+'1') : apiBase+url.replace(pageRegx,'page='+(validPage+1))
        }
    }
}
const calculateSum = (source,key) => {
  let sum=0
    source.forEach(item=>{
        sum+=item[key]
    })
    return sum
}
const date=new Date()
const today=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

const transferTransactionStatus = (source) => {
    return source.map(item=>{
        return {
            ...item,
            transaction_status:item.transaction_status==='1' ? 'success' : 'failed'
        }
    })
}

const transferOrderStatus = (source) => {
    return source.map(item=>{
        return {
            ...item,
            order_status:item.order_status===1 ? 'Processing' : 'Awaiting Payment'
        }
    })
}
const transferPaymentStatus = (source) => {
    return source.map(item=>{
        return {
            ...item,
            payment_status:item.payment_status===1 ? 'success' : item.payment_status===2 ?   'failed' : 'unpaid'
        }
    })
}


const calculateTotalPrice = (...args) => {
    let sum=0
    args.forEach(p1=>{
        sum+=p1
    })
    return sum

}


const getCustomProductDescription = (topping,cheese,sauces,size,template,additional_info,custom_pieces) => {
    return `<div class="order-container"><div class="order-image"><img alt="${template[0].image}" src="${imageBase+template[0].image}" srcset="${imageBase+template[0].image}"/></div><div class="order-data"><div><h6>Sizes ($${template[0].price.toFixed(2)}):</h6><p>${size[0].size}</p></div><div><h6>Sauces ${sauces[0]?.price ? `($${sauces[0]?.price.toFixed(2)})` : ''}:</h6><p>${sauces[0]?.sauces || 'none'}</p></div><div><h6>Cheese ${cheese[0]?.price ? `($${cheese[0]?.price.toFixed(2)})` : ''}:</h6><p>${cheese[0]?.cheese || 'none'}</p></div><div><h6>Toppings ${topping[0]?.price ? `($${topping[0]?.price.toFixed(2)})` : ''}:</h6><p>${topping[0]?.toppings || 'none'}</p></div><div><h6>Additional Info:</h6><p>${additional_info}</p></div><div><h6>Custom Pieces:</h6><p>${custom_pieces}</p></div></div></div>`
}



const warpAddress = async (addressData) => {
    const {address,provinceID,cityID,postal_code,phone}=addressData;
    const province=await database('provinces').select('*').where({id:provinceID});
    const city=await database('cities').select('*').where({id:cityID});
    return `${province[0].title} - ${city[0].city} - ${address} - postal code: ${postal_code} - phone: ${phone}`
}

module.exports={
    querySerialize,responseHandler,changeToBoolean,sortByCategory,addImageBase,getAllProductFilter,getProductByLinkFilter,getProductByCondition,getRandomProduct,pagination,getBlogByLinkFilter,calculateSum,today,getAllBlogs,getBlogByCategory,transferTransactionStatus,transferOrderStatus,transferPaymentStatus,removeDuplicate,getCommentsByLink,getBlogCommentsByBlogId,calculateTotalPrice,getCustomProductDescription,warpAddress,getToday
}