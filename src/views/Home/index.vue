<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <articleVue :id="item.id"></articleVue>
      </van-tab>

      <!-- 更多按钮 -->
      <span class="iconfont icon-gengduo" @click="showPopupFn"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <editChannelsPopupVue
      ref="popup"
      :myChannels="myChannels"
      @del-mychannel="delmychannelFn"
      @changeActive="changeActiveFn"
      @add-mychannel="addMyChannelFn"
    >
    </editChannelsPopupVue>
  </div>
</template>

<script>
import articleVue from './components/article.vue'
import {
  getMyChannels,
  setMyChannelByLocal,
  getMyChannelByLocal,
  delMyChannels,
  addMyChannels
} from '@/api'

import editChannelsPopupVue from './components/editChannelsPopup.vue'
export default {
  components: {
    articleVue,
    editChannelsPopupVue
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  data() {
    return {
      myChannels: [],
      active: 0,
      showPopup: false
    }
  },
  created() {
    this.getMyChannels()
  },
  methods: {
    async getMyChannels() {
      try {
        // 如果isLogin在的话，就是登录状态下，反之为离线状态
        if (!this.isLogin) {
          // 离线状态下
          // 离线状态下还需要判断本地是否存在channel数据
          const channel = getMyChannelByLocal()
          if (channel) {
            // 本地存在channel时
            this.myChannels = channel
          } else {
            // 本地不存在channel时，发送请求获取一下~
            const res = await getMyChannels()
            this.myChannels = res.data.data.channels
          }
        } else {
          // 登录状态下
          // 发请求获取
          const res = await getMyChannels()
          this.myChannels = res.data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重试！')
      }
    },
    showPopupFn() {
      this.$refs.popup.showPopup = true
    },
    // 根据弹出框返回的id删除频道
    async delmychannelFn(id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      // 删除完后需要更新数据
      if (!this.isLogin) {
        // 未登录的状态，只要将数据更新在本地就好
        setMyChannelByLocal(this.myChannels)
      } else {
        // 登录的状态，需要发送请求啊！
        try {
          await delMyChannels(id)
        } catch (error) {
          return this.$toast.fail('删除频道失败！')
        }
      }
      // 不管啥状态成功了就提示！
      this.$toast.success('删除频道成功！')
    },
    // 根据弹出层传出的index选择频道
    changeActiveFn(index) {
      this.active = index
    },
    // 添加频道
    async addMyChannelFn(object) {
      this.myChannels.push(object)
      // 添加完后需要更新数据
      if (!this.isLogin) {
        // 未登录的状态，只要将数据更新在本地就好
        setMyChannelByLocal(this.myChannels)
      } else {
        // 登录的状态，需要发送请求啊！
        try {
          await addMyChannels(object.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败！')
        }
      }
      // 不管啥状态成功了就提示！
      this.$toast.success('添加频道成功！')
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.icon-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
