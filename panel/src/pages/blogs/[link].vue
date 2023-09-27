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
const blogContents=ref(data.value.content)

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

const {editBlogFlag,blogData,editBlog,removeBlog,categoryHandler,delContentData,addBlogCounter}=useBlog(data)
const form=ref<HTMLElement|null>(null)
const editBlogForm = () => submitForm(form)
const deleteBlog = (id:number) => {
  if(editBlogFlag.value){
    const idx=blogContents.value.findIndex(item=>item.id===id);
    blogContents.value.splice(idx,1)
    delContentData[`delContent[${id}]`]=id
  }

}
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
          <VSelect @fire="categoryHandler" :disabled="!editBlogFlag" label="Category" :select-id="1" v-if="!blog_category_pending"  :data="blog_category" />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column   col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              rows="5"
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

      <v-row  id="blog-content">
        <v-column col="12" class="mb-1.5 ">
          <h4>
            Blog Contents
          </h4>
        </v-column>
        <template v-if="blogContents.length>0">
          <v-column v-for="(item,index) in blogContents" col="12" class="mb-1.5">
            <div class="mb-1 flex justify-between items-center">
              <h6 class="">
                Paragraph {{index+1}}
              </h6>
              <div  :class="{'disabled':!editBlogFlag}" @click="deleteBlog(item.id)"  class="btn btn-secondary btn-sm cursor-pointer">
                delete
              </div>
            </div>
            <FormKit
                wrapper-class="mb-1"
                v-if="item.title"
                type="custom_text"
                label="Title"
                :value="item.title"
                :disabled="!editBlogFlag"
                :id="`title_${item.id}`"
                :name="`title_${item.id}`"
            />
            <FormKit
                type="custom_area"
                label="Content"
                :id="`content_${item.id}`"
                :value="item.text"
                :disabled="!editBlogFlag"
                :name="`content_${item.id}`"
                validation="required"
                validation-label="Content"
            />
          </v-column>
        </template>
        <template v-if="addBlogCounter>0">
          <v-column v-for="item in addBlogCounter" col="12" class="mb-1.5">
            <div class="mb-1 flex justify-between items-center">
              <h6 class="">
                Paragraph {{data.content.length+addBlogCounter}}
              </h6>
              <div  :class="{'disabled':!editBlogFlag}" @click="deleteAddBlog(item)"  class="btn btn-secondary btn-sm cursor-pointer">
                delete
              </div>
            </div>
            <FormKit
                wrapper-class="mb-1"
                type="custom_text"
                label="Title"
                :disabled="!editBlogFlag"
                :id="`add_title_${item}`"
                :name="`add_title_${item}`"
            />
            <FormKit
                type="custom_area"
                label="Content"
                :id="`add_content_${item}`"
                :disabled="!editBlogFlag"
                :name="`add_content_${item}`"
                validation="required"
                validation-label="Content"
            />
          </v-column>
        </template>
        <button :disabled="!editBlogFlag"  @click="addContent" class="btn btn-primary btn-sm flex items-center gap-0.5">
          <Icon name="fluent-mdl2:add-to" class="text-primary-light-4 " size="1.5rem"/>
          Add Content
        </button>
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

<style >

#form{
  width: 100% !important;
}
.formkit-wrapper{
  width: 100% !important;
  max-width: 100% !important;
}
#blog-content .formkit-wrapper{
  margin-bottom: 1rem !important;
}
</style>