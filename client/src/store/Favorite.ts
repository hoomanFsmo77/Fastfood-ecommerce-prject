import {defineStore} from "pinia";
import {IProduct, IResponse} from "~/utils/types";



export const Favorite=defineStore('Favorite',{
    state:()=>{
        return{
            userFavoriteList:[] as any[],
            userFavoriteListFetchFlag:false as boolean
        }
    },
    getters:{
        isProductExistInFAV:(state)=>(productId:number)=>{
            const favItems=state.userFavoriteList.map(item=>{
                return item.productID
            });
            return favItems.some(item=>item===productId)
        },
        getFavID:(state)=>(productId:number)=>{
            const idx=state.userFavoriteList.findIndex(item=>item.productID===productId);
            return state.userFavoriteList[idx].favoriteID
        }

    },
    actions:{
        async fetchUserFavoriteList(){
            this.userFavoriteListFetchFlag=false
            try {
                const req=await $fetch<IResponse<any>>('/api/profile/product/fav')
                if(req.error){
                    console.log(req.errors)
                }else{
                    this.userFavoriteList=req.data
                }
            }catch (err) {
                console.log(err)
            }finally {
                this.userFavoriteListFetchFlag=true
            }

        },

    }
})