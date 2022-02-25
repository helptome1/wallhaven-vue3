<template>
  <div class="sliderBar-container">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" draggable="false" alt="">
    </div>
    <!-- menu -->
    <div class="menu" v-for="(item, index) in navList" :key="index">
      <div class="menu-category">{{item.label}}</div>
      <ul>
        <li :class="{active: activeCategory === menu.id}" v-for="menu in item.childen" :key="menu.id" @click="changeNav(menu)">
          <i :class="`iconfont ${menu.icon}`"></i>
          {{menu.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo800600.png'
import {ref} from 'vue'
let activeCategory = ref('hot');
const navList = [
  {
    label: '在线壁纸',
    childen: [
      {
        id: 'hot',
        label: '热门推荐',
        icon: 'icon-remen',
        component: 'Dashboard'
      },
      {
        id: 'acg',
        label: '动漫精选',
        icon: 'icon-erciyuan',
        component: 'AcgPage' 
      },
      {
        id: 'people',
        label: '人物精选',
        icon: 'icon-meinv',
        component: 'PeoplePage'
      }
    ]
  },
  {
    label: '我的壁纸',
    childen: [
      {
        id: 'my',
        label: '我的收藏',
        icon: 'icon-collection-b',
        component: 'CollectionPage'
      },
      {
        id: 'down',
        label: '下载中心',
        component: 'DownloadPage',
        icon: 'icon-xiazai'
      }
    ]
  },
  {
    label: '其他',
    childen: [
      {
        id: 'about',
        label: '关于',
        component: 'AboutPage',
        icon: 'icon-guanyu'
      }
    ]
  }
]
// 定义一个接口用来接受函数的传参
interface ValueObject {
  id: string,
  label: string,
  icon: string,
  component: string
}
const emit = defineEmits(['change'])
const changeNav = (menu: ValueObject) => {
  activeCategory.value = menu.id;
  emit("change", menu)
}

</script>

<style lang="less" scoped>
.sliderBar-container {
  display: flex;
  flex-flow: column nowrap;
  background-color: #201f2908;
  box-shadow: -10px 0 20px 1px #fff;
  color: #fff;
  .logo {
    img {
      width: 280px;
    }
  }
  .menu {
    list-style: none;
    line-height: 50px;
    padding-left: 20px;
    color: #c6c6c6;
    font-size: 14px;
    position: relative;

    .menu-category {
      color: #ffffff75;
      font-size: 14px;
    }

    ul {
      padding: 10px 30px;
      user-select: none;
      cursor: pointer;
      li {
        display: inline-block;
        padding: 0 10px;
        margin: 0 18px;
        border-bottom: 2px solid transparent;
        transition: all 0.5s;
        &:hover {
          color: #fefefe;
          border-bottom: 2px solid #fff;
        }
      }
    }
  }
}
</style> 