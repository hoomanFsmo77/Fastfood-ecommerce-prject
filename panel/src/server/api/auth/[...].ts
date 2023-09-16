
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {IResponse} from "~/utils/types";
import {urlEncodeBody} from "~/utils/functions";

export default NuxtAuthHandler({
    secret:process.env.NUXT_AUTH_SECRET,
    callbacks:{
        jwt: async ({token, user,session}) => {
            const isSignIn = !!user;
            if (isSignIn) {
                if(user.accessToken){
                    //// using credential
                    token.jwt=user.accessToken
                }else{
                    //// other credential
                    const {api_base,access}=useRuntimeConfig();
                    try {
                        const req=await $fetch<IResponse<any>>('/auth/register',{
                            baseURL:api_base,
                            headers:{
                                access,
                                "Content-Type":"application/x-www-form-urlencoded"
                            },
                            method:'POST',
                            body:urlEncodeBody({
                                username:'test'+user.id,
                                firstname:user?.name.split(' ')[0] || 'test',
                                lastname:user?.name.split(' ')[1] || 'test',
                                email:user?.email || `test${user.id}@gmail.com`,
                                password:'13777731Ho@'
                            })
                        })
                        token.jwt=req.data.token
                    }catch (err) {
                        console.log(err)
                    }
                }
            }
            return Promise.resolve(token);
        }
    },
    providers: [
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,

        }),
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', },
                password: { label: 'Password', type: 'password' }
            },
            async authorize (credentials: any) {
                const {api_base,access}=useRuntimeConfig();
                const {email,password,csrfToken}=credentials;
                try {
                    const req=await $fetch<IResponse<any>>('/auth/login',{
                        baseURL:api_base,
                        headers:{access},
                        method:'POST',
                        body:urlEncodeBody({email, password})
                    })
                    if(req.error){
                        return null
                    }else{
                        const {id,firstname,lastname,email,token}=req.data;
                        return {
                            id,
                            name:`${firstname} ${lastname}`,
                            email,
                            accessToken:token,
                            accessTokenExpires:4*60*60*24
                        }
                    }
                }catch (err) {
                    return null
                }
            }
        })

    ]
})


