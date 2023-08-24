import {reset} from "@formkit/core";
import {IResponse} from "~/utils/types";

export const useSignIn=()=>{
    const {public:{api_base,access_key}}=useRuntimeConfig();
    const {$formDataBody,$serializeError}=useNuxtApp();
    const signInData=reactive({
        loaderButtonFlag:false as boolean,
        errors:null as string[]|null,
        init(){
            this.loaderButtonFlag=true
            this.errors=null
        }
    })


    const signInSubmit = async (formData:any) => {
        const {personalInfo,profile,security}=formData["multi-signIn"];
        signInData.init()
        try {
            const req=await $fetch<IResponse<any>>(api_base+'/auth/register',{
                method:'POST',
                headers:{
                    access_key,
                },
                body:$formDataBody({
                    username:personalInfo.signup_username,
                    firstname:personalInfo.signup_firstname,
                    lastname:personalInfo.signup_lastname,
                    email:personalInfo.signup_email,
                    phone:personalInfo.signup_phone,
                    profile_image:profile.signup_profile[0].file,
                    password:security.password
                })
            })
            if(req.error){
                signInData.errors=$serializeError(req.errors)
            }else{
                reset('signInForm')
                await reloadNuxtApp()
            }
            signInData.loaderButtonFlag=false
        }catch (err){
            console.log(err)
        }
    }

    return{
        signInSubmit,signInData
    }
}