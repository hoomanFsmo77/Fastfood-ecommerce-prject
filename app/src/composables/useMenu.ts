

export const useMenu=()=>{
    const menuData=reactive({
        search:'' as string,
        sortBy:1 as number,
        category:'' as string,
        per:6 as number,
        page:1 as number
    })

    const initialSearch = (value:string) => {
        menuData.search=value
        navigateTo({name:"MENU",query:{page:1}})
    }
    
    const selectCategory = (cat:string) => {
      menuData.category=cat
        navigateTo({name:"MENU",query:{page:1}})
    }

    const selectSortBy = () => {
        navigateTo({name:"MENU",query:{page:1}})
    }
    return{
        menuData,initialSearch,selectCategory,selectSortBy
    }
}