<template>
  <div class="content">
    <ul>
      <template v-if="imgList.length > 0">
        <!-- <li v-for="item in imgList" :key="item.id">
          <img :src="item.thumbs.small" loading="lazy" draggable="false" @click="openDeatil(item)"/>
          <span>{{ item.resolution }}</span>
        </li>-->
        <!-- 图片展示位 -->
        <ImgList :list="imgList" @change="updateImgList" />
      </template>
      <template v-else>
        <div class="empty">
          <img :src="empty" />
        </div>
      </template>
    </ul>
  </div>
</template>
    
<script setup lang='ts'>
import { reactive, ref, inject } from 'vue'
import empty from '@/assets/collection.svg'
import { Data } from '@/types/interface'
import { setLocalData, getCollectData, setCollectData } from '@/utils/utils'

// 首次加载获取缓存中的收藏列表
let imgList = ref(getCollectData())
/**
 * inject接受provide提供的函数, 点击图片后展示图片详情页面
 */
const imageDetailIsShow = inject('layout')

const openDeatil = (data: Data) => {
  (imageDetailIsShow as any)(data)
}
/**
 * 更新收藏列表
 */
const updateImgList = (newVal: any) => {
  imgList.value = newVal
}



</script>
    
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  ul {
    height: 100%;
    max-width: 1300px;
    overflow-y: auto;
    text-align: center;
    margin: 0 auto;
    li {
      display: inline-block;
      margin: 10px;
      width: 300px;
      height: 240px;
      border-radius: 3px;
      overflow: hidden;
      // background-color: red;
      transition: transform 0.15s ease-in-out, box-shadow 0.3s ease-in-out;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 8px #00000042;
      position: relative;
      z-index: 1;
      span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        color: gray;
      }
      &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 16px 32px -4px #000000a3;
        transform: scale(1.1, 1.1);
      }
    }
    // 没有数据的时候加载图片
    .empty {
      position: relative;
      top: -150px;
    }
  }
}

/**
* 骨架屏
*/
.skeleton {
  .desc {
    align-items: center;

    span {
      display: inline-block;
      width: 30%;
      height: 20px;
      background: linear-gradient(
        60deg,
        #ffffff17 25%,
        #e2e2e217 37%,
        #e4e4e41f 63%
      );
      background-size: 400% 100%;
      animation: skeleton-loading 1.4s ease infinite;
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  }
}
</style>