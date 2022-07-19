<template>
  <div>
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNextPage">
      <van-list
        @load="loadNextPage"
        offset="300"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articleitemVue
          :articleInfo="item"
          v-for="item in articles"
          :key="item.art_id"
        ></articleitemVue>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import articleitemVue from './articleitem.vue'

export default {
  components: {
    articleitemVue
  },
  props: {
    id: {
      type: [Number, String],
      require: true
    }
  },
  data() {
    return {
      articles: [],
      preTimeStamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取文章
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.articles = data.data.results
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新！')
        }
      }
    },
    // 下拉更新文章列表
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.preTimeStamp)
        // 判断一下没有更多文章的情况
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果下拉刷新状态为true就将文章拼接在上方
        if (this.refreshLoading) {
          // 将文章数据拼接到上面
          this.articles.unshift(...data.data.results)
        } else {
          // 将文章数据拼接到下面
          this.articles.push(...data.data.results)
        }

        // 更新文章时间戳
        this.preTimeStamp = data.data.pre_timestamp
        // 到底后将lading复原
      } catch (error) {
        this.error = true
      } finally {
        // 最后都应该给让loading重新复原为false
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
