<template>
    <div class="content">
        <ul>
            <template v-if="imgList.list.length > 0">
                <li v-for="item in imgList" :key="item.id">
                    <img :src="item.thumbs.small" loading="lazy" draggable="false" />
                    <span>{{ item.resolution }}</span>
                </li>
            </template>
            <template v-else>
                <li class="skeleton">
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
    
<script setup lang='ts'>
import { reactive, ref } from 'vue'
let imgList = reactive({
    list: []
})

</script>
    
<style lang="less" scoped>
.content {
    width: 100%;
    height: 100%;
    padding: 20px;
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