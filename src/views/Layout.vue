<template>
  <div class="container">
    <!-- 侧边导航栏 -->
    <SliderBar class="sliderBar" />
    <!-- 主要内容区域 -->
    <router-view class="main"></router-view>
  </div>
</template>

<script setup lang="ts">
import SliderBar from './silderBar/SliderBar.vue'


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
    flex: 1;
  }
}
</style>