

export const usePagination=()=>{
    const route=useRoute();
    const pageQuery=ref<number>(1)


    watchEffect(()=>{
        pageQuery.value=route.query.page ? Number(route.query.page) :1;
    })

    return{
        pageQuery
    }
}