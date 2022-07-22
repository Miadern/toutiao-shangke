<template>
  <div class="main">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :value="item.title"
        v-for="(item, index) in searchList"
        :key="index"
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'

export default {
  data() {
    return {
      // 页数
      page: 1,
      // 每页数量
      per_page: 10,
      // 搜索栏
      searchList: [],
      // 列表显示加载中
      loading: false,
      // 请求失败点击重新加载
      error: false,
      // 列表到头
      finished: false
    }
  },
  props: {
    searchWords: {
      type: String,
      required: true
    }
  },
  watch: {
    searchWords: {
      handler() {
        this.getSearchResult()
      },
      immediate: true
    }
  },
  methods: {
    // 获取搜索结果
    async getSearchResult() {
      try {
        const { data } = await getSearchResult(
          this.searchWords,
          this.page,
          this.per_page
        )
        this.searchList = data.data.results
        // console.log(data.data.results)
      } catch (error) {
        this.$toast.fail('查询失败请重试')
        console.log(error)
      }
    },
    // 列表到底刷新加载
    async onLoad() {
      try {
        // 页数+1
        this.page++
        // 获取新一页数据
        const { data } = await getSearchResult(
          this.searchWords,
          this.page,
          this.per_page
        )
        // 进if说明没有数据了
        if (data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 拼接数组
        this.searchList = [...this.searchList, ...data.data.results]
        // 设置回正loading
        this.loading = false
      } catch (error) {
        this.error = true
        this.loading = false
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: rgb(245, 247, 249);
}
</style>
