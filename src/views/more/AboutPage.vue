<template>
  <div class="aboutPage">
    <div class="about">
      <p class="about-me">
        Hello，我是公众号HelpToMe的主笔，也是本应用的开发者——小熊猫。 wallhaven.cc
        一直是我喜欢的壁纸网站，其精美的图片，诗意的创作，让我体验到绝无仅有的视觉盛宴。《New
        Wallhaven》是网站（wallhaven.cc）的桌面应用，完全使用了wallhaven的图片接口，在此非常感谢wallhaven的公开接口。本程序的图片内容都来自于wallhaven.cc，图片版权为原作者所有，若有侵权可以联系我删除。
      </p>
    </div>
    <div class="follow">
      <div class="update">
        <div v-for="(item, index) in updateInfoList" :key="index" class="update-info">
          <h1>{{ item.title + item.version }}:</h1>
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div class="personPicture">
        <ul>
          <li>
            <img :src="donateImg" />
            <span>创作不易，如果觉得软件可以，给个支持。</span>
          </li>
          <li>
            <img :src="wechatImg" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import donateImg from '@/assets/donate.png'
import wechatImg from '@/assets/wechat.jpg'

const updateInfoList = [
  {
    title: '更新版本',
    version: '1.0.1',
    content: '1.0.1版本，加入了打开控制台的快捷键ctrl/command + K + J，用来清除用户缓存，保证应用的正常运行。'
  },
  {
    title: '更新说明',
    version: '1.0.0',
    content: '1.0版本仅仅支持了最基本的一些功能，包括图片下载，收藏，以及预览等功能。后续最新版本的软件暂时发布在我的个人微信公众号：HelpTomMe，扫描下方二维码关注。'
  }
]

</script>

<style lang="less" scoped>
.aboutPage {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.about {
  line-height: 50px;
  text-indent: 2rem;
  padding: 20px;
  color: #ececec;

  .about-me {
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }

  .follow {
    margin-top: 20px;
    font-size: 16px;

    p {
      margin-top: 10px;
      text-indent: 2rem;
    }

    .update {
      margin-bottom: 30px;

      .update-info {
        margin-bottom: 20px;

        h1 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        p {
          margin-bottom: 10px;
        }
      }
    }

    ul {
      display: flex;
      justify-content: space-around;

      li {
        display: flex;
        flex-direction: column;

        img {
          width: 300px;
        }
      }
    }
  }
}
</style>
