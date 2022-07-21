<template>
  <div>
    <!-- 头部搜索栏 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        background="#3296fa"
        class="search"
      />
    </form>
    <!-- 搜索建议/结果/历史 -->
    <!--   <searchHistoryVue></searchHistoryVue>
    <searchSuggestionVue></searchSuggestionVue>
    <searchResultVue></searchResultVue> -->
    <component
      :is="componentName"
      :keyswords="keywords"
      :searchWords="keywords"
      @sendSuggestion="sendSuggestionFn"
    ></component>
  </div>
</template>

<script>
import searchHistoryVue from './components/searchHistory.vue'
import searchResultVue from './components/searchResult.vue'
import searchSuggestionVue from './components/searchSuggestion.vue'

export default {
  components: {
    searchHistoryVue,
    searchSuggestionVue,
    searchResultVue
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'searchHistoryVue'
      }
      if (this.isShowSearchResult) {
        return 'searchResultVue'
      }
      return 'searchSuggestionVue'
    }
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    // 点击触发搜索
    onSearch() {
      // 显示搜索结果的组件
      this.isShowSearchResult = true
      // 将搜索的关键词存入vueX
      this.$store.commit('setHistory', this.keywords)
    },
    // 头部搜索点击返回上一页
    onCancel() {
      this.$router.back()
    },
    // 搜索栏获得焦点的时候
    onFocus() {
      this.isShowSearchResult = false
    },
    // 点击搜索建议传来的value
    sendSuggestionFn(val) {
      this.keywords = val
      this.onSearch()
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: white;
  }
}
</style>
