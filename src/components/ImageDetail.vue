<template>
  <transition name="imgLarge">
    <div class="imageDetail" v-if="isShow">
      <div class="img-view" v-loading="loading" element-loading-text="正在加载中，请稍后">
        <img :src="imgPath" :width="img.width" :height="img.height" />
      </div>
      <div class="buttons">
        <div @click="isShow = false">
          <el-icon :size="25">
            <close />
          </el-icon>
        </div>
        <div>
          <el-icon :size="25" class="is-loading">
            <Refresh />
          </el-icon>
        </div>
        <div @click="downloadImg()">
          <el-icon :size="25">
            <download />
          </el-icon>
        </div>
        <div>
          <el-icon :size="25">
            <star-filled />
          </el-icon>
        </div>
      </div>
    </div>
  </transition>
</template>
    
<script setup lang='ts'>
import { watch, ref, inject } from "vue";
import { aspectRatioToWH, getTime } from "@/utils/utils";
import { Close, Refresh, StarFilled, Download } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getImage } from "@/api/picture";
/**
 * 监听是否打开该组件
 */
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

// 获取当前显示窗口的大小,不能换行！
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight
// 控制显示组件显示于隐藏
let isShow = ref(false);
// 图标loading状态
let loading = ref(false);
// 图片的url地址
let imgPath = ref("");
// 缩放比例
let zoom = ref(0);
// 图片的尺寸大小
let img = ref({ width: 0, height: 0 });
// 保存原始图片
let originalW = ref(null);
// 图片的最小长宽
let minImg = ref({});


// 接受从App.vue传递的来的方法
// let addDownList = inject("addDownList");
// let getNewLoaded = inject("getNewLoaded");


watch(
  () => props.data,
  (newVal) => {
    let { dimension_x, dimension_y, path, ratio } = newVal;
    isShow.value = !isShow.value;
    // 用原图做一个过渡处理。
    imgPath.value = newVal.thumbs.original;
    // 处理图片的比例
    img.value = aspectRatioToWH(clientWidth - 100, clientHeight - 200, ratio, dimension_x, dimension_y);
    // 记录原始的图片宽度
    originalW.value = dimension_x;
    // 缩放比例
    // zoom.value = parseInt(img.width / dimension_x * 100)
    minImg.value = { ...img };
    // 加载状态
    loading.value = true;

    /**
     * 绑定鼠标滚轮放大缩小事件X
     */

    /**
     * 获取大图片
     */
    getImage(path.split("full")[1]).then((res) => {
      imgPath.value = res.data;
      // 就这个格式不要变
      img.value = aspectRatioToWH(clientWidth - 100, clientHeight - 200, ratio, dimension_x, dimension_y);
      loading.value = false;
    });
  },
  { deep: true }
);

/**
 * 下载图片
 */
const downloadImg = (item = props.data) => {
  let { id, path: url, file_size: size, resolution, thumbs: { small }, } = item;
  // 这里使用正则表达式判断下载链接是否是blob格式的链接
  if (/^blob:/.test(imgPath.value)) {
    // (addDownList as Function)({ id, url, size, resolution, small, _img: item });
    // 这里使用a标签的方式进行图片的下载。
    const a = document.createElement("a");
    a.href = imgPath.value;
    // 下载后的命名方式
    a.download = `one-${id}${url.substr(url.lastIndexOf("."))}`;
    a.click();
    setTimeout(() => {
      // 释放图片链接，减少内存占用。
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 3000);
    ElMessage({ message: "下载成功", type: "success", duration: 2000 });
    // (getNewLoaded as Function)({ id, resolution, size, small, url, downloadtime: getTime() })
  } else {
    // (addDownList as Function)({ id, url, size, resolution, small, _img: item });
    ElMessage({ message: "已加入下载", type: "success", duration: 2000 });
  }
};
</script>
    
<style lang="less" scoped>
.imageDetail {
  position: fixed;
  width: 100vw;
  height: 100vh;
  color: #fff;
  z-index: 9;
  backdrop-filter: blur(20px);
  .img-view {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .buttons {
    position: absolute;
    right: 20px;
    top: 50vh;
    transform: translateY(-50%);
    color: ffffff9e;
    z-index: 9999;
    div {
      margin: 10px 0;
      padding: 16px;
      border-radius: 50%;
      transition: all 0.3s ease;
      background: #0016484f;
      &:hover {
        background: #38acfa;
        color: #ffffff;
      }
      &.shoucang {
        color: #38acfa;
        &:hover {
          color: #ffffff;
        }
      }
    }
  }
}
// 进场和离场动画

.imgLarge-enter-active {
  transition: all 0.5s, border-radius 0.8s 0.3s;
}
.imgLarge-leave-active {
  transition: all 0.8s;
}

.imgLarge-enter-from,
.imgLarge-leave-to {
  opacity: 0;
  border-radius: 0 0 100vw 0;
  width: 10px;
  height: 10px;
  background: #000;
}

.imgLarge-leave-to {
  border-radius: 0 0 0 100vw;
  right: 0;
  // bottom: 0;
}
</style>