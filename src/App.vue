<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import {downloadState} from '@/utils/download'
// 开启下载监听函数，获取监听数据。

const downloadInfo = (data?: any) => {
    console.log("data", data)
}
downloadState(downloadInfo)
</script>

<style>
</style>
