<template>
  <div class="content">
    <!-- 有数据时渲染页面 -->
    <template v-if="downLoadList.length > 0">
      <!-- 下载地址 -->
      <div class="downPath">
        <span>下载地址：{{!!loadPath ? loadPath : 'C:/Users/Pc/Downloads'}}</span>
      </div>
      <ul class="downList">
        <li v-for="(item, index) in downLoadList" :key="index">
          <div class="image">
            <img :src="item.small" />
          </div>
          <div class="imgInfo">
            <div class="down-info">
              <div class="img-title">
                <span>{{ item.id }}</span>
              </div>
              <div class="down-process">
                <span>{{ item.receivedBytes ? byteChange(item.receivedBytes) : '--' }}/{{ byteChange(item.size) }}</span>
              </div>
            </div>
            <div class="down-speed">
              <span>{{ byteChange(item.speedBytes) }}</span>
            </div>
            <div class="down-options">icon</div>
          </div>
        </li>
      </ul>
    </template>
    <!-- 没有数据的时候加载空数据图片 -->
    <template v-else>
      <div class="empty">
        <img :src="empty" />
      </div>
    </template>
  </div>
</template>
    
<script lang='ts'>
import empty from '@/assets/collection.svg'
import { defineComponent, computed, ref } from 'vue'
// 引入pinia
import { downloadStore } from '@/stores/download'
import { storeToRefs } from 'pinia'


export default defineComponent({
  name: 'CollectionPage',
  setup() {
    const downLoadingList = downloadStore();
    // 让pinia的数据变成响应式
    const { downlistArr } = storeToRefs(downLoadingList)
    let loadPath = ref('')
    // 获取下载列表。
    const downLoadList = downlistArr.value
    if (!!downLoadList && downLoadList.length > 0) {
      // 如果数据中没有loadpath,清空缓存
      if (!downLoadList[0].loadPath) {
        localStorage.removeItem("downLoading");
      } else {
        const tempPath = downLoadList[0].loadPath.split("\\");
        const tempLoadPath = tempPath.slice(0, tempPath.length - 1);
        loadPath.value = tempLoadPath.join("/");
      }
    }
    // console.log()
    /**
     * 转换字节显示的大小
     */
    const byteChange = computed(() => (limit: number) => {
      var size = "";
      if (limit < 0.1 * 1024) {                          //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B"
      } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "KB"
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {     //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB"
      } else {                                           //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
      }

      var sizeStr = size + "";                           //转成字符串
      var index = sizeStr.indexOf(".");                    //获取小数点处的索引
      var dou = sizeStr.substr(index + 1, 2)             //获取小数点后两位的值
      if (dou == "00") {                                 //判断后两位是否为00，如果是则删除00                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
      }
      return size;
    })

    return {
      downLoadList,
      byteChange,
      empty,
      loadPath
    }
  }
})
</script>
    
<style lang="less" scoped>
.content {
  padding: 20px 0;
  height: 100%;
  width: 100%;
  ul {
    height: 100%;
    overflow-y: scroll;
    li {
      height: 130px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font-size: 16px;
      margin-bottom: 10px;
      .image {
        margin-right: 20px;
        img {
          width: 150px;
          height: 100px;
          flex: 1;
        }
      }
      .imgInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        .down-info {
          .img-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .empty {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      top: -150px;
      transform: translate(-50%);
    }
  }
}
</style>