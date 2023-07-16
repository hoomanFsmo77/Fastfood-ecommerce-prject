<template>
    <section id="topbar">
        <v-container >
            <v-row>
                <v-column col="12" lg="6" md="8" class="sm:flex-row sm:justify-start flex-col justify-center items-center">
                    <h6 
                    class="text-primary-light-3 font-500 text-left">
                    Serving to whole New York
                   </h6>
                   <a 
                   href="mailto:hoomanmousavi77@gmail.com"
                   class="text-primary-light-3 transition-all hover:text-white font-500 text-left ml-1.5">
                    <Icon name="bi:envelope" class="mr-0.6"/>
                    info@wengdo.com
                   </a>
                </v-column>
                <v-column col="0" lg="6" md="4"  class=" justify-end">
                    <a class="topbar-icon" href="#">
                        <Icon name="bi:facebook"/>
                    </a>
                    <a class="topbar-icon" href="#">
                             <Icon name="bi:twitter"/>
                    </a>
                    <a class="topbar-icon" href="#">
                             <Icon name="bi:google"/>
                    </a>
                    <a class="topbar-icon" href="#">
                             <Icon name="bi:linkedin"/>
                    </a>
                    <HomeBasketIcon />
                    <HomeSearch />
                </v-column>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">


</script>

<style scoped>

</style>

