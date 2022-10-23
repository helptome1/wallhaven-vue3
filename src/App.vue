<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { nextTick } from 'vue';
import { downloadState } from '@/utils/download'
import { addDownloadList, getDownLoadedLists, getDownLoadingLists, updDownLoaded } from '@/utils/utils'
// 引入pinia
import { storeToRefs } from 'pinia'
import { downloadStore } from '@/stores/download'

const downLoadingList = downloadStore();
const { downlistArr, donelist } = storeToRefs(downLoadingList)
/**
 * 获取下载进度
 * @param data 获取拿到的下载数据
 */
const downloadInfo = (data?: any) => {
  nextTick(() => {
    const index = downlistArr.value.findIndex((item: any) => item.id == data.id)
    downlistArr.value[index] = data
    if (!!data.url && data.state == 'done') {
      // 直接把最终下载状态保存到本地localstorage中
      addDownloadList(downlistArr.value)
      // 1. 先获取下载成功的照片, 暂时不适用这段代码。
      // let getDownLoadedList = getDownLoadedLists()
      // getDownLoadedList.splice(0, 0, data)
      // donelist.value = getDownLoadedList
      // 2. 把下载好的数据保存到本地
      // updDownLoaded(getDownLoadedList)
    }
  })
}
// 先获取一下缓存中的下载列表数据
downlistArr.value = getDownLoadingLists()
// 开启下载监听。
downloadState(downloadInfo)

</script>

<style>
</style>
