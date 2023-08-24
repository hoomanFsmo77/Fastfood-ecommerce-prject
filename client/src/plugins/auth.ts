import {User_Information} from "~/utils/types";


export default defineNuxtPlugin(async ()=>{
    const {isLogin,userInformation}=useStates()
    try {
        const req=await $fetch<User_Information>('/api/auth/me');
        isLogin.value=true
        userInformation.value=req
    }catch (err) {
        isLogin.value=false
    }
})