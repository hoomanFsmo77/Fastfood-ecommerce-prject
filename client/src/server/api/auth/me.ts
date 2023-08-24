
import {IResponse, User_Information} from "~/utils/types";
import {getCookie,setCookie} from "h3";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const token=await getCookie(ev,'x_wengdo_x');
    if(token){
        try {
            const request=await $fetch<IResponse<User_Information>>(api_base+'/auth/me',{
                headers:{
                    access_key,
                    token
                }
            });
            if(request.error){
                setCookie(ev,'x_wengdo_x','',{maxAge:0})
                sendNoContent(ev,400)
            }else{
                return  {
                    firstname:request.data.firstname,
                    lastname:request.data.lastname,
                    username:request.data.username,
                    profile_image:request.data.profile_image,
                    phone:request.data.phone,
                    email:request.data.email,
                }
            }
        }catch (err) {
            return err
        }
    }else{
        setCookie(ev,'x_wengdo_x','',{maxAge:0})
        sendNoContent(ev,400)
    }

})