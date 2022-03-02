<template>
  <div class="image-list">
    <ul>
      <template v-if="!skeleton">
        <!-- 图片展示位 -->
        <ImgList :list="list" />
      </template>
      <template v-else>
        <li v-for="(item, index) in 24" :key="index" class="skeleton">
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
import { getHotPicture } from '@/api/picture'
import { reactive, ref, toRefs, watch } from 'vue'
import { Meta, Data } from '@/types/interface'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * 骨架屏的结构显示与隐藏
 */
let skeleton = ref(true)

/**
 * 接收props传参
 */
const props = defineProps({
  picParams: {
    type: Object,
    default: {
      list: { categories: '111', purity: 100, sorting: 'hot', page: 1 },
      isSearch: false
    }
  }
})

/**
 * 获取图片信息
 */
let imgList = reactive({
  list: [] as Data[]
})
let meta = reactive(<Meta>{})

const getPicture = (params: any) => {
  getHotPicture(params.list).then(({ data }) => {
    imgList.list.push(...data.data)
    meta = data.meta
    skeleton.value = false
  })
}
/**
 * 监听懒加载dom
 * initKey初始化时加载数据
 */
const initKey = ref(true)
const target = ref(null)
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      props.picParams.list.page++
      initKey.value = false
    }
  }
)
/**
 * 监听props变化
 */
watch(
  () => props.picParams,
  (newVal) => {
    if (newVal.isSearch && newVal.list.page === 1) {
      // skeleton.value = true
      imgList.list = []
      getPicture(newVal)
    } else {
      getPicture(newVal)
    }
  },
  { deep: true, immediate: true }
)


// 结构出reactive声明的数组才能在模板中使用。
const { list } = toRefs(imgList)
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
      img {
        // 修复图片未加载出来时，图片信息置顶
        height: 200px;
      }
      .img-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        span {
          color: #747474;
          .icon-position {
            // 加上之后反而感觉图标下移了。
            // vertical-align: middle;
          }
        }
      }

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
