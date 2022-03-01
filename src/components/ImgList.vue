<template>
    <li v-for="(item, index) in list" :key="item.id + index">
        <img :src="item.thumbs.small" loading="lazy" draggable="false" @click="openDeatil(item)" />
        <div class="img-info">
            <!-- 没有收藏时显示 -->
            <span :key="item.id + 'yes'" v-if="isCollected(item.id)" @click="clickRemoveCollect(item.id)" >
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
            <span @click="addDownList(item)">
                <el-icon class="icon-position">
                    <download />
                </el-icon>
            </span>
        </div>
    </li>
</template>
    
<script setup lang='ts'>
import { ref, inject } from 'vue'
import { Data } from '@/types/interface'
import { Star, StarFilled, Download } from '@element-plus/icons-vue'
import { setLocalData, getCollectData, addDownloadList, getDownLoadingLists,getDownLoadedLists  } from '@/utils/utils'
import { downloadImage } from '@/utils/download'
/**
 * 接收props传参
 */
const props = defineProps({
    list: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['change'])

/**
 * inject接受provide提供的函数, 并且展示图片详情页面
 */
const imageDetailIsShow = inject('layout')

const openDeatil = (data: Data) => {
    (imageDetailIsShow as any)(data)
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

// 点击取消收藏
const clickRemoveCollect = (id: string) => {
    let index = collectArr.value.findIndex(item => item.id === id)
    collectArr.value.splice(index, 1)
    setLocalData('collection', collectArr.value)
    emit('change', collectArr.value)
}
// 渲染收藏图形化
let isCollected = (id: any) => {
    return (
        collectArr.value.length > 0 &&
        collectArr.value.findIndex((item: Data) => id === item.id) !== -1
    )
}

/**
 * 下载功能
 */
// 获取下载列表的数据
let downlistArr = ref(getDownLoadingLists())
const addDownList = (item: Data) => {
    // 发送下载的监听事件
    downloadPic(item)
}
/**
 * 通过electron下载文件
 */
const downloadPic = (obj: any) => {
    let index = downlistArr.value.findIndex((item:any) => item.id === obj.id)
    if(index === -1) {
        obj.progress = 0;
        obj.speedBytes = 0;
        obj.state = 'wait';
        obj.done = "downing";
        downlistArr.value.splice(0, 0, obj)
        // 把下载的图片加入到本地缓存中
        addDownloadList(downlistArr.value)
        // 向主进程发送下载指令。
        downloadImage(obj)
    }
}

</script>
    
<style lang="less" scoped>
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
</style>