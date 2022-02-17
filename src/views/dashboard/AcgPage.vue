<template>
  <div>
    <Search />
    <!-- 图片展示区域 -->
    <PictureShow :picParams="search" />
  </div>
</template>

<script setup lang="ts">
import { SearchParams } from "./modules/interface";
const search: SearchParams = {
  list: {
    categories: "010",
    purity: "SFW",
    sorting: "toplist",
    page: 1,
  },
};
</script>

<style>
</style>