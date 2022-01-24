<template>
  <div class="sliderBar-container">
    <!-- logo -->
    <div class="logo">
      <img :src="logo" draggable="false" alt="">
    </div>
    <!-- menu -->
    <div class="menu"></div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo800600(2).png'

</script>

<style lang="less" scoped>
.sliderBar-container {
  display: flex;
  background-color: #201f2908;
  box-shadow: -10px 0 20px 1px #fff;
  color: #fff;
  .logo {
    img {
      width: 280px;
    }
  }
}
</style> 