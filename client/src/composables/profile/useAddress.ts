import {submitForm} from "~/utils/functions";
import {reset} from "@formkit/core";

interface Props {
    title?:string,
    phone?:string,
    postal_code?:number,
    province?:string,
    city?:string,
    provinceId?:number,
    cityId?:number,
    address?:string,
    addressId?:number,
    type:'create' | 'show'
}
interface Emit {
    (e:'create'):void
}

export const useAddress=(props:Props,emit:Emit)=>{
    const {$toast}:any=useNuxtApp()
    const addressForm=ref<HTMLElement|null>(null);
    const submitAddressForm=()=>submitForm(addressForm);

    const editAddress =async (formData:any) => {
        addressData.editBtnFlag=true
        try {
            const req=await $fetch('/api/profile/address',{
                method:'POST',
                query:{
                    method:'PUT'
                },
                body:{
                    title:formData.address_title,
                    address:formData.address_body,
                    provinceID:addressData.provinceID,
                    cityID:addressData.cityID,
                    postal_code:formData.address_post,
                    phone:formData.address_phone,
                    addressID:props.addressId
                }
            })
            $toast('success').fire({
                text: 'address updated!',
                icon: 'success',
            })
            await refreshNuxtData('address_list')
        }catch (err) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            addressData.editBtnFlag=false
        }
    }

    const createAddress = async (formData:any) => {
        addressData.createBtnFlag=true
        try {
            const req=await $fetch('/api/profile/address',{
                method:'POST',
                query:{
                    method:'POST'
                },
                body:{
                    title:formData.address_title,
                    address:formData.address_body,
                    provinceID:addressData.provinceID,
                    cityID:addressData.cityID,
                    postal_code:formData.address_post,
                    phone:formData.address_phone
                }
            });
            if(req.code===200){
                $toast('success').fire({
                    text: 'address created!',
                    icon: 'success',
                })
            }else{
                $toast('error').fire({
                    text: req.errors,
                    icon: 'error',
                })
            }
        }catch (err) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            addressData.createBtnFlag=false
            reset('addressForm-create');
            addressData.reset();
            emit('create');
            await refreshNuxtData('address_list')
        }
    }

    const confirmAddressForm = (formData:any) => {
        if(props.type==='show'){
            editAddress(formData)
        }else if(props.type==='create'){
            createAddress(formData)
        }
    }

    const addressData=reactive({
        provinceID:props.provinceId|| undefined as number | undefined,
        cityID:props.cityId || undefined as number | undefined,
        editBtnFlag:false as boolean,
        deleteBtnFlag:false as boolean,
        createBtnFlag:false as boolean,
        reset(){
            this.provinceID=undefined
            this.cityID=undefined
        }
    })

    const changeProvince = (provinceID:number) =>{
        addressData.provinceID=provinceID
        addressData.cityID=undefined
    };
    const changeCity = (cityID:number) => {
        addressData.cityID=cityID
    };

    const deleteAddress =async () => {
        addressData.deleteBtnFlag=true
        try {
            const req=await $fetch('/api/profile/address',{
                method:'POST',
                query:{
                    addressID:props.addressId,
                    method:'DELETE'
                }
            });

            $toast('success').fire({
                text: 'address deleted!',
                icon: 'success',
            })
            await refreshNuxtData('address_list')
        }catch (err) {
            $toast('error').fire({
                text: 'error in connecting to server!',
                icon: 'error',
            })
        }finally {
            addressData.deleteBtnFlag=false
        }
    }




    return{
        deleteAddress,changeProvince,changeCity,addressData,confirmAddressForm,submitAddressForm,addressForm
    }
}