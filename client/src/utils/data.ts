import {Navbar} from "~/utils/types";

export const recentKeyWord=['Burgers','Wraps','Pizza','Fries','Drinks'];

export const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const navbar:Navbar[]=[
    {
        title: 'Home',
        link: {name: 'HOME'},
        hasSub: true,
        sub:[
            {
                title: 'Home Page 01',
                link: {name: 'HOME'},
                hasSub: false,
            },
            {
                title: 'Home Page 02',
                link: {name: 'HOME'},
                hasSub: false,
            },
            {
                title: 'Home Page 03',
                link: {name: 'HOME'},
                hasSub: false,
            },
            {
                title: 'Home Page 04',
                link: {name: 'HOME'},
                hasSub: true,
                sub:[
                    {
                        title:'Header style 01',
                        hasSub:false,
                        link:{name:'HOME'}
                    },
                    {
                        title:'Header style 02',
                        hasSub:false,
                        link:{name:'HOME'}
                    },
                ]
            },
        ]
    },
    {
        title:'About',
        link:{name: 'ABOUT_US'},
        hasSub:false,
    },

    {
        title:'Menu',
        link:{name: 'MENU'},
        hasSub:false
    },{
        title:'Blog',
        link:{name:'BLOG_GRID'},
        hasSub:true,
        sub:[
            {
                title:'Blogs grid',
                hasSub:false,
                link:{name:'BLOG_GRID'}
            },
            {
                title:'Blogs list',
                hasSub:false,
                link:{name:'BLOG_LIST'}
            }
        ]
    },
    {
        title:'Shop',
        link:{name:'PRODUCT_LIST'},
        hasSub:true,
        sub:[
            {
                title:'Our Products',
                hasSub:false,
                link:{name:'PRODUCT_LIST'}
            },{
                title:'Build you product',
                hasSub:false,
                link:{name:'PRODUCT_BUILD'}
            },
            {
                title:'Shopping Cart',
                hasSub:false,
                link:{name:'SHOPPING_CART'}
            },
        ]
    },
    {
        title:'Contact',
        hasSub:false,
        link:{name:'CONTACT_US'}
    }
]


export const services=[
    {
       title:'Free shipping on first order',
        desc:'Sign up for updates and get free shipping',
        image:'/home/service-1.webp'
    },
    {
        title:'Best Taste Guaranttee',
        desc: 'We use best ingredients to cook the taste food.',
        image:'/home/service-2.webp'
    },
    {
        title: 'Variety of Dishes',
        desc: 'We give variety of dishes, deserts, and drinks',
        image:'/home/service-3.webp'
    },
    {
        title:'25 Minutes Delivery',
        desc: 'We deliver your food at your dooe that you order',
        image:'/home/service-4.webp'
    }
]

export const sortByOption=[

    {
        name:'Most expensive',
        id:1
    },
    {
        name:'Cheapest price',
        id:2
    },
    {
        name:'Best sellers',
        id:3
    },
    {
        id:4,
        name:'Off'
    }
]