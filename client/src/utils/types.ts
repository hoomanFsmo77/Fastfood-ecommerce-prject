
export interface IResponse<T> {
    data:T,
    error:boolean,
    errors:null|{location:string,msg:string,path:string,type:string}[]|string
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

export interface Blog {
    id:number
    title:string
    date:string
    brief:string
    link:string
    image_sm:string
    image_xs:string
    image_lg:string
    categoryID:number
    adminID:number
    isLatest:boolean
    category:string
}

export interface User_Information {
    firstname:string,
    lastname:string,
    username:string,
    profile_image:string,
    email:string,
    phone:string
}

export interface Response_Meta {
    current_page: number,
    total: number,
    nextPage: number,
    prevPage: number
}

export interface IBlogs {
    id: number,
    title: string,
    date: string,
    brief: string,
    link: string,
    image_sm: string,
    image_xs: string,
    image_lg: string,
    categoryID: number,
    adminID: number,
    isLatest: number,
    category: string,
    author_lastname: string,
    author_username: string,
    author_firstname: string
}
