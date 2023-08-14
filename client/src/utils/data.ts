import {Navbar} from "~/utils/types";

export const recentKeyWord=['Burgers','Wraps','Pizza','Fries','Drinks'];


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
        title:'About Us',
        link:{name: 'HOME'},
        hasSub:true,
        sub:[
            {
                title: 'About Us',
                link: {name:'HOME'},
                hasSub: false,
            },
            {
                title: 'Services',
                link: {name:'HOME'},
                hasSub: false,
            },
            {
                title: 'Testimonials',
                link: {name:'HOME'},
                hasSub: false,
            },
            {
                title: "Faq's",
                link: {name:'HOME'},
                hasSub: false,
            },
            {
                title: "Coming soon",
                link: {name:'HOME'},
                hasSub: false,
            },
        ]
    },

    {
        title:'Our Offers',
        link:{name: 'HOME'},
        hasSub:true,
        sub:[
            {
                title: 'Classic menu',
                link: {name:'HOME'},
                hasSub: false,
            },
            {
                title: 'Classic menu',
                link: {name:'HOME'},
                hasSub: false,
            },
            {
                title: 'Classic menu',
                link: {name:'HOME'},
                hasSub: false,
            },
        ]
    },{
        title:'Gallery',
        hasSub:false,
        link:{name:'HOME'}
    },{
        title:'Blog',
        link:{name:'HOME'},
        hasSub:true,
        sub:[
            {
                title:'Blogs grid',
                hasSub:false,
                link:{name:'HOME'}
            },
            {
                title:'Blogs grid',
                hasSub:false,
                link:{name:'HOME'}
            },
            {
                title:'Blogs grid',
                hasSub:false,
                link:{name:'HOME'}
            },
        ]
    },
    {
        title:'Shop',
        link:{name:'HOME'},
        hasSub:true,
        sub:[
            {
                title:'Our Products',
                hasSub:false,
                link:{name:'HOME'}
            },
            {
                title:'Our Products',
                hasSub:false,
                link:{name:'HOME'}
            },
            {
                title:'Our Products',
                hasSub:false,
                link:{name:'HOME'}
            },
        ]
    },
    {
        title:'Contact',
        hasSub:false,
        link:{name:'HOME'}
    }
]