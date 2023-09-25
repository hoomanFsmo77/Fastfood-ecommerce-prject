import {Ref} from "vue";


export const useProduct=(productDetail?:Ref<{id:number,off:boolean,categoryID:number,status:boolean,off_percent:number}>)=>{
    const {$toast,$formDataBody}:any=useNuxtApp();
    const editProductFlag=ref<boolean>(false)
    const productData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })
    const selectData=reactive({
        categoryID:productDetail?.value.categoryID,
        status:productDetail?.value.status ? 1 : 0,
        off:productDetail?.value.off ? 1 :0,
        off_percent:productDetail?.value.off_percent
    })

    const extraImageData = reactive<any>({
        image:[] as any[]
    })



    const offHandler = (id:number) => {
        if(id===2){
            selectData.off_percent=0
        }
        selectData.off = id===1 ? 1 : 0 ;
    }

    const statusHandler = (id:number) =>  selectData.status=id===1 ? 1 : 0;
    const categoryHandler=(id:number)=>selectData.categoryID=id;

    const extraImageHandler = (data:{mode:'PUT'|'DEL'|'POST'|'M_DEL',imageId:number,file:any}) => {
        if(data.mode==='PUT'){
            if(`delImage[${data.imageId}]` in extraImageData){
                delete extraImageData[`delImage[${data.imageId}]`]
            }
            extraImageData[`image[${data.imageId}]`]=data.imageId
            extraImageData.image.push({file:data.file,id:data.imageId})
        }else if(data.mode==='DEL'){
            if(`image[${data.imageId}]` in extraImageData){
                const idx=extraImageData.image.findIndex(item=>item.id===data.imageId);
                extraImageData.image.splice(idx,1);
                delete extraImageData[`image[${data.imageId}]`]
            }
            extraImageData[`delImage[${data.imageId}]`]=data.imageId
        }else if(data.mode==='POST'){
            extraImageData.add_image=data.file
        }else if(data.mode==='M_DEL'){
            extraImageData.add_image.splice(data.imageId,1)
        }
    }
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

    const editProduct = async (formData:any) => {
        productData.flag=true
        productData.errors=null
        const form=new FormData()
        form.append('categoryID',selectData.categoryID)
        form.append('link',formData.link)
        form.append('title',formData.title)
        form.append('price',formData.price)
        form.append('caption',formData.caption)
        form.append('description',formData.description)
        form.append('brief',formData.brief)
        form.append('quantity',Number(formData.quantity))
        form.append('status',selectData.status)
        form.append('off',selectData.off)
        form.append('off_percent',formData?.off_percent ?Number(formData?.off_percent):Number(selectData.off_percent));
        selectData.off===1 &&form.append('date_on_sale_from',new Date(formData.date_on_sale_from).toISOString());
        selectData.off===1 &&form.append('date_on_sale_to',new Date(formData.date_on_sale_to).toISOString());
        formData.primary_image.length>0 && form.append('primary_image',formData?.primary_image[0].file)



        if(extraImageData.image.length>0){
            extraImageData.image.forEach((item)=>{
                form.append('image',item.file)
            })
        }
        if(extraImageData.add_image && extraImageData.add_image.length>0){
            extraImageData.add_image.forEach((item)=>{
                form.append('add_image',item)
            })
        }


        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/products',{
                method:'POST',
                query:{
                    method:'PUT',
                    productID:productDetail ? productDetail.value.id : 0
                },
                body:form
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
            console.log(err)
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
        createProduct,editProduct,removeProduct,productData,editProductFlag,selectData,offHandler,statusHandler,extraImageHandler,
        categoryHandler,extraImageData
    }
}