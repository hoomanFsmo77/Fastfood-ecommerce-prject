<template>

  <div v-click-out="close" class="topbar-icon">
    <div  @click="flag=!flag" class="basket-icon-wrapper">
            <span class="basket-icon-count">
                {{getCartListLength}}
            </span>
      <Icon class="text-primary-light-3 " size="1.2rem" name="bi:cart3"/>
    </div>
    <div v-if="flag" class="absolute  bg-primary-dark-2 w-[24rem] p-1 top-[2.6rem] right-0 z-[999999999]">
      <template  v-if="cartListData && cartListData.items && cartListData.items.length>0 && cartListData.order">
        <ul class="max-h-20 overflow-y-auto">
          <li v-for="cart in cartListData.items" class=" mb-1 gap-1 grid grid-cols-[1.3rem_50px_1fr] items-center " :class="{'!grid-cols-[1.3rem_1fr]':cart.type==='custom'}">
            <button @click="removeBasketItem(cart.id)">
              <Icon size="1.3rem" name="bi:x" class="text-gray-500 font-600 transition-all hover:text-primary-light-1" />
            </button>

            <NuxtLink v-if="cart.type==='ready'" :to="{name:'PRODUCT_DETAIL',params:{link:cart.link}}">
              <nuxt-img   width="90" :src="cart.primary_image"/>
            </NuxtLink>

            <div v-else >
              <NuxtLink :to="{name:'PRODUCT_BUILD'}" class="text-primary-light-3 hover:text-primary-light-1 text-1 font-500 ml-[4.1rem] mb-0.7">Build your own product</NuxtLink>
              <div class="[&_img]:!w-[50px] [&_*]:!text-primary-light-3 [&_.order-data]:!ml-0 [&_.order-image]:w-[67px]" v-html="cart.description"></div>
              <p  class="text-primary-light-3 font-400 ml-[4.1rem]">
                {{cart.quantity}} × ${{cart.price.toFixed(2)}}
              </p>

            </div>

            <div v-if="cart.type==='ready'" class="">
              <NuxtLink :to="{name:'PRODUCT_DETAIL',params:{link:cart.link}}" class="text-primary-light-3 hover:text-primary-light-1 text-1 font-500">{{cart.title}}</NuxtLink>
              <div v-if="cart.off" class="flex items-center gap-0.5">
                <p class="text-primary-light-3 font-400">
                  {{cart.quantity}} ×
                </p>
                <p class="text-primary-light-3 font-400 line-through">
                  ${{cart.price.toFixed(2)}}
                </p>
                <p class="text-primary-light-3 font-400 ">
                  ${{$calculate_off_price(cart.price,cart.off_percent).toFixed(2)}}
                </p>

              </div>
              <p v-else class="text-primary-light-3 font-400">
                {{cart.quantity}} × ${{cart.price.toFixed(2)}}
              </p>

            </div>
          </li>
        </ul>
        <div class="flex justify-between items-center my-1.5">
          <p class="text-primary-light-3 font-600 ">
            Subtotal:
          </p>
          <p class="text-primary-light-3">
            ${{Number(cartListData.order.total_amount).toFixed(2)}}
          </p>
        </div>
        <div class="flex justify-center items-center">
          <NuxtLink class="btn btn-primary btn-sm" :to="{name:'SHOPPING_CART'}">
            view cart
          </NuxtLink>
          <NuxtLink class="btn btn-primary btn-sm ml-1" :to="{name:'CHECKOUT'}">
            checkout
          </NuxtLink>
        </div>
      </template>
        <div v-else class=" flex justify-center items-center">
          <h6 class="text-center text-primary-light-3">Cart is empty.</h6>
        </div>
    </div>


  </div>


    
</template>
<script lang="ts" setup>
const flag=ref<boolean>(false)
const {getCartListLength,cartListData}=useCartStore()
const router=useRouter()
const close = () => flag.value=false
router.afterEach(()=>flag.value=false);
const {removeBasketItem}=useCart(undefined)
</script>
<style lang="">
    

</style>