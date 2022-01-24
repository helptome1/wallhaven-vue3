import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 导入布局组件
 */
const Layout = () => import('@/views/Layout.vue')
const DashBoard = () => import('@/views/dashboard/Dashboard.vue')

const routes = [
  // 一级路由容器
  {
    path: "/",
    component: Layout,
    children:[
        {path:'/', component: DashBoard}
    ]
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router
