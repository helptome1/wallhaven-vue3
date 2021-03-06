// 重置样式和公用样式
import "./assets/styles/global.less";
// 导入阿里图标库
import "./assets/styles/iconfont.css";

import components from '@/views/index'
import { createPinia } from 'pinia';

import { createApp } from "vue";
import App from "./App.vue";

import router from "@/route/index";


const app = createApp(App);

app.use(createPinia()).use(components).use(router).mount("#app");
