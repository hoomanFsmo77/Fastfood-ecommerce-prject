import {IResponse,IProduct} from "~/utils/types";


export const useSearch=()=>{
    //// states
    let timer:any=null;
    const openSearchBoxFlag=useState<boolean>('openSearchBoxFlag',()=>false);
    const searchContext=useState<string>('searchContext',()=>'');
    const searchResult=useState<IProduct[]|null>('searchResult',()=>[])
    const showResultFlag=useState<boolean>('showResultFlag',()=>false)
    const loaderFlag=useState<boolean>('loaderFlag',()=>false)

    /// close search popup by changing route
    const router=useRouter()
    router.afterEach(()=>{
        openSearchBoxFlag.value=false
        searchContext.value=''
        showResultFlag.value=false
        loaderFlag.value=false
    })

    //// functions
    const toggleSearchBox=()=>openSearchBoxFlag.value=!openSearchBoxFlag.value


    const initSearch = async () => {
        if(searchContext.value.length>0){
            showResultFlag.value=true
            loaderFlag.value=true
            searchResult.value=null
            try {
                const request:IResponse=await $fetch('/api/search',{
                    query:{context:searchContext.value}
                })
                if(request.error){
                    console.log(request.errors)
                }else{
                    const products=request.data.products as IProduct[];
                    searchResult.value=products
                    loaderFlag.value=false
                }
            }catch (err) {
                console.log(err)
            }
        }
    }
    const closeBox = () => {
      searchContext.value=''
        searchResult.value=[]
        loaderFlag.value=false
        showResultFlag.value=false
    }
    const calculate_off_price=(price:number,off_percent:number)=>{
        const off=Number(((price*off_percent)/100).toFixed(0))
        return price-off
    }

    return{
        openSearchBoxFlag,toggleSearchBox,searchContext,searchResult,showResultFlag,loaderFlag,initSearch,calculate_off_price,closeBox
    }
}