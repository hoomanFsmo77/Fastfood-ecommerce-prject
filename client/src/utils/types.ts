
export interface IResponse {
    data:any,
    error:boolean,
    errors:null|string[]
}


export interface IProduct {
    id:number
    categoryID:number
    title:string
    caption:string
    price:number
    primary_image:string
    description:string
    brief:string
    specification:string
    link:string
    status:boolean
    off:boolean
    off_percent:number
    quantity:number
    date_on_sale_from:null|string
    date_on_sale_to:null|string
    category:string
    images:{
        id:number
        productID:number
        image:string
    }[]
}