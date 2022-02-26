<template>
  <div class="content">
    <div class="empty">
      <img :src="empty" alt="">
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import empty from '@/assets/collection.svg'
</script>
    
<style lang="less" scoped>
.content {
  width: 100vm;
  height: 100vm;
  padding: 20px;
  text-align: center;
  .empty {
    position: relative;
    top: -150px;
  }
}
</style>