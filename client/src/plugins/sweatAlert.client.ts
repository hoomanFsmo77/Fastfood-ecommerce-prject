import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';


export default defineNuxtPlugin(async nuxtApp=>{
    const toast = (type:string) => {
        if(type==='error'){
            return Swal.mixin({
                position: 'center-end',
                timer: 4000,
                iconHtml:'<svg data-v-44f01d82="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon" width="1.3rem" height="1.3rem" viewBox="0 0 48 48"><mask id="iconifyVue0"><g fill="#fff" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path d="M33 6h11L15 42H4L33 6Z"></path><path d="M15 6H4l29 36h11L15 6Z"></path></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#iconifyVue0)"></path></svg>',
                timerProgressBar: true,
                showConfirmButton: false,
                confirmButtonText: 'login',
                confirmButtonColor: '#a41a13',
                customClass: {
                    confirmButton: 'btn btn-secondary btn-xsm',
                },
                toast:true
            })
        }else if(type==='success'){
            return Swal.mixin({
                position: 'center-end',
                timer: 4000,
                iconHtml:'<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M14.707 3L5.5 12.207L.293 7L1 6.293l4.5 4.5l8.5-8.5l.707.707Z" clip-rule="evenodd"/></svg>',
                timerProgressBar: true,
                showConfirmButton: false,
                confirmButtonText: 'login',
                confirmButtonColor: '#a41a13',
                customClass: {
                    confirmButton: 'btn btn-secondary btn-xsm',
                },
                toast:true
            })
        }

    }
    nuxtApp.provide('toast', toast)
    nuxtApp.provide('swal', Swal)
})