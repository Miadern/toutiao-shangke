<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="200"
    >
      <div class="card" v-for="(item, index) in List" :key="index">
        <van-image round width="36px" height="36px" :src="item.aut_photo" />
        <div class="txt">
          <div class="top">{{ item.aut_name }}</div>
          <p>{{ item.content }}</p>
          <div class="bottom">
            <span>{{ item.pubdate | dataEdit }}</span>
            <span class="hui" @click="showPopup(item)"
              >回复 {{ item.reply_count }}</span
            >
          </div>
        </div>
        <span class="goodJob"><van-icon name="good-job-o" />赞</span>
      </div>
    </van-list>
    <!-- 弹出层 -->
    <van-popup v-model="poPshow" position="bottom" :style="{ height: '90%' }">
      <div class="popCard">
        <van-cell
          :value="
            itemTop.reply_count ? `${itemTop.reply_count}条回复` : '暂无回复'
          "
          class="hd"
        />
        <div class="card">
          <van-image
            round
            width="36px"
            height="36px"
            :src="itemTop.aut_photo"
          />
          <div class="txt">
            <div class="top">{{ itemTop.aut_name }}</div>
            <p>{{ itemTop.content }}</p>
            <div class="bottom">
              <span>{{ itemTop.pubdate | dataEdit }}</span>
              <span class="hui">回复 {{ itemTop.reply_count }}</span>
            </div>
          </div>
          <span class="goodJob"><van-icon name="good-job-o" />赞</span>
        </div>
        <van-cell value="全部回复" />
        <!-- 评论的评论 -->
        <van-list
          v-model="loading2"
          :finished="finished2"
          finished-text="没有更多了"
          @load="onLoad2"
          offset="300"
        >
          <div class="card" v-for="(item, index) in itemList" :key="index">
            <van-image round width="36px" height="36px" :src="item.aut_photo" />
            <div class="txt">
              <div class="top">{{ item.aut_name }}</div>
              <p>{{ item.content }}</p>
              <div class="bottom">
                <span>{{ item.pubdate | dataEdit }}</span>
                <span class="hui">回复 {{ item.reply_count }}</span>
              </div>
            </div>
            <span class="goodJob"><van-icon name="good-job-o" />赞</span>
          </div>
        </van-list>
        <!-- 评论的评论 -->

        <!-- 按钮 -->
        <van-button round class="sendBtn" @click="showcomment = true"
          >评论</van-button
        >
        <!-- 弹出层 -->
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
    </van-popup>
  </div>
</template>

<script>
import { getComments, sendComments } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  created() {
    // 获取评论
    this.getComments()
  },
  data() {
    return {
      // 评论内容
      message: '',
      // 弹出评论
      showcomment: false,
      // 控制list栏加载
      loading: false,
      loading2: false,
      // 控制list栏加载完成
      finished: false,
      finished2: false,
      // 下一页评论的偏移量
      offset: null,
      offsetTwo: null,
      // 最后一个评论的偏移量
      end: null,
      endTwo: null,
      // 评论列表
      List: [],
      // 控制弹出层
      poPshow: false,
      itemList: [],
      // 选中评论的对象
      itemTop: {},
      valId: ''
    }
  },
  props: {
    artIdFin: {
      type: String,
      require: true
    }
  },
  filters: {
    // 将时间计算为几年前~
    dataEdit(val) {
      const time = dayjs(val).fromNow()
      return `${time}`
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
        await sendComments(this.valId, this.message, this.artIdFin)
        this.showcomment = false
        this.$toast.success('评论成功！')
        // 调用刷新页面
        // 获取评论的评论
        const { data } = await getComments('c', this.valId)
        console.log(data)
        this.itemList = data.data.results
        // 评论总数的渲染
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
    // 弹出评论
    async showPopup(item) {
      this.valId = item.com_id
      // 显示弹出层
      this.poPshow = true
      // 获取单个评论
      this.itemTop = item
      try {
        // 获取评论的评论
        const { data } = await getComments('c', item.com_id)
        console.log(data)
        this.itemList = data.data.results
        // 评论总数的渲染
      } catch (error) {
        this.$toast.fail('请重试或者刷新页面')
      }
    },
    // 获取评论
    async getComments() {
      try {
        const { data } = await getComments('a', this.artIdFin)
        this.List = data.data.results
        this.offset = data.data.last_id
        this.end = data.data.end_id
        // 评论总数的渲染
      } catch (error) {
        this.$toast.fail('请重试或者刷新页面')
      }
    },

    // 下拉列表触发事件
    async onLoad() {
      try {
        const res = await getComments('a', this.artIdFin, this.offset)
        this.offset = res.data.data.last_id
        this.end = res.data.data.end_id
        if (this.offset === this.end) {
          this.finished = true
          return
        }
        this.List = [...this.List, ...res.data.data.results]
        this.loading = false
        // 评论总数的渲染
      } catch (error) {
        this.$toast.fail('请重试或者刷新页面')
      }
    },
    // 评论的评论下拉列表触发事件
    async onLoad2() {
      try {
        // 获取评论的评论
        const { data } = await getComments('c', this.valId)
        console.log(data)
        this.offsetTwo = data.data.last_id
        this.endTwo = data.data.end_id
        if (this.offsetTwo === this.endTwo) {
          this.finished2 = true
          return
        }
        this.itemList = [...this.itemList, ...data.data.results]
        this.loading2 = false
        // 评论总数的渲染
      } catch (error) {
        this.$toast.fail('请重试或者刷新页面')
      }
    }
  },
  computed: {
    isUseBtn() {
      return !this.message.trim()
    }
  }
}
</script>

<style scoped lang="less">
.card {
  display: flex;
  font-size: 0.37333rem;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  .txt {
    margin-left: 20px;
    .top {
      color: #406599;
      font-size: 0.34667rem;
    }
    p {
      font-size: 0.42667rem;
      color: #222;
      word-break: break-all;
      text-align: justify;
    }
    .bottom {
      font-size: 0.25333rem;
      color: #222;
      margin-right: 0.33333rem;
      .hui {
        margin-left: 20px;
        text-align: center;
        display: inline-block;
        border-radius: 26.64rem;
        background-color: #fff;
        border: 0.02667rem solid #ebedf0;
        width: 1.8rem;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.28rem;
        color: #222;
      }
    }
  }
  .goodJob {
    position: absolute;
    right: 0.42667rem;
  }
}
.popCard {
  .hd {
    .van-cell__value--alone {
      text-align: center;
    }
  }
  .sendBtn {
    position: fixed;
    bottom: 0;
    left: 0.7rem;
    width: 8.53333rem;
    height: 1.06667rem;
  }
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
