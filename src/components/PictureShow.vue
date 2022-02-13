<template>
  <div class="image-list">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.image-list {
  width: 100%;
  height: 100%;
  ul {
    height: 100%;
    overflow-y: auto;
    text-align: center;
    li {
      display: inline-block;
      margin: 10px;
      width: 300px;
      height: 240px;
      border-radius: 3px;
      overflow: hidden;
      background-color: red;
      transition: transform 0.15s ease-in-out, box-shadow 0.3s ease-in-out;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 8px #00000042;
      position: relative;
      z-index: 1;
      &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 16px 32px -4px #000000a3;
        transform: scale(1.1, 1.1);
      }
    }
  }
}
</style>