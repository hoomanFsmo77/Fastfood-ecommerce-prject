import "nprogress/nprogress.css";
import NProgress from "nprogress";

export default defineNuxtPlugin((nuxtApp)=>{
    const router=useRouter()
    router.afterEach(()=>{
      NProgress.done()
      nuxtApp.$router.options.scrollBehavior = () => {
            return { top: 0 ,behavior:'smooth'}
      }
   })

    router.beforeEach((to,from,next)=>{
       NProgress.start();
        next()
    })
})