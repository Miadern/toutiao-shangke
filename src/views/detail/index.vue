<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      fixed
      class="navBar"
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 文章组件 -->
    <!-- div包一下给个底部高度 -->
    <div class="bottom">
      <articleVue
        :artId="id"
        :commentListC="commentList"
        ref="child1"
      ></articleVue>
    </div>

    <!-- 底部 -->
    <div class="foott">
      <van-button round class="btn" @click="commentPopup">写评论</van-button>
      <van-badge :content="totalCount">
        <van-icon name="comment-o" />
      </van-badge>
      <van-icon
        name="star"
        v-if="isCollection"
        color="rgb(50, 150, 250)"
        @click="CancelCollectionArt"
      />
      <van-icon name="star-o" v-else @click="collectionArt" />

      <van-icon name="good-job-o" />

      <van-icon name="share" @click="showShare = true" />
      <!-- 分享弹出层 -->
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
      <!-- 评论弹出层 -->
      <van-popup class="vanPopup" v-model="showcomment" position="bottom"
        ><div class="vanPopupBox">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          >
          </van-field>
          <van-button
            square
            type="primary"
            class="btn"
            :disabled="isUseBtn"
            @click="sendComment"
            >发布</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  getComments,
  getCollectionList,
  collectionArt,
  CancelCollectionArt,
  sendComments
} from '@/api'
import articleVue from './components/article.vue'

export default {
  components: {
    articleVue
  },
  computed: {
    isUseBtn() {
      return !this.message.trim()
    }
  },
  created() {
    this.getCollectionList()
    this.getComments()
  },

  data() {
    return {
      toast: '',
      // 评论框
      message: '',
      // 按钮是否禁用
      /* isUseBtn: true, */
      // 评论弹出层
      showcomment: false,
      // 分享弹出层
      showShare: false,
      // 弹出层
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      // 评论数量
      totalCount: 0,
      // 点赞数量
      // likeCount: 0,
      // 文章ID
      id: this.$route.params.id,
      // 是否收藏
      isCollection: false,
      // 评论列表
      commentList: []
    }
  },
  methods: {
    // 发送评论
    async sendComment() {
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '加载中...'
        })
        await sendComments(this.id, this.message)
        this.showcomment = false
        this.$toast.success('评论成功！')
        // 调用刷新页面
        this.$refs.child1.$refs.child2.getComments()
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else if (error.response.status === 403) {
          return this.$toast.fail('该文章已关闭评论')
        } else {
          return this.$toast.fail('评论失败！')
        }
      }
    },
    // 弹出评论栏
    commentPopup() {
      this.showcomment = true
    },
    // 弹出分享
    onSelect(option) {
      this.showShare = false
    },
    // 头部返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取评论
    async getComments() {
      try {
        const { data } = await getComments('a', this.id)
        console.log(data)
        this.commentList = data.data.results
        // 评论总数的渲染
        this.totalCount = data.data.total_count
      } catch (error) {
        this.$toast.fail('请重试或者刷新页面')
      }
    },
    // 获取用户收藏列表
    async getCollectionList() {
      try {
        const { data } = await getCollectionList(1)
        // console.log(data)
        const res = data.data.results.filter((item) => item.art_id === this.id)
        // 筛选后若有内容，就显示已收藏
        if (res.length !== 0) {
          this.isCollection = true
        }
        // 赋予文章点赞人数***废弃
        // this.likeCount = res[0].like_count
      } catch (error) {
        /*   if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else { */
        this.$toast.fail('请重试或者刷新页面')
      }
    },
    // 点击收藏文章
    async collectionArt() {
      try {
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '加载中...'
        })
        const { data } = await collectionArt(+this.id)
        if (data.data) {
          this.isCollection = true
          toast.clear()
          this.$toast.success('操作成功！')
        }
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else {
          return this.$toast.fail('收藏失败！')
        }
      }
    },
    // 点击取消收藏
    async CancelCollectionArt() {
      try {
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '加载中...'
        })
        const res = await CancelCollectionArt(this.id)
        if (res.status === 204) {
          toast.clear()
          this.$toast.success('操作成功！')
          this.isCollection = false
        } else {
          toast.clear()
          return this.$toast.fail('操作失败！')
        }
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else {
          return this.$toast.fail('收藏失败！')
        }
      }
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
  background-color: #fff;
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
.bottom {
  padding-bottom: 1.17333rem;
  padding-top: 1.22667rem;
}

.vanPopup {
  .vanPopupBox {
    display: flex;
    align-items: center;
    padding: 0.42667rem 0 0.42667rem 0.42667rem;
    .van-cell {
      background-color: #f5f7f9;
    }
    .btn {
      color: #6ba3d8;
      background-color: #fff;
      border: unset;
      width: 2.76rem;
    }
    :deep(.van-field__control) {
      background-color: #f5f7f9;
    }
  }
}
</style>
