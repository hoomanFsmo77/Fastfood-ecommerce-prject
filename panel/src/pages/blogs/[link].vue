<script setup lang="ts">
import {useBlog} from "~/composables/useBlog";
import {submitForm} from "~/utils/functions";

definePageMeta({
  name:'BLOGS_DETAIL',
  page_title:'Blog detail'
})
const route=useRoute()
const {data,pending}=await useFetch('/api/blogs',{
  method:'POST',
  query:{
    method:'GET',
    link:route.params.link
  }
})
const {data:blog_category,pending:blog_category_pending}=await useFetch('/api/blog-category',{
  method:'POST',
  query:{
    method:'GET',
  },
  transform(data){
    return data.map(item=>{
      return{
        id:item.id,
        title:item.name
      }
    })
  }
})

const {editBlogFlag,blogData,editBlog,removeBlog,categoryHandler}=useBlog(data)
const form=ref<HTMLElement|null>(null)
const editBlogForm = () => submitForm(form)
</script>

<template>
  <v-row v-if="blogData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in blogData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>

  <v-row class="mb-1" v-if="!pending">
    <FormKit   id="form" type="form" ref="form"  @submit="editBlog"  :actions="false" >
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="title"
              :value="data.title"
              :disabled="!editBlogFlag"
              id="title"
              name="title"
              validation="required"
              validation-label="title"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="link"
              :disabled="!editBlogFlag"
              :value="data.link"
              id="link"
              name="link"
              validation="required"
              validation-label="link"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="brief"
              :value="data.brief"
              :disabled="!editBlogFlag"
              id="brief"
              name="brief"
              validation="required"
              validation-label="brief"
          />

        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VSelect @fire="categoryHandler" :disabled="!editBlogFlag" label="Category" :select-id="1" v-if="!blog_category_pending"  :data="blog_category" />

        </v-column>

      </v-row>
      <v-row class="mb-1.5">
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VImage :width="150"  :show_image="!!data.image_sm.endsWith('jpeg')" :profile_image="data.image_sm" :editFlag="editBlogFlag" :multiple="false" id="image_sm" label="Small Image"/>
        </v-column>

        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VImage :width="150" :show_image="true" :profile_image="data.image_xs" :editFlag="editBlogFlag" :multiple="false" id="image_xs" label="Medium Image"/>
        </v-column>

        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VImage :width="150" :show_image="true" :profile_image="data.image_lg" :editFlag="editBlogFlag" :multiple="false" id="image_lg" label="Large Image"/>
        </v-column>
      </v-row>

    </FormKit>

  </v-row>



  <v-row>
    <v-column col="12" class="flex">
      <button @click="removeBlog" class="btn btn-primary btn-sm mr-1">
        remove
      </button>
      <VBtnLoader v-if="editBlogFlag" :flag="blogData.flag"    @click="editBlogForm" class="btn btn-primary btn-sm ">
        confirm
      </VBtnLoader>
      <button v-else @click="editBlogFlag=true" class="btn btn-primary btn-sm ">
        edit
      </button>
    </v-column>
  </v-row>
</template>

<style scoped>

</style>