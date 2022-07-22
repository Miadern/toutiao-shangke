<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录页面 -->
      <div v-if="isLogin" class="user-info banner">
        <!-- 第一行占位 -->
        <van-row></van-row>
        <van-row class="row-2">
          <!-- 第二行左侧 -->
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.7rem"
                height="1.7rem"
                :src="userInfo.photo"
              />
              <span class="mobile"> {{ userInfo.name }} </span>
            </van-row>
          </van-col>
          <!-- 第二行右侧 -->
          <van-col span="11">
            <van-row type="flex" justify="end" align="center" class="code-row">
              <van-button
                class="code-btn"
                type="info"
                size="mini"
                round
                native-type="button"
                @click="goInfo"
                >编辑资料
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <!-- 第三行 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>
                {{ userInfo.art_count }}
              </template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>
                {{ userInfo.fans_count }}
              </template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>
                {{ userInfo.follow_count }}
              </template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>
                {{ userInfo.like_count }}
              </template></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录页面 -->
      <div v-else class="login-register banner">
        <div class="warp" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <!-- 历史-搜索 -->
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item text="收藏"
            ><template #icon
              ><span class="iconfont icon-shoucang"></span></template
          ></van-grid-item>
          <van-grid-item text="历史"
            ><template #icon><span class="iconfont icon-lishi"></span></template
          ></van-grid-item>
        </van-grid>
        <div class="link">
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
        </div>
      </div>
    </main>

    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" class="loginBtn" @click="exitFn"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 去编辑
    goInfo() {
      this.$router.push({
        name: 'user'
      })
    },
    exitFn() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出该账号？',
          closeOnClickOverlay: true
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    goLogin() {
      this.$router.push('/login')
    },
    async getUserInfo() {
      // 如果用户登录了，再去获取用户信息
      if (this.isLogin) {
        try {
          const res = await getUserInfo()
          this.userInfo = res.data.data
        } catch (error) {
          this.$toast.fail('请重新登录！')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.loginBtn {
  width: 100%;
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 0.37333rem;
    img {
      width: 1.76rem;
      margin-bottom: 10px;
    }
  }
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }

  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .link {
    margin: 10px 0;
  }
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;
      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
}
</style>
