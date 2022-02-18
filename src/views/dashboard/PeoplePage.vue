<template>
  <div>
    <Search />
    <!-- 图片展示区域 -->
    <PictureShow :picParams="searchList" />
  </div>
</template>

<script lang="ts" setup>
import { SearchParams } from "../../types/interface";
import { objToParams } from "@/utils/mixins/mixins";
import { reactive } from "vue";
let searchList: SearchParams = reactive({
  list: {
    categories: "010",
    purity: "SFW",
    sorting: "toplist",
    page: 1,
  },
});

/**
 * 获取选择的搜索参数
 */
const searchHandle = (data: SearchParams) => {
  searchList = objToParams(searchList, data)
};
</script>

<style>
</style>