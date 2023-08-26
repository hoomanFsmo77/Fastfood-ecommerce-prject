const database = require("./database/database");
const _ = require("lodash");
const imageBase=process.env.IMAGE_PATH;
const apiBase=process.env.API_BASE
const pageRegx=/page=\d+/g
////////////////////////////////////////////////////
const querySerialize = (obj) => {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
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
    const product=await database('product').join('product_category','product_category.id','=','product.categoryID').select('product.*','product_category.name as category').where({link:link});
    const images = await database('product_image').select().where({productID:product[0].id} );
    const comments = await database('product_comments').join('users','product_comments.userID','=','users.id').select('product_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.profile_image as author_image').where({productID:product[0].id,isAccept:1,isReply:0} );
    const replies=await database('product_comments').join('users','product_comments.userID','=','users.id').select('product_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.profile_image as author_image').where({productID:product[0].id,isAccept:1,isReply:1} );
    addImageBase(replies,'author_image').forEach(reply=>{
        comments.forEach(comment=>{
            if(reply.replyID===comment.id){
                comment.reply=comment.reply ? comment.reply.push(reply) : [reply]
            }
        })
    });
    const target={...product[0],images,comments};
    const changeNumberToBoolean=changeToBoolean([target],['status','off']);
    const result=addImageBase(changeNumberToBoolean,'primary_image').map(item=>{
        if(item.images){
            return {
                ...item,
                images:item.images.map(sub_item=>{
                    return {...sub_item,image:imageBase+sub_item.image}
                }),
                comments:item.comments.map(sub_item=>{
                    return {...sub_item,author_image:imageBase+sub_item.author_image}
                }),
            }
        }else{
            return item
        }
    })
    return result[0]
}
const getBlogByLinkFilter = async (link) => {
    const blog=await database('blog').join('blog_category','blog_category.id','=','blog.categoryID').join('admins','blog.adminID','=','admins.id').select('blog.*','blog_category.name as category','admins.lastname as author_lastname','admins.username as author_username','admins.firstname as author_firstname').where({link:link});
    const comments = await database('blog_comments').join('users','blog_comments.userID','=','users.id').select('blog_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username','users.profile_image as author_image').where({blogID:blog[0].id,isAccept:1,isReply:0} );
    const content = await database('blog').join('blog_content','blog_content.blogID','=','blog.id').select('blog_content.*').where({blogID:blog[0].id} );
    const replies=await database('blog_comments').join('users','blog_comments.userID','=','users.id').select('blog_comments.*','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username','users.profile_image as author_image').where({blogID:blog[0].id,isAccept:1,isReply:1} );
   addImageBase(replies,['author_image']).forEach(reply=>{
        comments.forEach(comment=>{
            if(reply.replyID===comment.id){
                comment.reply=comment.reply ? comment.reply.push(reply) : [reply]
            }
        })
    });
    const target={...blog[0],comments:addImageBase(comments,'author_image'),content}
    const result=addImageBase([target],['image_sm','image_xs','image_lg']).map(item=>{
        if(item.images){
            return {
                ...item,
                comments:item.comments.map(sub_item=>{
                    return {...sub_item,author_image:imageBase+sub_item.author_image}
                }),
            }
        }else{
            return item
        }
    })
    return result[0]
}

const getAllBlogs =async () => {
    const allBlogs=await database('blog').join('blog_category', 'blog_category.id', '=', 'blog.categoryID').join('admins', 'blog.adminID', '=', 'admins.id').select('blog.*', 'blog_category.name as category', 'admins.lastname as author_lastname', 'admins.username as author_username', 'admins.firstname as author_firstname');
    const blogIds=_.map(allBlogs, (el) => el.id);
    const comments = await database('blog_comments').select().whereIn('blogID', blogIds);
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

    return addImageBase(target,['image_sm','image_xs','image_lg']);
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
         whereILike(`title`,`${search.toLowerCase()}%`).
         orderByRaw(sortBy===1 ? 'price DESC' : sortBy===2 ? 'price ASC' : sortBy===3 ? ''  : null);
    }else if(sortBy===4 && !categoryName){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        where({off:1})
    }else if(categoryName && sortBy!==4 && typeof sortBy==='number'){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        whereILike('product_category.name',`${categoryName.toLowerCase()}%`).
        orderByRaw(sortBy===1 ? 'price DESC' : sortBy===2 ? 'price ASC' : sortBy===3 ? ''  : null);
    }else if(categoryName && sortBy===4){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        whereILike('product_category.name',`${categoryName.toLowerCase()}%`).
        where({off:1})
    }else if (!sortBy && categoryName){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        whereILike('product_category.name',`${categoryName.toLowerCase()}%`)
    }else if(!sortBy && !categoryName){
        products=await database('product').
        join('product_category','product_category.id','=','product.categoryID').
        select('product.*','product_category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`)
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

module.exports={
    querySerialize,responseHandler,changeToBoolean,sortByCategory,addImageBase,getAllProductFilter,getProductByLinkFilter,getProductByCondition,getRandomProduct,pagination,getBlogByLinkFilter,calculateSum,today,getAllBlogs,getBlogByCategory,transferTransactionStatus,transferOrderStatus,transferPaymentStatus,removeDuplicate
}