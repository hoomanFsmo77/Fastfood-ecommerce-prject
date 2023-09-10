import {defineStore} from "pinia";


export const Cart=defineStore('Cart',{
    state:()=>{
        return{
            cartListData:{items:[],order:{}} as {items:any[],order:object},
            cartListFetchFlag:true as boolean
        }
    },
    getters:{
        getCartListLength(state){
            if(state.cartListData.items ){
                return state.cartListData.items.length
            }else{
                return 0
            }
        },
        getOrderID(state){
            return state.cartListData.order?.id
        },


    },
    actions:{
        async fetchUserCartData(){
            this.cartListFetchFlag=false
            try {
                const req=await $fetch('/api/profile/basket',{
                    query:{
                        method:'GET'
                    }
                })
                this.cartListData=req
            }catch (err) {
                this.cartListData={items:[],order:{}}
            }finally {
                this.cartListFetchFlag=true
            }

        }

    }
})