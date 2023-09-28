<script setup lang="ts">
import {useComment} from "~/composables/useComment";

definePageMeta({
  name:'COMMENTS',
  page_title:'Comments'
})
const route=useRoute();
const productPageQuery=ref<number>(1)
const blogPageQuery=ref<number>(1)


watchEffect(()=>{
  productPageQuery.value=route.query.p_page ? Number(route.query.p_page) :1;
  blogPageQuery.value=route.query.b_page ? Number(route.query.b_page) :1;
})
const {public:{product_page,blog_page}}=useRuntimeConfig()
const {data:blog_comments,pending:blog_comments_pending}=await useFetch('/api/blog-comment',{
  method:'POST',
  query:{
    method:'GET',
    page:blogPageQuery,
    per:6
  },
  key:'blog_comments'
})
const {data:product_comments,pending:product_comments_pending}=await useFetch('/api/product-comment',{
  method:'POST',
  query:{
    method:'GET',
    page:productPageQuery,
    per:6
  },
  key:'product_comments'
})
const {acceptComment,deleteComment}=useComment()
const commentBody=shallowRef<string>('')
const {openModal,modalOpenFlag}=useModal({
  outsideFade:true
});
const showComment = (type:'product'|'blog',body:string) => {
  commentBody.value=body
  openModal()
}
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

  <v-row v-if="!product_comments_pending" class="mb-3">
    <v-column col="12">
      <h6 class="mb-1">Product Comments</h6>
      <VTable :head="['Author','Product','rating','status','date','']">
        <tr class="tr-hover " v-for="comment in product_comments.comments">
          <td>
            <div class="flex items-center gap-1">
              <nuxt-img width="40" height="40" class="rounded-full h-[40px] object-cover w-[40px]" :src="comment.author_image" />
              <p :title="comment.author_firstname.concat(' '+comment.author_lastname)" class="w-5 text-hidden">
                {{comment.author_firstname}} {{comment.author_lastname}}
              </p>
            </div>
          </td>
          <td>
            <div class="flex gap-1 items-center">
              <nuxt-img width="50" :src="comment.product_image"/>
              <a target="_blank" class="text-0.8 block w-5 text-hidden text-blue-600 hover:underline" :href="product_page+comment.product_link">
                {{comment.product_link}}
              </a>
            </div>
          </td>
          <td>
            <div class="flex justify-center">
              <Icon class="text-yellow-600"  v-for=" n in comment.rating" size="0.8rem" name="ri:star-s-fill"/>
            </div>
          </td>
          <td>
            <p class="text-green-600" v-if="comment.isAccept">
              Accepted
            </p>
            <p class="text-yellow-600" v-else>
              Waiting Action
            </p>
          </td>
          <td>
            <p>
              {{comment.date}}
            </p>
          </td>
          <td>
           <div class="flex gap-0.5 items-center">
             <button @click="showComment('product',comment.body)" class="btn btn-primary btn-sm">
               Show
             </button>
             <button @click="acceptComment('product',comment.id)" class="btn btn-primary btn-sm">
               Accept
             </button>
             <button @click="deleteComment('product',comment.id)" class="btn btn-primary btn-sm">
               Delete
             </button>
           </div>
          </td>
        </tr>
      </VTable>

      <VPagination
          :total="product_comments.meta.total"
          :current_page="product_comments.meta.current_page"
          :next-page="product_comments.meta.nextPage"
          :prev-page="product_comments.meta.prevPage"
          query-key="p_page"
      />
    </v-column>
  </v-row>
  <v-row v-if="!blog_comments_pending">
    <v-column col="12">
      <h6 class="mb-1">Blog Comments</h6>
        <VTable :head="['Author','Blog','status','date','']">
        <tr class="tr-hover " v-for="comment in blog_comments.comments">
          <td>
            <div class="flex items-center gap-1">
              <nuxt-img width="40" height="40" class="rounded-full h-[40px] object-cover w-[40px]" :src="comment.author_image" />
              <p>
                {{comment.author_firstname}} {{comment.author_lastname}}
              </p>
            </div>
          </td>
          <td>
            <div class="flex gap-1 items-center">
              <nuxt-img width="50" :src="comment.blog_image_xs"/>
              <a target="_blank" class="text-0.8 block w-5 text-hidden text-blue-600 hover:underline" :href="blog_page+comment.blog_link">
                {{comment.blog_link}}
              </a>
            </div>
          </td>
          <td>
            <p class="text-green-600" v-if="comment.isAccept">
              Accepted
            </p>
            <p class="text-yellow-600" v-else>
              Waiting Action
            </p>
          </td>
          <td>
            <p>
              {{comment.date}}
            </p>
          </td>
          <td>
            <div class="flex gap-0.5 items-center">
              <button @click="showComment('blog',comment.body)" class="btn btn-primary btn-sm">
                Show
              </button>
              <button @click="acceptComment('blog',comment.id)" class="btn btn-primary btn-sm">
                Accept
              </button>
              <button @click="deleteComment('blog',comment.id)" class="btn btn-primary btn-sm">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </VTable>

      <VPagination
          :total="blog_comments.meta.total"
          :current_page="blog_comments.meta.current_page"
          :next-page="blog_comments.meta.nextPage"
          :prev-page="blog_comments.meta.prevPage"
          query-key="b_page"
      />


    </v-column>
  </v-row>
</template>

<style scoped>

</style>