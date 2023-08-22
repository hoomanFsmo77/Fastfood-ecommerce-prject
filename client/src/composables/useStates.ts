

export const useStates=()=>{
    const isLogin=useState<boolean>('isLogin',()=>false)
    const userInformation=useState('userInformation',()=>{
        return{
            firstname:'hooman',
            lastname:'mousavi',
            username:'hooman_77',
            profile_image:'http://localhost:3001/storage/image/1688207258297.jpeg',
            email:'hoomanmousavi77@gmail.com',
        }
    })


    return{
        isLogin,userInformation
    }
}

