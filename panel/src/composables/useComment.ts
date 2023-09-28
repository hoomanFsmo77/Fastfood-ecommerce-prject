

export const useComment=()=>{
    const {$toast}:any=useNuxtApp();
    const tableFlag=ref<boolean>(false);

    const acceptComment=async (type:'product'|'blog',commentID:number)=>{
        tableFlag.value=true
        try {
            await $fetch(type==='product' ? '/api/product-comment' : '/api/blog-comment',{
                method:'POST',
                query:{
                    method:'PUT',
                    commentID
                }
            })
            $toast('success').fire({
                text: 'comment accepted!',
                icon: 'success'
            })
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            tableFlag.value=false
            type==='product' ? await refreshNuxtData('product_comments') : await refreshNuxtData('blog_comments');
        }

    }

    const deleteComment=async (type:'product'|'blog',commentID:number)=>{
        tableFlag.value=true
        try {
            await $fetch(type==='product' ? '/api/product-comment' : '/api/blog-comment',{
                method:'POST',
                query:{
                    method:'DELETE',
                    id:commentID
                }
            })
            $toast('success').fire({
                text: 'comment deleted!',
                icon: 'success'
            })
        }catch (err) {
            $toast('error').fire({
                text: 'error in server!',
                icon: 'error',
            })
        }finally {
            tableFlag.value=false
            type==='product' ? await refreshNuxtData('product_comments') : await refreshNuxtData('blog_comments');
        }

    }



    return{
        acceptComment,deleteComment
    }
}