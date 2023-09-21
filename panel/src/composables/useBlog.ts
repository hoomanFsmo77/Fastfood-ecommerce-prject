import {Ref} from "vue";


export const useBlog=(blogDetail?:Ref<{id:number}>)=>{
    const editBlogFlag=ref<boolean>(false);
    const blogData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })
    const {$toast,$formDataBody}:any=useNuxtApp();
    const createBlog =async () => {
        blogData.flag=true
        blogData.errors=null
        const body={
            categoryID:'',
            title:'',
            date:'',
            brief:'',
            link:'',
            image_sm:'',
            image_xs:'',
            image_lg:'',
        }
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/blogs',{
                method:'POST',
                query:{
                    method:'POST',
                },
                body:$formDataBody(body)
            });
            if(req.code===200){
                blogData.errors=null
                $toast('success').fire({
                    text: 'blog created!',
                    icon: 'success',
                })
                return navigateTo({name:'BLOGS'})
            }else{
                blogData.errors=req.errors
            }
        }catch (err){
            console.log(err)
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            blogData.flag=false
        }
    }

    const editBlog = async () => {
        blogData.flag=true
        blogData.errors=null
        const body={
            categoryID:'',
            title:'',
            date:'',
            brief:'',
            link:'',
            image_sm:'',
            image_xs:'',
            image_lg:'',
        }
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/products',{
                method:'POST',
                query:{
                    method:'PUT',
                    blogID:blogDetail ? blogDetail.value.id : 0
                },
                body:$formDataBody(body)
            });
            if(req.code===200){
                blogData.errors=null
                $toast('success').fire({
                    text: 'blog updated!',
                    icon: 'success',
                })
                return navigateTo({name:'BLOGS'})
            }else{
                blogData.errors=req.errors
            }
        }catch (err){
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            blogData.flag=false
        }
    }

    const removeBlog =async () => {
        try {
            await $fetch('/api/blogs',{
                method:'POST',
                query:{
                    method:'DELETE',
                    id:blogDetail ? blogDetail.value.id : 0
                }
            })
            $toast('success').fire({
                text: 'Blog deleted!',
                icon: 'success',
            })
            return navigateTo({name:'BLOGS'})
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }
    }

    return{
        createBlog,editBlog,removeBlog,editBlogFlag,blogData
    }
}