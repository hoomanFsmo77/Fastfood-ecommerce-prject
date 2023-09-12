
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {IResponse} from "~/utils/types";
import {urlEncodeBody} from "~/utils/functions";

export default NuxtAuthHandler({
    secret:process.env.NUXT_AUTH_SECRET,
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


