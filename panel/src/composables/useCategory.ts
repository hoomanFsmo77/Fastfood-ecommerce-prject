import {Ref} from "vue";


export const useCategory=(type?:'product' | 'blog',categoryDetail?:Ref<{id:number}>)=>{
    const {$toast,$formDataBody}:any=useNuxtApp();
    const editCategoryFlag=ref<boolean>(false)
    const categoryData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })

    const createCategory = async (type:'product' | 'blog') => {
        const reqQuery= type==='product' ? {category:'ceefe',description:'edededede'} : {category:'rfrfrfrfr'};
        try {
            const req=await $fetch(type==='product' ? '/api/product-category' : '/api/blog-category',{
                method:'POST',
                query:{
                    method:'POST',
                    ...reqQuery
                }
            })
            if(req.code===200){
                categoryData.errors=null
                $toast('success').fire({
                    text: 'category created!',
                    icon: 'success',
                })
                return navigateTo({name:'CATEGORIES'})
            }else{
                categoryData.errors=req.errors
            }
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            categoryData.flag=false
        }
    }

    const editCategory =async () => {
        const reqQuery= type==='product' ? {category:'ceefe',description:'edededede'} : {category:'rfrfrfrfr'};
        try {
            const req=await $fetch(type==='product' ? '/api/product-category' : '/api/blog-category',{
                method:'POST',
                query:{
                    method:'PUT',
                    id:categoryDetail? categoryDetail.value.id :0,
                    ...reqQuery
                }
            })
            if(req.code===200){
                categoryData.errors=null
                $toast('success').fire({
                    text: 'category updated!',
                    icon: 'success',
                })
                return navigateTo({name:'CATEGORIES'})
            }else{
                categoryData.errors=req.errors
            }
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            categoryData.flag=false
        }
    }

    const removeCategory =async () => {
        try {
            await $fetch(type==='product' ? '/api/product-category' : '/api/blog-category',{
                method:'POST',
                query:{
                    method:'DELETE',
                    id:categoryDetail? categoryDetail.value.id : 0
                }
            })
            $toast('success').fire({
                text: 'Category deleted!',
                icon: 'success',
            })
            return navigateTo({name:'CATEGORIES'})
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }
    }

    return{
        createCategory,editCategory,removeCategory,editCategoryFlag,categoryData
    }
}