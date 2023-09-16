

export const sidebar_items=[
    {
        title:'Dashboard',
        link:{name:'DASHBOARD'},
        icon:'ri:home-2-line',
        hasSub:false
    },
    {
        title:'Users',
        hasSub:true,
        link:{name:'USERS'},
        icon:'ri:account-circle-line',
        sub:[
            {
                title:'user list'  ,
                icon:'ri:user-3-line',
                link:{name:'USERS'},
                hasSub:false
            },
            {
                title:'Create user'  ,
                icon:'ri:user-add-line',
                link:{name:'USERS_CREATE'},
                hasSub:false
            },
        ]
    },
    {
        title:'Products',
        icon:'ri:shopping-bag-2-line',
        hasSub:true,
        link:{name:'PRODUCTS'},
        sub:[
            {
                title:'product list'  ,
                icon:'ri:shopping-bag-2-line',
                link:{name:'PRODUCTS'},
                hasSub:false
            },
            {
                title:'Create product'  ,
                icon:'ri:shopping-cart-2-line',
                link:{name:'PRODUCTS_CREATE'},
                hasSub:false
            },
        ]
    },
    {
        title:'Blogs',
        icon:'ri:book-open-line',
        link:{name:'BLOGS'},
        hasSub:true,
        sub:[
            {
                title:'blog list'  ,
                icon:'ri:book-open-line',
                link:{name:'BLOGS'},
                hasSub:false
            },
            {
                title:'Create blog'  ,
                link:{name:'BLOGS_CREATE'},
                icon:'ri:book-2-line',
                hasSub:false
            },
        ]
    },
    {
        title:'Category',
        icon:'ri:command-line',
        link:{name:'CATEGORIES'},
        hasSub:true,
        sub:[
            {
                title:'category list'  ,
                icon:'ri:command-line',
                link:{name:'CATEGORIES'},
                hasSub:false
            },
            {
                title:'Create category'  ,
                link:{name:'CATEGORIES_CREATE'},
                icon:'ri:folder-add-fill',
                hasSub:false
            },
        ]
    },
    {
        title:'Comments',
        link:{name:'COMMENTS'},
        icon:'ri:message-2-fill',
        hasSub:false
    },
    {
        title:'Orders',
        link:{name:'ORDERS'},
        icon:'ri:money-dollar-circle-line',
        hasSub:false
    },
    {
        title:'Transactions',
        link:{name:'TRANSACTIONS'},
        icon:'ri:shake-hands-line',
        hasSub:false
    },
    {
        title:'Offers',
        link:{name:'OFF'},
        icon:'ri:percent-line',
        hasSub:false
    },
]