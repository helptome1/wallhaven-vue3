<template>
  <div class="main-panel">
    <!-- 搜索列表 -->
    <Search />
    <!-- 图片展示区域 -->
    <PictureShow :picParams="search" />
  </div>
</template>

<script setup lang="ts">
import { SearchParams } from "./modules/interface";
const search: SearchParams = {
  categories: "111",
  purity: "SFW",
  sorting: "hot",
  page: 1,
};
</script>
 
<style lang="less" scoped>
.main-panel {
  // padding: 20px;
  margin-top: 20px;
}
</style>