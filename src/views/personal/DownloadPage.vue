<template>
  <div class="content">
    <!-- 有数据时渲染页面 -->
    <template v-if="downLoadList.length > 0">
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
import { ref, defineComponent, computed, inject, nextTick } from 'vue'
import empty from '@/assets/collection.svg'
import { getDownLoadingLists, addDownloadList } from '@/utils/utils'
import { downloadState } from '@/utils/download'
// 引入pinia
import { downloadStore } from '@/stores/download'


export default defineComponent({
  name: 'CollectionPage',
  setup() {
    const downLoadingList = downloadStore();

    // 获取下载列表。
    const downLoadList = ref(getDownLoadingLists())
    /**
     * bytes to Mb
     */
    const byteChange = computed(() => (limit: number) => {
      var size = "";
      if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B"
      } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "KB"
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB"
      } else {                                            //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
      }

      var sizeStr = size + "";                        //转成字符串
      var index = sizeStr.indexOf(".");                    //获取小数点处的索引
      var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
      if (dou == "00") {                                //判断后两位是否为00，如果是则删除00                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
      }
      return size;
    })
    /**
     * 获取下载进度
     * @param data 获取拿到的下载数据
     */
    const downloadInfo = (data?: any) => {
      // console.log("downLoadingList", downLoadingList.downlistArr);
      nextTick(() => {
        const index = downLoadingList.downlistArr.findIndex((item: any) => item.id == data.id)
        downLoadList.value[index] = data
        if (data.receivedBytes == data.size) {
          addDownloadList(downLoadList.value)
        }
        console.log("downLoadList", downLoadList.value[index].receivedBytes);
      })
    }
    // downloadState(downloadInfo)

    return {
      downLoadList,
      byteChange,
      empty
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
    position: relative;
    top: -150px;
  }
}
</style>