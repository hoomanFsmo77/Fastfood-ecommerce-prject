import {submitForm} from "~/utils/functions";


export const useContact=()=>{
    const contactForm=ref<null|HTMLElement>(null);
    const contactFormData=reactive({
        btnLoader:false as boolean,
        errors:null as string[]|null,
        success:false as boolean,
        init(){
            this.btnLoader=true
            this.errors=null
            this.success=false
        }
    })

    const submitContactForm = () => submitForm(contactForm)
    const submitContact =async (formData:any) => {
        contactFormData.init()
        try {
            const req=await $fetch('/api/contact',{
                method:'POST',
                body:{
                    email:formData.contact_email,
                    name:formData.contact_name,
                    subject:formData.contact_subject,
                    message:formData.contact_message,
                }
            })
            if(req.code===200){
                contactFormData.errors=null
                contactFormData.success=true
                if(process.client){
                    setTimeout(()=>{
                        reloadNuxtApp()
                    },4000)
                }
            }else {
                contactFormData.errors=req.errors
                contactFormData.success=false
            }
        }catch (err) {
            console.log(err)
        }finally {
            contactFormData.btnLoader=false
        }
    }




    return{
        contactForm,
        contactFormData,submitContactForm, submitContact
    }
}