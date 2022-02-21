<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { getDownLists, getDownLoaded } from "@/utils/utils";
import { downFile } from "@/utils/download";
import { provide } from "vue";
// 获取下载列表
let downFiles = getDownLists();
// 获取下载完成的数据列表
let downLoadedList = getDownLoaded();

const addDownList = (obj: any) => {
  let index = getDownLists().findIndex((item) => item.id === obj.id);
  if (index === -1) {
    obj.progress = 0;
    obj.speedBytes = 0;
    obj.state = "wait";
    obj.done = "downing";
    getDownLists().splice(0, 0, obj);
    downFile(obj);
  }
};

provide('App', addDownList)
</script>

<style>
</style>
