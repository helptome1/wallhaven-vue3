<template>
    <transition name="imgLarge">
        <div class="imageDetail" v-if="isShow">
            <div class="img-view" v-loading="loading" element-loading-text="正在加载中，请稍后">
                <img :src="imgPath" :width="img.width" :height="img.height"/>
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
                <div>
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
import { watch, ref, reactive } from "vue"
import { aspectRatioToWH } from '@/utils/utils'
import { Close, Refresh, StarFilled, Download } from "@element-plus/icons-vue";
import { getImage } from "@/api/picture"
/**
 * 监听是否打开该组件
 */
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
});
// 获取当前显示窗口的大小
let { height: clientHeight, width: clientWidth } = document.documentElement.getBoundingClientRect()
let isShow = ref(false);
let loading = ref(false);
let imgPath = ref('')
let zoom = ref(0)
let img = ref({width:0, height:0})
let originalW = ref(null);
let minImg = ref({})

watch(
    () => props.data,
    (newVal) => {
        let { dimension_x, dimension_y, path, ratio } = newVal;
        isShow.value = !isShow.value
        // 用原图做一个过渡处理。
        imgPath.value = newVal.thumbs.original
        // 处理图片的比例
        img.value = aspectRatioToWH(clientWidth - 100, clientHeight - 200, ratio, dimension_x, dimension_y)
        // 记录原始的图片宽度
        originalW.value = dimension_x
        // 缩放比例
        // zoom.value = parseInt(img.width / dimension_x * 100)
        // 
        minImg.value = { ...img }
        // 加载状态
        loading.value = true

        /**
         * 绑定鼠标滚轮放大缩小事件X
         */

        /**
         * 获取大图片
         */        
        getImage(path.split("full")[1]).then(res => {
            imgPath.value = res.data;
            img.value = aspectRatioToWH(clientWidth - 100, clientHeight - 200, ratio, dimension_x, dimension_y)
            loading.value = false;
        })
    },
    { deep: true }
);
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
            cursor: url(../../assets/cursor.png), auto !important;
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
    border-radius: 100vw 0 0 0;
    right: 0;
    bottom: 0;
}
</style>