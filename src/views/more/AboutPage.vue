<template>
  <div>
    <div class="about">
      <p class="about-me">
        Hello，我是公众号HelpToMe的主笔，也是本应用的开发者——小熊猫。 wallhaven.cc
        一直是我喜欢的壁纸网站，其精美的图片，诗意的创作，让我体验到绝无仅有的视觉盛宴。《New
        Wallhaven》是网站（wallhaven.cc）的桌面应用，完全使用了wallhaven的图片接口，在此非常感谢wallhaven的公开接口。本程序的图片内容都来自于wallhaven.cc，图片版权为原作者所有，若有侵权可以联系我删除。
      </p>
    </div>
    <div class="follow">
      <div class="update">
        <h1>更新说明：</h1>
        <p>由于软件使用的技术，个人还在学习中，自动更新软件还在学习过程中。最新版本的软件暂时发布在我的个人微信公众号：HelpTomMe，扫描下方二维码关注。</p>
      </div>
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
</template>

<script setup lang="ts">
import donateImg from '@/assets/donate.png'
import wechatImg from '@/assets/wechat.jpg'

</script>

<style lang="less" scoped>
.about {
  line-height: 50px;
  text-indent: 2rem;
  padding: 20px;
  color: #ececec;
  border-bottom: 1px solid #eee;
  .about-me {
    font-size: 16px;
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
