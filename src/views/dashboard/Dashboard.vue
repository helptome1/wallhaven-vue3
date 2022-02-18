<template>
  <div class="main-panel">
    <!-- 搜索列表 -->
    <Search @search="searchHandle" />
    <!-- 图片展示区域 -->
    <PictureShow :picParams="searchList" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { SearchParams } from "../../types/interface";
import { objToParams } from "@/utils/mixins/mixins";
let searchList: SearchParams = reactive({
  list: {
    categories: "111",
    purity: "SFW",
    sorting: "hot",
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
 
<style lang="less" scoped>
.main-panel {
  // padding: 20px;
  margin-top: 20px;
}
</style>