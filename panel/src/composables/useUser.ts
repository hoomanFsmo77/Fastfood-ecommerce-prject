import {Ref} from "vue";

export const useUser=(userData?:Ref<{id:number}>)=>{
    const editUserFlag=ref<boolean>(false);
    const editUserData=reactive({
        errors:null as string[]|string|null,
        flag:false as boolean
    })
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

    const editUser =async () => {
        editUserData.flag=true
        editUserData.errors=null
        const body={
            username:'ededede',
            firstname:'ededede',
            lastname:'ededede',
            email:'fefe4@gmail.com',
            phone:'09921929654',
        }
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

    const createUser = async () => {
        editUserData.flag=true
        editUserData.errors=null
        const body={
            username:'ededede',
            firstname:'ededede',
            lastname:'ededede',
            email:'fefe4e@gmail.com',
            phone:'09921929654',
            password:'13777731Ho@@'
        }
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
        removeUser,editUser,createUser,editUserFlag,editUserData
    }
}