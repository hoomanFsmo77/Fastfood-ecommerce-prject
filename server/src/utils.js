const database = require("./database/database");
const _ = require("lodash");
const imageBase=process.env.IMAGE_PATH;
const apiBase=process.env.API_BASE
////////////////////////////////////////////////////
const querySerialize = (obj) => {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
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
    return source.map(item=>{
        return {...item,[key]:imageBase+item[key]}
    })
}

const getAllProductFilter = async () => {
    const products=await database('product').join('category','category.id','=','product.categoryID').select('product.*','category.name as category');
    const result= await transferProductToReadable(products)
    return sortByCategory(result)
}

const getProductByLinkFilter = async (link) => {
    const product=await database('product').join('category','category.id','=','product.categoryID').select('product.*','category.name as category').where({link:link});
    const images = await database('product_image').select().where({productID:product[0].id} )
    const target={...product[0],images}
    const changeNumberToBoolean=changeToBoolean([target],['status','off']);
    const result=addImageBase(changeNumberToBoolean,'primary_image').map(item=>{
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
    return result[0]
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

const getProductByCondition = async (search,categoryID,sortBy) => {
    let products;
    if(!categoryID && sortBy!==4 && typeof sortBy==='number'){
         products=await database('product').
         join('category','category.id','=','product.categoryID').
         select('product.*','category.name as category').
         whereILike(`title`,`${search.toLowerCase()}%`).
         orderByRaw(sortBy===1 ? 'price DESC' : sortBy===2 ? 'price ASC' : sortBy===3 ? ''  : null);
    }else if(sortBy===4 && !categoryID){
        products=await database('product').
        join('category','category.id','=','product.categoryID').
        select('product.*','category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        where({off:1})
    }else if(categoryID && sortBy!==4 && typeof sortBy==='number'){
        products=await database('product').
        join('category','category.id','=','product.categoryID').
        select('product.*','category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        where({categoryID}).
        orderByRaw(sortBy===1 ? 'price DESC' : sortBy===2 ? 'price ASC' : sortBy===3 ? ''  : null);
    }else if(categoryID && sortBy===4){
        products=await database('product').
        join('category','category.id','=','product.categoryID').
        select('product.*','category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        where({categoryID}).
        where({off:1})
    }else if (!sortBy && categoryID){
        products=await database('product').
        join('category','category.id','=','product.categoryID').
        select('product.*','category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`).
        where({categoryID})
    }else if(!sortBy && !categoryID){
        products=await database('product').
        join('category','category.id','=','product.categoryID').
        select('product.*','category.name as category').
        whereILike(`title`,`${search.toLowerCase()}%`)
    }

    return await transferProductToReadable(products)

}

const getRandomProduct =async (limit) => {
  const product=await database('product').select('*').orderByRaw('RAND()').limit(limit)
    return transferProductToReadable(product)
}

const pagination = (source,page,per_page,originalUrl) => {
  const rg=/page=\d+/g
  if(source.length>6){
      const totalPage=Math.ceil(source.length/per_page)
      const startIdx=(page*per_page)-per_page
      const endIdx=startIdx+per_page
      return {
            products:source.slice(startIdx,endIdx),
          meta:{
              current_page:page,
              total:totalPage
          },
          links:{
              "first":apiBase+ originalUrl.replace(rg,'page='+'1') ,
              "last": apiBase+originalUrl.replace(rg,'page='+totalPage),
              "prev": page>1 ? `${apiBase}${originalUrl.replace(rg,'page='+(page-1))}` : `${apiBase}${originalUrl.replace(rg,'page='+totalPage)}`,
              "next":page>=totalPage ? apiBase+originalUrl.replace(rg,'page='+'1') : apiBase+originalUrl.replace(rg,'page='+(page+1))
          }
      }

  }else{
      return {
          products:source,
          meta:{
              current_page:1,
              total:1
          },
          links:{
              "first":apiBase+ originalUrl.replace(rg,'page='+'1'),
              "last": apiBase+originalUrl.replace(rg,'page='+'1'),
              "prev": apiBase+originalUrl.replace(rg,'page='+'1'),
              "next": apiBase+originalUrl.replace(rg,'page='+'1')
          }
      };
  }
}


module.exports={
    querySerialize,responseHandler,changeToBoolean,sortByCategory,addImageBase,getAllProductFilter,getProductByLinkFilter,getProductByCondition,getRandomProduct,pagination
}