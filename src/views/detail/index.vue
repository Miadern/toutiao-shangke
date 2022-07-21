<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 文章组件 -->
    <articleVue :artId="id"></articleVue>

    <!-- 底部 -->
    <div class="foott">
      <van-button round class="btn">写评论</van-button>
      <van-badge :content="0">
        <van-icon name="comment-o" />
      </van-badge>
      <van-icon name="star-o" />
      <van-icon name="good-job-o" />
      <van-icon name="share" />
    </div>
  </div>
</template>

<script>
import articleVue from './article.vue'
export default {
  components: {
    articleVue
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    // 头部返回按钮
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
//头部导航栏
.navBar {
  background-color: rgb(50, 150, 250);
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
//底部评论栏
.foott {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 0.01333rem solid #d8d8d8;
  height: 1.17333rem;
  .btn {
    width: 3.76rem;
    height: 0.61333rem;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
  }
  .van-icon {
    color: rgb(119, 119, 119);
    font-size: 0.53333rem;
  }
  :deep(.van-badge--fixed) {
    top: 10px;
  }
}
</style>
