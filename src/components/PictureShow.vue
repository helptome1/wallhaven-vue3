<template>
  <div class="image-list">
    <ul>
      <template v-if="!skeleton && list.length > 0">
        <li v-for="item in list" :key="item.id">
          <img :src="item.thumbs.small" alt />
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
      <li ref="target"></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {getHotPicture} from "@/api/picture";
import {reactive, ref, toRefs, watch} from "vue";
import {SearchParams, Meta, Data} from "@/types/interface"
import {useIntersectionObserver} from "@vueuse/core";

/**
 * 骨架屏的结构
 */
let skeleton = ref(false);
/**
 * 接收props传参
 */
const props = defineProps({
  picParams: {
    type: Object,
    default: {
      list: {categories: "111", purity: 100, sorting: "hot", page: 1},
    },
  },
});
let getPictures = {
  list: {categories: "111", purity: 100, sorting: "hot", page: 1}
}

/**
 * 监听props变化
 */
watch(
    () => props.picParams,
    (newVal) => {
      console.log("newVal", newVal)
      imgList.list = []
      // getPictures.list = newVal.list;
      getPicture(newVal);
    },
    {deep: true}
);

/**
 * 获取图片信息
 */
let imgList = reactive({
  list: [] as Data[],
});
let meta = reactive(<Meta>{});

const getPicture = (params: any) => {
  getHotPicture(params.list).then(({data}) => {
    imgList.list.push(...data.data);
    meta = data.meta;
  });
};
/**
 * 监听懒加载dom
 * initKey初始化时加载数据
 */
const initKey = ref(true);
const target = ref(null);
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    console.log("isIntersecting", isIntersecting);
    if (isIntersecting || initKey.value) {
      getPicture(getPictures);
      getPictures.list.page++;
      initKey.value = false;
    }
  }
);

// 结构出reactive声明的数组才能在模板中使用。
const {list} = toRefs(imgList);
</script>

<style lang="less" scoped>
.image-list {
  width: 100%;
  height: 100%;

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