<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { nextTick } from 'vue';
import { downloadState } from '@/utils/download'
import { addDownloadList } from '@/utils/utils'
// 引入pinia
import { storeToRefs } from 'pinia'
import { downloadStore } from '@/stores/download'

const downLoadingList = downloadStore();
const { downlistArr } = storeToRefs(downLoadingList)
/**
 * 获取下载进度
 * @param data 获取拿到的下载数据
 */
const downloadInfo = (data?: any) => {
  nextTick(() => {
    const index = downlistArr.value.findIndex((item: any) => item.id == data.id)
    downlistArr.value[index] = data
    if (data.state == 'done') {
      addDownloadList(downlistArr.value)
    }
    console.log("downlistArr", downlistArr.value[index].receivedBytes);
  })
}
// 开启下载监听。
downloadState(downloadInfo)

</script>

<style>
</style>
