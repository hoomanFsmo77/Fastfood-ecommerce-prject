import {User_Information} from "~/utils/types";


export const useStates=()=>{
    const isLogin=useState<boolean>('isLogin',()=>false)
    const userInformation=useState<User_Information|null>('userInformation',()=>{
        return{
            firstname:'',
            lastname:'',
            username:'',
            profile_image:'',
            email:'',
            phone:''
        }
    })


    return{
        isLogin,userInformation
    }
}

