<!--
 * @Author: Muse admin@yunsinek.cn
 * @Date: 2023-09-13 15:11:08
 * @LastEditors: Muse admin@yunsinek.cn
 * @LastEditTime: 2023-09-13 16:04:03
 * @FilePath: /be-free/src/App.vue
 * @Description: 
-->


<template>
  <a-layout id="pageMain">
      <a-layout-header >
        <headerComp></headerComp>
      </a-layout-header>
      <a-layout>
        <a-layout-content>
          <RouterView />
        </a-layout-content>
        <a-layout-sider :width="300">
          <SlideComp />
        </a-layout-sider>
      </a-layout>
      <a-layout-footer>
        <FooterComp/>
      </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComp from './components/layout/header.vue'
import FooterComp from './components/layout/footer.vue'
import SlideComp from './components/layout/slide.vue'
</script>

<style scoped>
  #pageMain{
    height: 100vh;
  }
</style>
