<script setup lang="ts">
import {useModal} from "~/composables/useModal";

definePageMeta({
  name:'PROFILE_COMMENTS',
  path:'/profile/comments',
  layout:'profile',
  middleware:'auth',
  page_title:'Comments',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Comments',
      link:{name:'PROFILE_COMMENTS'},
      on:true
    }
  ]
});
const route=useRoute();
const productPageQuery=ref<number>(1)
const blogPageQuery=ref<number>(1)


watchEffect(()=>{
  productPageQuery.value=route.query.p_page ? Number(route.query.p_page) :1;
  blogPageQuery.value=route.query.b_page ? Number(route.query.b_page) :1;
})

const commentBody=shallowRef<string>('')
const {openModal,modalOpenFlag}=useModal({
  outsideFade:true
});

const showDetail = (body:string) => {
  commentBody.value=body
  openModal()
}


const {data:product_comments,pending:product_comments_pending}=await useFetch('/api/profile/comment',{method:'POST',query:{method:'GET', type:'product',page:productPageQuery,per:6}});
const {data:blog_comments,pending:blog_comments_pending}=await useFetch('/api/profile/comment',{method:'POST',query:{method:'GET', type:'blog',page:blogPageQuery,per:6}});

</script>

<template>
  <teleport v-if="modalOpenFlag" to=".modal-body">
    <h5 class="font-500 mb-1">
      Comment body:
    </h5>
    <p>
      {{commentBody}}
    </p>
  </teleport>


  <section class="mb-2">
    <h3 class="mb-1">Your Product comments</h3>
    <VTable  class="[&_th_p]:!text-center" :head="['id','product','Status','rating','date','']">
      <tr class="[&_p]:!font-400 tr-hover" v-for="comment in product_comments.comments">
        <td>
          <p >
            {{comment.id}}
          </p>
        </td>
        <td>
          <div class="flex items-center">
            <nuxt-img width="80" :src="comment.product_image"/>
            <NuxtLink class="text-secondary-light-2 text-center font-400 transition-all hover:text-primary-dark-3" :to="{name:'PRODUCT_DETAIL',params:{link:comment.product_link}}">
              {{comment.product_title}}
            </NuxtLink>
          </div>
        </td>
        <td>
          <p class="text-center" :class="comment.isAccept ? 'text-green-500' : 'text-red-500'">
            {{comment.isAccept ? 'accepted' : 'not accepted'}}
          </p>
        </td>
        <td>
          <div class="rate-hover active text-center">
            <Icon  v-for="i in comment.rating" class="text-[#d6d6d6]" size="1.3rem" name="ri:star-s-fill"/>
          </div>
        </td>
        <td>
          <p class="text-center">
            {{comment.date}}
          </p>
        </td>
        <td>
          <button @click="showDetail(comment.body)" class="btn btn-primary-2  btn-sm" >
             detail
          </button>
        </td>
      </tr>

    </VTable>


    <VPagination
        :current_page="product_comments.meta.current_page"
        :prev-page="product_comments.meta.prevPage"
        :next-page="product_comments.meta.nextPage"
        :total="product_comments.meta.total"
        query-key="p_page"
    />
  </section>

  <section class="mb-2">
    <h3 class="mb-1">Your Blog comments</h3>
    <VTable  class="[&_th_p]:!text-center" :head="['id','blog','Status','date','']">
      <tr class="[&_p]:!font-400 tr-hover" v-for="comment in blog_comments.comments">
        <td>
          <p >
            {{comment.id}}
          </p>
        </td>
        <td>
          <div class="flex items-center">
            <nuxt-img width="80" :src="comment.blog_image"/>
            <NuxtLink class="text-secondary-light-2 text-hidden w-7 block font-400 transition-all hover:text-primary-dark-3 ml-0.5" :to="{name:'BLOG_DETAIL',params:{link:comment.blog_link}}">
              {{comment.blog_title}}
            </NuxtLink>
          </div>
        </td>
        <td>
          <p class="text-center" :class="comment.isAccept ? 'text-green-500' : 'text-red-500'">
            {{comment.isAccept ? 'accepted' : 'not accepted'}}
          </p>
        </td>
        <td>
          <p class="text-center">
            {{comment.date}}
          </p>
        </td>
        <td>
          <button @click="showDetail(comment.body)" class="btn btn-primary-2  btn-sm" >
            detail
          </button>
        </td>
      </tr>

    </VTable>


    <VPagination
        :current_page="blog_comments.meta.current_page"
        :prev-page="blog_comments.meta.prevPage"
        :next-page="blog_comments.meta.nextPage"
        :total="blog_comments.meta.total"
        query-key="b_page"
    />
  </section>


</template>

<style scoped>

</style>