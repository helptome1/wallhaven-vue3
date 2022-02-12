<template>
  <div class="container">
    <!-- 侧边导航栏 -->
    <SliderBar class="sliderBar" @change="changeTab" />
    <!-- 主要内容区域 -->
    <div class="main">
      <div class="main-header">{{tabs.label}}</div>
      <keep-alive>
        <component class="main-body" :is='tabs.component'></component>
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SliderBar from './silderBar/SliderBar.vue'
// 定义menu的接口
interface Tabs {
  component: string,
  icon: string,
  id: string,
  label: string
}

let tabs = reactive({
  component: 'Dashboard',
  icon: 'icon-remen',
  id: 'hot',
  label: '热门推荐'
})
const changeTab = (menu: Tabs) => {
  tabs.component = menu.component
  tabs.label = menu.label
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  font-size: 12px;
  box-shadow: 8px 8px 10px grey;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-color: #0c0e29;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(20px);
    z-index: 0;
  }
  .sliderBar {
    width: 280px;
    z-index: 1;
  }
  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    z-index: 9;
    color: #fff;
    padding: 20px;
    .main-header {
      height: 40px;
      line-height: 40px;
      font-size: 40px;
    }
    .main-body {
      flex: 1;
    }
  }
}
</style>