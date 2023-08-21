import "nprogress/nprogress.css";
import NProgress from "nprogress";

export default defineNuxtPlugin(()=>{
    const router=useRouter()
    router.afterEach((to)=>{
      NProgress.done();
   })

    router.beforeEach((to,from,next)=>{
       NProgress.start();
        next()
    })
})