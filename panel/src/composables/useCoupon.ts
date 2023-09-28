import {Ref} from "vue";


export const useCoupon=(couponDetail?:Ref<{id:number}>)=>{
    const {$toast}:any=useNuxtApp();
    const editCouponFlag=ref<boolean>(false)
    const couponData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })

    const addCoupon = async (formData:any) => {
      const reqQuery={
          code:formData.code,
          percent:formData.percent,
          expired_at:new Date(formData.expired_at).toISOString(),
      }
        couponData.flag=true
        couponData.errors=null
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/coupons',{
                method:'POST',
                query:{
                    method:'POST',
                    ...reqQuery
                },
            });
            if(req.code===200){
                couponData.errors=null
                $toast('success').fire({
                    text: 'coupon created!',
                    icon: 'success',
                })
                return navigateTo({name:'COUPONS'})
            }else{
                couponData.errors=req.errors
            }
        }catch (err){
            console.log(err)
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            couponData.flag=false
        }

    }
    const editCoupon = async (formData:any) => {
        couponData.flag=true
        couponData.errors=null
        const reqQuery={
            code:formData.code,
            percent:formData.percent,
            expired_at:new Date(formData.expired_at).toISOString(),
        }
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/coupons',{
                method:'POST',
                query:{
                    method:'PUT',
                    couponID:couponDetail ? couponDetail.value.id : 0,
                    ...reqQuery
                },
            });
            if(req.code===200){
                couponData.errors=null
                $toast('success').fire({
                    text: 'coupon updated!',
                    icon: 'success',
                })
                return navigateTo({name:'COUPONS'})
            }else{
                couponData.errors=req.errors
            }
        }catch (err){
            console.log(err)
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            couponData.flag=false
        }
    }


    const removeCoupon = async () => {
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/coupons',{
                method:'POST',
                query:{
                    method:'DELETE',
                    id:couponDetail ? couponDetail.value.id : 0
                },
            });
            $toast('success').fire({
                text: 'coupon deleted!',
                icon: 'success',
            })
            return navigateTo({name:'COUPONS'})
        }catch (err){
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }
    }

    return{
        editCoupon,removeCoupon,editCouponFlag,couponData,addCoupon
    }
}