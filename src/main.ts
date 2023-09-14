/*
 * @Author: Muse admin@yunsinek.cn
 * @Date: 2023-09-13 15:11:08
 * @LastEditors: Muse admin@yunsinek.cn
 * @LastEditTime: 2023-09-13 15:17:44
 * @FilePath: /be-free/src/main.ts
 * @Description: init main
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue);

app.mount('#app')
