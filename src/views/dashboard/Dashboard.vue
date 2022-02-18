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
  searchList.list = { ...searchList.list, ...data.list };
  /**
   * 把数组类型的参数转换成字符串。
   */
  if ((data.list.purity as string[]).length <= 1) {
    searchList.list.purity =
      !(data.list.purity as string[])[0] ||
      (data.list.purity as string[])[0] === "SFW"
        ? "SFW"
        : "Sketchy";
  } else {
    searchList.list.purity = "110";
  }
  console.log("searchList.list", searchList.list);

  // searchList = toRefs(searchList);
};
</script>
 
<style lang="less" scoped>
.main-panel {
  // padding: 20px;
  margin-top: 20px;
}
</style>