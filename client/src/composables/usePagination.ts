import {Ref} from "vue";


export const usePagination=<T>(data:Ref<T[]|null>,itemToShow:number)=>{
    const paginationData=reactive({
        current_page_data:[] as T[],
        current_page:1,
        pages:data.value ? Math.ceil(data.value.length/itemToShow) : 0,
        currentPageCalculation(){
            if(data.value){
                const startIdx=(this.current_page-1)*itemToShow;
                const endIdx=startIdx+itemToShow;
                this.current_page_data=[...data.value].slice(startIdx,endIdx);
            }

        }

    })

    paginationData.currentPageCalculation();

    const nextPage = () => {
        if(data.value && paginationData.current_page===paginationData.pages){
            paginationData.current_page=1
        }else{
            paginationData.current_page++
        }

        paginationData.currentPageCalculation()
    }

    const prevPage = () => {
        if(paginationData.current_page===1){
            paginationData.current_page=paginationData.pages
        }else{
            paginationData.current_page--
        }
        paginationData.currentPageCalculation()
    }

    const goToPage = (page:number) => {
        paginationData.current_page=page
        paginationData.currentPageCalculation()
    }

    return{
        nextPage,prevPage,paginationData,goToPage
    }
}