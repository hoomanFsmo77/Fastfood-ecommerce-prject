import "nprogress/nprogress.css";
import NProgress from "nprogress";

export default defineNuxtPlugin((nuxtApp)=>{
    const router=useRouter()
    router.afterEach(()=>{
      NProgress.done()
   })

    router.beforeEach((to,from,next)=>{
       NProgress.start();
        next()
    })
})