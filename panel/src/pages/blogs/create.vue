<script setup lang="ts">
import {submitForm} from "~/utils/functions";

definePageMeta({
  name:'BLOGS_CREATE',
  page_title:'Create blog'
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
const {blogData,createBlog,categoryHandler}=useBlog()
const form=ref<HTMLElement|null>(null)
const createBlogForm = () => submitForm(form)
const addBlogCounter=ref<number>(0)
const addContent = () => {
  addBlogCounter.value++
}

const deleteAddBlog = (num:number) => {
  addBlogCounter.value--
}
</script>

<template>
  <v-row v-if="blogData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in blogData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>

  <v-row class="mb-1">
    <FormKit   id="form" type="form" ref="form"  @submit="createBlog"  :actions="false" >
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="title"
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
              id="link"
              name="link"
              validation="required"
              validation-label="link"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <VSelect @fire="categoryHandler" :disabled="false" label="Category" :select-id="1" v-if="!blog_category_pending"  :data="blog_category" />

        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="brief"
              id="brief"
              name="brief"
              validation="required"
              validation-label="brief"
          />

        </v-column>

      </v-row>
      <v-row class="mb-1.5">
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VImage :width="150"  :show_image="false"  :editFlag="true" :multiple="false" id="image_sm" label="Small Image"/>
        </v-column>

        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VImage :width="150" :show_image="false"  :editFlag="true" :multiple="false" id="image_xs" label="Medium Image"/>
        </v-column>

        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VImage :width="150" :show_image="false"  :editFlag="true" :multiple="false" id="image_lg" label="Large Image"/>
        </v-column>
      </v-row>

      <v-row class="mb-1.5">
        <v-column col="12">
          <template v-if="addBlogCounter>0">
            <v-column v-for="item in addBlogCounter" col="12" class="mb-1.5">
              <div class="mb-1 flex justify-between items-center">
                <h6 class="">
                  Paragraph {{addBlogCounter}}
                </h6>
                <div   @click="deleteAddBlog(item)"  class="btn btn-secondary btn-sm cursor-pointer">
                  delete
                </div>
              </div>
              <FormKit
                  wrapper-class="mb-1"
                  type="custom_text"
                  label="Title"
                  :id="`add_title_${item}`"
                  :name="`add_title_${item}`"
              />
              <FormKit
                  type="custom_area"
                  label="Content"
                  :id="`add_content_${item}`"
                  :name="`add_content_${item}`"
                  validation="required"
                  validation-label="Content"
              />
            </v-column>
          </template>

          <div class="flex justify-start">
            <div   @click="addContent" class="btn btn-primary cursor-pointer btn-sm flex  items-center gap-0.5">
              <Icon name="fluent-mdl2:add-to" class="text-primary-light-4 " size="1.5rem"/>
              Add Content
            </div>
          </div>
        </v-column>
      </v-row>
    </FormKit>

  </v-row>

  <v-row>
    <v-column col="12" class="flex">
      <VBtnLoader  :flag="blogData.flag"    @click="createBlogForm" class="btn btn-primary btn-sm ">
        create
      </VBtnLoader>
    </v-column>
  </v-row>


</template>

<style >

#form{
  width: 100% !important;
}
.formkit-wrapper{
  width: 100% !important;
  max-width: 100% !important;
}
</style>