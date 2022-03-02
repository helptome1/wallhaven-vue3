<template>
  <div class="container" :class="tabs.id">
    <!-- 侧边导航栏 -->
    <SliderBar class="sliderBar" @change="changeTab" />
    <!-- 主要内容区域 -->
    <div class="main">
      <div class="main-header">
        {{ tabs.label }}
        <NavStatus></NavStatus>
      </div>
      <div class="main-body">
        <transition name="slide-fade" mode="out-in">
          <keep-alive exclude="CollectionPage,CollectionPage">
            <component class="component" :is="tabs.component" :key="tabs.id"></component>
          </keep-alive>
        </transition>
      </div>
    </div>
    <ImageDetail :data="imageDetailData" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, provide } from 'vue'
// 定义menu的接口
interface Tabs {
  component: string
  icon: string
  id: string
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
  tabs.id = menu.id
  tabs.label = menu.label
}
/**
 * 使用provide向子代组件传递数据，并接受来自子代组件的传参
 */
const imageDetailData = ref(null)
const imageDetailIsShow = (data: any) => {
  imageDetailData.value = data
}
provide("layout", imageDetailIsShow)


</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  font-size: 12px;
  box-shadow: 8px 8px 10px grey;
  background-size: cover;
  background-color: #0c0e29;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(10px);
    z-index: 0;
  }
  .sliderBar {
    width: 280px;
    z-index: 1;
  }
  .main {
    flex-direction: column;
    flex: 1;
    z-index: 9;
    padding:0 20px 20px 20px;
    color: #fff;
    .main-header {
      display: flex;
      padding-top: 20px;
      height: 40px;
      line-height: 40px;
      font-size: 40px;
      -webkit-app-region: drag;
    }
    .main-body {
      height: calc(100% - 40px);
      position: relative;
      .component {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.hot {
  background-image: url("../assets/hot.png");
}
.people {
  background-image: url("../assets/people.jpg");
}
.acg {
  background-image: url("../assets/acg.jpg");
}

.collection {
  background-image: url("../assets/collection.jpg");
}

.download {
  background-image: url("../assets/download.png");
}
.about {
  background-image: url("../assets/about.jpg");
}
// 翻页动画
.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  overflow: hidden;
  transform: scale(0.1) translateY(-600px);
  opacity: 0;
}

.slide-fade-leave-to {
  position: absolute;
}
</style>