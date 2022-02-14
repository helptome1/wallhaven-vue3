<template>
  <div class="image-list">
    <ul>
      <template v-if="skeleton">
        <li v-for="item in 12" :key="item" class="skeleton">
          <div class="img"></div>
          <div class="desc">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </li>
      </template>
      <template v-else>
        <li>1</li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getHotPicture } from '@/api/picture'
import { reactive, ref } from 'vue';

let skeleton = ref(true)
/**
 * 定义meta声明
 */
interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  query?: any;
  seed?: any;
}

interface Thumbs {
  large: string;
  original: string;
  small: string;
}

interface Data {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: Thumbs;
}

let imgList: Array<Data> = reactive([])
let meta = reactive(<Meta>{})

getHotPicture().then(res => {
  imgList = res.data.data
  meta = res.data.meta
})


</script>

<style lang="less" scoped>
.image-list {
  width: 100%;
  height: 100%;
  ul {
    height: 100%;
    overflow-y: auto;
    text-align: center;
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
      &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 16px 32px -4px #000000a3;
        transform: scale(1.1, 1.1);
      }
    }
  }
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
}
</style>