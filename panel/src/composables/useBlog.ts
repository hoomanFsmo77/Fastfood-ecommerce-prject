import {Ref} from "vue";


export const useBlog=(blogDetail?:Ref<{id:number}>)=>{
    const editBlogFlag=ref<boolean>(false);
    const blogData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })
    const {$toast,$formDataBody}:any=useNuxtApp();
    const categoryID=ref<number>(1)
    const categoryHandler=(id:number)=>categoryID.value=id;

    const createBlog =async (formData:any) => {
        blogData.flag=true
        blogData.errors=null
        const body={
            ...formData,
            categoryID:categoryID.value,
            title:formData.title,
            brief:formData.brief,
            link:formData.link,
            image_sm:formData.image_sm && formData.image_sm[0] ? formData.image_sm[0].file : null,
            image_xs:formData.image_xs && formData.image_xs[0] ? formData.image_xs[0].file : null,
            image_lg:formData.image_lg &&formData.image_lg[0] ? formData.image_lg[0].file : null,
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

    const editBlog = async (formData:any) => {
        blogData.flag=true
        blogData.errors=null
        const body={
            ...formData,
            categoryID:categoryID.value,
            title:formData.title,
            brief:formData.brief,
            link:formData.link,
            image_sm:formData.image_sm && formData.image_sm[0] ? formData.image_sm[0].file : null,
            image_xs:formData.image_xs && formData.image_xs[0] ? formData.image_xs[0].file : null,
            image_lg:formData.image_lg &&formData.image_lg[0] ? formData.image_lg[0].file : null,
        }
        !body.image_sm  && delete  body.image_sm;
        !body.image_xs  && delete  body.image_xs;
        !body.image_lg  && delete  body.image_lg;
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/blogs',{
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
        createBlog,editBlog,removeBlog,editBlogFlag,blogData,categoryHandler
    }
}