<template>
  <div class="main-panel">
    <!-- 搜索列表 -->
    <Search @search="searchHandle" />
    <!-- 图片展示区域 -->
    <PictureShow :picParams="userSearch.list.purity ? userSearch : searchList" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { SearchParams } from "./modules/interface";
let searchList: SearchParams = reactive({
  list: {
    categories: "111",
    purity: "SFW",
    sorting: "hot",
    page: 1,
  },
});
let userSearch: SearchParams = reactive({
  list: {},
});
const searchHandle = (data: SearchParams) => {
  userSearch.list = { ...searchList.list, ...data.list };
  /**
   * 把数组类型的参数转换成字符串。
   */
  if ((data.list.purity as string[]).length <= 1) {
    userSearch.list.purity =
      !(data.list.purity as string[])[0] ||
      (data.list.purity as string[])[0] === "SFW"
        ? "SFW"
        : "Sketchy";
  } else {
    userSearch.list.purity = "110";
  }
  // searchList = toRefs(userSearch);
  console.log("search", userSearch.list);
};
</script>
 
<style lang="less" scoped>
.main-panel {
  // padding: 20px;
  margin-top: 20px;
}
</style>