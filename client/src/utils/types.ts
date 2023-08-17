
export interface IResponse<T> {
    data:T,
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


export interface Navbar {
    title: string,
    link: {name: string,query?:any},
    hasSub: boolean,
    sub?:Navbar[]
}

export interface Banner{
    image:string
    caption:string
    first_text:string
    middle_text:string
    last_text:string
    link:string
}

export interface Product_menu {
    id:number
    categoryID:number
    title:string
    caption:string
    price:number
    primary_image:string
    description:string
    brief:string
    specification:ScrollIntoViewOptions
    link:string
    status:boolean
    off:boolean
    off_percent:number
    quantity:number
    category:string
}