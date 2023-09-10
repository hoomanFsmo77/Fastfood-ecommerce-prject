
import {setCookie} from "h3";


export default defineEventHandler(async ev=>{
    setCookie(ev,'x_wengdo_x','',{
        httpOnly:true,
        secure:true,
        path:'/',
        maxAge:0
    });
    return 'ok'
})