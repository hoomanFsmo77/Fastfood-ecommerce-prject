


export const useRegister=()=>{
    const {$formDataBody}=useNuxtApp();
    const profileImageSrc=ref<string|null>(null)
    const signInData=reactive({
        loaderButtonFlag:false as boolean,
        errors:null as string[]|null,
        init(){
            this.loaderButtonFlag=true
            this.errors=null
        }
    })
    const profileImageChange = (ev:any) => {
        const fileReader=new FileReader()
        fileReader.readAsDataURL(ev[0].file)
        fileReader.onload=(data)=>{
            profileImageSrc.value=data.explicitOriginalTarget.result as string
        }

    }


    const signInSubmit = async (formData:any) => {
        const {personalInfo,profile,security}=formData["multi-signIn"];
        signInData.init()
        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/auth/register',{
                method:'POST',
                body:$formDataBody({
                    username:personalInfo.signup_username,
                    firstname:personalInfo.signup_firstname,
                    lastname:personalInfo.signup_lastname,
                    email:personalInfo.signup_email,
                    phone:personalInfo.signup_phone,
                    profile_image:profile.signup_profile[0].file,
                    password:security.password
                })
            });

            if(req.code===200){
                await reloadNuxtApp();
            }else{
                signInData.errors=req.errors
            }
            signInData.loaderButtonFlag=false
        }catch (err){
            console.log(err)
        }
    }

    return{
        signInSubmit,signInData,profileImageChange,profileImageSrc
    }
}