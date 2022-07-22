<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isShowDelIcon">
        <span @click="delALLFn">全部删除</span>
        <span @click="isShowDelIcon = false" style="margin-left: 10px"
          >完成</span
        >
      </div>
      <van-icon name="delete-o" @click="delFn" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in historyList"
      :key="index"
      @click="sendVal(item, index)"
      ><van-icon name="close" v-if="isShowDelIcon" @click="delItemFn(index)"
    /></van-cell>
  </div>
</template>

<script>
export default {
  computed: {
    // 历史列表
    historyList() {
      return this.$store.state.history
    }
  },
  data() {
    return {
      // 历史列表 ***已经移到计算属性
      // historyList: this.$store.state.history,
      // 是否显示删除的图标
      isShowDelIcon: false
    }
  },
  methods: {
    // 点击头部的删除按钮
    delFn() {
      this.isShowDelIcon = true
    },
    // 点击删除所有
    delALLFn() {
      this.$store.commit('removeAllHistory')
    },
    // 点击删除单个***已废弃
    delItemFn(index) {
      this.$store.commit('removeItemHistory', index)
    },
    // 点击搜索内容
    sendVal(val, index) {
      if (this.isShowDelIcon) {
        this.$store.commit('removeItemHistory', index)
        return
      }
      this.$emit('sendSuggestion', val)
    }
  }
}
</script>

<style lang="less"></style>
