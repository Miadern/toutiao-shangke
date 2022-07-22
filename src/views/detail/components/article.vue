<template>
  <div>
    <!-- 标题 -->
    <h1 class="title">{{ articleContent.title }}</h1>
    <!-- 作者栏 -->
    <div class="info">
      <van-image
        round
        width="33px"
        height="33px"
        :src="articleContent.aut_photo"
      />
      <div class="infoText">
        <span>{{ articleContent.aut_name }}</span>
        <p>{{ dataEdit }}</p>
      </div>

      <div class="isis" v-if="isFollow">
        <van-button
          :loading="btnFollow2"
          class="isFollow"
          round
          @click="delFollow"
          >已关注</van-button
        >
      </div>
      <van-button :loading="btnFollow1" v-else round @click="follow"
        ><van-icon name="plus" /> 关注</van-button
      >
    </div>
    <!-- 主体content部分 -->
    <div v-html="articleContent.content" class="contentHTML"></div>
    <!-- 结尾部分 -->
    <van-divider class="foott">正文结束</van-divider>

    <!-- 评论 -->
    <commentItemVue
      :List="commentListC"
      :artIdFin="artId"
      ref="child2"
    ></commentItemVue>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import {
  getArticleInfo,
  followUser,
  getfollowUserList,
  delFollowUser
} from '@/api'
import commentItemVue from './commentItem.vue'
export default {
  components: {
    commentItemVue
  },
  data() {
    return {
      articleContent: {},
      isFollow: false,
      nowAutId: '',
      btnFollow1: false,
      btnFollow2: false
    }
  },
  async created() {
    // 请求文章信息
    await this.getArticleInfo()
    // 获取用户关注角色的列表
    this.getfollowUserList()
  },
  props: {
    artId: {
      type: String,
      require: true
    },
    commentListC: {
      type: Array,
      require: true
    }
    /*  articleContent: {
      type: Object,
      require: true
    } */
  },
  methods: {
    // 获取关注列表
    async getfollowUserList() {
      try {
        const { data } = await getfollowUserList(1)
        const res = data.data.results.filter(
          (item) => item.id === this.nowAutId
        )
        // 筛选后若有内容，就显示已关注
        if (res.length !== 0) {
          this.isFollow = true
        }
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else {
          return this.$toast.fail('请重试或者刷新页面')
        }
      }
    },
    // 获取文章资料
    async getArticleInfo() {
      try {
        const { data } = await getArticleInfo(this.artId)
        this.articleContent = data.data
        this.nowAutId = data.data.aut_id
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else {
          return this.$toast.fail('请重试或者刷新页面')
        }
      }
    },
    // 点击关注的按钮
    async follow() {
      try {
        // 控制加载中动画
        this.btnFollow1 = true
        await followUser(this.articleContent.aut_id)
        this.isFollow = true
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else {
          return this.$toast.fail('请重试或者刷新页面')
        }
      } finally {
        // 控制加载中动画
        this.btnFollow1 = false
      }
    },
    // 点击取消关注按钮
    async delFollow() {
      try {
        // 控制加载中动画
        this.btnFollow2 = true
        const { data } = await delFollowUser(this.nowAutId)
        this.isFollow = data
      } catch (error) {
        if (error.response.status === 401) {
          return this.$toast.fail('登陆超时，请重新登录')
        } else {
          return this.$toast.fail('请重试或者刷新页面')
        }
      } finally {
        // 控制加载中动画
        this.btnFollow2 = false
      }
    }
  },
  computed: {
    // 将时间计算为几年前~
    dataEdit() {
      const time = dayjs(this.articleContent.pubdate).fromNow()
      return `${time}`
    }
  }
}
</script>

<style lang="less" scoped>
//标题
.title {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
//标题下面的info界面
.info {
  position: relative;
  padding: 0 0.42667rem;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  .infoText {
    margin-left: 0.22667rem;
    font-size: 0.32rem;
    color: #3a3a3a;
    p {
      font-size: 0.30667rem;
      color: #b7b7b7;
      margin: 5px 0 0 0;
    }
  }
  /*  .vanBtnBox {
  } */
  .isis {
    position: absolute;
    width: 2.26667rem;
    height: 0.77333rem;
    right: 0;
    :deep(.isFollow) {
      color: #323233;
      background-color: #fff;
      border: 0.02667rem solid #ebedf0;
    }
  }

  :deep(.van-button--default) {
    position: absolute;
    right: 0.42667rem;
    width: 2.26667rem;
    height: 0.77333rem;
    color: white;
    background: rgb(50, 150, 250);
    border-color: rgb(50, 150, 250);
  }
}
//结尾部分
.foott {
  display: flex;
  text-align: center;
  align-items: center;
  margin: 0.42667rem 0;
  color: #969799;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  border-color: #ebedf0;
  border-style: solid;
  border-width: 0;
}
</style>
//第二个标签因为无法使用v-html
<style lang="less">
//主题部分content
.contentHTML {
  font-size: 12px;
  padding: 0.73333rem 0.42667rem;
  h1,
  h2 {
    padding-bottom: 0.3em;
    border-bottom: 0.01333rem solid #eaecef;
  }
  a {
    color: #0366d6;
    text-decoration: none;
  }
  pre {
    padding: 0.21333rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 0.04rem;
    margin-top: 0;
    margin-bottom: 0.21333rem;
  }
  p {
    overflow: auto;
    word-break: break-all;
    margin-top: 0;
    margin-bottom: 0.21333rem;
    text-align: justify;
  }
  img {
    width: 100%;
  }
}
</style>
