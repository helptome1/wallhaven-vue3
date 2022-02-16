<template>
  <div class="image-list">
    <ul>
      <template v-if="!skeleton">
        <li v-for="(item) in list" :key="item.id">
          <img :src="item.thumbs.small" alt="">
        </li>
      </template>
      <template v-else>
        <li v-for="item in 12" :key="item" class="skeleton">
          <div class="img"></div>
          <div class="desc">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getHotPicture } from "@/api/picture";
import { reactive, ref, toRefs } from "vue";
import { Meta, Data } from "./type";

let skeleton = ref(false);

let imgList = reactive({
  list: [] as Data[],
});
let meta = reactive(<Meta>{});
/**
 * 获取图片信息
 */
getHotPicture().then(({ data }) => {
  imgList.list = data.data;
  console.log(imgList.list[0].thumbs.small);
  meta = data.meta;
});
// 结构出数组才能在模板中使用。
const { list } = toRefs(imgList);

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
  // 骨架屏
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