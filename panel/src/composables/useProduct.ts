import {Ref} from "vue";


export const useProduct=(productDetail?:Ref<{id:number,off:boolean}>)=>{
    const {$toast,$formDataBody}:any=useNuxtApp();
    const editProductFlag=ref<boolean>(false)
    const productData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })

    const off=ref<boolean|undefined>(productDetail?.value.off)

    const createProduct = async () => {
        productData.flag=true
        productData.errors=null
        const body={
            categoryID:'',
            link:'',
            title:'',
            price:'',
            caption:'',
            description:'',
            brief:'',
            specification:'',
            quantity:'',
            status:'',
            off:'',
            off_percent:'',
            date_on_sale_from:'',
            date_on_sale_to:'',
            primary_image:'',
            image_1:'',
            image_2:'',
        }
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/products',{
                method:'POST',
                query:{
                    method:'POST',
                },
                body:$formDataBody(body)
            });
            if(req.code===200){
                productData.errors=null
                $toast('success').fire({
                    text: 'product created!',
                    icon: 'success',
                })
                return navigateTo({name:'PRODUCTS'})
            }else{
                productData.errors=req.errors
            }
        }catch (err){
            console.log(err)
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            productData.flag=false
        }
    }

    const editProduct = async () => {
        productData.flag=true
        productData.errors=null
        const body={
            categoryID:'',
            link:'',
            title:'',
            price:'',
            caption:'',
            description:'',
            brief:'',
            specification:'',
            quantity:'',
            status:'',
            off:'',
            off_percent:'',
            date_on_sale_from:'',
            date_on_sale_to:'',
            primary_image:'',
            image_1:'',
            image_2:'',
            image1_id:'',
            image2_id:'',
        }
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/products',{
                method:'POST',
                query:{
                    method:'PUT',
                    productID:productDetail ? productDetail.value.id : 0
                },
                body:$formDataBody(body)
            });
            if(req.code===200){
                productData.errors=null
                $toast('success').fire({
                    text: 'product updated!',
                    icon: 'success',
                })
                return navigateTo({name:'PRODUCTS'})
            }else{
                productData.errors=req.errors
            }
        }catch (err){
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            productData.flag=false
        }
    }
    const removeProduct = async () => {
        try {
            const req=await $fetch('/api/products',{
                method:'POST',
                query:{
                    method:'DELETE',
                    userID:productDetail ? productDetail.value.id : 0
                }
            })
            $toast('success').fire({
                text: 'Product deleted!',
                icon: 'success',
            })
            return navigateTo({name:'PRODUCTS'})
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }
    }

    return{
        createProduct,editProduct,removeProduct,productData,editProductFlag,off
    }
}