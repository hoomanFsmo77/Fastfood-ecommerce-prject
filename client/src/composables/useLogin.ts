
import {reset} from "@formkit/core";

export const useLogin=()=>{
    const {isLogin,userInformation}=useStates()
    const loginProcessData=reactive({
        buttonLoaderFlag:false as boolean,
        errors:null as string[]|null,
        init(){
            this.buttonLoaderFlag=true
            this.errors=null
        }
    })
    const loginSubmit = async (formData:any) => {
        loginProcessData.init()
        try {
            const req=await $fetch<{code:number,errors:string[],data:any}>('/api/auth/login',{
                method:'POST',body:formData
            })
            if(req.code===200){
                loginProcessData.errors=null
                isLogin.value=true
                userInformation.value=req.data;
                reset('loginForm')
                return navigateTo({
                    name:'PROFILE_INFO'
                });
            }else{
                loginProcessData.errors=req.errors
            }
        }catch (err) {
            console.log(err)
        }finally {
            loginProcessData.errors=['Error in connecting to server!']
            loginProcessData.buttonLoaderFlag=false
        }
    }


    return{
        loginProcessData,loginSubmit
    }
}