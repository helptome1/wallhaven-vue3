<template>
  <div class="image-list">
    <ul>
      <template v-if="!skeleton">
        <li v-for="(item, index) in list" :key="item.id + index">
          <img :src="item.thumbs.small" loading="lazy" draggable="false" @click="openDeatil(item)" />
          <div class="img-info">
            <!-- 没有收藏时显示 -->
            <span :key="item.id + 'yes'" v-if="isCollected(item.id)" @click="clickRemoveCollect(item)">
              <el-icon class="icon-position">
                <star-filled />
              </el-icon>
            </span>
            <!-- 加入到收藏时显示 -->
            <span :key="item.id + 'no'" v-else @click="clickAddCollect(item)">
              <el-icon>
                <star />
              </el-icon>
            </span>
            <span>{{ item.resolution }}</span>
            <span>
              <el-icon class="icon-position">
                <download />
              </el-icon>
            </span>
          </div>
        </li>
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
import { reactive, ref, toRefs, watch, inject } from 'vue'
import { Meta, Data } from '@/types/interface'
import { useIntersectionObserver } from '@vueuse/core'
import { Star, StarFilled, Download } from '@element-plus/icons-vue'
import { setLocalData, getCollectData, setCollectData } from '@/utils/utils'

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
    console.log(imgList.list)
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

/**
 * inject接受provide提供的函数, 并且展示图片详情页面
 */
const imageDetailIsShow = inject('layout')

const openDeatil = (data: Data) => {
  ;(imageDetailIsShow as any)(data)
}

/**
 * 收藏功能
 */

// 获取收藏列表
let collectArr = ref(getCollectData())
// 点击收藏，保存到localstorage中
const clickAddCollect = (item: Data) => {
  collectArr.value.splice(0, 0, item)
  setLocalData('collection', collectArr.value)
}

// 渲染是否点击了收藏
const clickRemoveCollect = (item: Data) => {
  let index = collectArr.value.findIndex()
}

let isCollected = (id: any) => {
  return (
    collectArr.value.length > 0 &&
    collectArr.value.findIndex((item) => id === item.id) !== -1
  )
}
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
