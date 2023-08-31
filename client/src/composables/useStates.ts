import {User_Information} from "~/utils/types";
import {Favorite} from "~/store/Favorite";
import {storeToRefs} from "pinia";

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


export const useFavoriteStore=()=>{
    const favoriteStore=Favorite()
    const {userFavoriteListFetchFlag,isProductExistInFAV}=storeToRefs(favoriteStore)


    return{
        favoriteStore,isProductExistInFAV,userFavoriteListFetchFlag
    }
}
