import {submitForm} from "~/utils/functions";


export const useInfo=()=>{
    const editFlag=ref(true);
    const {$formDataBody,$toast}=useNuxtApp();
    const {userInformation,isLogin}=useStates()
    const submitInfoForm=()=>submitForm(infoForm)
    const confirmationData = reactive({
        btnFlag:false as boolean,
        errors:null as string[]|null,
        init(){
            this.btnFlag=true
            this.errors=null
        }
    })
    const infoForm=ref<HTMLElement|null>(null);
    const imageData=reactive({
        show:true as boolean,
        src:userInformation.value?.profile_image,
        isChanged:false as boolean
    })

    //////////////////////////////



    const profileImageChange = (ev:Event) => {
        const fileReader=new FileReader()
        fileReader.readAsDataURL(ev[0].file)
        fileReader.onload=(data)=>{
            imageData.src=data.explicitOriginalTarget.result as string
            imageData.show=true
            imageData.isChanged=true
        }
    }
    const confirmEditData = async (formData:any) => {
        confirmationData.init()
        const body=imageData.isChanged ? {
            username:formData.info_username,
            firstname:formData.info_firstname,
            lastname:formData.info_lastname,
            email:formData.info_email,
            phone:formData.info_phone,
            profile_image:formData.info_profile[0].file,
        } : {
            username:formData.info_username,
            firstname:formData.info_firstname,
            lastname:formData.info_lastname,
            email:formData.info_email,
            phone:formData.info_phone,
        };

        try {
            const req=await $fetch<{code:number,errors:string[]}>('/api/profile/update',{
                method:'POST',
                body:$formDataBody(body)
            });
            if(req.code===200){
                editFlag.value=false
                $toast('success').fire({
                    text: 'profile updated!',
                    icon: 'success',
                })
                setTimeout(()=>{
                    reloadNuxtApp();
                },2000)
            }else{
                confirmationData.errors=req.errors
            }
        }catch (err){
            console.log(err)
        }finally {
            confirmationData.btnFlag=false
        }
    }


    return{
        editFlag,confirmEditData,profileImageChange,imageData,infoForm,confirmationData,submitInfoForm
    }
}