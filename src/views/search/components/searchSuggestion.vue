<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in hightLightSuggest"
      :key="index"
      @click="clickSuggestion(index)"
    >
      <template #title> <span v-html="item"></span> </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  data() {
    return {
      Suggestion: []
    }
  },
  computed: {
    hightLightSuggest() {
      const reg = new RegExp(this.keyswords, 'ig')
      return this.Suggestion.map((item) => {
        return item.replace(
          reg,
          (match) => `<span style='color:red'>${match}</span>`
        )
      })
    }
  },
  props: {
    keyswords: {
      type: String,
      required: true
    }
  },
  watch: {
    keyswords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const { data } = await getSearchSuggestion(this.keyswords)
        if (data.data.options.length === 0 || data.data.options[0] === null) {
          return (this.Suggestion = ['暂无数据'])
        }
        this.Suggestion = data.data.options
      } catch (error) {
        console.log(error)
      }
    },
    // 点击搜索建议触发搜索结果
    clickSuggestion(index) {
      this.$emit('sendSuggestion', this.Suggestion[index])
    }
  }
}
</script>

<style scoped lang="less"></style>
