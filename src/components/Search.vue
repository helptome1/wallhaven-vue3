<template>
  <div class="search">
    <el-checkbox-group v-model="searchParams.purity">
      <el-checkbox-button label="SFW">SFW</el-checkbox-button>
      <el-checkbox-button label="Sketchy">Sketchy</el-checkbox-button>
    </el-checkbox-group>
    <el-select v-model="searchParams.sorting" style="width: 100px" class="mgr10">
      <el-option label="最新" value="date_added"></el-option>
      <el-option label="最热" value="hot"></el-option>
      <el-option label="随机" value="random"></el-option>
      <el-option label="热门列表" value="toplist"></el-option>
      <el-option label="最多收藏" value="favorites"></el-option>
    </el-select>
    <el-select v-model="searchParams.atleast" style="width: 100px" class="mgr10">
      <el-option label="不限" value></el-option>
      <el-option label="1080p+" value="1920x1080"></el-option>
      <el-option label="2k+" value="2560x1080"></el-option>
      <el-option label="4k+" value="3840x2160"></el-option>
      <el-option label="8k+" value="7680x4320"></el-option>
    </el-select>
    <el-input v-model.trim="searchParams.q" placeholder="Please input" class="input" />
    <el-button type="primary" color="#a1c25a" class="search-button" @click="serachHandle">
      <el-icon class="iconBase" :class="[searchButton ? 'Iconanimation' : '']">
        <Refresh />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
// 引入element-plus图标库
import { Search, Refresh } from "@element-plus/icons-vue";

const searchParams = reactive({
  purity: ["SFW"],
  sorting: "date_added",
  atleast: "",
  q: "",
});

let searchButton = ref(false);
const serachHandle = () => {
    searchButton.value = true
};
</script>

<style lang="less" scoped>
.search {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  .input {
    margin-right: 8px;
    width: 25%;
  }
  .search-button {
    width: 5%;
  }
  .iconBase {
      transition: all 1s;
  }
  .Iconanimation{
      transform: rotate(360deg);
  }
}
</style>