<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/ ">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/profile">
        <template #icon>
          <span class="iconfont icon-wode"></span>
          <span class="text" v-if="isLogin">我的</span>
          <span class="text" v-else>未登录</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .iconfont {
    font-size: 0.533rem;
  }
  .text {
    font-size: 0.32rem;
  }
}
</style>
