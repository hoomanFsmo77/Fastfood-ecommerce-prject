import {Ref} from "vue";

export const useUser=(show_image:boolean,userData?:Ref<{id:number,profile_image:string}>)=>{
    const editUserFlag=ref<boolean>(false);
    const editUserData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })

    const imageData=reactive({
        show:show_image as boolean,
        src:userData ? userData?.value?.profile_image : null,
        isChanged:false as boolean
    })

    const profileImageChange = (ev:Event) => {
        const fileReader=new FileReader()
        if(ev[0]){
            fileReader.readAsDataURL(ev[0].file)
            fileReader.onload=(data)=>{
                imageData.src=data.explicitOriginalTarget.result as string
                imageData.show=true
                imageData.isChanged=true
            }
        }else{
            imageData.src=null
            imageData.show=false
            imageData.isChanged=false
        }

    }

    const {$toast,$formDataBody}:any=useNuxtApp();
    const removeUser = async () => {
        try {
            const req=await $fetch('/api/users',{
                method:'POST',
                query:{
                    method:'DELETE',
                    userID:userData ? userData.value.id : 0
                }
            })
            $toast('success').fire({
                text: 'User deleted!',
                icon: 'success',
            })
            return navigateTo({name:'USERS'})
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }
    }

    const editUser =async (formData:any) => {
        let body=null;
        if(imageData.isChanged){
            body={
                ...formData,
                profile_image:formData?.profile_image[0].file
            }
        }else{
            delete formData.profile_image;
            body=formData
        }
        editUserData.flag=true
        editUserData.errors=null
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/users',{
                method:'POST',
                query:{
                    method:'PUT',
                    userID:userData ? userData.value.id : 0
                },
                body:$formDataBody(body)
            });
            if(req.code===200){
                editUserData.errors=null
                $toast('success').fire({
                    text: 'user updated!',
                    icon: 'success',
                })
                return navigateTo({name:'USERS'})
            }else{
                editUserData.errors=req.errors
            }
        }catch (err){
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            editUserData.flag=false
        }
    }

    const createUser = async (formData:any) => {
        let body=null;
        if(imageData.isChanged){
            body={
                ...formData,
                profile_image:formData?.profile_image[0].file
            }
        }else{
            delete formData.profile_image;
            body=formData
        }
        editUserData.flag=true
        editUserData.errors=null
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/users',{
                method:'POST',
                query:{
                    method:'POST',
                },
                body:$formDataBody(body)
            });
            if(req.code===200){
                editUserData.errors=null
                $toast('success').fire({
                    text: 'user created!',
                    icon: 'success',
                })
                return navigateTo({name:'USERS'})
            }else{
                editUserData.errors=req.errors
            }
        }catch (err){
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            editUserData.flag=false
        }
    }


    return{
        removeUser,editUser,createUser,editUserFlag,editUserData,imageData,profileImageChange
    }
}