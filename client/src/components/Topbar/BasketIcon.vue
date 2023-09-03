<template>

    <nuxt-link class="topbar-icon" :to="{name:'SHOPPING_CART'}">
        <div class="basket-icon-wrapper">
            <span class="basket-icon-count">
                {{getCartListLength}}
            </span>
             <Icon class="text-primary-light-3 " size="1.2rem" name="bi:cart3"/>
       
         </div>
    </nuxt-link>
    
</template>
<script lang="ts" setup>
const {getCartListLength}=useCartStore()



</script>
<style lang="">
    

</style>