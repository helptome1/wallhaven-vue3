<template>
  <div>
    <!-- 图片展示区域 -->
    <PictureShow :picParams="search"/>
  </div>
</template>

<script lang="ts" setup>
import { SearchParams } from "./modules/interface";
const search: SearchParams = {
  categories: "001",
  purity: "SFW",
  sorting: "toplist",
  page: 1,
};
</script>

<style>
</style>