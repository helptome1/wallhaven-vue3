<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { getDownLists, getDownLoaded, updDownLoaded } from "@/utils/utils";
import { downFile } from "@/utils/download";
import { provide, ref, watch } from "vue";
// 获取下载列表
let downFiles = getDownLists();
// 获取下载完成的数据列表
let downLoadedList = ref(getDownLoaded());

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
const getNewLoaded = (obj: any) => {
  console.log("obj", obj);
  (downLoadedList as any).value.splice(0, 0, obj)
  updDownLoaded(downLoadedList.value)
}
provide('addDownList', addDownList)
provide('getNewLoaded', getNewLoaded)

// watch(() => downLoadedList.value, (newVal) => {
//   console.log(newVal);
// },{deep: true})


</script>

<style>
</style>
