import {IResponse,IProduct} from "~/utils/types";



export const useSearch=()=>{

    //// states
    const searchData=shallowReactive({
        openSearchBoxFlag:false as boolean,
        searchContext:'' as string,
        searchResult:[] as IProduct[] | null,
        loaderFlag:false as boolean,
        showResultFlag:false as boolean,
        reset(){
            this.openSearchBoxFlag=false
            this.searchContext=''
            this.searchResult=[]
            this.loaderFlag=false
            this.showResultFlag=false
        },
        initSearch(){
            this.showResultFlag=true
            this.loaderFlag=true
            this.searchResult=null
        },
        setData(productsList:IProduct[]){
            this.searchResult=productsList
            this.loaderFlag=false
        },
        closeBox(){
            this.searchContext=''
            this.searchResult=[]
            this.loaderFlag=false
            this.showResultFlag=false
        },
        toggleSearchBox(){
            this.openSearchBoxFlag=!this.openSearchBoxFlag
        }

    })


    /// close search popup by changing route
    const router=useRouter()
    router.afterEach(()=>searchData.reset())




    const initSearch = async () => {
        if(searchData.searchContext.length>0){
            searchData.initSearch()
            try {
                const request:IResponse<{products:IProduct[]}>=await $fetch('/api/search',{
                    query:{context:searchData.searchContext}
                })
                if(request.error){
                    console.log(request.errors)
                }else{
                    searchData.setData(request.data.products)
                }
            }catch (err) {
                console.log(err)
            }
        }
    }




    return{
       initSearch,searchData
    }
}